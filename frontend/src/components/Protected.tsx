import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import type { JSX } from "react";

export function Protected({ children }: { children: JSX.Element }) {
  const user = useAuth((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
