const now = new Date();

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

const day = now.getDate();
const monthIndex = now.getMonth();
const monthName = monthNames[monthIndex];
const year = now.getFullYear();
const hours = now.getHours();
const minutes = now.getMinutes();

export const formattedDate = `${day} ${monthName} ${year}`;
export const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

console.log("Date:", formattedDate);
console.log("Time:", formattedTime);
