import React, { useEffect } from "react";
import "./Signup.css";
import { useHistory } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import { useState } from "react";
import ImageCarro1 from "../../assets/3.svg";
import ImageCarro2 from "../../assets/5.svg";
import { useTheme } from "../../hooks/useTheme";
import { useAuthContext } from "../../hooks/useAuthContext";
import Lottie from "react-lottie";
import * as animationData from "../../assets/orange.json";
export default function Signup() {
  const { user } = useAuthContext();
  console.log("usuario signup", user);
  useEffect(() => {
    if (user) {
      history.push("/home");
    }
  }, [user]);
  const history = useHistory();
  const { mode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { signup, isPending, error } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, displayName);
    history.push("/home");
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="container">
      {isPending && (
        <div className="lottie">
          <Lottie options={defaultOptions} height={290} width={290} />
        </div>
      )}
      {isPending ? (
        ""
      ) : (
        <>
          {" "}
          <div className="div-signup-imagens">
            {mode == "ligth" ? (
              <img src={ImageCarro1} alt="carro1" id="img1" />
            ) : mode == "dark" ? (
              <img src={ImageCarro2} alt="carro2" id="img1" />
            ) : (
              <img src={ImageCarro1} alt="carro1" id="img1" />
            )}
            {/* <img src={ImageCarro2} alt="carro2" id="img2" /> */}
          </div>
          <div className="form-div">
            <form className={`form-signup ${mode}`} onSubmit={handleSubmit}>
              <h2>Cadastre-se</h2>
              <label>
                <span>nome:</span>
                <input
                  required
                  type="text"
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </label>
              <label>
                <span>email:</span>
                <input
                  required
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>
              <label>
                <span>senha:</span>
                <input
                  required
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </label>
              {!isPending && (
                <button className="btn-comece" type="submit">
                  Signup
                </button>
              )}
              {isPending && (
                <button className="btn-comece" disabled>
                  loading ...
                </button>
              )}
              {error && <p>{error}</p>}
            </form>
          </div>
        </>
      )}
    </div>
  );
}
