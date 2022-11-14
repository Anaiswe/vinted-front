import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos }) => {
  return (
    offerInfos.owner && (
      <div className="offer-card-container">
        <div>
          {offerInfos.owner.account.avatar && (
            <img
              className="owner-avatar"
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner"
              style={{ height: 50, width: 50 }}
            />
          )}
          <span className="owner-name">
            {offerInfos.owner.account.username}
          </span>
        </div>
        <Link to={`/offer/${offerInfos._id}`}>
          <img
            src={offerInfos.product_image.secure_url}
            alt="product"
            style={{ height: 400, width: 200, objectFit: "cover" }}
          />

          <p className="offer-price">{offerInfos.product_price} €</p>
          <p className="offer-details">
            {offerInfos.product_details.map((detail, index) => {
              if (detail.TAILLE) {
                return <p key={index}>{detail.TAILLE}</p>;
              } else {
                return null;
              }
            })}
            {offerInfos.product_details.map((detail, index) => {
              if (detail.MARQUE) {
                return <p key={index}>{detail.MARQUE}</p>;
              } else {
                return null;
              }
            })}
          </p>
        </Link>
      </div>
    )
  );
};

export default OfferCard;
