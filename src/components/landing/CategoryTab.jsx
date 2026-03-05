import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectLabel } from "@radix-ui/react-select";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function CategoryTab({ selectedCategory, onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await axios.get(`${API_BASE_URL}/categories`);
        const categoriesData = response.data.map((cat) => ({
          value: cat.name,
          label: cat.name,
        }));
        setCategories([{ value: "All", label: "All" }, ...categoriesData]);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    onCategoryChange(value);
  };

  return (
    <>
      {/* Mobile: Dropdown Select */}
      <div className="w-full h-[76px] flex flex-col gap-2 lg:hidden">
        <label className="body-1-brown-400 font-medium">Category</label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full h-[48px] rounded-lg border-2 border-brown-300 bg-white body-1-brown-500 cursor-pointer transition-all duration-300 hover:shadow-md focus:border-brand-green active:scale-[0.98]">
            <SelectValue
              className="body-1-brown-500"
              placeholder={categoriesLoading ? "Loading..." : "Category"}
            />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-lg shadow-lg border border-brown-200 mt-2 p-2">
            <SelectGroup>
              <SelectLabel className="body-1-brown-500 px-3 py-2 font-semibold">
                Category
              </SelectLabel>
              {categories.map((category) => (
                <SelectItem
                  key={category.value}
                  value={category.value}
                  className="bg-white hover:bg-brand-green-soft hover:text-brand-green focus:bg-brand-green-soft focus:text-brand-green cursor-pointer rounded-md px-3 py-2 transition-all duration-200"
                >
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: Category Tabs */}
      <div className="hidden lg:flex items-center gap-2 rounded-[16px]">
        {categoriesLoading ? (
          <span className="body-1-brown-400">Loading...</span>
        ) : (
          categories.map((category) => {
            const isSelected = selectedCategory === category.value;
            return (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                disabled={isSelected}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isSelected
                    ? "body-1-green-600 bg-brand-green-soft"
                    : "body-1-brown-400 bg-transparent hover:bg-brown-300 hover:text-brown-600 cursor-pointer"
                }`}
              >
                {category.label}
              </button>
            );
          })
        )}
      </div>
    </>
  );
}