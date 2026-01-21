import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image as ImageIcon, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "../../common/Button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { categories } from "../../../data/categories";
import { DeleteArticleModal } from "./DeleteArticleModal";

export function ArticleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    thumbnail: null,
    category: "",
    authorName: "Thompson P.",
    title: "",
    introduction: "",
    content: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Filter out "All" category for article creation
  const availableCategories = categories.filter((cat) => cat.value !== "All");

  // Fetch article data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchArticle = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${id}`);
          const article = response.data;
          
          setFormData({
            thumbnail: null,
            category: article.category || "",
            authorName: article.author || "Thompson P.",
            title: article.title || "",
            introduction: article.description || "",
            content: article.content || "",
          });

          if (article.image) {
            setThumbnailPreview(article.image);
          }
        } catch (error) {
          console.error("Error fetching article:", error);
          toast.error("Failed to load article");
        } finally {
          setIsLoading(false);
        }
      };

      fetchArticle();
    }
  }, [id, isEditMode]);

  const handleInputChange = (field, value) => {
    if (field === "introduction" && value.length > 120) {
      return; // Prevent exceeding max length
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveDraft = () => {
    console.log("Save as draft:", formData);
    // TODO: Implement save as draft functionality
    
    // Show toast notification
    toast.success("Create article and saved as draft", {
      description: "You can publish article later",
      duration: 5000,
      style: {
        background: "var(--color-brand-green)", // brand-green
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

    // Navigate to ArticleManagementPage
    navigate("/admin/article-management");
  };

  const handleSaveAndPublish = () => {
    console.log("Save and publish:", formData);
    // TODO: Implement save and publish functionality
    
    // Show toast notification
    const title = isEditMode ? "Article updated and published" : "Create article and published";
    const description = isEditMode 
      ? "Your article has been successfully updated and published"
      : "Your article has been successfully published";
    
    toast.success(title, {
      description: description,
      duration: 5000,
      style: {
        background: "var(--color-brand-green)", // brand-green
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

    // Navigate to ArticleManagementPage
    navigate("/admin/article-management");
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Delete article:", id);
    // TODO: Implement delete functionality
    
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
            className="shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            Save as draft
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSaveAndPublish}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {isEditMode ? "Save" : "Save and publish"}
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg border border-brown-300 p-8 shadow-md">
        <div className="flex flex-col gap-6">
          {/* Thumbnail Image */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-600 font-semibold">Thumbnail image</label>
            <div className="flex items-start gap-4">
              <div className="w-[200px] h-[150px] bg-brown-200 rounded-lg border border-brown-300 flex items-center justify-center overflow-hidden shrink-0">
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-brown-400" />
                )}
              </div>
              <div className="flex-1 flex items-start">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="md"
                    type="button"
                    className="shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-2"
                  >
                    <Upload className="w-5 h-5" />
                    Upload thumbnail image
                  </Button>
                </label>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-600 font-semibold">Category</label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger className="w-full h-[48px] rounded-lg border-2 border-brown-300 bg-white body-1-brown-500 cursor-pointer transition-all duration-300 hover:shadow-md focus:border-brand-green active:scale-[0.98]">
                <SelectValue className="body-1-brown-500" placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white rounded-lg shadow-lg border border-brown-200 mt-2 p-2">
                {availableCategories.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="bg-white hover:bg-brand-green-soft hover:text-brand-green focus:bg-brand-green-soft focus:text-brand-green cursor-pointer rounded-md px-3 py-2 transition-all duration-200"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author Name */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-600 font-semibold">Author name</label>
            <Input
              type="text"
              value={formData.authorName}
              readOnly
              className="w-full h-12 border-brown-300 bg-brown-100 body-1-brown-600 text-brown-400 cursor-not-allowed"
            />
          </div>

          {/* Title */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-600 font-semibold">Title</label>
            <Input
              type="text"
              placeholder="Article title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full h-12 border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
            />
          </div>

          {/* Introduction */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-600 font-semibold">
              Introduction (max 120 letters)
            </label>
            <textarea
              placeholder="Introduction"
              value={formData.introduction}
              onChange={(e) => handleInputChange("introduction", e.target.value)}
              maxLength={120}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300 resize-none"
            />
            <div className="flex justify-end">
              <span className={`body-3 ${formData.introduction.length >= 120 ? "text-brand-red" : "text-brown-400"}`}>
                {formData.introduction.length}/120
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-3">
            <label className="body-1-brown-600 font-semibold">Content</label>
            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              rows={12}
              className="w-full px-4 py-3 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300 resize-none"
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
      />
    </div>
  );
}
