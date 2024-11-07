import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  userData: { name: string; email: string } | null;
  setToken: (token: string) => void;
  setUserData: (data: { name: string; email: string }) => void;
  clearToken: () => void;
  clearUserData: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      userData: null,
      setToken: (token: string) => set({ token }),
      setUserData: (data: { name: string; email: string }) =>
        set({ userData: data }),
      clearToken: () => set({ token: null }),
      clearUserData: () => set({ userData: null }),
    }),
    {
      name: "useAuthStore",
    },
  ),
);
