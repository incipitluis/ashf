"use client";

import { useState, useTransition } from "react";
import { Clock, SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SelectArticle } from "@/db/schema";
import { useDebouncedCallback } from "use-debounce";

type ArticleSearchResult = Pick<
  SelectArticle,
  "id" | "autor" | "titulo" | "year"
>;

interface SearchArticleProps {
  onArticleSelect: (
    id: string,
    titulo: string,
    autor: string,
    year: string
  ) => void;
}

export function SearchArticle({ onArticleSelect }: SearchArticleProps) {
  const [searchInput, setSearchInput] = useState("");
  const [isSearchPopoverOpen, setIsSearchPopoverOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<ArticleSearchResult[]>([]);
  const [isSearchingArticle, startSearchingArticle] = useTransition();

  const handleSearchInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(e.target.value);
    startSearchingArticle(async () => {
      if (e.target.value.length > 0 && !isSearchPopoverOpen) {
        setIsSearchPopoverOpen(true);
      }
      if (e.target.value.length === 0 && isSearchPopoverOpen) {
        setIsSearchPopoverOpen(false);
        return;
      }
      await getSearchResults(e.target.value);
    });
  };

  const getSearchResults = useDebouncedCallback(async (query: string) => {
    const response = await fetch(`/api/admin/search/paper?query=${query}`);
    const data = await response.json();
    setSearchResults(data as ArticleSearchResult[]);
  }, 500);

  const handleSelect = (
    id: string,
    titulo: string,
    autor: string,
    year: string
  ) => {
    setSearchInput(titulo);
    onArticleSelect(id, titulo, autor, year);
    setIsSearchPopoverOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-row gap-2 items-center">
        <SearchIcon className="w-4 h-4" />
        <input
          className="min-w-64 px-4 py-2 border border-slate-700"
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Escribe el título de tu artículo..."
          autoFocus
        />
        {isSearchingArticle ? (
          <Clock className="w-4 h-4" />
        ) : (
          <div className="size-4" />
        )}
        {searchInput.length > 0 && (
          <button
            className="absolute right-0"
            onClick={() => {
              setSearchInput("");
              setSearchResults([]);
            }}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <div
        className={cn(
          "absolute top-10 left-0 w-64 border border-slate-700 flex flex-col bg-white z-20 max-h-72 overflow-y-auto rounded-b-md scrollbar-hide",
          isSearchPopoverOpen ? "block" : "hidden"
        )}
      >
        {searchResults.map((result) => (
          <div
            key={result.id}
            className="relative px-4 py-2 hover:bg-slate-700 hover:text-white cursor-pointer flex gap-2 justify-between items-center border-b border-b-slate-300"
            onClick={() =>
              handleSelect(result.id, result.titulo, result.year, result.autor)
            }
          >
            {result.titulo}
            <span className="text-xs text-slate-500">{result.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
