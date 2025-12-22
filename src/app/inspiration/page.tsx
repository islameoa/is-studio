"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { inspirationItems, InspirationItem } from "./inspirationItems";
import FloatingSearch from "../../components/floatingSearch/floatingSearch";
import { useBackgroundColor } from "../../contexts/BackgroundColorContext";

type CuratedStory = {
  headline: string;
  story: string;
  connection: string;
};

export default function InspirationPage() {
  const [stories, setStories] = useState<Record<string, CuratedStory | null>>({});
  const [angles, setAngles] = useState<Record<string, string>>({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [unsplashResults, setUnsplashResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { currentBgColor } = useBackgroundColor();
  const isDefaultBg = currentBgColor === "#F1ECE4";

  const ui = {
    text: isDefaultBg ? "black" : "white",
    muted: isDefaultBg ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.7)",
    border: isDefaultBg ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.22)",
    panelBg: isDefaultBg ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.75)",
    overlayBg: isDefaultBg ? "rgba(0,0,0,0.92)" : "rgba(255,255,255,0.92)",
    hoverWash: isDefaultBg
      ? "linear-gradient(to top, rgba(0,0,0,0.22), rgba(0,0,0,0), rgba(0,0,0,0.12))"
      : "linear-gradient(to top, rgba(0,0,0,0.50), rgba(0,0,0,0), rgba(0,0,0,0.22))",
  };

  useEffect(() => {
    let cancelled = false;
  
    const run = async () => {
      const q = query.trim();
  
      if (!q) {
        setUnsplashResults([]);
        setIsSearching(false);
        return;
      }
  
      setIsSearching(true);
  
      try {
        const res = await fetch(`/api/unsplash?q=${encodeURIComponent(q)}`);
        const data = await res.json();
  
        if (!cancelled) {
          setUnsplashResults(data.results ?? []);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) setUnsplashResults([]);
      } finally {
        if (!cancelled) setIsSearching(false);
      }
    };
  
    run();
  
    return () => {
      cancelled = true;
    };
  }, [query]);
  
  const handleAngleChange = (id: string, value: string) => {
    setAngles((prev) => ({ ...prev, [id]: value }));
  };

  const handleCurate = async (item: InspirationItem) => {
    const angle = angles[item.id] ?? "general overview";
    try {
      setLoadingId(item.id);
      setErrorId(null);

      const res = await fetch("/api/inspiration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          angle,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorId(item.id);
        console.error(data?.error ?? "Error getting story");
        return;
      }

      const data = await res.json();
      setStories((prev) => ({
        ...prev,
        [item.id]: data.ai as CuratedStory,
      }));
    } catch (e) {
      console.error(e);
      setErrorId(item.id);
    } finally {
      setLoadingId(null);
    }
  };

  // Para dar variedad de tamaños/aspect ratios (pseudo-random por índice)
  const getSizeClasses = (index: number, item: InspirationItem) => {
    if (item.type === "text") {
      const textHeights = [
        "py-10 px-6",
        "py-16 px-8",
        "py-20 px-8",
        "py-12 px-10",
      ];
      return textHeights[index % textHeights.length];
    }

    const variants = [
      "aspect-[4/5]",
      "aspect-[3/4]",
      "aspect-[1/1]",
      "aspect-[16/10]",
      "aspect-[5/6]",
    ];

    return variants[index % variants.length];
  };

  return (
    <div className="min-h-screen px-4 py-16 transition-colors duration-500" style={{ color: ui.text }}>
      {/* BUSCADOR FLOTANTE */}
      <FloatingSearch onSearch={setQuery} />
      <div className="max-w-7xl mx-auto mt-36 md:mt-20">
        {/* HEADER */}
        <header className="mb-10">
          <p className="text-6xl md:text-8xl tracking-[0.05em] uppercase" style={{ fontFamily: "canela" }}>
            Inspiration
          </p>
          <p className="mt-4 max-w-2xl text-lg" style={{ fontFamily: "ModernSerif" }}>
            Images, fragments and moments from the Arab, Muslim and African
            worlds — rearranged like a living moodboard, with an AI curator
            you can ask about each piece.
          </p>
        </header>

        {/* MASONRY GRID (tipo Pinterest) */}
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-6 gap-4 [column-fill:_balance] text-white">
          {query && (
            <>
              {isSearching && (
                <div className="mb-4 break-inside-avoid text-xs">
                  Searching Unsplash…
                </div>
              )}

              {unsplashResults.map((p) => (
                <div key={`unsplash-${p.id}`} className="group relative mb-4 break-inside-avoid">
                  <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 aspect-[4/5]">
                    <Image
                      src={p.urls.regular}
                      alt={p.alt}
                      fill
                      className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                      unoptimized
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Overlay flotante (atribución) */}
                  <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-start justify-center">
                    <div className="mt-4 w-[92%] max-w-sm pointer-events-auto bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 p-4 backdrop-blur-md space-y-3">
                      <p className="text-[10px] uppercase tracking-[0.2em]">
                        Unsplash
                      </p>

                      <p className="text-[11px]">
                        Photo by{" "}
                        <a
                          className="underline underline-offset-4 hover:text-black-200"
                          href={p.user?.profile}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {p.user?.name}
                        </a>{" "}
                        on{" "}
                        <a
                          className="underline underline-offset-4 hover:text-black-200"
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Unsplash
                        </a>
                      </p>

                      {/* Botón opcional: “Use as inspiration” */}
                      <button
                        onClick={() => {
                          // aquí podemos convertirla en item local para pasarla por tu IA
                        }}
                        className="w-full text-[11px] uppercase tracking-[0.22em] border border-zinc-600 rounded-full px-3 py-2 hover:bg-zinc-100 hover:text-black transition">
                        Use as inspiration
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          {inspirationItems.map((item, index) => {
            const sizeClasses = getSizeClasses(index, item);
            const story = stories[item.id];
            const angle = angles[item.id] ?? "general overview";
            const isLoading = loadingId === item.id;
            const hasError = errorId === item.id;

            return (
              <div
                key={item.id}
                className="group relative mb-4 break-inside-avoid"
              >
                {/* CONTENIDO PRINCIPAL (imagen o texto) */}
                <div
                  className={`relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/60 ${item.type === "image" ? sizeClasses : ""}`}
                >
                  {item.type === "image" && item.imageUrl && (
                    <div className="relative w-full h-full">
                      <div className="relative w-full h-full">
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        />
                      </div>
                    </div>
                  )}

                  {item.type === "text" && (
                    <div
                      className={`flex items-center justify-center ${sizeClasses}`}
                    >
                      <p className="text-sm md:text-base italic text-center leading-relaxed px-4">
                        {item.textSnippet}
                      </p>
                    </div>
                  )}

                  {/* Overlay sutil para dar feedback al hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* VENTANA FLOTANTE AL HOVER */}
                <div className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-start justify-center">
                  <div className="mt-4 w-[92%] max-w-sm pointer-events-auto bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/60 p-4 space-y-3 backdrop-blur-md">
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] uppercase tracking-[0.2em]">
                        Cultural fragment
                      </p>
                      <h2 className="text-sm font-medium">
                        {item.title}
                      </h2>
                      {(item.location || item.period) && (
                        <p className="text-[11px]">
                          {item.location && <span>{item.location}</span>}
                          {item.location && item.period && " · "}
                          {item.period && <span>{item.period}</span>}
                        </p>
                      )}
                      <p className="text-[11px] line-clamp-2">
                        {item.tags.join(" · ")}
                      </p>
                    </div>

                    {/* Selector de ángulo */}
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-[0.18em]">
                        Angle
                      </label>
                      <select
                        value={angle}
                        onChange={(e) =>
                          handleAngleChange(item.id, e.target.value)
                        }
                        className="w-full bg-zinc-900 border border-zinc-700 text-[11px] px-2 py-1.5 rounded-full outline-none focus:ring-1 focus:ring-zinc-400"
                      >
                        <option value="general overview">
                          General overview
                        </option>
                        <option value="identity and diaspora">
                          Identity & diaspora
                        </option>
                        <option value="artistic technique and design">
                          Technique & design
                        </option>
                        <option value="link to modern streetwear">
                          Link to modern streetwear
                        </option>
                      </select>
                    </div>

                    {/* Botón IA */}
                    <button
                      onClick={() => handleCurate(item)}
                      disabled={isLoading}
                      className="w-full text-[11px] uppercase tracking-[0.22em] border border-zinc-600 rounded-full px-3 py-2 hover:bg-zinc-100 hover:text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Curating..." : "Ask the studio"}
                    </button>

                    {/* Error para este item */}
                    {hasError && (
                      <p className="text-[11px] text-red-400">
                        Something went wrong asking the curator. Try again.
                      </p>
                    )}

                    {/* Historia generada por IA */}
                    {story && (
                      <div className="border-t border-zinc-800 pt-2 space-y-1 max-h-64 overflow-y-auto">
                        <p className="text-[10px] uppercase tracking-[0.2em]">
                          {story.headline}
                        </p>
                        <p className="text-[12px] whitespace-pre-line leading-relaxed">
                          {story.story}
                        </p>
                        <p className="text-[11px] whitespace-pre-line">
                          {story.connection}
                        </p>
                      </div>
                    )}

                    {!story && !isLoading && !hasError && (
                      <p className="text-[11px]">
                        Ask the curator to reveal the story behind this piece.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}