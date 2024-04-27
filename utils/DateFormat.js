export const DateFormat = (originalDateString) => {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate = new Date(originalDateString).toLocaleDateString(
    "id-ID",
    options
  );

  const formattedDateArray = formattedDate.split(" ");
  formattedDateArray[2] = formattedDateArray[2].slice(0, 3);

  return formattedDateArray.join(" ");
};

export const TimeFormat = (originalTimeString) => {
  const options = { hour: "numeric", minute: "numeric" };
  const formattedTime = new Date(originalTimeString).toLocaleTimeString(
    "id-ID",
    options
  );
  const formattedTimeCustom = formattedTime.replace(".", ":");
  return formattedTimeCustom;
};
