import vinted_logo from "../assets/vinted-logo.svg";

import { Link } from "react-router-dom";
// import FilterPrice from "./FilterPrice";
const Header = ({
  token,
  handleToken,
  inputSearchBar,
  setInputSearchBar,
  priceAsc,
  setPriceAsc,
}) => {
  return (
    <header>
      <div className="header-container">
        {token ? (
          <button
            className="header-button"
            onClick={() => {
              handleToken(null);
            }}
          >
            Se déconnecter
          </button>
        ) : (
          <>
            <Link to="/">
              <img
                className="header-logo"
                src={vinted_logo}
                alt="vinted-logo"
              />
            </Link>
            <div className="search-container">
              <input
                className="input-search-bar"
                type="text"
                placeholder="Vous recherchez un article ?"
                value={inputSearchBar}
                onChange={(event) => {
                  setInputSearchBar(event.target.value);
                }}
              />
            </div>
            <div className="container-price-sort">
              <div className="sort-price-main">
                <div>trier par prix : </div>
                <div className="sort-menu">
                  <div
                    className="sort-by-price"
                    onClick={() => setPriceAsc(!priceAsc)}
                  >
                    {priceAsc ? "↑" : "↓"}
                  </div>
                </div>
                {/* <span className="FilterPrice">
                  <FilterPrice />
                </span> */}
              </div>
            </div>

            <Link to="/Signup">
              <button>Inscription</button>
            </Link>

            <Link to="/Login">
              <button>Connexion</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
