import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// COMPONENTS
import OfferCard from "../components/OfferCard";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";

// import RangerPrice from "../components/RangePrice";

const Home = ({ data, setData, page, priceSort, setPriceSort }) => {
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?limit=15&page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        window.scrollTo(0, 0);
      };
      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [setData, page]);

  return isLoading === true ? (
    <span className="Loading">Loading ...</span>
  ) : (
    <div>
      <Hero />

      <div className="home-sort">
        {location.pathname === "/" ? (
          <div className="home-sort">
            <div className="trie-range">
              <div>Prix entre :</div>
              {/* <RangerPrice setRangePrice={setRangePrice} /> */}
            </div>
            <div>
              <div>Trier par prix :</div>
              <button
                className="sort-button"
                onClick={() => {
                  setPriceSort(!priceSort);
                }}
              >
                <div>{priceSort ? "⇣" : "⇡"}</div>
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div className="home-container">
        {data.offers.map((offer) => {
          console.log(offer);
          return <OfferCard key={offer._id} offerInfos={offer} />;
        })}
      </div>
      <Pagination />
    </div>
  );
};
export default Home;
