import { useForm } from "react-hook-form";
import { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import { Section } from "../components/Section/Section";
import s from "./styles/CreateAccount.module.scss";
import { NavLink } from "react-router";

export const CreateAccount = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const { setUserData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", data.email);
    urlencoded.append("password", data.password);
    urlencoded.append("firstname", data.firstname);
    urlencoded.append("lastname", data.lastname);
    urlencoded.append("address", data.address);
    urlencoded.append("zipcode", data.zipcode);
    urlencoded.append("city", data.city);

    const options = {
      method: "POST",
      body: urlencoded,
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

  return (
    <Section title="Opret en konto" className={s.CreateAccount}>
      <div>
        {message && <p>{message}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
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
          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            placeholder="Dit password......"
            {...register("password", {
              required: "Koden er nødvendig.",
              minLength: {
                value: 5,
                message: "Adgangskoden skal være mindst 5 tegn lang",
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
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
          {/* City */}
          <label htmlFor="city">By</label>
          <input
            type="text"
            name="city"
            id="city"
            placeholder="Din by......"
            {...register("city", { required: true, maxLength: 100 })}
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
          <p>
            Har du allerede en konto hos os? Klik{" "}
            <NavLink to="/login">her</NavLink> for at vende tilbage til logn
          </p>
          <div className={s.TermsAndSubmit}>
            <div className={s.TermsAndConditions}>
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">
                Jeg har læst og forstået <u>de gældende betingelser</u> for
                oprettelse af kundekonto og brug af denne side
              </label>
            </div>
            <div className={s.SubmitButton}>
              <input type="submit" value="Opret" />
            </div>
          </div>
        </form>
      </div>
    </Section>
  );
};
