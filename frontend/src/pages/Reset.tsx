import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "../schemas/auth.schema";
import { api } from "../libs/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const navigate = useNavigate();

  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    api.get(`/auth/validatereset?token=${token}`)
      .then(() => setValid(true))
      .catch(() => setValid(false));
  }, [token]);

  const { register, handleSubmit, formState: { errors } } =
    useForm({
      resolver: zodResolver(resetSchema.pick({ newPassword: true })),
    });

  const onSubmit = async (data: any) => {
    await api.post("/auth/reset", {
      token,
      newPassword: data.newPassword,
    });
    alert("Password reset successfully.");
    navigate("/login");
  };

  if (valid === null) return <p>Checking token...</p>;
  if (valid === false) return <p>Invalid or expired token.</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Reset Password</h1>

      <input {...register("newPassword")} className="border p-2 w-full mb-2" placeholder="New Password" />
      {errors.newPassword && <p className="text-red-500">{errors.newPassword.message}</p>}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Reset
      </button>
    </form>
  );
}
