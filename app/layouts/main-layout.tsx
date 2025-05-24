import { Outlet, redirect } from "react-router";
import FooterMenu from "~/components/menu/footerMenu";
import HeaderMenu from "~/components/menu/headerMenu";
import type { Route } from "./+types/main-layout";
import { createClient } from "~/utils/supabase/server";
import { commitSession, destroySession, getSession } from "~/sessions.server";
import type { UserType } from "~/types/dataType";

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createClient(request);
  const session = await getSession(request.headers.get("Cookie"));
  const accessToken = session.get("access_token");

  const refreshToken = session.get("refresh_token");
  const accessTokenExpiresAt = session.get("access_token_expiresAt");

  if (refreshToken && Number(accessTokenExpiresAt) * 1000 <= Date.now()) {
    const {
      data: { session: newSession },
      error,
    } = await supabase.auth.refreshSession({ refresh_token: refreshToken });

    if (error) {
      return new Response("destroy Session set", {
        status: 200,
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    }

    session.set("access_token", newSession?.access_token!);
    session.set("refresh_token", newSession?.refresh_token!);
    session.set("access_token_expiresAt", newSession?.expires_at!);

    return new Response("Session refreshed", {
      status: 200,
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) {
    return { isLogin: false };
  }

  return { isLogin: true, user: data.user };
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { isLogin, user } = loaderData;

  return (
    <div>
      <HeaderMenu isLogin={isLogin} user={user!} />
      <main>
        <Outlet />
      </main>
      <FooterMenu />
    </div>
  );
}
