import s from "./Switcher.module.scss";

export const Switcher = ({ state, stateSetter }) => {
  const toggleShowUserSettings = () => {
    stateSetter((prev) => !prev);
  };

  const toggleShowUserListings = () => {
    stateSetter((prev) => !prev);
  };

  return (
    <div className={s.Switcher}>
      <div
        className={!state ? s.IsSelected : s.IsNotSelected}
        onClick={toggleShowUserSettings}
      >
        <p>Min Profil</p>
      </div>
      <div
        className={state ? s.IsSelected : s.IsNotSelected}
        onClick={toggleShowUserListings}
      >
        <p>Mine Annoncer</p>
      </div>
    </div>
  );
};
