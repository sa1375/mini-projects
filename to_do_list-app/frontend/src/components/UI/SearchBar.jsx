import { useState } from "react";

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex justify-center mr-10">
      <input
        type="text"
        placeholder="Search By Title"
        className={`h-8 rounded-lg border border-gray-300 outline-none transition-all duration-500 px-3 ${
          isFocused ? "w-60" : "w-40"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
}