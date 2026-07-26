import prisma from "@/lib/prisma";

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
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};

export const getFullUserInfo = async (userId: string) => {
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
        credits: true,
        userDetails: {
          select: {
            contact_number: true,
            addr_line1: true,
            addr_line2: true,
            city: true,
            state: true,
            country: true,
            zip_code: true,
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