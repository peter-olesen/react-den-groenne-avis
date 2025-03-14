import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { useGet } from "../hooks/useGet";
import { CategoriesSidebar } from "../components/CategoriesSidebar/CategoriesSidebar";
import { Separator } from "../components/Separator/Separator";
import { formatDateTime } from "../helpers/formatDateTime";
import s from "./styles/SingleOffer.module.scss";

export const SingleOffer = () => {
  const [commentMessage, setCommentMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deleteError, setDeleteError] = useState(null);

  const { slug } = useParams();

  const { userData } = useContext(UserContext);

  const {
    data: offer,
    isLoading,
    error,
  } = useGet(`http://localhost:4242/products/${slug}`);

  const product_id = offer?.data?.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let urlencoded = new URLSearchParams();
    urlencoded.append("comment", data.comment);

    const options = {
      method: "POST",
      body: urlencoded,
      headers: {
        Authorization: `Bearer ${userData?.data.access_token}`,
      },
    };

    fetch(`http://localhost:4242/comment/${product_id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setCommentMessage("Din kommentar er nu tilføjet");
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setDeleteError("Der opstod en fejl. Prøv igen");
      });
  };

  const deleteComment = (id) => {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userData?.data.access_token}`,
      },
    };

    fetch(`http://localhost:4242/comment/${id}`, options)
      .then((res) => res.json())
      .then((data) => {
        setDeleteMessage("Din kommentar er nu slettet.");
      })
      .catch((error) => {
        console.error("Der opstod en fejl", error);
        setDeleteError("Der opstod en fejl. Prøv igen");
      });
  };

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
            <div className={s.ContactSeller}>
              {commentMessage && <p>{commentMessage}</p>}
              {deleteMessage && <p>{deleteMessage}</p>}
              {deleteError && <p>{deleteError}</p>}
              {!userData ? (
                <p>Du skal være logget ind for at kunne kontakte sælgeren.</p>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    placeholder="Skriv en besked til sælger....."
                    {...register("comment", {
                      max: 255,
                      maxLength: 255,
                    })}
                  />
                  <div className={s.SendButton}>
                    <input type="submit" value="send" />
                  </div>
                </form>
              )}
            </div>
            <div className={s.CommentSection}>
              {offer?.data?.comments.map((item) => {
                return (
                  <div key={item.id} className={s.CommentCard}>
                    <p className={s.CommentInfo}>
                      {item.user.firstname}
                      {item.user.id === offer?.data?.owner?.id &&
                        " (sælger):"}{" "}
                      {formatDateTime(item.createdAt)}
                    </p>
                    <div className={s.CommentBox}>
                      <p>{item.comment}</p>
                    </div>
                    {userData?.data?.access_token &&
                    item.user.id === offer?.data?.owner?.id ? (
                      <p
                        className={s.DeleteComment}
                        onClick={() => deleteComment(item.id)}
                      >
                        slet kommentar
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
