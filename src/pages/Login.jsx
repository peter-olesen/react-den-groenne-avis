import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { Section } from "../components/Section/Section";
import s from "./styles/Login.module.scss";

export const Login = () => {
  const [loginMessage, setLoginMessage] = useState("");
  const [error, setError] = useState(null);

  const { setUserData } = useContext(UserContext);

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("username", data.username);
    urlencoded.append("password", data.password);

    const options = {
      method: "POST",
      body: urlencoded,
    };

    fetch("http://localhost:4242/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.access_token) {
          setUserData(data);
          setLoginMessage("Du er nu logget ind");
          navigate("/dashboard");
        } else {
          setLoginMessage("Dit login er forkert");
        }
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setError("Der opstod en fejl. Prøv igen");
      });
  };

  return (
    <>
      <Section title="Velkommen tilbage" className={s.Login}>
        {error && <p>{error}</p>}
        {loginMessage && <p>{loginMessage}</p>}
        {errors.username && <p>{errors.username.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}

        <div>
          <form className={s.FormContainer} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              name="username"
              id="username"
              autoComplete="email"
              placeholder="Din email....."
              {...register("username", {
                required: "Emailen er nødvendig.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ugyldigt e-mailformat",
                },
              })}
            />

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

            <p>
              Har du ikke allerede en konto? Klik{" "}
              <NavLink to="/create-account">her</NavLink> for at gå til sign up
            </p>

            <div className={s.LoginButton}>
              <input type="submit" value="Login" />
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};
