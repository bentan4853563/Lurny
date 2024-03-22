import { create } from "zustand";

export const useLurnyStore = create((set) => ({
  newLurny: {},
  lurnies: [],
  setLurnies: (lurnyData) => set({ lurnies: lurnyData }),
  addLurny: (lurny) => set((state) => ({ lurnies: [...state.lurnies, lurny] })),
  shareLurny: (id) =>
    set((state) => ({
      lurnies: state.lurnies.map((item) =>
        item._id === id ? { ...item, shared: true } : item
      ),
    })),
  deleteLurny: (id) =>
    set((state) => ({
      lurnies: state.lurnies.map((item) => item._id === id),
    })),
  clearLurnies: () => set({ lurnies: [] }),
}));
