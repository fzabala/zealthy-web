import { ComponentConfigForm } from "@/components/ComponentConfigForm";
import { Typography } from "@/components/Typography";
import { indexComponentConfigs } from "@/services/component-config";
import { indexFields } from "@/services/fields";
import styles from "./page.module.scss";

export default async function Admin() {
  const { data: fields } = await indexFields();
  const { data: componentConfigs } = await indexComponentConfigs();

  return (
    <div className="page">
      <Typography element="h1">Admin</Typography>

      <div className={styles.container}>
        <ComponentConfigForm
          fields={fields}
          componentConfigs={componentConfigs}
        />
      </div>
    </div>
  );
}
