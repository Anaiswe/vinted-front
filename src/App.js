// import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// import CSS
import "./index.css";
import "./App.css";
import "./pages/Login-signup.css";
import "./pages/Offer.css";

// Import Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Import Components
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  // States
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [inputSearchBar, setInputSearchBar] = useState("");
  const [priceAsc, setPriceAsc] = useState(true);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("token");
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
          priceAsc={priceAsc}
          setPriceAsc={setPriceAsc}
        />
        <Routes>
          <Route path="/" element={<Home inputSearchBar={inputSearchBar} />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/login" element={<Login handleToken={handleToken} />} />
          <Route
            path="/signup"
            element={<Signup handleToken={handleToken} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
