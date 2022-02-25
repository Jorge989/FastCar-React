import React from "react";
import "./Navbar.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { color } = useTheme();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>FastCar</h1>
        </Link>
        {user && (
          <p className="welcome-text">
            Bem-vindo <strong>{user.displayName}</strong>
          </p>
        )}
        {!user && (
          <>
            <Link id="entrar" to="/login">
              Entrar
            </Link>
            <Link to="/">Cadastre-se</Link>
          </>
        )}
        {user && (
          <>
            <Link to="/create">Anunciar carro</Link>
            <button className="btn-logout" onClick={logout}>
              Sair
            </button>
          </>
        )}
      </nav>
    </div>
  );
}
