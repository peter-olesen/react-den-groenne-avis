import { Hero } from "../components/Hero/Hero";
import { Separator } from "../components/Separator/Separator";
import { SelectedProducts } from "../components/SelectedProducts/SelectedProducts";
import { PopularCategories } from "../components/PopularCategories/PopularCategories";
import { Donations } from "../components/Donations/Donations";

export const Home = () => {
  return (
    <>
      <Separator />
      <SelectedProducts />
      <Separator />
      <Hero />
      <Separator />
      <PopularCategories />
      <Donations />
    </>
  );
};
