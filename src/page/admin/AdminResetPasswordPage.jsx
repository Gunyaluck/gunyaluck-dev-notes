import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminResetPasswordForm } from "@/components/admin/ResetPassword/AdminResetPasswordForm.jsx";

export function AdminResetPasswordPage() {
  return (
    <div className="w-full h-full bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 py-10 px-15">
        <AdminResetPasswordForm />
      </div>
    </div>
  );
}
