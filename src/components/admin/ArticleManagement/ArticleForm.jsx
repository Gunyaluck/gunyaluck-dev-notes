import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DeleteArticleModal } from "./DeleteArticleModal";
import { ThumbnailUpload } from "./ThumbnailUpload";
import { useAuth } from "../../../contexts/authentication";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Status IDs: 1 = draft, 2 = published
const STATUS_DRAFT = 1;
const STATUS_PUBLISHED = 2;

export function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    thumbnail: null,
    category: "",
    authorName: "",
    title: "",
    introduction: "",
    content: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentLikeCount, setCurrentLikeCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await axios.get(`${API_BASE_URL}/categories`);
        const raw = response.data;
        const list = Array.isArray(raw)
          ? raw
          : raw?.data ?? raw?.categories ?? [];
        const safeList = Array.isArray(list) ? list : [];
        const categoriesData = safeList.map((cat) => ({
          id: cat.id,
          value: cat.name,
          label: cat.name,
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
        // Fallback to empty array
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Create category map from fetched categories
  const CATEGORY_MAP = categories.reduce((acc, cat) => {
    acc[cat.value] = cat.id;
    return acc;
  }, {});

  // Initialize authorName from user
  useEffect(() => {
    if (!isEditMode && user?.name) {
      setFormData((prev) => ({
        ...prev,
        authorName: user.name,
      }));
    }
  }, [user, isEditMode]);

  // Fetch article data if in edit mode
  useEffect(() => {
    if (isEditMode && id && categories.length > 0) {
      const fetchArticle = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
          setIsLoading(true);
          const response = await axios.get(`${API_BASE_URL}/posts/admin/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const article = response.data;

          // Find category name from category_id
          const category = categories.find(
            (cat) => cat.id === article.category_id
          );
          const categoryName = category?.value || "";

          setFormData({
            thumbnail: null,
            category: categoryName,
            authorName: article.author_name || "",
            title: article.title || "",
            introduction: article.description || "",
            content: article.content || "",
          });

          // Store like_count for update
          setCurrentLikeCount(article.likes_count || article.like_count || 0);

          if (article.image) {
            setThumbnailPreview(article.image);
          }
        } catch (error) {
          console.error("Error fetching article:", error);
          if (error.response?.status === 401) {
            toast.error("Authentication required. Please login again.");
            localStorage.removeItem("token");
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
          } else {
            toast.error(error.response?.data?.message || "Failed to load article");
          }
        } finally {
          setIsLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id, isEditMode, categories]);

  const handleInputChange = (field, value) => {
    if (field === "introduction" && value.length > 120) {
      return; // Prevent exceeding max length
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailChange = (file, preview) => {
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    setThumbnailPreview(preview);
  };

  const handleSaveDraft = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    const categoryId = CATEGORY_MAP[formData.category];
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    // Validate required fields
    if (!formData.title || !formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.introduction || !formData.introduction.trim()) {
      toast.error("Please enter an introduction");
      return;
    }

    if (!formData.content || !formData.content.trim()) {
      toast.error("Please enter content");
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        // Check if user uploaded a new thumbnail
        if (formData.thumbnail && typeof formData.thumbnail === 'object' && formData.thumbnail instanceof File) {
          // Upload new image using FormData
          const formDataToSend = new FormData();
          formDataToSend.append("imageFile", formData.thumbnail);
          formDataToSend.append("title", formData.title);
          formDataToSend.append("category_id", categoryId.toString());
          formDataToSend.append("description", formData.introduction);
          formDataToSend.append("content", formData.content);
          formDataToSend.append("status_id", STATUS_DRAFT.toString());
          formDataToSend.append("like_count", currentLikeCount.toString());

          // Try to use PUT endpoint with FormData (if backend supports it)
          try {
            await axios.put(
              `${API_BASE_URL}/posts/${id}`,
              formDataToSend,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } catch (uploadError) {
            // If PUT doesn't support FormData, show clear error message
            console.error("Error uploading new thumbnail:", uploadError);
            console.error("Upload error response:", uploadError.response?.data);

            if (uploadError.response?.status === 401) {
              toast.error("Authentication required. Please login again.");
              localStorage.removeItem("token");
              setTimeout(() => {
                window.location.href = "/login";
              }, 2000);
              setSaving(false);
              return;
            }

            // Backend doesn't support FormData in PUT endpoint
            toast.error("Changing thumbnail in edit mode is not supported. Please use the existing thumbnail or contact support to enable image upload in update mode.", {
              duration: 7000,
            });
            setSaving(false);
            return;
          }
        } else {
          // Use existing thumbnail URL
          let imageUrl = thumbnailPreview || "";

          if (thumbnailPreview && !thumbnailPreview.startsWith('http://') && !thumbnailPreview.startsWith('https://')) {
            toast.error("Please use a valid image URL for the thumbnail");
            setSaving(false);
            return;
          }

          await axios.put(
            `${API_BASE_URL}/posts/${id}`,
            {
              title: formData.title,
              image: imageUrl,
              category_id: categoryId,
              description: formData.introduction,
              content: formData.content,
              status_id: STATUS_DRAFT,
              like_count: currentLikeCount,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }
        toast.success("Article updated and saved as draft", {
          description: "You can publish article later",
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
      } else {
        if (!formData.thumbnail) {
          toast.error("Please upload a thumbnail image");
          setSaving(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("imageFile", formData.thumbnail);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category_id", categoryId.toString());
        formDataToSend.append("description", formData.introduction);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("status_id", STATUS_DRAFT.toString());

        // เพิ่ม user_id ของคนที่สร้างบทความ
        if (user?.id) {
          formDataToSend.append("user_id", user.id.toString());
        } else if (user?.user_id) {
          formDataToSend.append("user_id", user.user_id.toString());
        }

        await axios.post(`${API_BASE_URL}/posts`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Create article and saved as draft", {
          description: "You can publish article later",
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
      }
      navigate("/admin/article-management");
    } catch (error) {
      console.error("Error saving draft:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);

      // Handle authentication errors
      if (error.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        setSaving(false);
        return;
      }

      // Show more detailed error message
      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || "Failed to save article";

      toast.error(errorMessage, {
        description: error.response?.status === 500
          ? "Server error. Please check console for details."
          : "Please check your input and try again.",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAndPublish = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please login again.");
      return;
    }

    const categoryId = CATEGORY_MAP[formData.category];
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    // Validate required fields
    if (!formData.title || !formData.title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!formData.introduction || !formData.introduction.trim()) {
      toast.error("Please enter an introduction");
      return;
    }

    if (!formData.content || !formData.content.trim()) {
      toast.error("Please enter content");
      return;
    }

    setSaving(true);
    try {
      if (isEditMode) {
        // Check if user uploaded a new thumbnail
        if (formData.thumbnail && typeof formData.thumbnail === 'object' && formData.thumbnail instanceof File) {
          // Upload new image using FormData
          const formDataToSend = new FormData();
          formDataToSend.append("imageFile", formData.thumbnail);
          formDataToSend.append("title", formData.title);
          formDataToSend.append("category_id", categoryId.toString());
          formDataToSend.append("description", formData.introduction);
          formDataToSend.append("content", formData.content);
          formDataToSend.append("status_id", STATUS_PUBLISHED.toString());
          formDataToSend.append("like_count", currentLikeCount.toString());

          try {
            await axios.put(
              `${API_BASE_URL}/posts/${id}`,
              formDataToSend,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          } catch (uploadError) {
            if (uploadError.response?.status === 401) {
              toast.error("Authentication required. Please login again.");
              localStorage.removeItem("token");
              setTimeout(() => {
                window.location.href = "/login";
              }, 2000);
              setSaving(false);
              return;
            }

            // Backend doesn't support FormData in PUT endpoint
            toast.error("Changing thumbnail in edit mode is not supported. Please use the existing thumbnail or contact support to enable image upload in update mode.", {
              duration: 7000,
            });
            setSaving(false);
            return;
          }
        } else {
          // Use existing thumbnail URL
          let imageUrl = thumbnailPreview || "";

          if (thumbnailPreview && !thumbnailPreview.startsWith('http://') && !thumbnailPreview.startsWith('https://')) {
            toast.error("Please use a valid image URL for the thumbnail");
            setSaving(false);
            return;
          }

          await axios.put(
            `${API_BASE_URL}/posts/${id}`,
            {
              title: formData.title,
              image: imageUrl,
              category_id: categoryId,
              description: formData.introduction,
              content: formData.content,
              status_id: STATUS_PUBLISHED,
              like_count: currentLikeCount,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        const title = "Article updated and published";
        const description = "Your article has been successfully updated and published";
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
      } else {
        if (!formData.thumbnail) {
          toast.error("Please upload a thumbnail image");
          setSaving(false);
          return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("imageFile", formData.thumbnail);
        formDataToSend.append("title", formData.title);
        formDataToSend.append("category_id", categoryId.toString());
        formDataToSend.append("description", formData.introduction);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("status_id", STATUS_PUBLISHED.toString());

        // เพิ่ม user_id ของคนที่สร้างบทความ
        if (user?.id) {
          formDataToSend.append("user_id", user.id.toString());
        } else if (user?.user_id) {
          formDataToSend.append("user_id", user.user_id.toString());
        }

        await axios.post(`${API_BASE_URL}/posts`, formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Create article and published", {
          description: "Your article has been successfully published",
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
      }
      navigate("/admin/article-management");
    } catch (error) {
      // Handle authentication errors
      if (error.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        setSaving(false);
        return;
      }

      // Show more detailed error message
      const errorMessage = error.response?.data?.message
        || error.response?.data?.error
        || error.message
        || "Failed to save article";

      toast.error(errorMessage, {
        description: error.response?.status === 500
          ? "Server error. Please check console for details."
          : "Please check your input and try again.",
        duration: 5000,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required. Please login again.");
      setShowDeleteModal(false);
      return;
    }

    setDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Article deleted", {
        description: "The article has been successfully deleted",
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

      setShowDeleteModal(false);
      navigate("/admin/article-management");
    } catch (error) {
      console.error("Error deleting article:", error);

      if (error.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(error.response?.data?.message || "Failed to delete article");
      }

      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
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
        <h1 className="text-headline-2 text-brown-600">{isEditMode ? "Edit article" : "Create article"}</h1>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleSaveDraft}
            disabled={saving}
            className="shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {saving ? "Saving..." : "Save as draft"}
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSaveAndPublish}
            disabled={saving}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {saving ? "Saving..." : isEditMode ? "Save" : "Save and publish"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-brown-300 p-8 shadow-md">
        <div className="flex flex-col gap-6">
          {/* Thumbnail Image */}
          <ThumbnailUpload
            thumbnailPreview={thumbnailPreview}
            onThumbnailChange={handleThumbnailChange}
          />

          {/* Category */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Category</label>
            {categoriesLoading ? (
              <div className="w-[480px] h-[48px] rounded-lg border border-brown-300 bg-brown-100 flex items-center justify-center">
                <span className="body-1-brown-400">Loading categories...</span>
              </div>
            ) : (
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="w-[480px] h-[48px] rounded-lg border border-brown-300 bg-white body-1-brown-600 cursor-pointer transition-all duration-300 hover:shadow-md focus:border-brand-green focus:ring-1 focus:ring-brand-green active:scale-[0.98]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-lg shadow-lg mt-2 p-2">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.value}
                      className="bg-white hover:text-brand-green focus:text-brand-green cursor-pointer rounded-md px-3 py-2 transition-all duration-200 body-1-brown-400"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {/* Author Name */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Author name</label>
            <Input
              type="text"
              value={formData.authorName}
              readOnly
              className="w-full h-12 border border-brown-300 bg-brown-100 body-1-brown-600 text-brown-400 cursor-not-allowed focus:ring-0"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Title</label>
            <Input
              type="text"
              placeholder="Article title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full h-12 border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
            />
          </div>

          {/* Introduction */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">
              Introduction (max 120 letters)
            </label>
            <textarea
              placeholder="Introduction"
              value={formData.introduction}
              onChange={(e) => handleInputChange("introduction", e.target.value)}
              maxLength={120}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all duration-300 resize-none"
            />
            <div className="flex justify-end">
              <span className={`body-3 ${formData.introduction.length >= 120 ? "text-brand-red" : "text-brown-400"}`}>
                {formData.introduction.length}/120
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-400 font-semibold">Content</label>
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              rows={12}
              className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-1 focus:ring-brand-green focus:border-brand-green transition-all duration-300 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Delete Article Button - Only show in edit mode */}
      {isEditMode && (
        <div className="flex items-start">
          <Button
            variant="outline"
            size="md"
            onClick={handleDeleteClick}
            className="shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-2 text-brand-red hover:text-brand-red hover:bg-red-50 border-brand-red"
          >
            <Trash2 className="w-5 h-5" />
            Delete article
          </Button>
        </div>
      )}

      {/* Delete Article Modal */}
      <DeleteArticleModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isLoading={deleting}
      />
    </div>
  );
}
