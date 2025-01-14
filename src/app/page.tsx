import { Typography } from "@/components/Typography";
import { UserForm } from "@/components/UserForm";

export default function Home() {
  return (
    <div className="page">
      <Typography element="h1">User onboarding</Typography>

      <UserForm />
    </div>
  );
}
