import prisma from "@/lib/prisma";

export type FullUserInfo = {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  preferredCurrency: string | null;
  userDetails: {
    alt_email: string | null;
    bio: string | null;
    contact_number: string | null;
    addr_line1: string | null;
    addr_line2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zip_code: string | null;
    personal_website_url: string | null;
    linkedin_url: string | null;
    portfolio_url: string | null;
  } | null;
};

export const getUser = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        credits: true,
        preferredCurrency: true
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};

export const getFullUserInfo = async (userId: string): Promise<FullUserInfo | null> => {
  console.log(`Fetching full user info for userId: ${userId}`);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        preferredCurrency: true,
        userDetails: {
          select: {
            alt_email: true,
            bio: true,
            contact_number: true,
            addr_line1: true,
            addr_line2: true,
            city: true,
            state: true,
            country: true,
            zip_code: true,
            personal_website_url: true,
            linkedin_url: true,
            portfolio_url: true,
          },
        }, // Include userDetails in the result
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user: ", error);
    return null;
  }
};