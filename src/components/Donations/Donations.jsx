import { Section } from "../Section/Section";
import { DonationCard } from "../DonationCard/DonationCard";
import s from "./Donations.module.scss";

import donation1 from "../../assets/images/compressed/banner_image2.jpg";
import donation2 from "../../assets/images/compressed/banner_image3.jpg";

export const Donations = () => {
  return (
    <>
      <Section className={s.Donations}>
        <DonationCard
          bgSrc={donation1}
          title="Donationer til Dato"
          text="Sammen med dig har vi siden starten indsamlet:"
          total="452.231,50 kr"
          thanks="Tak fordi du handler brugt, med omtanke for klimaet"
        />
        <DonationCard
          bgSrc={donation2}
          title="Donationer i år"
          text="Sammen med dig har vi i år indsamlet:"
          total="112.452,75 kr"
          thanks="Tak fordi du handler brugt, med omtanke for jorden"
        />
      </Section>
    </>
  );
};
