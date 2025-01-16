import { PropsWithChildren, ReactNode } from "react";
import styles from "./Wizard.module.scss";

type WizardProps = PropsWithChildren;

const Wizard = ({ children }: WizardProps) => {
  return <div className={styles["wizard"]}>{children}</div>;
};

const WizardList = ({ children }: WizardProps) => {
  return <div className={styles["wizard-list"]}>{children}</div>;
};

type WizardListItemProps = WizardProps & { active: boolean; icon: ReactNode };

const WizardListItem = ({ children, active, icon }: WizardListItemProps) => {
  return (
    <div
      className={`${styles["wizard-list-item"]} ${
        active ? styles["wizard-list-item--active"] : ""
      }`}
    >
      <div className={`${styles["wizard-list-item-icon"]}`}>{icon}</div>
      <div className={`${styles["wizard-list-item-text"]}`}>{children}</div>
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
