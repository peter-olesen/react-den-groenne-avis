import { NavLink, useParams } from "react-router";
import { useGet } from "../hooks/useGet";
import { CategoriesSidebar } from "../components/CategoriesSidebar/CategoriesSidebar";
import { Separator } from "../components/Separator/Separator";
import s from "./styles/SingleOffer.module.scss";
import { useEffect } from "react";
import { CommentCard } from "../components/CommentCard/CommentCard";

export const SingleOffer = () => {
  const { slug } = useParams();

  const {
    data: offer,
    isLoading,
    error,
  } = useGet(`http://localhost:4242/products/${slug}`);

  useEffect(() => {
    document.title = `${offer?.data?.name} - Den Grønne Avis`;
  }, [offer]);

  return (
    <>
      <Separator />
      <div className={s.SingleOffer}>
        <CategoriesSidebar />
        <div className={s.Offer}>
          <img src={offer?.data?.image} alt={offer?.data?.name} />
          <h2>{offer?.data?.name}</h2>
          <p>{offer?.data?.description}</p>
          <p>Pris: {offer?.data?.price} kr.</p>

          <div className={s.Comments}>
            <Separator />
            <h3>Kontakt sælger</h3>
            <p>Du skal være logget ind for at kunne kontakte sælgeren.</p>
            {offer?.data?.comments.map((item, index) => (
              <div className={s.CommentSection}>
                <CommentCard
                  key={index}
                  name={item.user.firstname}
                  date={item.createdAt}
                  comment={`${item.comment}`}
                />
                <CommentCard
                  key={index}
                  name={item.user.firstname}
                  date={item.createdAt}
                  comment={`${item.comment}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
