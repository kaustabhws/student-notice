import { create } from "zustand";

interface useAdminModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useAdminModal = create<useAdminModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
