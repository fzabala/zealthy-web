import { useField } from "formik";
import styles from "./Checkbox.module.scss";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Checkbox = ({ className, label, ...props }: CheckboxProps) => {
  const [field, meta] = useField({
    name: props.name!,
    type: "checkbox",
  });

  const updatedClassName = `${styles.checkbox} ${className || ""}`;

  const input = (
    <>
      <input {...field} {...props} type="checkbox" />
    </>
  );

  const wrappedInput = (
    <label>
      {input}
      <span>{label}</span>
    </label>
  );

  return (
    <div className={updatedClassName}>
      {wrappedInput}
      {meta.error && (
        <span className={styles["input-error"]}>{meta.error.toString()}</span>
      )}
    </div>
  );
};
