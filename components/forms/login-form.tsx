"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import InputField from "../fields/input-field";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 lg:h-[85vh]">
          <form action={action} className="my-auto p-6 md:p-8">
            <FieldSet>
              <div className="flex flex-col items-start gap-2">
                <FieldLegend>
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                </FieldLegend>
                <FieldDescription className="text-base text-muted-foreground">
                  Login to your PGMAJ account
                </FieldDescription>
              </div>
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
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={
                  state?.errors?.password
                    ? state.errors.password.join(", ")
                    : ""
                }
                required
              />
              <FieldDescription className="font-xs">
                Forgot your password? <Link href="/reset">Reset it</Link>
              </FieldDescription>
              {state?.message && (
                <FieldDescription className="text-destructive">
                  {state.message}
                </FieldDescription>
              )}
              <Button type="submit" disabled={pending}>
                {pending ? "Logging in..." : "Login"}
              </Button>
              <FieldDescription className="font-xs">
                Don&apos;t have an account?{" "}
                <Link href="/register">Sign up</Link>
              </FieldDescription>
              <FieldDescription className="text-xs text-muted-foreground hidden md:block">
                Photo by{" "}
                <Link href="https://unsplash.com/@snapsbyclark?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Clark Van Der Beken
                </Link>{" "}
                on{" "}
                <Link href="https://unsplash.com/photos/an-airplane-is-flying-in-front-of-a-building-y1kOrwA28yc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                  Unsplash
                </Link>
              </FieldDescription>
            </FieldSet>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/scraper.jpg"
              alt="Image"
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover grayscale brightness-50" // tint photo color
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
