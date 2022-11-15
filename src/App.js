// import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// import CSS
import "./index.css";
import "./App.css";
import "../src/pages/css pages/login-signup.css";
import "../src/pages/css pages/offer.css";
import "../src/pages/css pages/publish.css";

// Import Pages

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  // States
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [data, setData] = useState(null);
  const [inputSearchBar, setInputSearchBar] = useState("");
  const [priceSort, setPriceSort] = useState(false);
  const [rangePrice, setRangePrice] = useState([0, 500]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${inputSearchBar}&priceMin=${
          rangePrice[0]
        }&priceMax=${rangePrice[1]}&sort=${
          priceSort ? "price-desc" : "price-asc"
        }`
      );
      setData(response.data);
      console.log(response.data);
    };
    fetchData();
  }, [inputSearchBar, rangePrice, priceSort]);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  return (
    <div className="container">
      <Router>
        <Header
          token={token}
          handleToken={handleToken}
          inputSearchBar={inputSearchBar}
          setInputSearchBar={setInputSearchBar}
          rangePrice={rangePrice}
          setRangePrice={setRangePrice}
          priceSort={priceSort}
          setPriceSort={setPriceSort}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                setData={setData}
                inputSearchBar={inputSearchBar}
                setInputSearchBar={setInputSearchBar}
                rangePrice={rangePrice}
                setRangePrice={setRangePrice}
                priceSort={priceSort}
                setPriceSort={setPriceSort}
              />
            }
          />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
          <Route path="/publish" element={<Publish />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
