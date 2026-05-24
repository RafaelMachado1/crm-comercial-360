import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { User } from "../types/crm";

const STORAGE_KEY = "crm-user";

type LoginResult = {
  success: boolean;
  message?: string;
};

type AuthContextValue = {
  user: User | null;
  login: (email: string, senha: string) => LoginResult;
  logout: () => void;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const usuarioFake = {
  nome: "Rafael Machado",
  email: "admin@crm.com",
  senha: "123456",
};

function getUsuarioSalvo(): User | null {
  const usuarioSalvo = localStorage.getItem(STORAGE_KEY);

  if (!usuarioSalvo) {
    return null;
  }

  try {
    return JSON.parse(usuarioSalvo) as User;
  } catch {
    return null;
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => getUsuarioSalvo());

  function login(email: string, senha: string): LoginResult {
    if (email === usuarioFake.email && senha === usuarioFake.senha) {
      const usuarioLogado: User = {
        nome: usuarioFake.nome,
        email: usuarioFake.email,
      };

      setUser(usuarioLogado);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarioLogado));

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: "E-mail ou senha inválidos.",
    };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider.");
  }

  return context;
}

export { AuthProvider, useAuth };