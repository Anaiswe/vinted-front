import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";

const Publish = ({ token }) => {
  console.log(token);
  //   IMPORT STATES
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data._id) {
        navigate(`/offer/${response.data._id}`);
      }
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return token ? (
    <form className="publish-form" onSubmit={handleSubmit}>
      <div className="publish-title">Vends ton article</div>

      <div className="publish-picture">
        <div className="pictures-container">
          <input
            style={{ name: "photo" }}
            type="file"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setPicture(event.target.files[0]);
              setPreview(URL.createObjectURL(event.target.files[0]));
            }}
          ></input>
          <div className="preview-pictures-container">
            <img
              className="preview-pictures"
              src={preview}
              style={{ width: "150px", marginLeft: "20px" }}
              alt="preview-img"
            />
          </div>
        </div>
      </div>
      <div className="main-description-container">
        <div className="main-description-input">
          <div className="preview-description-container">
            <div>
              <span>Titre</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: robe Gucci"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>{" "}
            <div>
              <span>Décris ton article</span>{" "}
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="info-container">
            <div>
              <span>Marque</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: Adidas"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>
            <div>
              <span>Taille</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: 37, S, 40"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              />
            </div>
            <div>
              <span>Couleur</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: rouge, bleu"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </div>
            <div>
              <span>Etat</span>{" "}
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: neuf, bon état"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>
            <div>
              <span>Ville</span>
              <input
                style={{ fontSize: "15px" }}
                type="text"
                placeholder="ex: Montargis, Anderlecht"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>

          <div className="price-info-container">
            <span>Prix</span>
            <input
              style={{ fontSize: "15px" }}
              type="text"
              placeholder="veuillez indiquer le prix"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
        </div>
        <span className="exchange">Je suis intéressé(e) par les échanges</span>
        <input type="checkbox" checked={null}></input>

        <div className="add-button">
          <button>Ajouter</button>
        </div>
      </div>
    </form>
  ) : (
    <Navigate to="/Publish" />
  );
};

export default Publish;
