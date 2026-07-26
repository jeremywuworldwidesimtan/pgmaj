"use server";

import prisma from "@/lib/prisma";
import {
  ProfileEditFormSchema,
  ProfileEditFormState,
} from "../lib/definitions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(
  state: ProfileEditFormState,
  formData: FormData,
): Promise<ProfileEditFormState> {
    console.log("FormData received in updateProfile:", Object.fromEntries(formData.entries()));
  const validatedFields = ProfileEditFormSchema.safeParse({
    id: formData.get("id"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    contact_number: formData.get("contact_number"),
    addr_line1: formData.get("addr_line1"),
    addr_line2: formData.get("addr_line2"),
    city: formData.get("city"),
    st: formData.get("st"),
    country: formData.get("country"),
    zip_code: formData.get("zip_code"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the form fields.",
    };
  }

  const { id, firstName, lastName, contact_number, addr_line1, addr_line2, city, st, country, zip_code } =
    validatedFields.data;

    console.log("Validated fields:", validatedFields.data);
  // Update the user in the database
  await prisma.user.update({
    where: { id },
    data: {
      firstName,
      lastName,
      userDetails: {
        update: {
          contact_number: contact_number,
          addr_line1: addr_line1,
          addr_line2: addr_line2,
          city: city,
          state: st,
          country: country,
          zip_code: zip_code,
        },
      },
    },
  });

  revalidatePath("/dashboard/profile");
  redirect("/dashboard/profile");
}
