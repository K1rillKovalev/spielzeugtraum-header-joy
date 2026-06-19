import { useEffect, useState } from "react";

const KEY = "spielzeugtraum.auth";
const EVENT = "auth:updated";

export interface AuthUser {
  email: string;
}

export const loadAuth = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
};

export const saveAuth = (user: AuthUser) => {
  localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(EVENT));
};

export const clearAuth = () => {
  localStorage.removeItem(KEY);
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
