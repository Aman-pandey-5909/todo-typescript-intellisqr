import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth.schema";
import type { LoginInput } from "../schemas/auth.schema";
import { api } from "../libs/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuth((s) => s.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await api.post("/auth/login", data);
      setUser(res.data.userData);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Login</h1>

      <input
        {...register("email")}
        type="email"
        className="border p-2 w-full mb-2"
        placeholder="Email"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        {...register("password")}
        type="password"
        className="border p-2 w-full mb-2"
        placeholder="Password"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Login
      </button>
      <div>
        New? <a href="/register">Register</a>
      </div>
      <div className="text-right mt-2">
        <a href="/forgot" className="text-blue-600 text-sm">
          Forgot password?
        </a>
      </div>
    </form>
  );
}
