import { useEffect, useState, useMemo } from "react";
import { formatDate } from "../../lib/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ViewMoreButton } from "./ViewMoreButton";

export function ArticleCard({ selectedCategory, searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const navigate = useNavigate();

  const fetchArticlesData = async (pageNum = 1, append = false) => {
    try {
      const categoryParam = selectedCategory === "All" ? undefined : selectedCategory;

      const response = await axios.get("https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: pageNum,
            limit: 6,
            category: categoryParam,
          },
        }
      );
      
      if (append) {
        setArticles(prevArticles => [...prevArticles, ...response.data.posts]);
      } else {
        setArticles(response.data.posts);
        setDisplayCount(6); // Reset display count when fetching new category
      }

      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticlesData(1, false);
    setPage(1);
    setDisplayCount(6);
    setHasMore(true);
  }, [selectedCategory]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const nextPage = page + 1;
    await fetchArticlesData(nextPage, true);
    setPage(nextPage);
    setDisplayCount(prev => prev + 6);
    setIsLoadingMore(false);
  };

  const filteredArticles = useMemo(() => {
    if (!Array.isArray(articles)) return [];

    let filtered = articles;

    // Filter by category - Show all if "All" or "all" is selected
    if (selectedCategory && selectedCategory !== "All") {
      if (selectedCategory === "highlight") {
        filtered = filtered.filter(article => article.category === "Highlight");
      } else {
        filtered = filtered.filter(article => article.category === selectedCategory);
      }
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title?.toLowerCase().includes(query) ||
        article.description?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [articles, selectedCategory, searchQuery]);

  // Show articles based on displayCount
  const displayedArticles = filteredArticles.slice(0, displayCount);

  return (
    <div className="w-full mt-6 mb-30 px-4 py-0 flex flex-col gap-12 lg:w-full lg:grid lg:grid-cols-2 lg:gap-6">
      {/* Article Cards */}
      {Array.isArray(displayedArticles) && displayedArticles.length > 0 && displayedArticles.map((article) => (
        <article
          key={article.id}
          className="group w-full bg-white rounded-lg flex flex-col gap-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
          onClick={() => navigate(`/post/${article.id}`)}
        >
          {/* Article Image */}
          <div className="w-full h-[212px] bg-brown-300 rounded-2xl overflow-hidden lg:h-[360px] group">
            {article.image ? (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="body-1-brown-400">Image placeholder</span>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="flex flex-col gap-4 px-4 pb-4"
            >
            {/* Category Tag */}
            <div className="w-fit">
              <span className="px-3 py-1 rounded-full bg-brand-green-soft body-2-green-600 font-medium transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-headline-4 transition-colors duration-300 group-hover:text-brand-green group-hover:underline cursor-pointer"
            >
              {article.title}
            </h3>

            {/* Description */}
            <p className="body-2 line-clamp-2">
              {article.description}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-2">
              {article.authorAvatar ? (
                <img
                  src={article.authorAvatar}
                  alt={article.author}
                  className="w-8 h-8 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 ring-2 ring-transparent group-hover:ring-brand-green"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brown-300 flex items-center justify-center transition-all duration-300 group-hover:bg-brand-green group-hover:text-white">
                  <span className="body-3">TP</span>
                </div>
              )}
              <div className="flex flex-row gap-4 items-center">
                <span className="body-1-brown-600 transition-colors duration-300 group-hover:text-brand-green">{article.author}</span>
                <span className="w-px h-4 bg-brown-300"></span>
                <span className="body-2">{formatDate(article.date)}</span>
              </div>
            </div>
          </div>
        </article>
      ))
      }

      {/* View More Button */}
      {(hasMore || filteredArticles.length > displayCount) && (
        <ViewMoreButton 
          onLoadMore={handleLoadMore} 
          isLoading={isLoadingMore}
        />
      )}
    </div >
  );
}

