import { format } from "date-fns";
import { useField } from "formik";
import DatePicker, { DatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateInput.module.scss";

type DateInputProps = Omit<DatePickerProps, "onChange" | "selected"> & {
  selectsRange?: never;
  selectsMultiple?: never;
  showMonthYearDropdown?: never;
  label?: string;
};

export const DateInput = ({ label, className, ...props }: DateInputProps) => {
  const [field, meta, helpers] = useField(props.name!);

  const updatedClassName = `${styles.datepicker} ${className || ""}`;

  const datepicker = (
    <DatePicker
      {...props}
      dateFormat="YYYY-MM-DD"
      selected={(field.value && new Date(field.value)) || null}
      onChange={(date: Date | null | [Date | null, Date | null]) => {
        helpers.setValue(format(date as Date, "yyyy-MM-dd"));
      }}
      onBlur={field.onBlur}
    />
  );

  let wrappedDatePicker = datepicker;

  if (label) {
    wrappedDatePicker = (
      <label>
        <span>{label}</span>
        {datepicker}
      </label>
    );
  }

  return (
    <div className={updatedClassName}>
      {wrappedDatePicker}
      {meta.error && (
        <span className={styles["datepicker-error"]}>
          {meta.error.toString()}
        </span>
      )}
    </div>
  );
};
