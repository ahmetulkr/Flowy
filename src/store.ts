import { create } from 'zustand';

interface StoreState {
  selectedShape: string;
  setSelectedShape: (shape: string) => void;
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedShape: 'rectangle',
  setSelectedShape: (shape) => set({ selectedShape: shape }),
  pdfFile: null,
  setPdfFile: (file) => set({ pdfFile: file }),
}));