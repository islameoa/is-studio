"use client";

import { useEffect, useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function FloatingSearch({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => onSearch(query.trim()), 350);
    return () => clearTimeout(t);
  }, [query, onSearch]);

  return (
    <div className="fixed top-28 md:top-10 left-1/2 -translate-x-1/2 z-[999] md:z-[1000] pointer-events-auto">
      <div className="group flex items-center gap-3 px-5 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out focus-within:scale-[1.03] focus-within:-translate-y-1 focus-within:shadow-[0_30px_80px_rgba(0,0,0,0.75)]">
        <svg
          className="w-4 h-4 text-zinc-400 group-focus-within:text-zinc-200 transition"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.75 3.75a7.5 7.5 0 0012.9 12.9z"
          />
        </svg>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search culture, places, materials…"
          className="bg-transparent outline-none text-sm text-white placeholder:text-white/50 w-[240px] sm:w-[300px]"
        />
      </div>
    </div>
  );
}