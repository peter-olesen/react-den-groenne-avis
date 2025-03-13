import { useContext, useState } from "react";

import { UserContext } from "../context/UserContext";
import { Section } from "../components/Section/Section";
import { Switcher } from "../components/Switcher/Switcher";
import { UserSettings } from "../components/UserSettings/UserSettings";
import { UserProducts } from "../components/UserProducts/UserProducts";

export const Dashboard = () => {
  const [showUserProducts, setShowProductsListings] = useState(true);

  const { userData } = useContext(UserContext);

  return (
    <Section>
      <Switcher
        state={showUserProducts}
        stateSetter={setShowProductsListings}
      />

      {showUserProducts ? <UserProducts /> : <UserSettings />}
    </Section>
  );
};
