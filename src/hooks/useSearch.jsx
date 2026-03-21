import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/config/env";

/**
 * Search articles with debouncing and filtering
 * @param {string} query - Search query
 * @returns {Object} - { results, loading, error }
 */
export function useSearch(query) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset when query is empty
    if (query.trim().length === 0) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchResults = async () => {
        setLoading(true);
        setError(null);
  
        try {
          const response = await axios.get(`${API_BASE_URL}/posts`, {
            params: {
              page: 1,
              limit: 10,
            },
          });
  
          const searchTerm = query.toLowerCase();
          const filtered = response.data.posts.filter((article) => {
            const title = article.title?.toLowerCase() || "";
            const description = article.description?.toLowerCase() || "";
            const content = article.content?.toLowerCase() || "";
  
            return (
              title.includes(searchTerm) ||
              description.includes(searchTerm) ||
              content.includes(searchTerm)
            );
          });
  
          setResults(filtered.slice(0, 6));
        } catch (err) {
          console.error("Error fetching suggestions:", err);
          setError(err.message);
          setResults([]);
        } finally {
          setLoading(false);
        }
      };
  
      fetchResults();
    }, [query]);
  
    return { results, loading, error };
  }