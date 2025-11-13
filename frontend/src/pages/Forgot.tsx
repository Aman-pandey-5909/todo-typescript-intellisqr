import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotSchema } from "../schemas/auth.schema";
import { api } from "../libs/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [resetLink, setResetLink] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const res = await api.post("/auth/forgot", data);
      const link = res.data.resetUrl;

      setResetLink(link);

      // Auto copy
      navigator.clipboard.writeText(link);

      toast.success("Reset link copied to clipboard!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Forgot Password</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          {...register("email")}
          className="border p-2 rounded w-full"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Send Reset Link
        </button>
      </form>

      {resetLink && (
        <div className="mt-4 p-3 border rounded bg-gray-900 break-all">
          <p className="font-medium">Your reset link:</p>
          <p className="text-sm mt-1">{resetLink}</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(resetLink);
              toast.success("Copied again!");
            }}
            className="mt-3 bg-gray-800 text-white px-3 py-1 rounded"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
