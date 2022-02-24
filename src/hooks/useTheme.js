import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
//o hooks do context por sua vez exporta um função
//criando uma constante context = useContext(ThemeContext) o nosso reducer
//de contexto
//e ele verifica if context === undefined
//throw new Error
//retorna o nosso contexto de reducer todo e uma forma de criar um hook
//para cada contexto de useReducer
export const useTheme = () => {
  const conxtext = useContext(ThemeContext);
  if (conxtext === undefined) {
    throw new Error("useTheme() must be used inside a Themeprovider");
  }
  return conxtext;
};
