import { NavLink } from "react-router";
import { Dropdown } from "../Dropdown/Dropdown";
import { Button } from "../Button/Button";
import s from "./Header.module.scss";

import notification from "../../assets/icons/icons8-important-mail-30.png";
import info from "../../assets/icons/icons8-info-squared-50.png";
import account from "../../assets/icons/icons8-test-account-30.png";

export const Header = () => {
  return (
    <header className={s.Header}>
      <div className={s.HeaderContainer}>
        <NavLink to="/">
          <div className={s.Logo}>
            <span>Den Grønne</span>
            <span>Avis</span>
          </div>
        </NavLink>
        <div className={s.HeaderRight}>
          <div className={s.DropdownAndButton}>
            <Dropdown
              isClickable={true}
              className={s.HeaderDropdown}
              name="headerDropdown"
              id="headerDropdown"
            />
            <NavLink to="/create-offer">
              <Button className={s.HeaderButton}>opret annonce</Button>
            </NavLink>
          </div>
          <div className={s.HeaderIcons}>
            <img src={notification} alt="" />
            <img src={info} alt="" />
            <NavLink to="/login">
              <img src={account} alt="" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
