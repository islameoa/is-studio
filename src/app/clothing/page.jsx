"use client";

import Image from "next/image";
import Link from "next/link";
import { useBackgroundColor } from "../../contexts/BackgroundColorContext";

const CLOTHING_ITEMS = [
  {
    id: "djellaba",
    title: "Djellaba",
    subtitle: "Traditional silhouette reimagined",
    image: "/images/abuelos-is-studio.jpg",
    slug: "djellaba",
  },
  {
    id: "rihla-shorts",
    title: "Rihla Shorts",
    subtitle: "Movement, travel, summer",
    image: "/images/pants-is-studio.jpg",
    slug: "rihla-shorts",
  },
  {
    id: "zarbiya",
    title: "Zarbiya",
    subtitle: "Texture as memory",
    image: "/images/rug-is-studio.jpg",
    slug: "zarbiya",
  },
  {
    id: "tarbush",
    title: "Tarbush",
    subtitle: "A symbol, not an accessory",
    image: "/images/fez-hat-is-studio.jpg",
    slug: "tarbush",
  },
  {
    id: "jakitah",
    title: "جاكيت",
    subtitle: "Between worlds",
    image: "/images/chaqueta-cuero-is-studio.jpeg",
    slug: "jakitah",
  },
  {
    id: "qamisa",
    title: "Qamisa",
    subtitle: "Daily ritual",
    image: "/images/basic-shirt-is-studio.jpg",
    slug: "qamisa",
  },
];

export default function ClothingPage() {
  const { currentBgColor } = useBackgroundColor();
  const isDefaultBg = currentBgColor === "#F1ECE4";

  const ui = {
    text: isDefaultBg ? "#000" : "#fff",
    muted: isDefaultBg ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)",
    hoverBg: isDefaultBg ? "#000" : "rgba(255,255,255,0.08)",
    hoverText: "#fff",
  };

  return (
    <div
      className="min-h-screen px-4 py-16 transition-colors duration-500"
      style={{ color: ui.text }}
    >
      <div className="max-w-7xl mx-auto mt-36 md:mt-20">
        {/* HEADER */}
        <header className="mb-20">
          <p
            className="text-6xl md:text-8xl tracking-[0.05em] uppercase"
            style={{ fontFamily: "canela" }}
          >
            Clothing
          </p>
          <p
            className="mt-6 max-w-2xl text-lg"
            style={{ fontFamily: "ModernSerif", color: ui.muted }}
          >
            Garments conceived as objects of memory, movement and identity.
            Designed to be worn, not explained.
          </p>
        </header>

        {/* GRID tipo revista */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {CLOTHING_ITEMS.map((item, idx) => (
            <Link
              key={item.id}
              href={`/clothing/${item.slug}`}
              className="group block mb-6 break-inside-avoid"
            >
              <div
                className="overflow-hidden transition-colors duration-300"
              >
                {/* Imagen principal */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                  />
                  {/* Overlay sutil en hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Información textual */}
                <div className="px-6 pb-6 pt-5">
                  <p
                    className="text-xs uppercase tracking-[0.25em] mb-1"
                    style={{ color: ui.muted }}
                  >
                    Rihla Collection
                  </p>
                  <h2 className="text-xl font-medium">{item.title}</h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: ui.muted }}
                  >
                    {item.subtitle}
                  </p>

                  <p className="mt-4 text-xs uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition">
                    View garment →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}