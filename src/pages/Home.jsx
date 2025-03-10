import s from "./styles/Home.module.scss";
import { Section } from "../components/Section/Section";
import { Hero } from "../components/Hero/Hero";
import { DonationCard } from "../components/DonationCard/DonationCard";

import donation1 from "../assets/images/banner_image2.jpg";
import donation2 from "../assets/images/banner_image3.jpg";
import { Separator } from "../components/Separator/Separator";
import { SelectedProducts } from "../components/SelectedProducts/SelectedProducts";
import { PopularCategories } from "../components/PopularCategories/PopularCategories";

export const Home = () => {
  return (
    <>
      <SelectedProducts />
      <Separator />
      <Hero />
      <Separator />
      <PopularCategories />
      <Separator />
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
