import s from "./Hero.module.scss";

export const Hero = () => {
  return (
    <div className={s.Hero}>
      <p>Den Grønne Avis</p>
      <p>
        Vi går forest i kampen om klimaet ved at give 2 kr. til <br />{" "}
        klima-venlige formål, hver gang du handler brugt på Den Grønne Avis
      </p>
    </div>
  );
};
