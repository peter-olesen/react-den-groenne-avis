export const formatDateTime = (isoDateString) => {
  const date = new Date(isoDateString);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return ` d. ${day}/${month}/${year} kl. ${hours}.${minutes}`;
};
