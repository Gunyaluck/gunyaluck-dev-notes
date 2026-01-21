import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { CategoryForm } from "../../components/admin/CategoryManagement/CategoryForm";

export function CreateCategoryPage() {
  return (
    <div className="min-h-screen bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <CategoryForm />
      </div>
    </div>
  );
}
