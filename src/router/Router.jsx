import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";

import { ProtectedRoute } from "./ProtectedRoute";

// Layout
import { Layout } from "../layouts/Layout";

// Pages
import { Home } from "../pages/Home";
import { SingleOffer } from "../pages/SingleOffer";
import { Categories } from "../pages/Categories";
import { CreateOffer } from "../pages/CreateOffer";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { CreateAccount } from "../pages/CreateAccount";
import { PageNotFound } from "../pages/PageNotFound";

export const Router = () => {
  const location = useLocation();

  // Page titles
  useEffect(() => {
    const pageTitles = {
      "/": "Den Grønne Avis",
      "/create-offer": "Opret annonce - Den Grønne Avis",
      "/login": "Login - Den Grønne Avis",
      "/create-account": "Opret en bruger - Den Grønne Avis",
      "/dashboard": "Kontrolpanel - Den Grønne Avis",
    };

    const currentTitle = pageTitles[location.pathname];
    if (currentTitle) {
      document.title = currentTitle;
    } else {
      document.title = "404 - Page Not Found";
    }
  }, [location]);

  return (
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />

        {/* Offer/category routes */}
        <Route path={"/annonce/:slug"} element={<SingleOffer />} />
        <Route path={"/kategori/:slug"} element={<Categories />} />
        <Route path={"/create-offer"} element={<CreateOffer />} />

        {/* User routes */}
        <Route path={"/login"} element={<Login />} />
        <Route path={"/create-account"} element={<CreateAccount />} />
        <Route
          path={"/dashboard"}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path={"/*"} element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
