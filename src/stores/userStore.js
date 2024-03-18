import { create } from "zustand";

export const useUserStore = create((set) => ({
  isAuthenticated: false,
  token: "",
  userDetails: {},

  login: (token) =>
    set({
      isAuthenticated: true,
      token: token,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      token: "",
      userDetails: {},
    }),

  setUserDetails: (details) =>
    set({
      userDetails: details,
    }),
}));
