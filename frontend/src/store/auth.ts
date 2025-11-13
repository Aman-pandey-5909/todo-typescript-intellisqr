import { create } from "zustand";

type User = { id: string; email: string; name: string, createdAt: string } | null;

type AuthState = {
  user: User;
  setUser: (u: User) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  user: null,

  setUser: (u) => set({ user: u }),

  logout: () => set({ user: null }),
}));
