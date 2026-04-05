import { create } from 'zustand';

export interface CompletionData {
  lessonId: string;
  score: number;
  heartsLost: number;
  answers: Record<string, boolean>; // { [exerciseId]: correct }
}

interface CompletionStore {
  data: CompletionData | null;
  setCompletionData: (data: CompletionData) => void;
  clearCompletionData: () => void;
}

export const useCompletionStore = create<CompletionStore>((set) => ({
  data: null,
  setCompletionData: (data) => set({ data }),
  clearCompletionData: () => set({ data: null }),
}));
