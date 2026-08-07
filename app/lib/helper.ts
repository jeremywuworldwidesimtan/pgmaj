import { StatusPrisma } from "../types";
import dayjs from "dayjs";

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
  if (size === "short" || format === "iso") {
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
        /* istanbul ignore next */
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
      /* istanbul ignore next */
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
      /* istanbul ignore next */
      return "text-gray-500";
  }
}

const secondLevelCountryCodeDomains = new Set([
  "ac",
  "co",
  "or",
  "ne",
  "go",
  "com",
  "edu",
  "gov",
  "gob",
  "info",
  "mil",
  "net",
  "org",
]);

export function shortenWebURL(url: string): string {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    const labels = hostname.split(".").filter(Boolean);

    if (labels.length <= 2) {
      return hostname;
    }

    const topLevelDomain = labels.at(-1) ?? ""; // e.g., .com or .uk
    const possibleSecondLevelDomain = labels.at(-2) ?? ""; // e.g., .co.uk or .edu.us
    const domainLabelCount =
      topLevelDomain.length === 2 && // .uk, .ca but not .com, .org, etc.
      secondLevelCountryCodeDomains.has(possibleSecondLevelDomain) // has .com, .org, .co, etc. as second-level domain
        ? 3 // e.g., example.co.uk -> example.co.uk
        : 2; // e.g., example.co -> example.co

    // This can prevent generic .co from being treated as a ccTLD

    return labels.slice(-domainLabelCount).join(".");
  } catch (error) {
    return url;
  }
}

export function getDateDifference(startDate: Date, endDate: Date): string {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const totalYears = end.diff(start, 'year');
  // Subtraction step gets the remaining months after removing full years
  const remainingMonths = end.subtract(totalYears, 'year').diff(start, 'month');

  return `${totalYears} yr, ${remainingMonths} mos`;
}
