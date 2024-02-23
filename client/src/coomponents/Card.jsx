const Card = ({ crisis, clientName, counslerName, date, sessionStatus }) => {
  const originalDate = new Date(date);
  const formattedDate = `${originalDate.getDate()}/${
    originalDate.getMonth() + 1
  }/${String(originalDate.getFullYear()).slice(
    2
  )} ${originalDate.getHours()}:${String(originalDate.getMinutes()).padStart(
    2,
    "0"
  )}`;

  return (
    <div className="card">
      <h2>{crisis}</h2>
      <p>Client name: {clientName}</p>
      <p>Consler name: {counslerName}</p>
      <p>{formattedDate}</p>
      <p>Status: {sessionStatus}</p>
    </div>
  );
};
export default Card;
