import { LoginForm } from "../../components/auth/LoginForm";

export function AdminLoginPage() {
  return (
      <div className="flex flex-col items-center pt-15">
        <LoginForm isAdmin={true} />
      </div>
  );
}
