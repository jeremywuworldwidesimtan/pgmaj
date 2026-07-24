"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import InputField from "../fields/input-field";
import Link from "next/link";
import { signup } from "@/app/actions/auth";
import { useActionState } from "react";

export function RegisterForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form action={action} className="p-6 md:p-8">
            <FieldSet>
              <div className="flex flex-col items-start gap-2">
                <FieldLegend>
                  <h1 className="text-2xl font-bold">Register Account</h1>
                </FieldLegend>
                <FieldDescription className="text-base text-muted-foreground">
                  Create your PGMAJ account to start managing your job
                  applications
                </FieldDescription>
              </div>
              <FieldGroup>
                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error={
                    state?.errors?.email ? state.errors.email.join(", ") : ""
                  }
                  required
                />
                <InputField
                  id="username"
                  name="username"
                  label="Username"
                  type="text"
                  placeholder="Enter your username"
                  error={
                    state?.errors?.username
                      ? state.errors.username.join(", ")
                      : ""
                  }
                  required
                />
              </FieldGroup>

              <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  placeholder="Enter your first name"
                />
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  placeholder="Enter your last name"
                />
              </FieldGroup>

              <FieldGroup>
                <InputField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  description="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character."
                  error={
                    state?.errors?.password
                      ? state.errors.password.join(", ")
                      : ""
                  }
                  required
                />
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </FieldGroup>
              {state?.message && (
                <FieldDescription className="text-destructive">
                  {state.message}
                </FieldDescription>
              )}
              <Button type="submit" disabled={pending}>
                {pending ? "Registering..." : "Register"}
              </Button>
              <FieldDescription className="font-xs">
                Already have an account? <Link href="/login">Sign in</Link>
              </FieldDescription>
            </FieldSet>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
