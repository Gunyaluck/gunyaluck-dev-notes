import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";

export function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(isEditMode);

  // Fetch category data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      // TODO: Fetch category data from API
      // For now, use mock data
      setIsLoading(true);
      setTimeout(() => {
        // Mock category data
        const mockCategory = { id: parseInt(id), name: "Cat" };
        setCategoryName(mockCategory.name);
        setIsLoading(false);
      }, 500);
    }
  }, [id, isEditMode]);

  const handleSave = () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required", {
        description: "Please enter a category name",
        duration: 3000,
      });
      return;
    }

    console.log("Save category:", { id, name: categoryName });
    // TODO: Implement save functionality
    
    const title = isEditMode ? "Category updated" : "Category created";
    const description = isEditMode
      ? "The category has been successfully updated"
      : "The category has been successfully created";

    toast.success(title, {
      description: description,
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

    navigate("/admin/category-management");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-10 w-10 text-brand-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="body-1-brown-500">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-headline-2 text-brown-600">
          {isEditMode ? "Edit category" : "Create category"}
        </h1>
        <Button
          variant="primary"
          size="md"
          onClick={handleSave}
          className="shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          Save
        </Button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-brown-300 p-8 shadow-md">
        <div className="flex flex-col gap-6">
          {/* Category Name */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Category name</label>
            <Input
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-[480px] h-12 border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
