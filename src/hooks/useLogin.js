import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const history = useHistory();
  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    //sign the ouser out
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      //dispatch logout action
      dispatch({ type: "LOGIN", payload: res.user });
      history.push("/home");
      //update state

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
      setIsPending(false);
      setError(null);
    } catch (err) {
      if (!isCancelled) {
        console.log("aqui", err.message);
        setError(
          "Não há registro de usuário correspondente a este identificador. O usuário pode ter sido excluído."
        );
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, error, isPending };
};
