import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
  import { SelectLabel } from "@radix-ui/react-select";
  
export function CategoryTab() {
    return (
      <>
        {/* Mobile: Dropdown Select */}
        <div className="w-full h-[76px] flex flex-col gap-2 lg:hidden">
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