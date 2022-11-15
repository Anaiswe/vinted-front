import React from "react";

const OrderSummary = ({ productPrice, total }) => {
  return (
    <div className="payment-card ">
      <div className="title">Résumé de la commande</div>
      <div className="content">
        <ul>
          <li>
            Commande <span>{productPrice} €</span>
          </li>
          <li>
            Frais protection acheteurs <span>0,4 €</span>
          </li>
          <li>
            Frais de port <span>0,8€</span>
          </li>
        </ul>
      </div>
      <div className="divider" />
      <div className="content">
        <ul>
          <li className="bold">
            Total <span>{total} €</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;
