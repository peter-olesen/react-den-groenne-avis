import s from "./UserProductCard.module.scss";

export const UserProductCard = ({ title, price, image, description }) => {
  return (
    <div className={s.UserProductCard}>
      {title} {price} {image} {description}
    </div>
  );
};
