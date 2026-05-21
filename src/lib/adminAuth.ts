const KEY = "admin_session";

export interface AdminSession {
  login: string;
  role: "admin" | "marketer" | "accountant";
  remember: boolean;
  ts: number;
}

export const adminAuth = {
  login(login: string, password: string, remember: boolean): AdminSession | null {
    // Demo credentials
    if (login === "admin" && password === "admin") {
      const session: AdminSession = { login, role: "admin", remember, ts: Date.now() };
      const store = remember ? localStorage : sessionStorage;
      store.setItem(KEY, JSON.stringify(session));
      return session;
    }
    return null;
  },
  get(): AdminSession | null {
    const raw = localStorage.getItem(KEY) || sessionStorage.getItem(KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  },
  logout() {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(KEY);
  },
};
