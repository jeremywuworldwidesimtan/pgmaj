"use client";

import { useActionState } from "react";
import InputField from "../fields/input-field";
import { Button } from "../ui/button";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "../ui/field";
import { ProfileEditFormState } from "@/app/lib/definitions";
import { updateProfile } from "@/app/actions/profile";
import TextareaField from "../fields/textarea-field";

export type ProfileEditFormProps = {
  initialValues?: {
    email: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    preferredCurrency: string | null;
    userDetails: {
      altEmail: string | null;
      bio: string | null;
      state: string | null;
      contact_number: string | null;
      addr_line1: string | null;
      addr_line2: string | null;
      city: string | null;
      country: string | null;
      zip_code: string | null;
      personal_website_url: string | null;
      linkedin_url: string | null;
      portfolio_url: string | null;
    } | null;
  } | null;
};

const initialState: ProfileEditFormState = undefined;

export default function ProfileEditForm({
  initialValues,
}: ProfileEditFormProps) {
  const [state, action, pending] = useActionState(updateProfile, initialState);
  return (
    <form action={action} className="flex flex-col lg:w-3xl">
      <FieldSet>
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            id="username"
            name="username"
            label="Username"
            type="text"
            value={initialValues?.username ?? ""}
            description="Your unique username. This cannot be changed."
            disabled
          />
          <InputField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={initialValues?.email ?? ""}
            description="Your email address. This cannot be changed."
            disabled
          />
          <InputField
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            value={initialValues?.firstName ?? ""}
            error={
              state?.errors?.firstName ? state.errors.firstName.join(", ") : ""
            }
            description="Your first name."
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            value={initialValues?.lastName ?? ""}
            error={
              state?.errors?.lastName ? state.errors.lastName.join(", ") : ""
            }
            description="Your last name."
          />
        </FieldGroup>
        <FieldGroup>
            <InputField
              id="preferredCurrency"
              name="preferredCurrency"
              label="Preferred Currency"
              type="text"
              value={initialValues?.preferredCurrency ?? "$"}
              error={
                state?.errors?.preferredCurrency
                  ? state.errors.preferredCurrency.join(", ")
                  : ""
              }
              description="Your preferred currency."
            />
            <TextareaField
              id="bio"
              name="bio"
              label="Bio"
              value={initialValues?.userDetails?.bio ?? ""}
              error={
                state?.errors?.bio ? state.errors.bio.join(", ") : ""
              }
              description="A short bio about yourself."
            />
        </FieldGroup>
      </FieldSet>
      <FieldSet className="mt-6">
        <FieldLegend>Contact Information</FieldLegend>
        <FieldDescription>
          Contact and address information for personal reference. This
          information is not shared publicly.
        </FieldDescription>
        <FieldGroup>
          <InputField
            id="contact_number"
            name="contact_number"
            label="Contact Number"
            type="text"
            value={initialValues?.userDetails?.contact_number ?? ""}
            error={
              state?.errors?.contact_number
                ? state.errors.contact_number.join(", ")
                : ""
            }
            description="Your contact number."
          />
          <InputField
            id="altEmail"
            name="altEmail"
            label="Alternate Email"
            type="email"
            value={initialValues?.userDetails?.altEmail ?? ""}
            error={
              state?.errors?.altEmail
                ? state.errors.altEmail.join(", ")
                : ""
            }
            description="Your alternate email address (if you prefer to use one other than the account email)."
          />
        </FieldGroup>
        <FieldGroup className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InputField
            id="addr_line1"
            name="addr_line1"
            label="Address Line 1"
            type="text"
            value={initialValues?.userDetails?.addr_line1 ?? ""}
            error={
              state?.errors?.addr_line1
                ? state.errors.addr_line1.join(", ")
                : ""
            }
            description="Your address line 1."
          />
          <InputField
            id="addr_line2"
            name="addr_line2"
            label="Address Line 2"
            type="text"
            value={initialValues?.userDetails?.addr_line2 ?? ""}
            error={
              state?.errors?.addr_line2
                ? state.errors.addr_line2.join(", ")
                : ""
            }
            description="Your address line 2 (optional)."
          />
          <InputField
            id="city"
            name="city"
            label="City/Suburb"
            type="text"
            value={initialValues?.userDetails?.city ?? ""}
            error={
              state?.errors?.city ? state.errors.city.join(", ") : ""
            }
            description="Your city or suburb."
          />
          <InputField
            id="st"
            name="st"
            label="State/Province"
            type="text"
            value={initialValues?.userDetails?.state ?? ""}
            error={
              state?.errors?.st ? state.errors.st.join(", ") : ""
            }
            description="Your state or province."
          />
          <InputField
            id="zip_code"
            name="zip_code"
            label="Post/Zip Code"
            type="text"
            value={initialValues?.userDetails?.zip_code ?? ""}
            error={
              state?.errors?.zip_code
                ? state.errors.zip_code.join(", ")
                : ""
            }
            description="Your postal or zip code."
          />
          <InputField
            id="country"
            name="country"
            label="Country"
            type="text"
            value={initialValues?.userDetails?.country ?? ""}
            error={
              state?.errors?.country
                ? state.errors.country.join(", ")
                : ""
            }
            description="Your country."
          />
        </FieldGroup>
      </FieldSet>
      <FieldSet className="mt-6">
        <FieldLegend>Website & Links Information</FieldLegend>
        <FieldDescription>
          Personal website and social media links for personal reference. This
          information is not shared publicly.
        </FieldDescription>
        <FieldGroup>
          <InputField
            id="personal_url"
            name="personal_url"
            label="Personal Website"
            type="url"
            value={initialValues?.userDetails?.personal_website_url ?? ""}
            error={
              state?.errors?.personal_url
                ? state.errors.personal_url.join(", ")
                : ""
            }
            description="Your personal website (optional)."
          />
          <InputField
            id="linkedin_url"
            name="linkedin_url"
            label="LinkedIn Profile"
            type="url"
            value={initialValues?.userDetails?.linkedin_url ?? ""}
            error={
              state?.errors?.linkedin_url
                ? state.errors.linkedin_url.join(", ")
                : ""
            }
            description="Your LinkedIn profile (optional)."
          />
          <InputField
            id="portfolio_url"
            name="portfolio_url"
            label="Portfolio"
            type="url"
            value={initialValues?.userDetails?.portfolio_url ?? ""}
            error={
              state?.errors?.portfolio_url
                ? state.errors.portfolio_url.join(", ")
                : ""
            }
            description="Your portfolio website (optional)."
          />
        </FieldGroup>
      </FieldSet>
      {state?.message && (
        <FieldDescription className="text-destructive mt-4">{state.message}</FieldDescription>
      )}
      <Button type="submit" className="mt-4" disabled={pending}>
        {pending ? "Saving Changes..." : "Save Changes"}
      </Button>
    </form>
  );
}
