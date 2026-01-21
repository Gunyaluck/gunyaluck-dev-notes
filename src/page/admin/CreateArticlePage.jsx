import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ArticleForm } from "@/components/admin/ArticleManagement/ArticleForm.jsx";

export function CreateArticlePage() {
  return (
    <div className="w-full h-full bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 py-10 px-15">
        <ArticleForm />
      </div>
    </div>
  );
}
