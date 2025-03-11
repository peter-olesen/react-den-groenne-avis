import { NavLink, useParams } from "react-router";
import { useGet } from "../hooks/useGet";
import { CategoriesSidebar } from "../components/CategoriesSidebar/CategoriesSidebar";
import { Separator } from "../components/Separator/Separator";
import s from "./styles/Categories.module.scss";
import { useEffect } from "react";

export const Categories = () => {
  const { slug } = useParams();

  const {
    data: products,
    isLoading,
    error,
  } = useGet(`http://localhost:4242/products/category/${slug}`);

  useEffect(() => {
    document.title = `${products?.message.category} - Den Grønne Avis`;
  }, [products]);

  return (
    <>
      <Separator />
      <div className={s.Categories}>
        <CategoriesSidebar />
        <div className={s.Products}>
          {products?.message.length > 0 ? (
            <p>Der er ingen produkter i denne kategori.</p>
          ) : (
            products?.data?.map((item) => (
              <NavLink key={item.id} to={`/annonce/${item.slug}`}>
                <div className={s.ProductCard}>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                </div>
              </NavLink>
            ))
          )}
        </div>
      </div>
      <div className={s.Pageination}>
        <span>Forrige side</span>
        <span>side 1 / 3</span>
        <span>Næste side</span>
      </div>
    </>
  );
};
