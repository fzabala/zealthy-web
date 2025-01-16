import { Input } from "@/components/Input";
import styles from "./AddressInput.module.scss";

type AddressInputProps = {
  disabled: boolean;
};

export const AddressInput = ({ disabled }: AddressInputProps) => {
  return (
    <div className={styles["address_input"]}>
      <div className="wrapper">
        <div className="wrapper-column">
          <Input name="address.street" disabled={disabled} label="Street" />
          <Input name="address.city" disabled={disabled} label="City" />
        </div>
        <div className="wrapper-column">
          <Input name="address.state" disabled={disabled} label="State" />
          <Input name="address.zip" disabled={disabled} label="Zip" />
        </div>
      </div>
    </div>
  );
};
