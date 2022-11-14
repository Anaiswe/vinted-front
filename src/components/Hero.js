import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-container">
      {/* <img className="hero-image" src={vinted_hero} alt="vinted-hero-img" /> */}
      <div className="hero-text">
        Prêts à faire du tri dans vos placards?
        <Link to="/Login">
          <button className="hero-button">Commencer à vendre</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
