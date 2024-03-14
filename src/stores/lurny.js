import { create } from "zustand";

export const useLurnyStore = create((set) => ({
  lurnies: [],
  setLurnies: async (lurnyData) => set({ lurnies: lurnyData }),
}));
