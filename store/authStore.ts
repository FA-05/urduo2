import { create } from 'zustand';
import { getSupabase, isSupabaseConfigured } from '../utils/supabase';
import { Session, User } from '@supabase/supabase-js';
import { Storage, StorageKeys } from '../utils/storage';

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  initialized: boolean;
  isGuest: boolean;
  setSession: (session: Session | null) => void;
  setGuest: (isGuest: boolean) => void;
  initialize: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,
  initialized: false,
  isGuest: false,
  setSession: (session) => {
    set({ session, user: session?.user ?? null, loading: false, isGuest: false });
    if (session) Storage.set(StorageKeys.GUEST, false);
  },
  setGuest: (isGuest) => {
    set({ isGuest, session: null, user: null, loading: false });
    Storage.set(StorageKeys.GUEST, isGuest);
  },
  initialize: async () => {
    const isGuest = await Storage.get<boolean>(StorageKeys.GUEST);
    if (isGuest) {
      set({ isGuest: true, loading: false, initialized: true });
    }

    if (!isSupabaseConfigured()) {
      set({ loading: false, initialized: true });
      return;
    }
    try {
      const supabase = getSupabase();
      const { data: { session } } = await supabase.auth.getSession();
      set({ session, user: session?.user ?? null, loading: false, initialized: true });
      
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user ?? null, loading: false });
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ loading: false, initialized: true });
    }
  },
  signOut: async () => {
    if (isSupabaseConfigured()) {
      await getSupabase().auth.signOut();
    }
    set({ session: null, user: null, isGuest: false });
    Storage.set(StorageKeys.GUEST, false);
  },
}));


