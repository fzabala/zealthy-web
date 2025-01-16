"use client";

import { Button } from "@/components/Button";
import { ComponentConfigFormItem } from "@/components/ComponentConfigFormItem";
import { ErrorMessage } from "@/components/ErrorMessage";
import { saveComponentConfigs } from "@/services/component-config";
import { ComponentConfigType } from "@/types/component-config.type";
import { FieldType } from "@/types/field.type";
import { Form, Formik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import * as yup from "yup";

type ComponentConfigFormProps = {
  componentConfigs: ComponentConfigType[];
  fields: FieldType[];
};

const validationSchema = yup.object({
  about_2: yup.bool().required(),
  birthDate_2: yup.bool().required(),
  address_2: yup.bool().required(),
  about_3: yup.bool().required(),
  birthDate_3: yup.bool().required(),
  address_3: yup.bool().required(),
});

export const ComponentConfigForm = ({
  componentConfigs,
  fields,
}: ComponentConfigFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const allFields = ["about", "address", "birthDate"];

  const initialValues: Record<string, boolean> = {};

  for (const field of allFields) {
    initialValues[`${field}_2`] = componentConfigs.some(
      (componentConfig) =>
        componentConfig.component === field && componentConfig.step === "2"
    );
    initialValues[`${field}_3`] = componentConfigs.some(
      (componentConfig) =>
        componentConfig.component === field && componentConfig.step === "3"
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setLoading(true);
        setError("");

        const configs = Object.keys(values)
          .filter((key) => values[key as keyof typeof values])
          .map((value) => {
            const [component, step] = value.split("_");
            return {
              component,
              step,
            };
          });

        try {
          console.log("saving...");
          const response = await saveComponentConfigs({ configs });
          console.log(response);
          toast.success("Components config updated!");
        } catch (e) {
          console.error(e);
          setError((e as { message: string }).message);
        } finally {
          setLoading(false);
        }
      }}
    >
      <Form>
        <div className="wrapper">
          <div className="wrapper-column">
            <ComponentConfigFormItem
              allFields={allFields}
              fields={fields}
              step="2"
            />
          </div>
          <div className="wrapper-column">
            <ComponentConfigFormItem
              allFields={allFields}
              fields={fields}
              step="3"
            />
          </div>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button.Group>
          <Button type="submit" disabled={loading}>
            Save
          </Button>
        </Button.Group>
      </Form>
    </Formik>
  );
};
