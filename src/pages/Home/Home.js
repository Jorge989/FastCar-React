import React, { useState, useEffect } from "react";
import CarrList from "../../components/CarrList";
import { projectFirestore } from "../../firebase/config";
import "./Home.css";
export default function Home() {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(false);
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
  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p>Carregando..</p>}
      {data && <CarrList carros={data}></CarrList>}
    </div>
  );
}
