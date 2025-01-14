import { Typography } from "@/components/Typography";
import { UsersTable } from "@/components/UsersTable";
import { indexUsers } from "@/services/users";

export default async function Admin() {
  const { data: users } = await indexUsers();

  return (
    <div className="page">
      <Typography element="h1">Existing users</Typography>

      <UsersTable users={users} />
    </div>
  );
}
