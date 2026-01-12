import { articles } from "../../data/articles";

export function ArticleCard({ selectedCategory, searchQuery }) {
  // Filter articles based on selected category
  let filteredArticles = selectedCategory === "highlight" 
    ? articles 
    : articles.filter(article => 
        article.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  // Filter by search query (search in title and author)
  if (searchQuery.trim() !== "") {
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return (
    <div className="w-full mt-6 mb-30 px-4 py-0 flex flex-col gap-12 lg:w-full lg:grid lg:grid-cols-2 lg:gap-6">
      {/* Article Cards */}
      {filteredArticles.map((article) => (
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
                <span className="body-2">{article.date}</span>
              </div>
            </div>
          </div>
        </article>
      ))}

      {/* View More Button */}
      <div className="w-full flex justify-center pt-20 lg:col-span-2">
        <button className="body-1-brown-500 hover:text-brown-600 transition-colors underline cursor-pointer">
          View more
        </button>
      </div>
    </div>
  );
}

