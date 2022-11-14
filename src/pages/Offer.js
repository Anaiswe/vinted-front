import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p className="loading-message">Loading ...</p>
  ) : (
    <>
      {" "}
      <div className="offer-body">
        <div className="offer-container">
          <div className="offer-pictures">
            <img
              src={data.product_image.secure_url}
              className="offer-picture"
              alt="illustration"
            />
          </div>
          <div className="offer-infos">
            <span className="offer-price">{data.product_price}€</span>
            <ul className="offer-list">
              {data.product_details.map((item, index) => {
                const keys = Object.keys(item);
                return (
                  <li key={index}>
                    <span className="li-left">{keys[0]}</span>
                    <span className="li-right">{item[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
            <div className="border"></div>
            <div className="offer-content">
              <p className="name">{data.product_name}</p>
              <p className="description">{data.product_description}</p>
              <div className="offer-avatar-username">
                {data.owner && data.owner.account.avatar && (
                  <img
                    style={{ width: "50px" }}
                    src={data.owner.account.avatar.secure_url}
                    alt="avatar_profil"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
