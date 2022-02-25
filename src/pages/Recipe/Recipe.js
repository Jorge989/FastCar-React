import React, { useEffect, useState } from "react";
import "./Recipe.css";
import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";
import { Carousel } from "react-responsive-carousel";
import Lottie from "react-lottie";
import * as animationData from "../../assets/orange.json";
export default function Recipes() {
  const { mode } = useTheme();
  const { id } = useParams();
  const [carro, setCarros] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("carroslista")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setCarros(doc.data());
        } else {
          setIsPending(false);
          setError("Carro não encontrado");
        }
      });
    return () => unsub();
  }, [id]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="carros-list-recipe">
      {error && <p className="error">{error}</p>}
      {isPending && (
        <p>
          {" "}
          <div className="lottie">
            <Lottie options={defaultOptions} height={290} width={290} />
          </div>
        </p>
      )}
      {carro && (
        <>
          {mode === "light" && (
            <h2 style={{ color: "#222" }} className="page-title">
              {carro.nome}
            </h2>
          )}
          {mode === "dark" && (
            <h2 style={{ color: "#fff" }} className="page-title">
              {carro.nome}
            </h2>
          )}

          <div key={carro.id} className={`card-recipe ${mode}`}>
            <div className="imgContainer">
              {" "}
              <Carousel>
                <div>
                  <img src={carro.img[0]} alt="fusion" />
                </div>
                <div>
                  <img src={carro.img[1]} alt="hb20" />
                </div>
                <div>
                  <img src={carro.img[2]} alt="civic" />
                </div>
              </Carousel>
            </div>
            <div className="infos">
              <h3>{carro.nome}</h3>
              <p>{carro.marca}</p>
              <p>{carro.ano}</p>
              <p>{carro.cambio}</p>
            </div>
            <div className="descricao">
              {carro.descricao}...
              {/* <button onClick={() => handleClick()}>Atualizar</button> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
