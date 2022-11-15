import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// components
import FormCheck from "../components/FormCheck";
import OrderSummary from "../components/OrderSummary";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({}) => {
  const location = useLocation();
  const { token, userId, productName, productPrice, total } = location.state;

  return (
    <div className="Pay-container">
      <div className="order-summary">
        <OrderSummary productPrice={productPrice} total={total} />
        <div className="card-payment-statement">
          <div className="container-CPS">
            Il ne vous reste plus qu'une étape pour vour offrir
            <span className="ordered-article">{productName}</span>. Vous allez
            payer<span className="price-article-ordered">{total}$</span>
            (frais de protection et frais de port inclus).
            <div className="App" />
            <Elements stripe={stripePromise}>
              <FormCheck
                token={token}
                productName={productName}
                productPrice={productPrice}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );

  //   (
  //     <Navigate to="/login"/>
  //   );
};

export default Payment;
