import { useState } from "react";
import "./Login.css";
import LoginImageCar from "../../assets/6.svg";
import { useLogin } from "../../hooks/useLogin";
import { useTheme } from "../../hooks/useTheme";
import { useHistory } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { mode } = useTheme();
  const { login, error, isPending } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <div className="login-container">
      <form className={`login-form ${mode}`} onSubmit={handleSubmit}>
        <h2>Entrar</h2>
        <label>
          <span>email:</span>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
        </label>
        <label>
          <span>password:</span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          ></input>
        </label>
        {!isPending && (
          <button className="btn" type="submit">
            Confirmar
          </button>
        )}
        {isPending && (
          <button className="btn" disabled>
            Carregando ...
          </button>
        )}
        {error && <p>{error}</p>}
      </form>
      <div className="login-images">
        <img src={LoginImageCar} alt="login-carr" id="login-car" />
      </div>
    </div>
  );
}
