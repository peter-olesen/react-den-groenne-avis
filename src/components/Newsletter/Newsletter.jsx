import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";

import s from "./Newsletter.module.scss";

export const Newsletter = () => {
  const { userData } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onNewsletterSignup = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("email", data.email);
    urlencoded.append("hasNewsletter", "true");

    const options = {
      method: "PATCH",
      body: urlencoded,
      headers: {
        Authorization: `Bearer ${userData?.data.access_token}`,
      },
    };

    fetch("http://localhost:4242/users", options)
      .then((res) => res.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Der opstod en fejl", error);
      });
  };

  return (
    <div className={s.Newsletter}>
      <h3>Nyhedsbrev</h3>
      <p>
        Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få
        de seneste klima opdateringer direkte i din indbakke
      </p>
      <form
        className={s.NewsletterInputs}
        onSubmit={handleSubmit(onNewsletterSignup)}
      >
        <input
          type="email"
          name="newsletter"
          id="newsletter"
          autoComplete="email"
          {...register("email", {
            required: "Emailen er nødvendig.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Ugyldigt email-format",
            },
          })}
        />

        <input
          type="submit"
          value="Tilmeld"
          disabled={!userData?.data.access_token}
          className={
            !userData?.data.access_token
              ? s.DisabledNewsletterButton
              : s.NewsletterButton
          }
        />
      </form>
    </div>
  );
};
