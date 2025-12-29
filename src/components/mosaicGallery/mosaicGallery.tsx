"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Props = {
  images: string[];
  title: string;
  borderColor: string; // ui.border
  textColor: string;   // ui.text
};

export default function MosaicGallery({ images, title, borderColor, textColor }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const spans = useMemo(() => {
    // patrón "irregular" repetible (puedes ajustar a gusto)
    // la primera imagen la hacemos hero sí o sí
    const variants = [
      "col-span-6 row-span-6", // hero (solo se usa en index 0)
      "col-span-3 row-span-3",
      "col-span-3 row-span-4",
      "col-span-2 row-span-3",
      "col-span-4 row-span-3",
      "col-span-2 row-span-2",
      "col-span-3 row-span-2",
      "col-span-4 row-span-4",
    ];

    return images.map((_, i) => (i === 0 ? variants[0] : variants[(i % (variants.length - 1)) + 1]));
  }, [images]);

  const openAt = (i: number) => {
    setActive(i);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const prev = () => setActive((p) => (p - 1 + images.length) % images.length);
  const next = () => setActive((p) => (p + 1) % images.length);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  return (
    <>
      {/* MOSAIC GRID */}
      <div className="grid grid-cols-6 auto-rows-[70px] gap-4 [grid-auto-flow:dense]">
        {images.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => openAt(i)}
            className={`group relative overflow-hidden rounded-3xl ${spans[i]} transition`}
            style={{ border: `1px solid ${borderColor}` }}
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${title} image ${i + 1}`}
              fill
              className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
            />

            {/* hover overlay */}
            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: "#fff" }}
            >
              <span className="text-xs uppercase tracking-[0.22em]">View</span>
              <span className="text-xs opacity-80">
                {i + 1}/{images.length}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center px-4"
          onMouseDown={close}
        >
          <div
            className="relative w-full max-w-5xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-[0.22em] text-white/70">
                {title} · {active + 1}/{images.length}
              </p>

              <button
                type="button"
                onClick={close}
                className="text-white/80 hover:text-white text-sm uppercase tracking-[0.25em]"
              >
                Close ✕
              </button>
            </div>

            {/* Image */}
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              style={{ border: `1px solid rgba(255,255,255,0.18)` }}
            >
              <div className="relative w-full aspect-[16/10]">
                <Image
                  src={images[active]}
                  alt={`${title} large ${active + 1}`}
                  fill
                  className="object-contain bg-black"
                />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                className="px-5 py-3 rounded-full border text-xs uppercase tracking-[0.22em] text-white/90 hover:text-white transition"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                Prev
              </button>

              <button
                type="button"
                onClick={next}
                className="px-5 py-3 rounded-full border text-xs uppercase tracking-[0.22em] text-white/90 hover:text-white transition"
                style={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}