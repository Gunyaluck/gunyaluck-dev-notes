import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import { Input } from "../../components/ui/input";

function CategoryFilterSelect() {
  return (
    <>
      {/* Mobile: Dropdown Select */}
      <div className="w-[343px] h-[76px] flex flex-col gap-2 lg:hidden">
        <label className="body-1-brown-400">Category</label>
        <Select defaultValue="highlight">
          <SelectTrigger className="w-full h-[48px] rounded-lg border border-brown-300 bg-white body-1-brown-500 cursor-pointer">
            <SelectValue className="body-1-brown-400" placeholder="Highlight" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel className="body-1-brown-500">Category</SelectLabel>
              <SelectItem
                value="highlight"
                className="bg-white hover:bg-brown-100 focus:bg-brown-100 cursor-pointer"
              >
                Highlight
              </SelectItem>
              <SelectItem
                value="cat"
                className="bg-white hover:bg-brown-100 focus:bg-brown-100 cursor-pointer"
              >
                Cat
              </SelectItem>
              <SelectItem
                value="inspiration"
                className="bg-white hover:bg-brown-100 focus:bg-brown-100 cursor-pointer"
              >
                Inspiration
              </SelectItem>
              <SelectItem
                  value="general"
                className="bg-white hover:bg-brown-100 focus:bg-brown-100 cursor-pointer"
              >
                General
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop: Category Tabs */}
      <div className="hidden lg:flex items-center gap-2 rounded-[16px]">
        <button className="px-4 py-2 rounded-lg body-1-brown-400 bg-transparent hover:bg-brown-300 hover:text-brown-600 transition-colors cursor-pointer">
          Highlight
        </button>
        <button className="px-4 py-2 rounded-lg body-1-brown-400 bg-transparent hover:bg-brown-300 hover:text-brown-600 transition-colors cursor-pointer">
          Cat
        </button>
        <button className="px-4 py-2 rounded-lg body-1-brown-400 bg-transparent hover:bg-brown-300 hover:text-brown-600 transition-colors cursor-pointer">
          Inspiration
        </button>
        <button className="px-4 py-2 rounded-lg body-1-brown-400 bg-transparent hover:bg-brown-300 hover:text-brown-600 transition-colors cursor-pointer">
          General
        </button>
      </div>
    </>
  );
}

export function ArticleSection() {
  return (
    <section className="w-full lg:w-[1200px] lg:flex lg:flex-col lg:items-center">
      {/* Heading */}
      <h2 className="w-full h-[64px] text-headline-3 flex items-center px-4 lg:px-0 lg:items-start">
        Latest articles
      </h2>

      {/* Search and Filter Section */}
      <div className="w-full bg-brown-200 flex flex-col gap-4 px-4 py-4 lg:h-[80px] lg:flex-row lg:justify-between lg:items-center lg:px-8 lg:py-6 lg:rounded-lg">
        {/* Search Bar - Mobile: Top, Desktop: Right */}
        <div className="w-full lg:w-auto lg:flex-1 lg:max-w-sm lg:order-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search"
              className="w-full h-12 px-4 pr-12 rounded-lg border border-brown-300 bg-white body-1-brown-600 placeholder-brown-400 focus:outline-none focus:border-brown-500 focus:ring-2 focus:ring-brown-200"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />
          </div>
        </div>

        {/* Category Filter - Mobile: Bottom, Desktop: Left */}
        <div className="lg:flex lg:items-center lg:order-1">
          <CategoryFilterSelect />
        </div>
      </div>
    </section>
  );
}

export default ArticleSection;
