import { createElement, PropsWithChildren } from "react";
import styles from "./Typography.module.scss";

type ElementType = "h1" | "h2" | "h3" | "p" | "span";

type Props = PropsWithChildren & {
  element?: ElementType;
  className?: string;
  small?: boolean;
  center?: boolean;
  color?: "default" | "alt" | "primary" | "warning" | "danger";
};
export const Typography = ({
  children,
  element = "p",
  className,
  color = "default",
  small = false,
  center = false,
}: Props) => {
  const updatedClassName = `${styles.typography} ${
    styles[`typography-${element}`]
  } ${className || ""} ${styles[`typography-color--${color}`]} ${
    small ? styles["typography--small"] : null
  } ${center ? styles["typography--center"] : null}`;

  const el = createElement(
    element,
    {
      className: updatedClassName,
    },
    children
  );
  return el;
};
