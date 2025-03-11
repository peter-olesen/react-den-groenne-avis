import { NavLink } from "react-router";
import { useGet } from "../../hooks/useGet";
import { Section } from "../Section/Section";
import s from "./PopularCategories.module.scss";

export const PopularCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useGet("http://localhost:4242/categories");

  return (
    <Section title="Populære Kategorier">
      <div className={s.PopularCategories}>
        {categories?.data
          .sort(() => Math.random() - 0.5)
          .slice(0, 6)
          .map((item) => {
            return (
              <NavLink key={item.id} to={`/kategori/${item.slug}`}>
                <div
                  className={s.CategoryCard}
                  style={{ backgroundImage: `url(${item.category_image})` }}
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
