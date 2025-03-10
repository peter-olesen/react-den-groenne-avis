import s from "./DonationCard.module.scss";

export const DonationCard = ({ title, text, total, thanks, bgSrc }) => {
  return (
    <div
      className={s.DonationCard}
      style={{ backgroundImage: `url(${bgSrc})` }}
    >
      <h3>{title}</h3>
      <p>{text}</p>
      <p className={s.Total}>{total}</p>
      <p>{thanks}</p>
    </div>
  );
};
