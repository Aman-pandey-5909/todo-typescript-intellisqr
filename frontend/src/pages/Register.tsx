import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth.schema";
import type { RegisterInput } from "../schemas/auth.schema";
import { api } from "../libs/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } =
    useForm<RegisterInput>({
      resolver: zodResolver(registerSchema),
    });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const { confirmPassword, ...payload } = data;
      await api.post("/auth/register", payload);
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Register</h1>

      <input {...register("name")} className="border p-2 w-full mb-2" placeholder="Name" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <input {...register("email")} className="border p-2 w-full mb-2" placeholder="Email" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input {...register("password")} type="password" className="border p-2 w-full mb-2" placeholder="Password" />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <input {...register("confirmPassword")} type="password" className="border p-2 w-full mb-2" placeholder="Confirm Password" />
      {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </form>
  );
}
