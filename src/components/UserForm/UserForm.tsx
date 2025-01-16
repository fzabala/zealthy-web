"use client";
import { Button } from "@/components/Button";
import {
  validationSchema,
  validationSchemaForSignUp,
} from "@/components/UserForm/schemas";
import { UserFormWizardSignUp } from "@/components/UserFormWizardSignUp";
import { UserFormWizardStep } from "@/components/UserFormWizardStep";
import { Wizard } from "@/components/Wizard";
import { indexComponentConfigs } from "@/services/component-config";
import { ComponentConfigType } from "@/types/component-config.type";
import { STEPS } from "@/types/steps.type";
import { UserFormValuesType } from "@/types/user-form-values.type";
import { UserType } from "@/types/user.type";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheckCircle, FaStar, FaUserAlt } from "react-icons/fa";

type Props = PropsWithChildren;

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

const PROGRESS_MAPPING: Record<string, STEPS> = {
  "2": STEPS["STEP-3"],
  "3": STEPS["DONE"],
};

export const UserForm = ({}: Props) => {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [createdUser, setCreatedUser] = useState<UserType>();

  const [componentConfigs, setComponentConfigs] = useState<
    ComponentConfigType[]
  >([]);

  const getInitialValuesForStep = useCallback(
    (step: string) => {
      const isAbout = isComponentInStep(componentConfigs, "about", step);
      const isBirthDate = isComponentInStep(
        componentConfigs,
        "birthDate",
        step
      );
      const isAddress = isComponentInStep(componentConfigs, "address", step);
      const initialValues: UserFormValuesType = {
        isAbout,
        about: "",
        isBirthDate,
        birthDate: "",
        isAddress,
        address: isAddress
          ? {
              street: "",
              city: "",
              state: "",
              zip: "",
            }
          : "",
      };
      return initialValues;
    },
    [componentConfigs]
  );

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

  const onSignUpSubmitHandler = async (user: UserType) => {
    setCreatedUser(user);
    toast.success("User saved!");
    setActiveStep(activeStep + 1);
  };

  const onSubmitHandler = async () => {
    toast.success("User saved!");
    setActiveStep(activeStep + 1);
  };

  return (
    <Wizard>
      <Wizard.List>
        <Wizard.List.Item icon={<FaUserAlt />} active={activeStep === 1}>
          Personal Information
        </Wizard.List.Item>
        <Wizard.List.Item icon={<FaStar />} active={activeStep === 2}>
          Step 2
        </Wizard.List.Item>
        <Wizard.List.Item icon={<FaStar />} active={activeStep === 3}>
          Step 3
        </Wizard.List.Item>
        <Wizard.List.Item icon={<FaCheckCircle />} active={activeStep === 4}>
          Done!
        </Wizard.List.Item>
      </Wizard.List>
      {activeStep === 1 && (
        <UserFormWizardSignUp
          active
          disabled={loading}
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchemaForSignUp}
          onSubmit={onSignUpSubmitHandler}
        />
      )}
      {activeStep === 2 && (
        <UserFormWizardStep
          progress={PROGRESS_MAPPING[activeStep]}
          userId={createdUser!.id}
          active
          validationSchema={validationSchema}
          initialValues={getInitialValuesForStep(activeStep.toString())}
          onSubmit={onSubmitHandler}
        />
      )}
      {activeStep === 3 && (
        <UserFormWizardStep
          progress={PROGRESS_MAPPING[activeStep]}
          userId={createdUser!.id}
          active
          validationSchema={validationSchema}
          initialValues={getInitialValuesForStep(activeStep.toString())}
          onSubmit={onSubmitHandler}
        />
      )}
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
