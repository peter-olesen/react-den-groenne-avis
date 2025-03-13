import s from "./UserProductCard.module.scss";

export const UserProductCard = ({ title, price, image, description }) => {
  return (
    <div className={s.UserProductCard}>
      <div className={s.ProductDetails}>
        <h2>
          {title} {price}
        </h2>
        {description}
      </div>
      <img className={s.ProductImage} src={image} alt={title} />
    </div>
  );
};
