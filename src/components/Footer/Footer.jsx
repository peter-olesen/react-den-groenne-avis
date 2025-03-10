import { Newsletter } from "../Newsletter/Newsletter";
import s from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={s.Footer}>
      <div className={s.FooterContainer}>
        <Newsletter />
        <div>
          <h3>Kontakt</h3>
          <p>Redningen 32</p>
          <p>2210 Vinterby Øster</p>
          <p>+45 88229422</p>
          <p>dga@info.dk</p>
          <p></p>
        </div>
        <div>
          <h3>FN´s Verdensmål</h3>
          <p>
            Vi støtter på organisatorisk plan op om FN´s verdensmål og har
            derfor besluttet at en del af overskuddet går direkte til verdensmål
            nr. 13; Klimahandling
          </p>
          <p>
            <a
              href="https://www.verdensmaalene.dk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Læs mere om verdensmålene her
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
