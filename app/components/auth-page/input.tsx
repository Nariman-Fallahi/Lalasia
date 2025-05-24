import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState } from "react";

interface InputProps {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  icon: LucideIcon;
}

export default function Input({ label, name, type, icon: Icon }: InputProps) {
  const [typePsswordInput, setTypePsswordInput] = useState<"password" | "text">(
    "password"
  );

  return (
    <div className="w-full">
      <label
        htmlFor={label}
        className="block mb-2 text-sm text-slate-600 lg:text-base"
      >
        {label}
      </label>
      <div className="flex items-center gap-3 border p-2 rounded border-gray-300">
        <Icon className="text-gray-500 lg:size-7" />
        <input
          required
          id={label}
          name={name}
          type={type == "password" ? typePsswordInput : type}
          className="w-full outline-none lg:text-lg autofill:none"
          minLength={type === "password" ? 8 : 0}
        />
        {type === "password" &&
          (typePsswordInput === "password" ? (
            <Eye
              className="text-gray-500 lg:size-7 cursor-pointer"
              onClick={() => setTypePsswordInput("text")}
            />
          ) : (
            <EyeOff
              className="text-gray-500 lg:size-7 cursor-pointer"
              onClick={() => setTypePsswordInput("password")}
            />
          ))}
      </div>
    </div>
  );
}
