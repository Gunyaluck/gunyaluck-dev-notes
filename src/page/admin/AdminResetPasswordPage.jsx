import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminResetPasswordForm } from "../../components/admin/ResetPassword/AdminResetPasswordForm";

export function AdminResetPasswordPage() {
  return (
    <div className="min-h-screen bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <AdminResetPasswordForm />
      </div>
    </div>
  );
}
