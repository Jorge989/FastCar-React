import React from "react";
import "./ThemeSelector.css";
import { useTheme } from "../hooks/useTheme";
import DarkIcon from "../assets/dark.svg";
import LightIcon from "../assets/ligth.svg";
const themeColors = ["#f3123c", "#333", "#150578"];
export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();
  const toggleMode = () => {
    changeMode(mode === "dark" ? "light" : "dark");
  };
  return (
    <div className="wrapper">
      <div className="theme-selector">
        <div className="mode-toggle">
          {mode === "light" ? (
            <img
              id="dark"
              src={DarkIcon}
              style={{
                filter: mode === "dark" ? "invert(100%)" : "invert(20%)",
              }}
              alt="icon"
              onClick={toggleMode}
            ></img>
          ) : (
            <img
              src={LightIcon}
              id="light"
              style={{
                filter: mode === "dark" ? "invert(100%)" : "invert(20%)",
              }}
              alt="icon"
              onClick={toggleMode}
            ></img>
          )}
        </div>
        <div className="theme-buttons">
          {themeColors.map((color, index) => (
            <div
              key={index}
              onClick={() => changeColor(color)}
              style={{ background: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
