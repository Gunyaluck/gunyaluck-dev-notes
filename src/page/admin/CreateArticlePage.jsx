import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { ArticleForm } from "../../components/admin/articleManagement/ArticleForm";

export function CreateArticlePage() {
  return (
    <div className="min-h-screen bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <ArticleForm />
      </div>
    </div>
  );
}
