import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  FieldDescription,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import InputField from "../fields/input-field";
import Link from "next/link";

export function LoginForm() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
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
                required
              />
              <InputField
                id="password"
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                required
              />
              <FieldDescription className="font-xs">
                Forgot your password? <Link href="/reset">Reset it</Link>
              </FieldDescription>
              <Button type="submit">Login</Button>
              <FieldDescription className="font-xs">
                Don&apos;t have an account? <Link href="/register">Sign up</Link>
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
