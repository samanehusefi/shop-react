import { useState } from "react";
import { LuLoaderCircle, LuSearch } from "react-icons/lu";

interface SearchAddressProps {
  onSelect: (lat: number, lng: number, address: string) => void;
}

interface SearchResult {
  lat: string;
  lon: string;
  display_name: string;
}

const SearchAddress = ({ onSelect }: SearchAddressProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&accept-language=fa&limit=5&q=${encodeURIComponent(query)}`,
      );

      if (!response.ok) {
        throw new Error("خطا در جستجوی آدرس");
      }

      const data: SearchResult[] = await response.json();

      setResults(data);
    } catch (error) {
      console.error("خطا در جستجوی آدرس:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (result: SearchResult) => {
    onSelect(Number(result.lat), Number(result.lon), result.display_name);

    setQuery(result.display_name);
    setResults([]);
  };

  return (
    <div className="absolute right-4 top-4 p-3 z-[1000] w-[70%]">
      <div className="relative ">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="جستجوی شهر، خیابان یا آدرس"
          className="h-12 w-[70%] rounded-xl border border-gray-200 bg-white px-4 pr-12 text-right text-sm text-gray-700 outline-none shadow-lg placeholder:text-gray-400 focus:border-orange-400"
        />

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading}
          className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-gray-500 transition-colors hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LuLoaderCircle className="animate-spin" size={20} />
          ) : (
            <LuSearch size={20} />
          )}
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-2 max-h-72 overflow-y-auto rounded-xl p-4 border border-gray-100 bg-white shadow-lg">
          {results.map((result, index) => (
            <button
              key={`${result.lat}-${result.lon}-${index}`}
              type="button"
              onClick={() => handleSelect(result)}
              className="block w-full border-b border-gray-100 px-4 py-3 text-right text-sm leading-6 text-gray-700 transition-colors last:border-b-0 hover:bg-gray-50"
            >
              {result.display_name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAddress;
