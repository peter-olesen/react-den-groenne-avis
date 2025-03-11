import { NavLink } from "react-router";
import { useGet } from "../../hooks/useGet";
import { Section } from "../Section/Section";
import s from "./SelectedProducts.module.scss";

export const SelectedProducts = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useGet("http://localhost:4242/products");

  return (
    <Section title="Udvalgte Produkter">
      <div className={s.SelectedProducts}>
        {products?.data
          .sort(() => Math.random() - 0.5)
          .slice(0, 6)
          .map((item) => {
            return (
              <NavLink key={item.id} to={`/annonce/${item.slug}`}>
                <div
                  className={s.ProductCard}
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <p>{item.name}</p>
                </div>
              </NavLink>
            );
          })}
      </div>
    </Section>
  );
};
