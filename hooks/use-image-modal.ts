import { create } from 'zustand';

interface ImageModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useImageModalStore = create<ImageModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
