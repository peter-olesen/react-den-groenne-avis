import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import s from "./UserSettings.module.scss";
import { UserContext } from "../../context/UserContext";

export const UserSettings = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const { userData } = useContext(UserContext);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("firstname", data.firstname);
    urlencoded.append("lastname", data.lastname);
    urlencoded.append("address", data.address);
    urlencoded.append("zipcode", data.zipcode);
    urlencoded.append("city", data.city);
    urlencoded.append("email", data.email);
    urlencoded.append("hasNewsletter", data.newsletter);
    urlencoded.append("hasNotification", data.notifications);

    console.log(data);

    const options = {
      method: "PATCH",
      body: urlencoded,
      headers: {
        Authorization: `Bearer ${userData?.data.access_token}`,
      },
    };

    fetch("http://localhost:4242/users", options)
      .then((res) => res.json())
      .then((data) => {
        setMessage("Du er nu oprettet på siden.");
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setError("Der opstod en fejl. Prøv igen");
      });
  };

  const delete_profile = () => {
    let confirmation = confirm("Er du sikker på at du vil slette din profil?");
    if (confirmation) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userData?.data.access_token}`,
        },
      };

      fetch("http://localhost:4242/users", options)
        .then((res) => res.json())
        .then((data) => {
          setMessage("Din bruger er nu slettet.");
        })
        .catch((error) => {
          console.error("Der opstod en fejl", error);
          setError("Der opstod en fejl. Prøv igen");
        });

      navigate("/");
    } else {
      return false;
    }
  };
  return (
    <div>
      {message && <p>{message}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className={s.Settings}>
        <div className={s.UserInfo}>
          {/* Firstname */}
          <label htmlFor="firstname">Fornavn</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Dit fornavn......"
            {...register("firstname", { required: true, maxLength: 80 })}
          />
          {/* Lastname */}
          <label htmlFor="lastname">Efternavn</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            autoComplete="family-name"
            placeholder="Dit efternavn......"
            {...register("lastname", { required: true, maxLength: 100 })}
          />
          {/* Address */}
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            id="address"
            autoComplete="address"
            placeholder="Din adresse......"
            {...register("address", { required: true, maxLength: 100 })}
          />
          {/* Zipcode */}
          <label htmlFor="zipcode">Postnummer</label>
          <input
            type="text"
            name="zipcode"
            id="zipcode"
            placeholder="Dit postnummer......"
            {...register("zipcode", { required: true, maxLength: 100 })}
          />
          {/* City */}
          <label htmlFor="city">By</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Din by......"
            {...register("city", { required: true, maxLength: 100 })}
          />
          {/* Email */}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="Din email....."
            {...register("email", {
              required: "Emailen er nødvendig.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Ugyldigt email-format",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className={s.Right}>
          <div className={s.Checkboxes}>
            <label htmlFor="newsletter">
              Jeg ønsker at modtage nyheder om klima-indsatsen, gode tilbud,
              ekslusive deals og lignende promoverings-mails fra den grønne avis
              og samarbejds-parnere?
            </label>
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              {...register("newsletter")}
            />
          </div>
          <div className={s.Checkboxes}>
            <label htmlFor="notifications">
              Jeg ønsker at modtage notifikationer i form af emails når der sker
              en opdatering på en af mine annoncer eller jeg modtager en ny
              henvendelse?
            </label>
            <input
              type="checkbox"
              name="notifications"
              id="notifications"
              {...register("notifications")}
            />
          </div>
          <div className={s.Buttons}>
            <input
              className={s.SaveProfile}
              type="submit"
              value="gem ændringer"
            />
            <input
              className={s.DeleteProfile}
              type="submit"
              value="slet profil"
              onClick={() => delete_profile()}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
