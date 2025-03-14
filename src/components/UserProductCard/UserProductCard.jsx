import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router";
import s from "./UserProductCard.module.scss";

export const UserProductCard = ({
  title,
  price,
  image,
  description,
  productSlug,
  productId,
}) => {
  const { userData } = useContext(UserContext);
  const [deleteMessage, setDeleteMessage] = useState("");

  const delete_product = () => {
    let confirmation = confirm(
      "Er du sikker på at du vil slette denne annonce?"
    );
    if (!confirmation) return;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userData?.data.access_token}`,
      },
    };

    fetch(`http://localhost:4242/products/${productId}`, options)
      .then((res) => res.json())
      .then((data) => {
        setDeleteMessage("Din annonce er nu blevet slettet.");
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
      });
  };

  return (
    <>
      <div>
        <div className={s.UserProductCard}>
          <div className={s.ProductDetails}>
            <div className={s.TitleAndPrice}>
              <p>{title}</p>
              <p>Pris: {price} kr</p>
            </div>
            <div className={s.ProductDescription}>{description}</div>
          </div>
          <div className={s.ProductImage}>
            <img src={image} alt={title} />
          </div>
        </div>
        <div className={s.Extras}>
          {deleteMessage && <p>{deleteMessage}</p>}

          <p>
            <NavLink to={`/annonce/${productSlug}`}>Gå til annonce</NavLink>
          </p>
          <p className={s.Delete} onClick={() => delete_product()}>
            Fjern annonce
          </p>
        </div>
      </div>
    </>
  );
};
