import { StatusPrisma } from "../types";

export function formatType(type: string): string {
  switch (type) {
    case "FullTime":
      return "Full-Time";
    case "PartTime":
      return "Part-Time";
    case "OnSite":
      return "On-Site";
    default:
      return type;
  }
}

type DateFormat = "american" | "british" | "iso";
type DateSize = "short" | "medium" | "long";
type DateSeparator = "slash" | "dash" | "dot";
export function parseDate(
  date: Date,
  format: DateFormat,
  size: DateSize,
  separator: DateSeparator,
): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let formattedDay = "";
  let monthName = "";
  if (size === "long") {
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
    monthName = monthNames[month - 1];
    formattedDay = day.toString(); // remove trailing zeros
  } else if (size === "medium") {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    monthName = monthNames[month - 1];
    formattedDay = day.toString(); // remove trailing zeros
  } else {
    monthName = month.toString().padStart(2, "0");
    formattedDay = day.toString().padStart(2, "0");
  }

  let sep = " ";
  if (size === "short") {
    switch (separator) {
      case "slash":
        sep = "/";
        break;
      case "dash":
        sep = "-";
        break;
      case "dot":
        sep = ".";
        break;
      default:
        throw new Error(`Invalid date separator: ${separator}`);
    }
  }

  switch (format) {
    case "american":
      if (size === "long" || size === "medium") {
        return `${monthName} ${formattedDay}, ${year}`;
      } else {
        return `${monthName}${sep}${formattedDay}${sep}${year}`;
      }
    case "british":
      if (size === "long" || size === "medium") {
        return `${formattedDay} ${monthName} ${year}`;
      } else {
        return `${formattedDay}${sep}${monthName}${sep}${year}`;
      }
    case "iso":
      return `${year}${sep}${month.toString().padStart(2, "0")}${sep}${day.toString().padStart(2, "0")}`;
    default:
      throw new Error(`Invalid date format: ${format}`);
  }
}

export function colorStatus(status: StatusPrisma): string {
  switch (status) {
    case "Applied":
      return "text-sky-300";
    case "Shortlisted":
      return "text-yellow-500";
    case "Interviewed":
      return "text-purple-500";
    case "Offered":
      return "text-green-500";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

export function shortenWebURL(url: string): string {
  const formatted = url;
  return `${formatted.split("/")[2].replace("www.", "").split(".").slice(-2)[0]}.${formatted.split("/")[2].replace("www.", "").split(".").slice(-2)[1]}`;
}
