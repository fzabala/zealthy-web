import { useField } from "formik";
import { ReactNode } from "react";
import styles from "./Input.module.scss";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  leftDecorator?: ReactNode;
  label?: string;
};

export const Input = ({
  className,
  label,
  leftDecorator,
  ...props
}: InputProps) => {
  const [field, meta] = useField({
    name: props.name!,
    type: props.type,
  });

  const updatedClassName = `${styles.input} ${className || ""} ${
    leftDecorator ? styles["input--with_left_decorator"] : ""
  }`;

  const input = (
    <>
      {leftDecorator ? (
        <span
          className={`${styles["input-decorator"]} ${styles["input-decorator--left"]}`}
        >
          {leftDecorator}
        </span>
      ) : null}
      <input {...field} {...props} />
    </>
  );

  let wrappedInput = input;

  if (label) {
    wrappedInput = (
      <label>
        <span>{label}</span>
        {input}
      </label>
    );
  }

  return (
    <div className={updatedClassName}>
      {wrappedInput}
      {meta.error && (
        <span className={styles["input-error"]}>{meta.error.toString()}</span>
      )}
    </div>
  );
};
