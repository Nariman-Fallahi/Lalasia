import type { Route as AuthRouteType } from "./+types/auth";
import { redirect } from "react-router";
import { createClient } from "~/utils/supabase/server";
import AuthForm from "~/components/auth-page/authForm";

import { getSession, commitSession } from "../sessions.server";

export function meta({}: AuthRouteType.MetaArgs) {
  return [
    { title: "Auth" },
    { name: "description", content: "Lalasia Auth Page" },
  ];
}

export async function loader({ request }: AuthRouteType.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.get("access_token") || session.get("refresh_token")) {
    return redirect("/");
  }
}

export async function action({ request }: AuthRouteType.ActionArgs) {
  const formData = await request.formData();
  const { supabase } = await createClient(request);
  const session = await getSession(request.headers.get("Cookie"));

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;

  const registrationErrorMessage =
    "Something went wrong during registration. Please try again.";

  if (fullName) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: password,
      options: { data: { full_name: fullName } },
    });

    if (!data || error) return registrationErrorMessage;

    return redirect("/auth/verify-email?status=idle");
  } else {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: password,
    });

    if (error) {
      switch (error?.code) {
        case "invalid_credentials":
          return "No account found with this email address.";
        case "email_not_confirmed":
          return "Please confirm your email then login.";
        default:
          return registrationErrorMessage;
      }
    }

    session.set("access_token", data.session.access_token!);
    session.set("access_token_expiresAt", data.session.expires_at!);
    session.set("refresh_token", data.session.refresh_token!);

    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }
}

export default function Auth({ actionData }: AuthRouteType.ComponentProps) {
  return <AuthForm actionData={actionData} />;
}
