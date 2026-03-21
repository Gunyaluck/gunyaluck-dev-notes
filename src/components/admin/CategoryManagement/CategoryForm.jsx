import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";
import { API_BASE_URL } from "@/config/env";

export function CategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  // Fetch category data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchCategory = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${API_BASE_URL}/categories`);
          const raw = response.data;
          const list = Array.isArray(raw)
            ? raw
            : raw?.data ?? raw?.categories ?? [];
          const safeList = Array.isArray(list) ? list : [];
          const category = safeList.find((cat) => cat.id === parseInt(id));
          if (category) {
            setCategoryName(category.name);
          } else {
            toast.error("Category not found");
            navigate("/admin/category-management");
          }
        } catch (error) {
          console.error("Error fetching category:", error);
          toast.error("Failed to load category");
          navigate("/admin/category-management");
        } finally {
          setIsLoading(false);
        }
      };

      fetchCategory();
    }
  }, [id, isEditMode, navigate]);

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required", {
        description: "Please enter a category name",
        duration: 3000,
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        await axios.put(
          `${API_BASE_URL}/categories/${id}`,
          { name: categoryName.trim() },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Category updated", {
          description: "The category has been successfully updated",
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
        setSaving(false);
        return;
      } else {
        // Create new category
        await axios.post(
          `${API_BASE_URL}/categories`,
          { name: categoryName.trim() },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success("Category created", {
          description: "The category has been successfully created",
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
      }
    } catch (error) {
      console.error("Error saving category:", error);
      
      if (error.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(error.response?.data?.message || "Failed to save category");
      }
    } finally {
      setSaving(false);
    }
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
          disabled={saving}
          className="shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {saving ? "Saving..." : "Save"}
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
