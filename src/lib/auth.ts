import { useEffect, useState } from "react";

const KEY = "spielzeugtraum.auth";
const EVENT = "auth:updated";

export interface AuthUser {
  email: string;
  rememberMe?: boolean;
}

const getStorage = (rememberMe?: boolean) => rememberMe ? localStorage : sessionStorage;

export const loadAuth = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

export const saveAuth = (user: AuthUser) => {
  const storage = getStorage(user.rememberMe);
  // clear from both to avoid duplicates
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
  storage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(EVENT));
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVENT));
};

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(() => loadAuth());
  useEffect(() => {
    const sync = () => setUser(loadAuth());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return user;
};
