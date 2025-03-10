import s from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={s.Hero}>
      <h2>Den Grønne Avis</h2>
      <p>
        Vi går forest i kampen om klimaet ved at give 2 kr. til klima-venlige
        formål, hver gang du handler brugt på Den Grønne Avis
      </p>
    </div>
  );
};
