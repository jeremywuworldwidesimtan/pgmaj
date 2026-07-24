import * as z from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { error: "Username must be at least 2 characters long." })
    .regex(/^[a-zA-Z0-9_]+$/, {
      error: "Username can only contain letters, numbers, and underscores.",
    })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, { error: "Must contain at least one letter." })
    .regex(/[0-9]/, { error: "Must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Must contain at least one special character.",
    })
    .trim(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  confirmPassword: z.string().trim(),
});

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().trim(),
});

export type SignupFormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};
