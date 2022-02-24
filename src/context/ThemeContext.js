import { createContext, useReducer } from "react";
export const ThemeContext = createContext();
//constante themeReducer o igual a uma funcao () => que recebe (state,action)

const themeReducer = (state, action) => {
  //isso e o reducer ele é como um if de useStates
  //veja que aqui criamos um const que retorna uma funcao ou seja ela
  //pertence apenas a esse componente
  //criar um switch recebendo como parmetro action.type
  //caso "teste1"
  //retorna ...tudo do state, cria um parametro color: e igual a action.payload
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, color: action.payload };
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};
//aqui abaixa em seguida criamos um export function ou seja uma funcao para
//ser usada fora do componente
export function ThemeProvider({ children }) {
  //entao criamos a contante useReducer atribui variavel state e
  //a funcao dispatch
  //e o useReducer o nosso reducer criado a nossa constante com ifs
  //apos a funcao ele recbee dois parametros o color e o mode vindo ja predefinidos

  const [state, dispatch] = useReducer(themeReducer, {
    color: "#f3123c",
    mode: "ligth",
  });
  //dentro da nossa função ThemeProvider vamos criar mais duas funcoes
  function changeColor(color) {
    //entao a funcao executa a funcao de dispatch que eu acredito que
    //seja como um set para a variavel state
    //ela pegou o dispatch e passou um objeto dentro dele
    //contendo type e payload
    dispatch({ type: "CHANGE_COLOR", payload: color });
  }
  //agora vamos criar outra funcao
  function changeMode(mode) {
    //essa funcao change mode passa o type como "CHANGE_MODE", e o payload como mode
    dispatch({ type: "CHANGE_MODE", payload: mode });
  }
  //entao por fim retornamos
  //um jsx um componente dentro da funcao
  //ThemeContext recebe um contexto nativo do react
  //entao na verdade ele criou um contexto que pode ser usado em todo app
  //passando como valor o state e nossas duas funcoes
  //que fazem ifs com estados de reducer
  // e ele renderiza tudo dentro com children
  return (
    <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
