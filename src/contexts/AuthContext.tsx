import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
};

type Credentials = { email: string; password: string };
type SignupPayload = { name: string; email: string; password: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (creds: Credentials) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = "pp_users";
const SESSION_STORAGE_KEY = "pp_session_user";

async function loadMockUsers(): Promise<User[]> {
  try {
    const res = await fetch("/mock/users.json");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const storedUsersRaw = localStorage.getItem(USERS_STORAGE_KEY);
      const storedUsers = storedUsersRaw
        ? (JSON.parse(storedUsersRaw) as User[])
        : null;
      let baseUsers = storedUsers ?? (await loadMockUsers());
      setUsers(baseUsers);

      const sessionRaw = localStorage.getItem(SESSION_STORAGE_KEY);
      const sessionUser = sessionRaw ? (JSON.parse(sessionRaw) as User) : null;
      setUser(sessionUser);
      setLoading(false);
    };
    init();
  }, []);

  const login = async ({ email, password }: Credentials) => {
    setError(null);
    await new Promise((r) => setTimeout(r, 300));
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!found) {
      setError("Utilisateur introuvable");
      return;
    }
    if (!password || password.length < 3) {
      setError("Mot de passe invalide");
      return;
    }
    setUser(found);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(found));
  };

  const signup = async ({ name, email, password }: SignupPayload) => {
    setError(null);
    await new Promise((r) => setTimeout(r, 400));
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (exists) {
      setError("Un compte existe déjà avec cet e‑mail");
      return;
    }
    const newUser: User = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      avatarUrl: undefined,
    };
    const next = [...users, newUser];
    setUsers(next);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(next));
    setUser(newUser);
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const value = useMemo(
    () => ({ user, loading, error, login, signup, logout }),
    [user, loading, error],
  );

  return (
    <AuthContext.Provider value={value} data-oid="-zae9a8">
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
