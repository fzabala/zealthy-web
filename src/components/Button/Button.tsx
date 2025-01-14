import { PropsWithChildren } from "react";
import styles from "./Button.module.scss";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  empty?: boolean;
};

const Button = ({
  children,
  type = "button",
  empty = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${empty ? styles["button--empty"] : ""}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

const ButtonGroup = ({ children }: PropsWithChildren) => {
  return <div className={styles["button-group"]}>{children}</div>;
};

Button.Group = ButtonGroup;

export { Button };
