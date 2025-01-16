"use client";
import { Button } from "@/components/Button";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Input } from "@/components/Input";
import { Wizard } from "@/components/Wizard";
import { createUser } from "@/services/users";
import { UserFormSignUpType } from "@/types/user-form-sign-up.type";
import { UserType } from "@/types/user.type";
import { Form, Formik } from "formik";
import { PropsWithChildren, useState } from "react";
import * as yup from "yup";

type Props = PropsWithChildren & {
  active: boolean;
  initialValues: UserFormSignUpType;
  validationSchema: yup.ObjectSchema<
    yup.AnyObject,
    UserFormSignUpType,
    yup.AnyObject,
    ""
  >;
  onSubmit: (values: UserType) => void;
  disabled?: boolean;
};

export const UserFormWizardSignUp = ({
  active,
  initialValues,
  validationSchema,
  onSubmit,
  disabled = false,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <Wizard.Step active={active}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          setError("");

          try {
            const response = await createUser(values);
            const { data: user } = response;
            onSubmit(user);
          } catch (e) {
            console.error(e);
            setError((e as { message: string }).message);
          } finally {
            setLoading(false);
          }
        }}
      >
        <Form>
          <Input
            disabled={loading || disabled}
            name="email"
            label="Email"
            type="email"
          />
          <Input
            disabled={loading || disabled}
            name="password"
            label="Password"
            type="password"
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button.Group>
            <Button type="submit" disabled={loading}>
              Next
            </Button>
          </Button.Group>
        </Form>
      </Formik>
    </Wizard.Step>
  );
};
