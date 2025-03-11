import s from "./Section.module.scss";

export const Section = ({ children, className, title }) => {
  return (
    <section className={`${s.Section} ${className}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};
