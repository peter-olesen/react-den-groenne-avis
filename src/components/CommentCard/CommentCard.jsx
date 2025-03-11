import s from "./CommentCard.module.scss";

export const CommentCard = ({ name, date, comment, isOwner }) => {
  //   const isOwner = () => {
  //     if (data?.user_id === data?.owner.id) {
  //     }
  //   };
  return (
    <div className={s.CommentCard}>
      <p className={s.CommentInfo}>
        {name} d. {date}
      </p>
      <div className={s.CommentBox}>
        <p>{comment}</p>
      </div>
    </div>
  );
};
