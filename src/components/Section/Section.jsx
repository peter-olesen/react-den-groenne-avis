import { Separator } from "../Separator/Separator";
import s from "./Section.module.scss";

export const Section = ({ children, className, title }) => {
  return (
    <>
      <Separator />
      <section className={`${s.Section} ${className}`}>
        {title && <h2>{title}</h2>}
        {children}
      </section>
    </>
  );
};
