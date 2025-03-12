import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useGet } from "../hooks/useGet";
import { UserContext } from "../context/UserContext";
import { Section } from "../components/Section/Section";
import s from "./styles/CreateOffer.module.scss";

export const CreateOffer = () => {
  const [message, setMessage] = useState("");
  const [userError, setUserError] = useState(null);

  const { userData } = useContext(UserContext);

  const {
    data: categories,
    isLoading,
    error,
  } = useGet("http://localhost:4242/categories");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("name", data.titel);
    urlencoded.append("category_id", data.selected_category);
    urlencoded.append("description", data.offer_content);
    urlencoded.append("image", data.url_string || "https://placehold.co/500");
    urlencoded.append("price", data.price);

    console.log(data);

    const options = {
      method: "POST",
      body: urlencoded,
      headers: {
        Authorization: `Bearer ${userData?.data.access_token}`,
      },
    };

    fetch("http://localhost:4242/products", options)
      .then((res) => res.json())
      .then((data) => {
        setMessage("Din annonce er nu oprettet.");
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setUserError("Der opstod en fejl. Prøv igen");
      });
  };

  return (
    <Section title="Opret ny annonce" className={s.CreateOffer}>
      <p>Her kan du oprette en ny annonce.</p>
      <p>
        Du har mulighed for at slette dine annoncer igen under “min konto”
        siden.
      </p>

      <div>
        {message && <p>{message}</p>}
        {userError && <p>{userError}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Titel */}
          <label htmlFor="titel">Titel</label>
          <input
            type="text"
            name="titel"
            id="titel"
            placeholder="Titel på dit produkt........"
            {...register("titel", {
              required: "Du skal tilføje en produkt titel.",
            })}
          />
          {errors.titel && <p>{errors.titel.message}</p>}
          {/* Category */}
          <label htmlFor="category">Kategori</label>
          <select
            name="category"
            id="category"
            onChange={(e) => e.target.value}
            {...register("selected_category")}
          >
            <option>{isLoading ? "loading..." : "vælg kategori"}</option>
            {categories?.data?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {/* Offer content */}
          <label htmlFor="offer">Annonce tekst</label>
          <input
            type="text"
            name="offer"
            id="offer"
            placeholder="Skriv en annonce tekst her der beskriver produktet"
            {...register("offer_content", { required: true })}
          />
          {/* Image URL */}
          <label htmlFor="url">URL til billede</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="Har du et billede som ligger på nettet kan du indsætte en URL her...."
            {...register("url_string", { required: false })}
          />
          {/* Price */}
          <label htmlFor="price">Pris</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="Pris....."
            {...register("price", { required: true, maxLength: 20 })}
          />
          <div className={s.SubmitButton}>
            <input type="submit" value="Opret" />
          </div>
        </form>
      </div>
    </Section>
  );
};
