import { Header } from "../components/Header/Header";
import { Main } from "../components/Main/Main";
import { Outlet } from "react-router";
import { Footer } from "../components/Footer/Footer";

export const Layout = () => {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
};
