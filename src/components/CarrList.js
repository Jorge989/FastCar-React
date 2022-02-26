import "./CarrList.css";
import Trash from "../assets/trash.svg";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuthContext } from "../hooks/useAuthContext";
import { projectFirestore } from "../firebase/config";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useEffect, useState } from "react";

export default function CarrList({ carros }) {
  const { authIsReady, user } = useAuthContext();
  const [pending, setPending] = useState(false);

  const { mode } = useTheme();
  useEffect(() => {
    if (carros.length === 0) {
      return <div>Nenhum carro econtrado...</div>;
    }
  }, [carros]);
  const handleClick = (id) => {
    projectFirestore.collection("carroslista").doc(id).delete();
  };

  return (
    <div className="carros-list">
      {carros?.map((carro, index) => {
        return (
          <div key={carro.id} className={`card ${mode}`}>
            <div className="imgContainer">
              {" "}
              <Carousel>
                <div className="teste">
                  <img src={carro?.img[0]} alt="fusion" />
                </div>
                <div>
                  <img src={carro?.img[1]} alt="hb20" />
                </div>
                <div>
                  <img src={carro.img[2]} alt="civic" />
                </div>
              </Carousel>
            </div>

            <h3>{carro.nome}</h3>
            <div className="infos">
              <p>{carro.marca}</p>
              <p>{carro.ano}</p>
              <p>{carro.cambio}</p>
              <img
                className="delete"
                src={Trash}
                alt="deletar"
                onClick={() => handleClick(carro.id)}
              ></img>
            </div>
            <div className="descricao">
              <p>{carro.descricao.substring(0, 100)}...</p>
            </div>
            <Link id="link" to={`/recipe/${carro.id}`}>
              Tenho interrese!
            </Link>
          </div>
        );
      })}
    </div>
  );
}
