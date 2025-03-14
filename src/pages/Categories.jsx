import { NavLink, useParams } from "react-router";
import { useGet } from "../hooks/useGet";
import { CategoriesSidebar } from "../components/CategoriesSidebar/CategoriesSidebar";
import { Separator } from "../components/Separator/Separator";
import s from "./styles/Categories.module.scss";
import { useEffect, useState } from "react";
import { Pagination } from "../components/Pageination/Pagination";

export const Categories = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9);

  const {
    data: products,
    isLoading,
    error,
  } = useGet(`http://localhost:4242/products/category/${slug}`);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = products?.data?.slice(firstPostIndex, lastPostIndex);

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
            currentPosts?.map((item) => (
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
      <Pagination
        totalPosts={products?.data?.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};
