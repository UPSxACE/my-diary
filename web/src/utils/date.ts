export function toEnglishMonth(monthNumber: number) {
  switch (monthNumber) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "?";
  }
}

export function toDateDMYString(date: Date) {
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = toEnglishMonth(date.getUTCMonth());
  const year = date.getUTCFullYear();
  return `${day} ${month}, ${year}`;
}

export function to12HourTimeString(date: Date) {
  let hours: number | string = date.getUTCHours();
  let minutes: number | string = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}
