import { NavLink } from "react-router";
import { useGet } from "../../hooks/useGet";
import s from "./CategoriesSidebar.module.scss";

export const CategoriesSidebar = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useGet("http://localhost:4242/categories");

  return (
    <div className={s.CategoriesSidebar}>
      <p>Alle kategorier</p>

      {isLoading && <p>Loading categories...</p>}
      {error && <p>Something went wrong.</p>}

      {!isLoading &&
        categories?.data?.map((item) => (
          <p key={item.name} className={s.CategoriesList}>
            <NavLink
              to={`/kategori/${item.slug}`}
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
              })}
            >
              {item.name}
            </NavLink>
          </p>
        ))}
    </div>
  );
};
