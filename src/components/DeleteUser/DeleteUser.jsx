import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import s from "./DeleteUser.module.scss";

export const DeleteUser = () => {
  const { userData, setUserData } = useContext(UserContext);

  let navigate = useNavigate();

  const delete_profile = () => {
    let confirmation = confirm("Er du sikker på at du vil slette din profil?");
    if (!confirmation) return;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userData?.data.access_token}`,
      },
    };

    fetch("http://localhost:4242/users", options)
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.removeItem("userData");
        setUserData(null);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
      });
  };
  return (
    <input
      className={s.DeleteProfile}
      type="submit"
      value="slet profil"
      onClick={() => delete_profile()}
    />
  );
};
