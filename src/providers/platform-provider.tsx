"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface PlatformContextValue {
  platformId: string;
  setPlatformId: (id: string) => void;
}

const PlatformContext = createContext<PlatformContextValue>({
  platformId: "",
  setPlatformId: () => {},
});

const STORAGE_KEY = "ugie_selected_platform";

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [platformId, setPlatformIdState] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPlatformIdState(stored);
    }
  }, []);

  const setPlatformId = useCallback((id: string) => {
    setPlatformIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  return (
    <PlatformContext.Provider value={{ platformId, setPlatformId }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatformContext() {
  return useContext(PlatformContext);
}
