"use client";
import { AddressInput } from "@/components/AddressInput";
import { Button } from "@/components/Button";
import { DateInput } from "@/components/DateInput";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Textarea } from "@/components/Textarea";
import { Wizard } from "@/components/Wizard";
import { updateUser } from "@/services/users";
import { STEPS } from "@/types/steps.type";
import { UserFormValuesType } from "@/types/user-form-values.type";
import { Form, Formik } from "formik";
import { PropsWithChildren, useState } from "react";
import * as yup from "yup";

type Props = PropsWithChildren & {
  active: boolean;
  initialValues: UserFormValuesType;
  validationSchema: yup.ObjectSchema<
    yup.AnyObject,
    UserFormValuesType,
    yup.AnyObject,
    ""
  >;
  onSubmit: () => void;
  userId: number;
  progress: STEPS;
};

export const UserFormWizardStep = ({
  active,
  initialValues,
  validationSchema,
  onSubmit,
  userId,
  progress,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Wizard.Step active={active}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async ({
          isAbout,
          about,
          isBirthDate,
          birthDate,
          isAddress,
          address,
        }: UserFormValuesType) => {
          setLoading(true);
          setError("");

          try {
            const valuesToSend: Partial<UserFormValuesType> = {};
            if (isAbout) {
              valuesToSend.about = about;
            }
            if (isBirthDate) {
              valuesToSend.birthDate = birthDate;
            }
            if (isAddress) {
              valuesToSend.address = address;
            }

            const response = await updateUser(userId, progress, valuesToSend);
            console.log(response);
            onSubmit();
          } catch (e) {
            console.error(e);
            setError((e as { message: string }).message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values }) => {
          return (
            <Form>
              {values.isAbout && (
                <Textarea disabled={loading} name="about" label="About" />
              )}
              {values.isBirthDate && (
                <DateInput
                  disabled={loading}
                  name="birthDate"
                  label="Birth Date"
                />
              )}
              {values.isAddress && <AddressInput disabled={loading} />}
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Button.Group>
                <Button type="submit" disabled={loading}>
                  Next
                </Button>
              </Button.Group>
            </Form>
          );
        }}
      </Formik>
    </Wizard.Step>
  );
};
