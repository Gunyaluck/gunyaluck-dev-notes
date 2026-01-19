import { useEffect, useState, useMemo } from "react";
import { formatDate } from "../../lib/utils";
import axios from "axios";

export function ArticleCard({ selectedCategory, searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticlesData = async () => {
    setIsLoading(true);

    try {
      const categoryParam = selectedCategory === "All" ? undefined : selectedCategory;

      const response = await axios.get("https://blog-post-project-api.vercel.app/posts",
        {
          params: {
            page: page,
            limit: 6,
            category: categoryParam,
          },
        }
      );
      setArticles(prevArticles => [...prevArticles, ...response.data.posts]);

      if (response.data.currentPage === response.data.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesData();
  }, [page, selectedCategory]);

  useEffect(() => {
    setPage(1);
    setArticles([]);
    setHasMore(true);
  }, [selectedCategory]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
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

  return (
    <div className="w-full mt-6 mb-30 px-4 py-0 flex flex-col gap-12 lg:w-full lg:grid lg:grid-cols-2 lg:gap-6">
      {/* Article Cards */}
      {Array.isArray(filteredArticles) && filteredArticles.length > 0 && filteredArticles.map((article) => (
        <article
          key={article.id}
          className="group w-full bg-white rounded-lg flex flex-col gap-4 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
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
          <div className="flex flex-col gap-4 px-4 pb-4">
            {/* Category Tag */}
            <div className="w-fit">
              <span className="px-3 py-1 rounded-full bg-brand-green-soft body-2-green-600 font-medium transition-colors duration-300 group-hover:bg-brand-green group-hover:text-white">
                {article.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-headline-4 transition-colors duration-300 group-hover:text-brand-green">
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
      ))}

      {/* View More Button */}
      {hasMore && (
        <div className="w-full flex justify-center pt-20 lg:col-span-2">
          <button className="body-1-brown-500 hover:text-brown-600 transition-colors cursor-pointer"
            onClick={handleLoadMore}
            disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25 text-brand-green" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75 text-brand-green" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              </>
            ) : (
              <span className="underline">View more</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

