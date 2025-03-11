import s from "./Button.module.scss";
export const Button = ({ className, children }) => {
  return <button className={`${s.Button} ${className}`}>{children}</button>;
};
