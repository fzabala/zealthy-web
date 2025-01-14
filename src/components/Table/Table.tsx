import styles from "./Table.module.scss";

type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
export const Table = ({ children, className, ...props }: TableProps) => {
  const updatedClassName = `${styles.table} ${className || ""}`;
  return (
    <table className={updatedClassName} {...props}>
      {children}
    </table>
  );
};
