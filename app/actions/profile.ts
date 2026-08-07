"use server";

import prisma from "@/lib/prisma";
import {
  ProfileEditFormSchema,
  ProfileEditFormState,
} from "../lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifySession } from "../lib/dal";

export async function updateProfile(
  state: ProfileEditFormState,
  formData: FormData,
): Promise<ProfileEditFormState> {
  // Use session-based ID
  const session = await verifySession();

  const validatedFields = ProfileEditFormSchema.safeParse({
    id: session.userId,
    altEmail: formData.get("altEmail") || null,
    bio: formData.get("bio"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    contact_number: formData.get("contact_number"),
    addr_line1: formData.get("addr_line1"),
    addr_line2: formData.get("addr_line2"),
    city: formData.get("city"),
    st: formData.get("st"),
    country: formData.get("country"),
    zip_code: formData.get("zip_code"),
    preferredCurrency: formData.get("preferredCurrency"),
    personal_url: formData.get("personal_url") || null,
    linkedin_url: formData.get("linkedin_url") || null,
    portfolio_url: formData.get("portfolio_url") || null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form fields.",
    };
  }

  const {
    altEmail,
    bio,
    firstName,
    lastName,
    contact_number,
    addr_line1,
    addr_line2,
    city,
    st,
    country,
    zip_code,
    preferredCurrency,
    personal_url,
    linkedin_url,
    portfolio_url,
  } = validatedFields.data;

  // Update the user in the database
  await prisma.user.update({
    where: { id: session.userId },
    data: {
      firstName,
      lastName,
      preferredCurrency,
      userDetails: {
        update: {
          altEmail: altEmail,
          bio: bio,
          contact_number: contact_number,
          addr_line1: addr_line1,
          addr_line2: addr_line2,
          city: city,
          state: st,
          country: country,
          zip_code: zip_code,
          personal_website_url: personal_url,
          linkedin_url: linkedin_url,
          portfolio_url: portfolio_url,
        },
      },
    },
  });

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
}
