const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getLatestDateTime(now) {
  if (!(now instanceof Date)) {
    throw new Error("Invalid input: Argument must be a Date object.");
  }

  const day = now.getDate();
  const monthIndex = now.getMonth();
  const monthName = monthNames[monthIndex];
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedDate = `${day} ${monthName} ${year}`;
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  console.log("Date:", formattedDate);
  console.log("Time:", formattedTime);
  return { formattedTime, formattedDate };
}
