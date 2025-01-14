"use client";
import { PropsWithChildren } from "react";
import styles from "./ErrorMessage.module.scss";

type Props = PropsWithChildren;

export const ErrorMessage = ({ children }: Props) => {
  return <div className={styles["error_message"]}>{children}</div>;
};
