import React from "react";
import "./Create.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { projectFirestore, projectStorage } from "../../firebase/config";

// import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
export default function Create() {
  const { authIsReady, user } = useAuthContext();
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");
  const [ano, setAno] = useState("");
  const [cambio, setCambio] = useState("");
  const [descricao, setDescricao] = useState("");
  const [items, setItems] = useState([]);
  const [newitem, setNewItem] = useState("");
  const [img, setImg] = useState([]);
  const [newImg, setNewImg] = useState("");
  const itemImput = useRef(null);
  const itemImputimg = useRef(null);
  const history = useHistory();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [selected, setSelected] = useState([]);
  const { mode } = useTheme();
  const handleFileChange = async (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    console.log(selected);
    if (!selected) {
      setThumbnailError("Selecione um arquivo");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("O arquivo selecionado deve ser uma imagem");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("O arquivo de imagem deve ser menor que 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
    const uploadPath = `thumbnails/${selected.name}`;
    const img = await projectStorage.ref(uploadPath).put(selected);
    const imgUrl = await img.ref.getDownloadURL();
    console.log("AQUII", imgUrl);
    user.updateProfile({ photoURL: imgUrl });
    const carroimg = imgUrl;
    if (carroimg && !imgUrl.includes(carroimg)) {
      setImg((antigoItem) => [...antigoItem, carroimg]);
    }
    // setImg([...img, imgUrl]);
  };
  async function handleSubmit(e) {
    e.preventDefault();

    const doc = {
      nome: nome,
      marca: marca,
      ano: ano,
      cambio: cambio,
      descricao: descricao,
      items: items,
      img: img,
    };
    console.log("aqui", doc);
    try {
      await projectFirestore.collection("carroslista").add(doc);

      console.log("aqui", doc);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  }
  // const handleAddImg = (e) => {
  //   e.preventDefault();
  //   const carroimg = newImg.trim();
  //   if (carroimg && !img.includes(carroimg)) {
  //     setImg((antigoItem) => [...antigoItem, carroimg]);
  //   }
  //   setNewImg("");
  //   itemImputimg.current.focus();
  //   console.log("array", img);
  // };
  const handleAdd = (e) => {
    e.preventDefault();
    const carro = newitem.trim();
    if (carro && !items.includes(carro)) {
      setItems((antigoItem) => [...antigoItem, carro]);
    }
    setNewItem("");
    itemImput.current.focus();
    console.log(items);
  };

  return (
    <div className={`create ${mode}`}>
      {/* <h2 className="page-title">Criar novo anuncío</h2> */}
      <form onSubmit={handleSubmit} className="create-form">
        <label>
          <span>Nome do veículo:</span>
          <input
            type="text"
            onChange={(e) => setNome(e.target.value)}
            required
            value={nome}
          ></input>
        </label>
        <label>
          <span>Fotos:</span>
          <input
            id="foto"
            onChange={handleFileChange}
            type="file"
            ref={itemImput}
            required
            // value={thumbnail}
          ></input>
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        <label>
          <span>Marca do veículo:</span>
          <input
            type="text"
            onChange={(e) => setMarca(e.target.value)}
            required
            value={marca}
          ></input>
        </label>
        <label>
          <span>Ano do veículo:</span>
          <select
            type="number"
            onChange={(e) => setAno(e.target.value)}
            name="years"
          >
            {" "}
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            <option value="1979">1979</option>
            <option value="1978">1978</option>
            <option value="1977">1977</option>
            <option value="1976">1976</option>
            <option value="1975">1975</option>
            <option value="1974">1974</option>
            <option value="1973">1973</option>
            <option value="1972">1972</option>
            <option value="1971">1971</option>
            <option value="1970">1970</option>
            <option value="1969">1969</option>
            <option value="1968">1968</option>
            <option value="1967">1967</option>
            <option value="1966">1966</option>
            <option value="1965">1965</option>
            <option value="1964">1964</option>
            <option value="1963">1963</option>
            <option value="1962">1962</option>
            <option value="1961">1961</option>
            <option value="1960">1960</option>
            <option value="1959">1959</option>
            <option value="1958">1958</option>
            <option value="1957">1957</option>
            <option value="1956">1956</option>
            <option value="1955">1955</option>
            <option value="1954">1954</option>
            <option value="1953">1953</option>
            <option value="1952">1952</option>
            <option value="1951">1951</option>
            <option value="1950">1950</option>
            <option value="1949">1949</option>
            <option value="1948">1948</option>
            <option value="1947">1947</option>
            <option value="1946">1946</option>
            <option value="1945">1945</option>
            <option value="1944">1944</option>
            <option value="1943">1943</option>
            <option value="1942">1942</option>
            <option value="1941">1941</option>
            <option value="1940">1940</option>
            <option value="1939">1939</option>
            <option value="1938">1938</option>
            <option value="1937">1937</option>
            <option value="1936">1936</option>
            <option value="1935">1935</option>
            <option value="1934">1934</option>
            <option value="1933">1933</option>
            <option value="1932">1932</option>
            <option value="1931">1931</option>
            <option value="1930">1930</option>
            <option value="1929">1929</option>
            <option value="1928">1928</option>
            <option value="1927">1927</option>
            <option value="1926">1926</option>
            <option value="1925">1925</option>
            <option value="1924">1924</option>
            <option value="1923">1923</option>
            <option value="1922">1922</option>
            <option value="1921">1921</option>
            <option value="1920">1920</option>
            <option value="1919">1919</option>
            <option value="1918">1918</option>
            <option value="1917">1917</option>
            <option value="1916">1916</option>
            <option value="1915">1915</option>
            <option value="1914">1914</option>
            <option value="1913">1913</option>
            <option value="1912">1912</option>
            <option value="1911">1911</option>
            <option value="1910">1910</option>
            <option value="1909">1909</option>
            <option value="1908">1908</option>
            <option value="1907">1907</option>
            <option value="1906">1906</option>
            <option value="1905">1905</option>
            <option value="1904">1904</option>
            <option value="1903">1903</option>
            <option value="1902">1902</option>
            <option value="1901">1901</option>
            <option value="1900">1900</option>
            <option value="1900">1900</option>
          </select>
        </label>
        <label>
          <span>Câmbio do veículo:</span>
          <input
            type="text"
            onChange={(e) => setCambio(e.target.value)}
            required
            value={cambio}
          ></input>
        </label>
        <label>
          <span>Items:</span>
          <div className="items">
            <input
              type="text"
              value={newitem}
              ref={itemImput}
              onChange={(e) => setNewItem(e.target.value)}
            ></input>
            <p>
              Items:{""}
              {items.map((i) => (
                <em key={i}> {i}, </em>
              ))}
            </p>
            <button className="btn" onClick={handleAdd}>
              +
            </button>
          </div>
        </label>
        <label>
          <span>Descrição do veículo:</span>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </label>
        <button id="btn-submit" className="btn" type="submit">
          Confirmar
        </button>
      </form>
    </div>
  );
}
