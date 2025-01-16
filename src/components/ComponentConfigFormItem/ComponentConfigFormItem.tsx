"use client";

import { Checkbox } from "@/components/Checkbox";
import { Typography } from "@/components/Typography";
import { FieldType } from "@/types/field.type";

type ComponentConfigFormItemProps = {
  allFields: string[];
  step: string;
  fields: FieldType[];
};

export const ComponentConfigFormItem = ({
  allFields,
  step,
  fields,
}: ComponentConfigFormItemProps) => {
  const defaultForThisStep = fields.find(
    (field) => field.defaultForStep === step
  );
  return (
    <>
      <Typography element="h2">Step {step}</Typography>
      <hr />
      <Typography color="primary" element="h3">
        Your configuration
      </Typography>

      {allFields.map((field) => (
        <Checkbox
          key={`component-config-${field}`}
          label={field}
          name={`${field}_${step}`}
        />
      ))}
      <hr />
      <Typography color="primary" element="h3">
        Default field
      </Typography>
      {defaultForThisStep ? (
        defaultForThisStep.component
      ) : (
        <em>no default field for step {step}</em>
      )}
    </>
  );
};
