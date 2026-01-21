import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/ui/input";
import { DeleteCategoryModal } from "../../components/admin/CategoryManagement/DeleteCategoryModal.jsx";

// Mock categories data
const mockCategories = [
  { id: 1, name: "Cat" },
  { id: 2, name: "General" },
  { id: 3, name: "Inspiration" },
  { id: 4, name: "Highlight" },
];

export function CategoryManagementPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const filteredCategories = categories.filter((category) => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      console.log("Delete category:", categoryToDelete.id);
      // TODO: Implement delete functionality
      
      toast.success("Category deleted", {
        description: "The category has been successfully deleted",
        duration: 5000,
        style: {
          background: "var(--color-brand-green)",
          color: "white",
          borderRadius: "8px",
          border: "none",
          width: "700px",
          maxWidth: "700px",
        },
        classNames: {
          toast: "draft-success-toast",
          title: "text-headline-4 font-semibold text-white",
          description: "body-2 text-white",
          closeButton: "text-white hover:text-brown-100",
        },
      });

      // Remove category from list
      setCategories((prevCategories) => 
        prevCategories.filter((category) => category.id !== categoryToDelete.id)
      );

      setShowDeleteModal(false);
      setCategoryToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="w-full h-full bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 py-10 px-15">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-headline-2 text-brown-600">Category management</h1>
          <Button 
            variant="primary" 
            size="md" 
            className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate("/admin/create-category")}
          >
            <Plus className="w-5 h-5" />
            Create category
          </Button>
        </div>

        {/* Search Bar */}
        <div className="w-[360px] h-[48px] flex items-center gap-4 mb-6 rounded-lg relative">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="Q Search..."
              className="w-full h-12 pl-12 pr-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-brown-300 overflow-hidden shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brown-300 bg-brown-100">
                <th className="px-6 py-4 text-left body-1-brown-600 font-semibold">Category name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <tr 
                    key={category.id} 
                    className={`border-b border-brown-200 hover:bg-brown-100 transition-all duration-300 ${
                      index === filteredCategories.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-5 body-1-brown-600">{category.name}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => navigate(`/admin/edit-category/${category.id}`)}
                          className="p-2 hover:bg-brand-green-soft rounded-lg transition-all duration-300 hover:scale-110 group cursor-pointer"
                          aria-label="Edit category"
                        >
                          <Edit className="w-5 h-5 text-brown-600 group-hover:text-brand-green transition-colors duration-300" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(category)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110 group cursor-pointer"
                          aria-label="Delete category"
                        >
                          <Trash2 className="w-5 h-5 text-brown-600 group-hover:text-brand-red transition-colors duration-300" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-12 text-center body-1-brown-400">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Category Modal */}
        <DeleteCategoryModal
          isOpen={showDeleteModal}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
}
