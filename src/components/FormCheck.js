import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";
// import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";

const FormCheck = ({ token, userId, productName, productPrice }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  // const price = data.product_price;
  // const protectionInsurance = (price / 9).toFixed(2);
  // const shipFees = (price / 5).toFixed(2);
  // const total = Number(price) + Number(protectionInsurance) + Number(shipFees);

  const protectPrice = (productPrice / 10).toFixed(2);
  const deleveryPrice = (productPrice / 5).toFixed(2);
  const total = productPrice + protectPrice + deleveryPrice;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      // console.log(cardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "customer Id",
      });
      // console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          stripeToken,
          productName,
          total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === "succeeded") {
        console.log("payment succeeded");
        setCompleted(true);
      }
    } catch (error) {
      console.log({ error: error.message }, "An error has occured");
    }
  };

  // return completed ? (
  return (
    <>
      <OrderSummary />
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button className="green-btn" type="submit">
            Pay
          </button>
        </form>
      ) : (
        <span>Merci pour votre achat.</span>
      )}
    </>
  );
};

export default FormCheck;
