import React, { useState } from "react";
import "./Navbar.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { color } = useTheme();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [control, setControl] = useState(false);
  const [active, setActive] = useState("");

  function handleMenu() {
    if (control === false) {
      setActive("active");
      setControl(true);
    }
    if (control === true) {
      setActive("");
      setControl(false);
    }
  }
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>FastCar</h1>
        </Link>
        <div
          className={control ? `menuMobileActive` : `mobileMenu`}
          onClick={handleMenu}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className={control ? "mobileNavLinks" : "none"}>
          {user && <></>}
          {!user && (
            <div className={control ? "acessos-mobile" : "none"}>
              <Link id="entrar" to="/login">
                Entrar
              </Link>
              <Link to="/">Cadastre-se</Link>
            </div>
          )}
          {user && (
            <div className={control ? "acessos-logado-mobile" : "none"}>
              <Link to="/create">Anunciar carro</Link>
              <button className="btn-logout-mobile" onClick={logout}>
                Sair
              </button>
            </div>
          )}
        </div>
        {user && (
          <>
            <p className="welcome-text">
              Bem-vindo <strong>{user.displayName}</strong>
            </p>
          </>
        )}
        {!user && (
          <div className="acessos">
            <Link id="entrar" to="/login">
              Entrar
            </Link>
            <Link to="/">Cadastre-se</Link>
          </div>
        )}
        {user && (
          <div className="acessos-logado">
            <Link to="/create" id="anunciar">
              Anunciar carro
            </Link>
            <button className="btn-logout" onClick={logout}>
              Sair
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}
