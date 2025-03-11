import { useEffect } from "react";
import { useParams } from "react-router";
import { useGet } from "../hooks/useGet";
import { CategoriesSidebar } from "../components/CategoriesSidebar/CategoriesSidebar";
import { Separator } from "../components/Separator/Separator";
import { formatDateTime } from "../helpers/formatDateTime";
import s from "./styles/SingleOffer.module.scss";

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
            <div className={s.CommentSection}>
              {offer?.data?.comments.map((item) => {
                const isOwner = item.user.id === offer.data.owner.user_id;
                return (
                  <>
                    <div key={item.id} className={s.CommentCard}>
                      <p className={s.CommentInfo}>
                        {item.user.firstname} {isOwner ? "(sælger):" : ""}
                        {formatDateTime(item.createdAt)}
                      </p>
                      <div className={s.CommentBox}>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                    <div key="id" className={s.CommentCard}>
                      <p className={s.CommentInfo}>
                        {item.user.firstname} d. {item.createdAt}
                      </p>
                      <div className={s.CommentBox}>
                        <p>{item.comment}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
