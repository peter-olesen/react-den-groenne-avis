import { useContext } from "react";
import { useGet } from "../../hooks/useGet";
import { UserContext } from "../../context/UserContext";
import { UserProductCard } from "../UserProductCard/UserProductCard";
import s from "./UserProducts.module.scss";

export const UserProducts = () => {
  const { userData } = useContext(UserContext);

  const {
    data: products,
    isLoading,
    error,
  } = useGet("http://localhost:4242/users", userData?.data.access_token);

  const userProducts = products?.data?.products || [];

  return (
    <div>
      {userProducts?.length > 0 ? (
        userProducts?.map((item) => (
          <UserProductCard
            key={item.id}
            title={item.name}
            price={item.price}
            image={item.image}
            description={item.description}
            productSlug={item.slug}
            productId={item.id}
          />
        ))
      ) : (
        <p>Du har ingen aktive annoncer.</p>
      )}
    </div>
  );
};
