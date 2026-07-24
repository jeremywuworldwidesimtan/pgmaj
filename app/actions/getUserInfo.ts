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
      },
    });

    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
};