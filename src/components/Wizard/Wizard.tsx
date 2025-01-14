import { PropsWithChildren } from "react";
import styles from "./Wizard.module.scss";

type WizardProps = PropsWithChildren;

const Wizard = ({ children }: WizardProps) => {
  return <div className={styles["wizard"]}>{children}</div>;
};

const WizardList = ({ children }: WizardProps) => {
  return <div className={styles["wizard-list"]}>{children}</div>;
};

const WizardListItem = ({
  children,
  active,
}: WizardProps & { active: boolean }) => {
  return (
    <div
      className={`${styles["wizard-list-item"]} ${
        active ? styles["wizard-list-item--active"] : ""
      }`}
    >
      {children}
    </div>
  );
};
WizardList.Item = WizardListItem;

Wizard.List = WizardList;

const WizardStep = ({
  children,
  active,
}: WizardProps & { active: boolean }) => {
  return (
    <div
      className={`${styles["wizard-step"]} ${
        active ? styles["wizard-step--active"] : ""
      }`}
    >
      {children}
    </div>
  );
};

Wizard.Step = WizardStep;

export { Wizard };
