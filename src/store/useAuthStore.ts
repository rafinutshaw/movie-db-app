import { create } from "zustand";
import { clearSavedAuth, getSavedAuth } from "../services/tmdbAuthService";
import { useWishListStore } from "./useWishListStore";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}
export function isLoggedIn() {
  const { sessionId, accountId } = getSavedAuth();
  return !!(sessionId && accountId);
}
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!(getSavedAuth().sessionId && getSavedAuth().accountId),
  login: () => {
    const { sessionId, accountId } = getSavedAuth();
    if (sessionId && accountId) {
      set({ isLoggedIn: true });
    }
  },
  logout: () => {
    clearSavedAuth();
    set({ isLoggedIn: false });
    useWishListStore.getState().clear();
  },
}));
