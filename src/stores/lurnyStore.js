import { create } from "zustand";

export const useLurnyStore = create((set) => ({
  newLurny: {},
  lurnies: [],
  setLurnies: (lurnyData) => set({ lurnies: lurnyData }),
  setNewLurny: (lurny) => set({ newLurny: lurny }),
  share: () =>
    set((state) => ({
      newLurny: { ...state.newLurny, shared: true },
    })),
}));
