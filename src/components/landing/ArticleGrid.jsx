import { useState } from "react";
import { CategoryTab } from "./CategoryTab";
import { SearchBar } from "./SearchBar";
import { ArticleCard } from "./ArticleCard";

export function ArticleGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <section className="w-full lg:w-full lg:flex lg:flex-col lg:items-center lg:px-30">
      {/* Heading */}
      <h2 className="w-full h-[64px] text-headline-3 flex items-center px-4 lg:px-0 lg:items-start">
        Latest articles
      </h2>

      {/* Search and Filter Section */}
      <div className="w-full bg-brown-200 flex flex-col gap-4 px-4 py-4 lg:h-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-center lg:px-8 lg:py-6 lg:rounded-lg">
        {/* Search Bar - Mobile: Top, Desktop: Right */}
        <SearchBar onSearch={handleSearch} />
        {/* Category Filter - Mobile: Bottom, Desktop: Left */}
        <div className="lg:flex lg:items-center lg:order-1">
          <CategoryTab selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
        </div>
      </div>
      <ArticleCard selectedCategory={selectedCategory} searchQuery={searchQuery} />
    </section>
  );
}
