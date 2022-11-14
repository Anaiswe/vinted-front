import axios from "axios";
import { useState, useEffect } from "react";
// COMPONENTS
import OfferCard from "../components/OfferCard";
import Hero from "../components/Hero";

// import FilterPrice from "../components/FilterPrice";

const Home = ({ inputSearchBar, priceAsc }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchDataInput = async (inputSearchBar) => {
    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offers?title=${inputSearchBar}`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inputSearchBar.length > 0) {
      try {
        fetchDataInput(inputSearchBar);
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [inputSearchBar]);

  useEffect(() => {
    try {
      const sortPrice = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?sort=${
            priceAsc ? "price-asc" : "price-desc"
          }`
        );
        const dataPrice = response.data;
        setData(dataPrice);
        setIsLoading(false);
      };
      sortPrice();
    } catch (error) {
      console.log(error.message);
    }
  }, [priceAsc]);

  return isLoading ? (
    <p className="Loading">Loading ...</p>
  ) : (
    <>
      <Hero />
      <div className="home-container">
        {data.offers.map((offer) => {
          console.log(offer);
          return <OfferCard key={offer._id} offerInfos={offer} />;
        })}
      </div>
    </>
  );
};

export default Home;
