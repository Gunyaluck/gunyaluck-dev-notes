import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { CategoryForm } from "../../components/admin/CategoryManagement/CategoryForm.jsx";

export function CreateCategoryPage() {
  return (
    <div className="w-full h-full bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 py-10 px-15">
        <CategoryForm />
      </div>
    </div>
  );
}
