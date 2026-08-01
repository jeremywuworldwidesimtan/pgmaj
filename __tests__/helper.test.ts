// Test helper functions

import { formatType, parseDate, colorStatus, shortenWebURL } from "@/app/lib/helper";

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

    // ignore all throw error cases for test coverage since the types are designed to prevent invalid inputs
});

describe("colorStatus test", () => {
    test("colorStatus should return correct color classes for each status", () => {
        expect(colorStatus("Applied")).toBe("text-sky-300");
        expect(colorStatus("Shortlisted")).toBe("text-yellow-500");
        expect(colorStatus("Interviewed")).toBe("text-purple-500");
        expect(colorStatus("Offered")).toBe("text-green-500");
        expect(colorStatus("Rejected")).toBe("text-red-500");
    });
});

describe("shortenWebURL test", () => {
    // shortenURL should only return the main domain name, secondary level TLD (e.g., .com, .net) and ccTLD (e.g., .uk, .jp, .ch) and should remove any subdomains (e.g., www, blog, shop), "https://" and any paths or query parameters
    test("shortenWebURL should shorten URLs correctly", () => {
        expect(shortenWebURL("https://www.example.com/path/to/resource")).toBe("example.com");
        expect(shortenWebURL("https://www.example.com/path/to/resource")).not.toBe("example.com/path/to/resource");
        expect(shortenWebURL("https://www.example.com/path/to/resource")).not.toBe("www.example.com/path/to/resource");
        expect(shortenWebURL("https://www.example.com/path/to/resource")).not.toBe("www.example.com");
        expect(shortenWebURL("https://www.example.com/path/to/resource")).not.toBe("https://www.example.com");
    });

    test("shortenWebURL should shorten non .com URLs correctly", () => {
        expect(shortenWebURL("https://www.example.com/path/to/resource")).toBe("example.com");
        expect(shortenWebURL("https://www.example.co/path/to/resource")).toBe("example.co");
        expect(shortenWebURL("https://www.example.org/path/to/resource")).toBe("example.org");
        expect(shortenWebURL("https://www.example.net/path/to/resource")).toBe("example.net");
        expect(shortenWebURL("https://www.example.info/path/to/resource")).toBe("example.info");
        expect(shortenWebURL("https://www.example.google/path/to/resource")).toBe("example.google");
        expect(shortenWebURL("https://www.example.aws/path/to/resource")).toBe("example.aws");
        expect(shortenWebURL("https://www.example.com/path/to/resource")).not.toBe("example.com/path/to/resource");
        expect(shortenWebURL("https://www.example.org/path/to/resource")).not.toBe("example.org/path/to/resource");
        expect(shortenWebURL("https://www.example.com/path/to/resource")).not.toBe("www.example.com/path/to/resource");
        expect(shortenWebURL("https://www.example.net/path/to/resource")).not.toBe("www.example.net/path/to/resource");
        expect(shortenWebURL("https://www.example.info/path/to/resource")).not.toBe("www.example.info");
        expect(shortenWebURL("https://www.example.tesla/path/to/resource")).not.toBe("www.example.tesla");
        expect(shortenWebURL("https://www.example.net/path/to/resource")).not.toBe("https://www.example.net");
    });

    test("shortenWebURL should remove subdomains correctly", () => {
        expect(shortenWebURL("https://en.wikipedia.org/wiki/Papa_Louie")).toBe("wikipedia.org");
        expect(shortenWebURL("https://en.wikipedia.org/wiki/Papa_Louie")).not.toBe("wikipedia.org/wiki/Papa_Louie");
        expect(shortenWebURL("https://en.wikipedia.org/wiki/Papa_Louie")).not.toBe("en.wikipedia.org/wiki/Papa_Louie");
        expect(shortenWebURL("https://en.wikipedia.org/wiki/Papa_Louie")).not.toBe("en.wikipedia.org");
        expect(shortenWebURL("https://en.wikipedia.org/wiki/Papa_Louie")).not.toBe("https://www.wikipedia.org");
        expect(shortenWebURL("https://fliplinestudios.fandom.com/wiki/Trishna")).toBe("fandom.com");
        expect(shortenWebURL("https://fliplinestudios.fandom.co/wiki/Trishna")).toBe("fandom.co");
        expect(shortenWebURL("https://fliplinestudios.fandom.co/wiki/Trishna")).not.toBe("fliplinestudios.fandom.co");
        expect(shortenWebURL("https://fliplinestudios.fandom.com/wiki/Trishna")).not.toBe("fandom.com/wiki/Trishna");
        expect(shortenWebURL("https://fliplinestudios.fandom.com/wiki/Trishna")).not.toBe("fliplinestudios.fandom.com/wiki/Trishna");
        expect(shortenWebURL("https://fliplinestudios.fandom.com/wiki/Trishna")).not.toBe("fliplinestudios.fandom.com");
        expect(shortenWebURL("https://fliplinestudios.fandom.com/wiki/Trishna")).not.toBe("https://fliplinestudios.fandom.com");
    });

    test("shortenWebURL should handle URLs with query parameters correctly", () => {
        expect(shortenWebURL("https://www.example.com/path/to/resource?query=param")).toBe("example.com");
        expect(shortenWebURL("https://www.example.com/path/to/resource?query=param")).not.toBe("example.com/path/to/resource?query=param");
        expect(shortenWebURL("https://www.example.com/path/to/resource?query=param")).not.toBe("www.example.com/path/to/resource?query=param");
        expect(shortenWebURL("https://www.example.com/path/to/resource?query=param")).not.toBe("www.example.com");
        expect(shortenWebURL("https://www.example.com/path/to/resource?query=param")).not.toBe("https://www.example.com");
    });

    test("shortenWebURL should handle URLs with ccTLDs (without gTLD) correctly", () => {
        expect(shortenWebURL("https://www.example.uk/path/to/resource")).toBe("example.uk");
        expect(shortenWebURL("https://www.example.jp/path/to/resource")).toBe("example.jp");
        expect(shortenWebURL("https://www.example.au/path/to/resource")).toBe("example.au");
        expect(shortenWebURL("https://www.example.ch/path/to/resource")).toBe("example.ch");
        expect(shortenWebURL("https://www.example.my/path/to/resource")).toBe("example.my");
        expect(shortenWebURL("https://www.example.gg/path/to/resource")).toBe("example.gg");
        expect(shortenWebURL("https://www.example.uk/path/to/resource")).not.toBe("example.co.uk");
        expect(shortenWebURL("https://www.example.jp/path/to/resource")).not.toBe("example.jp/path/to/resource");
        expect(shortenWebURL("https://www.example.cn/path/to/resource")).not.toBe("www.example.cn/path/to/resource");
        expect(shortenWebURL("https://www.example.me/path/to/resource")).not.toBe("www.example.me");
        expect(shortenWebURL("https://www.example.ai/path/to/resource")).not.toBe("https://www.example.ai");
    });

    test("shortenWebURL should handle URLs with ccTLDs (with gTLD) correctly", () => {
        expect(shortenWebURL("https://www.example.co.uk/path/to/resource")).toBe("example.co.uk");
        expect(shortenWebURL("https://www.example.ac.jp/path/to/resource")).toBe("example.ac.jp");
        expect(shortenWebURL("https://www.example.org.au/path/to/resource")).toBe("example.org.au");
        expect(shortenWebURL("https://www.example.net.ch/path/to/resource")).toBe("example.net.ch");
        expect(shortenWebURL("https://www.example.com.my/path/to/resource")).toBe("example.com.my");
        expect(shortenWebURL("https://www.example.edu.fr/path/to/resource")).not.toBe("example.edu.fr/path/to/resource");
        expect(shortenWebURL("https://www.example.org.sg/path/to/resource")).not.toBe("example.org.sg/path/to/resource");
        expect(shortenWebURL("https://www.example.com.de/path/to/resource")).not.toBe("www.example.com.de/path/to/resource");
        expect(shortenWebURL("https://www.example.net.pl/path/to/resource")).not.toBe("www.example.net.pl");
        expect(shortenWebURL("https://www.example.info.br/path/to/resource")).not.toBe("https://www.example.info.br");
    });

    test("shortenWebURL should shorten shortened URLs properly", () => {
        expect(shortenWebURL("https://t.co/gibberish")).toBe("t.co");
        expect(shortenWebURL("https://youtu.be/dQw4w9WgXcQ")).toBe("youtu.be");
        expect(shortenWebURL("https://lnkd.in/papa1234")).toBe("lnkd.in");
        expect(shortenWebURL("https://bit.ly/bro2345796")).toBe("bit.ly");
        expect(shortenWebURL("https://g.co/bro2345796")).toBe("g.co");
        expect(shortenWebURL("https://youtu.be/dQw4w9WgXcQ")).not.toBe("youtu.be/dQw4w9WgXcQ");
        expect(shortenWebURL("https://youtu.be/dQw4w9WgXcQ")).not.toBe("https://youtu.be/");
    });
});