import { useNavigate } from "react-router";
import { useGet } from "../../hooks/useGet";

export const Dropdown = ({ className, name, id, isClickable }) => {
  const {
    data: categories,
    isLoading,
    error,
  } = useGet("http://localhost:4242/categories");

  let navigate = useNavigate();

  const onChange = (e) => {
    navigate(`/kategori/${e}`);
  };

  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className={className}
      name={name}
      id={id}
      value=""
    >
      <option defaultValue>{isLoading ? "loading..." : "vælg kategori"}</option>
      {categories?.data?.map((item) => {
        return (
          <option key={item.id} value={item.slug}>
            {item.name}
          </option>
        );
      })}
    </select>
  );
};
