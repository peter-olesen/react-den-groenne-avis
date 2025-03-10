import s from "./Newsletter.module.scss";
// Need to change to use react-hook-form and have regex validation for email
export const Newsletter = () => {
  return (
    <div className={s.Newsletter}>
      <h3>Nyhedsbrev</h3>
      <p>
        Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få
        de seneste klima opdateringer direkte i din indbakke
      </p>
      <div className={s.NewsletterInputs}>
        <input type="email" name="newsletter" id="newsletter" />
        <input type="submit" value="Tilmeld" />
      </div>
    </div>
  );
};
