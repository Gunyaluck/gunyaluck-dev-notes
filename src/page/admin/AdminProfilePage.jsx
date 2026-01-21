import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminProfileForm } from "../../components/admin/profile/AdminProfileForm";

export function AdminProfilePage() {
  return (
    <div className="min-h-screen bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <AdminProfileForm />
      </div>
    </div>
  );
}
