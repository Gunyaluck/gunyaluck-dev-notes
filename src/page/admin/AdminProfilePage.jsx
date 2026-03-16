import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminProfileForm } from "../../components/admin/Profile/AdminProfileForm.jsx";

export function AdminProfilePage() {
  return (
    <div className="w-full h-full bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 py-10 px-15">
        <AdminProfileForm />
      </div>
    </div>
  );
}
