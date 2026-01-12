import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";

export function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full lg:w-auto lg:flex-1 lg:max-w-sm lg:order-2">
    <div className="relative">
      <Input
        type="text"
        placeholder="Search"
        className="w-full h-12 px-4 pr-12 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:outline-none focus:border-brown-500 focus:ring-2 focus:ring-brown-200"
        value={searchQuery}
        onChange={handleSearch}
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />
    </div>
  </div>
  );
}