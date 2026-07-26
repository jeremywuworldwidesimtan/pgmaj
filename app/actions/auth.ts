 "use server";
import {
  LoginFormSchema,
  LoginFormState,
  SignupFormSchema,
  SignupFormState,
} from "@/app/lib/definitions";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "../lib/sessions";
import { redirect } from "next/navigation";

export async function signup(
  state: SignupFormState | undefined,
  formData: FormData,
) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion
  const data = {
    username: validatedFields.data.username,
    firstName: validatedFields.data.firstName,
    lastName: validatedFields.data.lastName,
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    confirmPassword: validatedFields.data.confirmPassword,
  };

  // Encrypt the password with bcrypt
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const hashedConfirmPassword = await bcrypt.hash(data.confirmPassword, 10);

  data.password = hashedPassword;
  data.confirmPassword = hashedConfirmPassword;

  if (data.password !== data.confirmPassword) {
    return {
      errors: {
        password: ["Passwords do not match."],
      },
    };
  }

  // Add user to db
  const user = await prisma.user.create({
    data: {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      userDetails: {
        create: {}
      }
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // Create user session
  await createSession(user.id);
  // Redirect user
  redirect("/dashboard");
}

export async function login(
  state: LoginFormState | undefined,
  formData: FormData,
) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion
  const data = {
    email: validatedFields.data.email,
    password: validatedFields.data.password,
  };

  // Get the user from Prisma based on email
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return {
      message: "Invalid email.",
    };
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    return {
      message: "Invalid password.",
    };
  }

  // Create user session
  await createSession(user.id);
  // Redirect user
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
