import { useField } from "formik";
import styles from "./Textarea.module.scss";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export const Textarea = ({ className, label, ...props }: TextareaProps) => {
  const [field, meta] = useField({
    name: props.name!,
  });

  const updatedClassName = `${styles.textarea} ${className || ""}`;

  const textarea = (
    <>
      <textarea {...field} {...props} />
    </>
  );

  let wrappedTextarea = textarea;

  if (label) {
    wrappedTextarea = (
      <label>
        <span>{label}</span>
        {textarea}
      </label>
    );
  }

  return (
    <div className={updatedClassName}>
      {wrappedTextarea}
      {meta.error && (
        <span className={styles["textarea-error"]}>{meta.error}</span>
      )}
    </div>
  );
};
