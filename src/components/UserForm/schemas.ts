import { UserFormSignUpType } from "@/types/user-form-sign-up.type";
import { UserFormValuesType } from "@/types/user-form-values.type";
import { parse } from "date-fns";
import * as yup from "yup";

export const validationSchemaForSignUp = yup
  .object<UserFormSignUpType>()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(4).required(),
  });

export const aboutValidation = yup
  .string()
  .when("isAbout", ([isAbout], schema) => {
    return isAbout ? schema.required() : schema.notRequired();
  });

export const addressValidation = yup
  .string()
  .when("isAddress", ([isAddress], schema) => {
    return isAddress
      ? yup.object({
          street: yup.string().required(),
          city: yup.string().required(),
          state: yup.string().required(),
          zip: yup.string().required(),
        })
      : schema.notRequired();
  });

export const birthDateValidation = yup
  .date()
  .transform(function (value, originalValue) {
    if (this.isType(value)) {
      return value;
    }
    const result = parse(originalValue, "dd.MM.yyyy", new Date());
    return result;
  })
  .when("isBirthDate", ([isBirthDate], schema) => {
    return isBirthDate ? schema.required() : schema.notRequired();
  });

export const validationSchema = yup.object<UserFormValuesType>({
  isAbout: yup.boolean(),
  about: aboutValidation,
  isBirthDate: yup.boolean(),
  birthDate: birthDateValidation,
  isAddress: yup.boolean(),
  address: addressValidation,
});
