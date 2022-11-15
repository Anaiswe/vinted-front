import vinted_logo from "../assets/vinted-logo.svg";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Header = ({ token, handleToken, inputSearchBar, setInputSearchBar }) => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${inputSearchBar}`
        );
        console.log(response.data);
      };
      fetchData();
    } catch (error) {
      console.log({ error: error.message });
    }
  }, [inputSearchBar]);
  return (
    <div className="header-container">
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <Link to="/home">
          <img className="header-logo" src={vinted_logo} alt="vinted-logo" />
        </Link>
      </div>
      <div className="header-searchBar">
        <input
          className="searchBar"
          type="text"
          placeholder="Vous recherchez un article ?"
          value={inputSearchBar}
          onChange={(event) => {
            setInputSearchBar(event.target.value);
          }}
        />
      </div>
      {!token ? (
        <>
          <div className="right-bloc-header">
            <Link to="/signup">
              <button className="signlog-button">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button className="signlog-button">Se connecter</button>
            </Link>
            <Link to="/publish">
              <button className="sell-button">Vends tes articles</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Link to="/publish">
            <button className="sell-button">Vends tes articles</button>
          </Link>{" "}
          <button
            className="quit-button"
            onClick={() => {
              Cookies.remove("token");
              handleToken();
            }}
          >
            Deconnexion
          </button>
        </>
      )}
    </div>
  );
};

export default Header;
