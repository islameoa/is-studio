"use client";

import { useState, useEffect } from "react";
import { useBackgroundColor } from "../../contexts/BackgroundColorContext";
import Image from "next/image";
import Link from "next/link";

const PROJECTS = [
  {
    id: "is-studio",
    title: "is-studio",
    description: "Creative studio blending culture, design and technology.",
    year: "2024",
    img: "/images/is-studio-desktop.png",
    href: "https://is-studio.es"
  },
  {
    id: "sinuo",
    title: "SINUO",
    description: "Perfume brand exploring memory, identity and scent.",
    year: "2026",
    img: "/images/sinuo-desktop.png",
    href: "https://sinuo.es"
  },
  {
    id: "rensssance",
    title: "RENSSSANCE",
    description: "Digital fashion label redefining virtual couture.",
    year: "2025",
    img: "/images/rensssance-desktop.png",
    href: "https://rensssance.com"
  },
  {
    id: "justice",
    title: "Departament de Justicia de Catalunya",
    description: "Full-stack developments in various apps for a private client.",
    year: "2022",
    img: "/images/justicia-desktop.png",
    href: "https://justicia.gencat.cat/ca/ambits/reinsercio_i_serveis_penitenciaris/serveis_penitenciaris/els_centres_penitenciaris/comunicacions-distancia/accedir/"
  },
];

function ProjectsFloatingSearch({ onSearch }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => onSearch(query.trim()), 300);
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
          placeholder="Filter projects…"
          className="bg-transparent outline-none text-sm text-white placeholder:text-white/50 w-[240px] sm:w-[300px]"
        />
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("");
  const { currentBgColor } = useBackgroundColor();
  const isDefaultBg = currentBgColor === "#F1ECE4";

  const ui = {
    text: isDefaultBg ? "black" : "white",
    muted: isDefaultBg ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.75)",
    border: isDefaultBg ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.28)",
    hoverBg: isDefaultBg ? "black" : "rgba(255,255,255,0.08)"
  };

  const filteredProjects = PROJECTS.filter((p) =>
    p.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-16 transition-colors duration-500" style={{ color: ui.text }}>
      <ProjectsFloatingSearch onSearch={setFilter} />

      <div className="max-w-7xl mx-auto mt-36 md:mt-20">
        <header className="mb-16">
          <p
            className="text-6xl md:text-8xl tracking-[0.05em] uppercase"
            style={{ fontFamily: "canela" }}
          >
            Projects
          </p>
          <p
            className="mt-4 max-w-2xl text-lg"
            style={{ fontFamily: "ModernSerif" }}
          >
            A selection of my recent works and collaborations, showcasing my
            skills and creativity across various domains.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              target="_blank"
              className="group block rounded-3xl transition-colors duration-300 cursor-pointer"
              style={{
                border: `1px solid ${ui.border}`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ui.hoverBg;
                e.currentTarget.style.color = isDefaultBg ? "white" : ui.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = ui.text;
              }}
            >
              {project.img && (
                <div className="relative w-full aspect-[16/10] mb-6 overflow-hidden rounded-2xl">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
              )}
              <div className="px-8 pb-8">
                <p className="text-xs uppercase tracking-[0.25em] mb-2">
                  {project.year}
                </p>
                <h2 className="text-2xl font-semibold mb-3">
                  {project.title}
                </h2>
                <p className="text-sm opacity-80 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}

          {filteredProjects.length === 0 && (
            <p className="text-sm opacity-60">
              No projects match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}