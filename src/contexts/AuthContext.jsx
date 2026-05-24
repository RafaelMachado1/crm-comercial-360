import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "crm-user";

const usuarioFake = {
  nome: "Rafael Machado",
  email: "admin@crm.com",
  senha: "123456",
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem(STORAGE_KEY);

    if (usuarioSalvo) {
      setUser(JSON.parse(usuarioSalvo));
    }
  }, []);

  function login(email, senha) {
    if (email === usuarioFake.email && senha === usuarioFake.senha) {
      const usuarioLogado = {
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

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };