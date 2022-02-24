import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
//aqui ele chama de themProvider nosso contexto direto
// do context nao direto do hook
//la ele e retornado como ThemeContext.Provider
//entendo que ele juntou os dois nomes
import { ThemeProvider } from "./context/ThemeContext";
ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider value={{ color: "#f3123c" }}>
        <App />
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
