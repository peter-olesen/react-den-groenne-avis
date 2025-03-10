export const DonationCard = ({ title, text, total, thanks, bgSrc }) => {
  return (
    <div className={s.DonationCard} style={{ backgroundImage: { bgSrc } }}>
      <h3>{title}</h3>
      <p>{text}</p>
      <span>{total}</span>
      <p>{thanks}</p>
    </div>
  );
};
