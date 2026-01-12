import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
  import { SelectLabel } from "@radix-ui/react-select";
  import { categories } from "../../data/categories";
  
export function CategoryTab({ selectedCategory, onCategoryChange }) {
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
              <SelectValue className="body-1-brown-500" placeholder="Highlight" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg shadow-lg border border-brown-200 mt-2 p-2">
              <SelectGroup>
                <SelectLabel className="body-1-brown-500 px-3 py-2 font-semibold">Category</SelectLabel>
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
          {categories.map((category) => {
            const isSelected = selectedCategory === category.value;
            return (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                disabled={isSelected}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isSelected
                    ? "body-1-green-600 bg-brown-200"
                    : "body-1-brown-400 bg-transparent hover:bg-brown-300 hover:text-brown-600 cursor-pointer"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </>
    );
  }