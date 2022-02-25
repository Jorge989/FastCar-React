import React, { useState, useEffect } from "react";
import CarrList from "../../components/CarrList";
import { projectFirestore } from "../../firebase/config";
import Lottie from "react-lottie";
import * as animationData from "../../assets/orange.json";
import { useTheme } from "../../hooks/useTheme";
import "./Home.css";
export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(false);
  const { mode } = useTheme();
  console.log("data", data);
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("carroslista").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          console.log("aqui", snapshot.empty);
          setError("nenhum veículo cadastrado");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, []);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="home">
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && (
        <p>
          {" "}
          <div className="lottie">
            <Lottie options={defaultOptions} height={290} width={290} />
          </div>
        </p>
      )}
      {data && !error && <CarrList carros={data}></CarrList>}
    </div>
  );
}
