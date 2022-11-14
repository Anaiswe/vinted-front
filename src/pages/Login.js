import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleToken = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        handleToken(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-title">Se connecter</div>
      <form className="contents-form" onSubmit={handleToken}>
        <input
          value={email}
          placeholder="Adresse email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {/* <span class="signup-login-error-message">
          Mauvais email ou mauvais mot de passe
        </span> */}
        <button className="button-connect" type="submit">
          Connexion
        </button>
        <Link to="/signup">Pas encore de compte ? Inscrit-toi !</Link>
      </form>
    </div>
  );
};

export default Login;
