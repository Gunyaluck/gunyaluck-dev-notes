import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DeleteArticleModal } from "@/components/admin/ArticleManagement/DeleteArticleModal.jsx";
import axios from "axios";

export function ArticleManagementPage() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);

  // Helper function to get SelectItem className
  const getSelectItemClassName = (value, currentValue) => {
    const baseClass = "bg-white hover:text-brand-green focus:text-brand-green cursor-pointer rounded-md px-3 py-2 transition-all duration-200 [&>span[data-slot=select-item-indicator]]:hidden";
    const selectedClass = value === currentValue ? "text-brown-600 font-semibold" : "";
    return `${baseClass} ${selectedClass}`;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://blog-post-project-api.vercel.app/posts", {
          params: {
            page: 1,
            limit: 100, // Get more articles for management page
          },
        });
        
        // Map articles to include only title, category, and status
        const mappedArticles = response.data.posts.map((article) => ({
          id: article.id,
          title: article.title,
          category: article.category,
          status: article.status || "Published", // Default to Published if status doesn't exist
        }));
        
        setArticles(mappedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || statusFilter === "all" || article.status === statusFilter;
    const matchesCategory = !categoryFilter || categoryFilter === "all" || article.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const displayedArticles = filteredArticles.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, categoryFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (articleToDelete) {
      console.log("Delete article:", articleToDelete.id);
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

      // Remove article from list
      setArticles((prevArticles) => 
        prevArticles.filter((article) => article.id !== articleToDelete.id)
      );

      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setArticleToDelete(null);
  };

  return (
    <div className="w-full h-full bg-brown-100 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 py-8 px-15">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-headline-2 text-brown-600">Article management</h1>
            <Button 
              variant="primary" 
              size="md" 
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => navigate("/admin/create-article")}
            >
              <Plus className="w-5 h-5" />
              Create article
            </Button>
          </div>

          {/* Search and Filter Bar */}
          <div className="h-[48px] flex items-center gap-4 mb-6 rounded-lg relative">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-full text-brown-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Q Search..."
                className="w-[360px] h-12 py-0 pl-12 pr-4 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:ring-2 focus:ring-brand-green focus:border-brand-green transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
              <SelectTrigger className="w-[200px] h-12 rounded-lg border-2 border-brown-300 bg-white body-1-brown-600 cursor-pointer transition-all duration-300 hover:shadow-md focus:border-brand-green active:scale-[0.98]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-white rounded-lg shadow-lg border border-brown-200 mt-2 p-2">
                <SelectItem value="all" className={getSelectItemClassName("all", statusFilter)}>All Status</SelectItem>
                <SelectItem value="Published" className={getSelectItemClassName("Published", statusFilter)}>Published</SelectItem>
                <SelectItem value="Draft" className={getSelectItemClassName("Draft", statusFilter)}>Draft</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
              <SelectTrigger className="w-[200px] h-12 rounded-lg border-2 border-brown-300 bg-white body-1-brown-600 cursor-pointer transition-all duration-300 hover:shadow-md focus:border-brand-green active:scale-[0.98]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent position="popper" className="bg-white rounded-lg shadow-lg border border-brown-200 mt-2 p-2">
                <SelectItem value="all" className={getSelectItemClassName("all", categoryFilter)}>All Category</SelectItem>
                <SelectItem value="Cat" className={getSelectItemClassName("Cat", categoryFilter)}>Cat</SelectItem>
                <SelectItem value="General" className={getSelectItemClassName("General", categoryFilter)}>General</SelectItem>
                <SelectItem value="Inspiration" className={getSelectItemClassName("Inspiration", categoryFilter)}>Inspiration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg border border-brown-300 overflow-hidden shadow-md">
            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <div className="flex flex-col items-center gap-4">
                  <svg className="animate-spin h-10 w-10 text-brand-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="body-1-brown-500">Loading...</span>
                </div>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-brown-300 bg-brown-100">
                    <th className="px-6 py-4 text-left body-1-brown-400 font-semibold">Article title</th>
                    <th className="px-6 py-4 text-left body-1-brown-400 font-semibold">Category</th>
                    <th className="px-6 py-4 text-left body-1-brown-400 font-semibold">Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedArticles.length > 0 ? (
                    displayedArticles.map((article, index) => (
                      <tr 
                        key={article.id} 
                        className={`border-b border-brown-200 hover:bg-brown-100 transition-all duration-300 ${
                          index === displayedArticles.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="px-6 py-5 body-1-brown-600">{article.title}</td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 rounded-full bg-brand-green-soft body-2 text-brand-green font-medium">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-sm"></div>
                            <span className="body-1-brown-600">{article.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => navigate(`/admin/edit-article/${article.id}`)}
                              className="p-2 hover:bg-brand-green-soft rounded-lg transition-all duration-300 hover:scale-110 group cursor-pointer"
                              aria-label="Edit article"
                            >
                              <Edit className="w-5 h-5 text-brown-600 group-hover:text-brand-green transition-colors duration-300" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(article)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110 group cursor-pointer"
                              aria-label="Delete article"
                            >
                              <Trash2 className="w-5 h-5 text-brown-600 group-hover:text-brand-red transition-colors duration-300" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center body-1-brown-400">
                        No articles found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {!isLoading && filteredArticles.length > 0 && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg body-1-brown-600 transition-all duration-300 shadow-sm ${
                    currentPage === page
                      ? "bg-brown-200 text-white shadow-md scale-105"
                      : "bg-white text-brown-600 hover:bg-brown-100 hover:shadow-md hover:scale-105"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}

          {/* Delete Article Modal */}
          <DeleteArticleModal
            isOpen={showDeleteModal}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
          />
      </div>
    </div>
  );
}
