import { Input } from "@/components/Input";
import styles from "./AddressInput.module.scss";

type AddressInputProps = {
  disabled: boolean;
};

export const AddressInput = ({ disabled }: AddressInputProps) => {
  return (
    <div className={styles["address_input"]}>
      <Input name="address.street" disabled={disabled} label="Street" />
      <Input name="address.city" disabled={disabled} label="City" />
      <Input name="address.state" disabled={disabled} label="State" />
      <Input name="address.zip" disabled={disabled} label="Zip" />
    </div>
  );
};
