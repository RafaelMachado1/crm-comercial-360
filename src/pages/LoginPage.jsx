import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const formLoginInicial = {
  email: "",
  senha: "",
};

function LoginPage() {
  const [formLogin, setFormLogin] = useState(formLoginInicial);
  const [erroLogin, setErroLogin] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setErroLogin("");

    if (!formLogin.email || !formLogin.senha) {
      setErroLogin("Preencha e-mail e senha.");
      return;
    }

    const resultado = login(formLogin.email, formLogin.senha);

    if (!resultado.success) {
      setErroLogin(resultado.message);
      return;
    }

    setFormLogin(formLoginInicial);
    navigate("/");
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-header">
          <span>CRM Comercial 360</span>
          <h1>Entrar no sistema</h1>
          <p>Acesse o painel para gerenciar clientes, produtos e indicadores.</p>
        </div>

        <div className="login-fields">
          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={formLogin.email}
              onChange={handleChange}
              placeholder="admin@crm.com"
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              name="senha"
              value={formLogin.senha}
              onChange={handleChange}
              placeholder="123456"
            />
          </label>
        </div>

        <button type="submit">Entrar</button>

        {erroLogin && <p className="feedback error">{erroLogin}</p>}

        <div className="login-help">
          <strong>Credenciais de estudo:</strong>
          <span>E-mail: admin@crm.com</span>
          <span>Senha: 123456</span>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;