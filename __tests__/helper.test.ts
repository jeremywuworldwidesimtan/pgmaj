// Test helper functions

import { formatType, parseDate, shortenWebURL } from "@/app/lib/helper";

describe("formatType test", () => {
    test("formatType should format job types correctly", () => {
        expect(formatType("FullTime")).toBe("Full-Time");
        expect(formatType("PartTime")).toBe("Part-Time");
        expect(formatType("OnSite")).toBe("On-Site");
        expect(formatType("internship")).toBe("internship");
        expect(formatType("contract")).toBe("contract");
        expect(formatType("Full_Time")).toBe("Full_Time");
        expect(formatType("remote")).not.toBe("Remote");
        expect(formatType("Part_Time")).not.toBe("Part-Time");
    });
});

describe("parseDate test", () => {
    test("parseDate should format dates correctly", () => {
        expect(parseDate(new Date("2023-01-15"), "american", "short", "slash")).toBe("01/15/2023");
        expect(parseDate(new Date("2019-06-07"), "british", "short", "dot")).toBe("07.06.2019");
        expect(parseDate(new Date("1991-04-20"), "iso", "short", "dash")).toBe("1991-04-20");
    });

    test("parseDate ISO should ignore long and medium options while still follow separator options", () => {
        expect(parseDate(new Date("1969-04-20"), "iso", "short", "dash")).toBe("1969-04-20");
        expect(parseDate(new Date("1969-04-20"), "iso", "medium", "dot")).toBe("1969.04.20");
        expect(parseDate(new Date("1969-04-20"), "iso", "medium", "dot")).not.toBe("1969.Apr.20");
        expect(parseDate(new Date("1969-04-20"), "iso", "long", "slash")).toBe("1969/04/20");
        expect(parseDate(new Date("1969-04-20"), "iso", "long", "slash")).not.toBe("1969/April/20");
    });

    test("parseDate medium and long options should ignore separator and still format dates correctly", () => {
        expect(parseDate(new Date("2025-08-10"), "american", "medium", "slash")).toBe("Aug 10, 2025");
        expect(parseDate(new Date("2004-12-15"), "british", "long", "dot")).toBe("15 December 2004");
        expect(parseDate(new Date("2004-12-15"), "british", "long", "dot")).not.toBe("15.December.2004");
        expect(parseDate(new Date("2000-01-01"), "american", "long", "dash")).toBe("January 1, 2000");
        expect(parseDate(new Date("2000-01-01"), "american", "long", "dash")).not.toBe("January-1-2000");
        expect(parseDate(new Date("1922-09-24"), "british", "medium", "slash")).toBe("24 Sep 1922");
        expect(parseDate(new Date("1922-09-24"), "british", "medium", "slash")).not.toBe("24-Sep-1922");
    });

    test("parseDate short option should add trailing zero while medium and long options should not", () => {
        expect(parseDate(new Date("2007-11-04"), "american", "short", "dot")).toBe("11.04.2007");
        expect(parseDate(new Date("2007-11-04"), "american", "short", "dot")).not.toBe("11.4.2007");
        expect(parseDate(new Date("2012-01-02"), "british", "short", "slash")).toBe("02/01/2012");
        expect(parseDate(new Date("2012-01-02"), "british", "short", "slash")).not.toBe("2/1/2012");
        expect(parseDate(new Date("2012-01-02"), "british", "short", "slash")).not.toBe("2/01/2012");
        expect(parseDate(new Date("2012-01-02"), "british", "short", "slash")).not.toBe("02/1/2012");
        expect(parseDate(new Date("2001-05-24"), "iso", "short", "dash")).toBe("2001-05-24");
        expect(parseDate(new Date("2001-05-24"), "iso", "short", "dash")).not.toBe("2001-5-24");
        expect(parseDate(new Date("2004-05-09"), "iso", "short", "dash")).toBe("2004-05-09");
        expect(parseDate(new Date("2004-05-09"), "iso", "short", "dash")).not.toBe("2004-5-9");
        expect(parseDate(new Date("1976-10-08"), "british", "long", "slash")).toBe("8 October 1976");
        expect(parseDate(new Date("1976-10-08"), "british", "long", "slash")).not.toBe("08 October 1976");
        expect(parseDate(new Date("2002-02-02"), "american", "medium", "slash")).toBe("Feb 2, 2002");
        expect(parseDate(new Date("2002-02-02"), "american", "medium", "slash")).not.toBe("Feb 02, 2002");
    });
});