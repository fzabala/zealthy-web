import { Table } from "@/components/Table";
import { UserType } from "@/types/user.type";

type UsersTableProps = {
  users: UserType[];
};

export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Email</th>
          <th>About</th>
          <th>BirthDate</th>
          <th>Address</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
        {users.map(
          ({
            id,
            email,
            about,
            birthDate,
            street,
            city,
            state,
            zip,
            progress,
          }) => {
            const address = [street, city, state, zip];

            return (
              <tr key={`user-${id}`}>
                <td>{email}</td>
                <td>{about ?? <em>no about</em>}</td>
                <td>{birthDate ?? <em>no birth date</em>}</td>
                <td>
                  {address.filter((a) => !!a).length > 0 ? (
                    address.join(" ")
                  ) : (
                    <em>no address</em>
                  )}
                </td>
                <td>{progress}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </Table>
  );
};
