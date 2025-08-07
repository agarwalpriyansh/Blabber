import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("blabber-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("blabber-theme", theme);
    set({ theme })
},
}));
