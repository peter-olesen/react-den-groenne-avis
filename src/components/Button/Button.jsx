import { useNavigate } from "react-router";

export const Button = ({ className, children }) => {
  let navigate = useNavigate();

  return <button className={className}>{children}</button>;
};
