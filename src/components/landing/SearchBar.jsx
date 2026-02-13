import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useSearch } from "../../hooks/useSearch";
import { useDebounce } from "../../hooks/useDebounce";

export function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const { results: suggestions } = useSearch(debouncedSearchQuery);
  
  const handleClickOutside = useCallback(() => {
    setShowSuggestions(false);
  }, []);
  
  useClickOutside([searchRef, suggestionsRef], handleClickOutside);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery, suggestions.length]);


  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleSuggestionClick = (articleId) => {
    setShowSuggestions(false);
    setSearchQuery("");
    navigate(`/post/${articleId}`);
  };

  // Highlight search query in title
  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-white text-brand-green px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full lg:w-auto lg:flex-1 lg:max-w-sm lg:order-2">
      <div className="relative" ref={searchRef}>
      <Input
        type="text"
        placeholder="Search"
        className="w-full h-12 px-4 pr-12 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:outline-none focus:border-brown-500 focus:ring-2 focus:ring-brown-200"
        value={searchQuery}
        onChange={handleSearch}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-brown-300 shadow-xl z-50 max-h-[480px] overflow-y-auto"
          >
            {suggestions.map((article) => (
              <button
                key={article.id}
                onClick={() => handleSuggestionClick(article.id)}
                className="w-full px-4 py-3 text-left hover:bg-brown-100 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-brown-200 last:border-b-0 group flex flex-col gap-1.5"
              >
                {/* Category Tag */}
                {article.category && (
                  <div className="w-fit">
                    <span className="px-2 py-0.5 rounded-full bg-brand-green-soft body-3 text-brand-green font-medium">
                      {article.category}
                    </span>
                  </div>
                )}

                {/* Title */}
                <h3 className="text-headline-4 text-brown-600 group-hover:text-brand-green transition-colors line-clamp-1">
                  {highlightText(article.title, searchQuery)}
                </h3>

                {/* Description */}
                {article.description && (
                  <p className="body-2 text-brown-400 line-clamp-2">
                    {article.description}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
    </div>
  </div>
  );
}