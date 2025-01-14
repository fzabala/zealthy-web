"use client";
import { AddressInput } from "@/components/AddressInput";
import { Button } from "@/components/Button";
import { DateInput } from "@/components/DateInput";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Wizard } from "@/components/Wizard";
import { indexComponentConfigs } from "@/services/component-config";
import { createUser, updateUser } from "@/services/users";
import { ComponentConfigType } from "@/types/component-config.type";
import { STEPS } from "@/types/steps.type";
import { UserType } from "@/types/user.type";
import { parse } from "date-fns";
import { Form, Formik } from "formik";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

type Props = PropsWithChildren;

const validationSchemaForSignUp = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).required(),
});

const aboutValidation = yup.string().required();
const addressValidation = yup
  .object({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
  })
  .required();

const birthDateValidation = yup
  .date()
  .transform(function (value, originalValue) {
    if (this.isType(value)) {
      return value;
    }
    const result = parse(originalValue, "dd.MM.yyyy", new Date());
    return result;
  })
  .required();

const isComponentInStep = (
  componentConfigs: ComponentConfigType[],
  component: string,
  step: string
) => {
  const componentConfig = componentConfigs.find(
    (config) => config.component === component && config.step === step
  );
  return componentConfig !== undefined;
};

export const UserForm = ({}: Props) => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [createdUser, setCreatedUser] = useState<UserType>();
  const [errorStep1, setErrorStep1] = useState("");
  const [errorStep2, setErrorStep2] = useState("");
  const [errorStep3, setErrorStep3] = useState("");

  const [componentConfigs, setComponentConfigs] = useState<
    ComponentConfigType[]
  >([]);

  useEffect(() => {
    setLoading(true);
    indexComponentConfigs()
      .then(({ data }) => {
        setComponentConfigs(data);
        console.log(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        toast.error("Could not load component configs");
      });
  }, []);

  const createValidationSchemaForStep = useCallback(
    (step: "2" | "3") => {
      type ValidationSchemaType = {
        about?: typeof aboutValidation;
        birthDate?: typeof birthDateValidation;
        address?: typeof addressValidation;
      };

      const validationSchema: ValidationSchemaType = {};
      if (isComponentInStep(componentConfigs, "about", step)) {
        validationSchema.about = aboutValidation;
      }
      if (isComponentInStep(componentConfigs, "birthDate", step)) {
        validationSchema.birthDate = birthDateValidation;
      }
      if (isComponentInStep(componentConfigs, "address", step)) {
        validationSchema.address = addressValidation;
      }

      return yup.object().shape(validationSchema);
    },
    [componentConfigs]
  );

  const getInitialValues = useCallback(
    (step: "2" | "3") => {
      type InitialValuesType = {
        about?: string;
        birthDate?: string;
        address?: {
          street: string;
          city: string;
          state: string;
          zip: string;
        };
      };
      const initialValues: InitialValuesType = {};

      if (isComponentInStep(componentConfigs, "about", step)) {
        initialValues.about = "";
      }
      if (isComponentInStep(componentConfigs, "birthDate", step)) {
        initialValues.birthDate = "";
      }
      if (isComponentInStep(componentConfigs, "address", step)) {
        initialValues.address = {
          street: "",
          city: "",
          state: "",
          zip: "",
        };
      }

      return initialValues;
    },
    [componentConfigs]
  );

  return (
    <Wizard>
      <Wizard.List>
        <Wizard.List.Item active={activeStep === 1}>
          Personal Information
        </Wizard.List.Item>
        <Wizard.List.Item active={activeStep === 2}>Step 2</Wizard.List.Item>
        <Wizard.List.Item active={activeStep === 3}>Step 3</Wizard.List.Item>
        <Wizard.List.Item active={activeStep === 4}>Done!</Wizard.List.Item>
      </Wizard.List>
      <Wizard.Step active={activeStep === 1}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchemaForSignUp}
          onSubmit={async ({ email, password }) => {
            setLoading(true);
            setErrorStep1("");

            try {
              const response = await createUser({ email, password });
              const { data: user } = response;
              setCreatedUser(user);
              toast.success("User saved!");
              setActiveStep(activeStep + 1);
            } catch (e) {
              console.error(e);
              setErrorStep1((e as { message: string }).message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <Form>
            <Input disabled={loading} name="email" label="Email" type="email" />
            <Input
              disabled={loading}
              name="password"
              label="Password"
              type="password"
            />
            {errorStep1 && <ErrorMessage>{errorStep1}</ErrorMessage>}
            <Button.Group>
              <Button type="submit" disabled={loading}>
                Next
              </Button>
            </Button.Group>
          </Form>
        </Formik>
      </Wizard.Step>
      <Wizard.Step active={activeStep === 2}>
        <Formik
          initialValues={getInitialValues("2")}
          validationSchema={createValidationSchemaForStep("2")}
          onSubmit={async (values) => {
            setLoading(true);
            setErrorStep2("");

            try {
              const response = await updateUser(
                createdUser!.id,
                STEPS["STEP-3"],
                values
              );
              console.log(response);
              toast.success("User saved!");
              setActiveStep(activeStep + 1);
            } catch (e) {
              console.error(e);
              setErrorStep2((e as { message: string }).message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <Form>
            {isComponentInStep(componentConfigs, "about", "2") && (
              <Textarea disabled={loading} name="about" label="About" />
            )}
            {isComponentInStep(componentConfigs, "birthDate", "2") && (
              <DateInput
                disabled={loading}
                name="birthDate"
                label="Birth Date"
              />
            )}
            {isComponentInStep(componentConfigs, "address", "2") && (
              <AddressInput disabled={loading} />
            )}
            {errorStep2 && <ErrorMessage>{errorStep2}</ErrorMessage>}
            <Button.Group>
              <Button type="submit" disabled={loading}>
                Next
              </Button>
            </Button.Group>
          </Form>
        </Formik>
      </Wizard.Step>
      <Wizard.Step active={activeStep === 3}>
        <Formik
          initialValues={getInitialValues("3")}
          validationSchema={createValidationSchemaForStep("3")}
          onSubmit={async (values) => {
            setLoading(true);
            setErrorStep3("");

            try {
              const response = await updateUser(
                createdUser!.id,
                STEPS["DONE"],
                values
              );
              console.log(response);
              toast.success("User saved!");
              setActiveStep(activeStep + 1);
            } catch (e) {
              console.error(e);
              setErrorStep3((e as { message: string }).message);
            } finally {
              setLoading(false);
            }
          }}
        >
          <Form>
            {isComponentInStep(componentConfigs, "about", "3") && (
              <Textarea disabled={loading} name="about" label="About" />
            )}
            {isComponentInStep(componentConfigs, "birthDate", "3") && (
              <DateInput
                disabled={loading}
                name="birthDate"
                label="Birth Date"
              />
            )}
            {isComponentInStep(componentConfigs, "address", "3") && (
              <AddressInput disabled={loading} />
            )}
            {errorStep3 && <ErrorMessage>{errorStep3}</ErrorMessage>}
            <Button.Group>
              <Button type="submit" disabled={loading}>
                Next
              </Button>
            </Button.Group>
          </Form>
        </Formik>
      </Wizard.Step>
      <Wizard.Step active={activeStep === 4}>
        <Button.Group>
          <Button type="button" onClick={() => setActiveStep(1)}>
            Start again
          </Button>
        </Button.Group>
      </Wizard.Step>
    </Wizard>
  );
};
