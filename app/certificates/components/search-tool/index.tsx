"use client";

import { SearchArticle } from "./components/search-paper";

interface SearchToolProps {
  onSelect: (id: string, titulo: string, autor: string, year: string) => void;
}

export function SearchTool({ onSelect }: SearchToolProps) {
  return <SearchArticle onArticleSelect={onSelect} />;
}
