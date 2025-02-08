import React, { useState } from "react";

// Define the type for the filter options
interface SearchAndFilterProps {
  tags: string[];
  categories: string[]; // Assume categories are passed from the parent
  onSearch: (query: string) => void;
  onFilter: (tag: string) => void;
  onCategoryFilter: (category: string) => void; // New filter callback
  onPriceFilter: (minPrice: number, maxPrice: number) => void; // New price filter callback
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  tags,
  categories,
  onSearch,
  onFilter,
  onCategoryFilter,
  onPriceFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Trigger the search callback
  };

  const handleTagClick = (tag: string) => {
    onFilter(tag); // Trigger the filter callback
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onCategoryFilter(category); // Trigger the category filter callback
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [minPrice, maxPrice] = e.target.value.split(",").map(Number);
    setPriceRange([minPrice, maxPrice]);
    onPriceFilter(minPrice, maxPrice); // Trigger the price filter callback
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
      <div className="flex items-center border p-2 rounded w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border-none outline-none p-2 w-full"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className="bg-gray-200 text-sm py-2 px-4 rounded hover:bg-gray-300"
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="w-full md:w-1/3">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/3">
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceRange.join(",")}
          onChange={handlePriceChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
