"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useBackgroundColor } from "../../../contexts/BackgroundColorContext";
import MosaicGallery from "../../../components/mosaicGallery/mosaicGallery";

export type Product = {
    slug: string;
    title: string;
    price: number;
    currency?: string;
    images: string[]; // rutas public o URLs
    description: string;
    details?: string[];
  };
  
export const PRODUCTS: Product[] = [
    {
        slug: "djellaba",
        title: "Djellaba Rihla",
        price: 120,
        currency: "EUR",
        images: [
        "/images/abuelos-is-studio.jpg",
        "/images/products/djellaba2-is-studio.jpg",
        "/images/products/djellaba3-is-studio.jpg",
        "/images/products/djellaba4-is-studio.jpg",
        "/images/products/djellaba5-is-studio.jpg",
        ],
        description: "A modern djellaba silhouette built for movement.",
        details: ["Relaxed fit", "Hidden inner label", "Made in Tanja"],
    },
    {
        slug: "rihla-shorts",
        title: "Rihla Shorts",
        price: 85,
        currency: "EUR",
        images: [
        "/images/pants-is-studio.jpg",
        "/images/products/pants2-is-studio.jpg",
        "/images/products/pants3-is-studio.jpg",
        "/images/products/pants4-is-studio.jpg",
        "/images/products/pants5-is-studio.jpg",
        "/images/products/pants6-is-studio.jpg",        
        ],
        description: "Lightweight shorts designed for travel, heat and movement.",
        details: [
        "Comfort waist",
        "Everyday silhouette",
        "Soft-touch fabric",
        "Designed for summer journeys",
        ],
    },
    {
        slug: "zarbiya",
        title: "Zarbiya",
        price: 140,
        currency: "EUR",
        images: [
        "/images/rug-is-studio.jpg",
        "/images/products/rug2-is-studio.jpg",
        "/images/products/rug3-is-studio.jpg",
        "/images/products/rug4-is-studio.jpg",
        "/images/products/rug5-is-studio.jpg",
        ],
        description: "A textured piece inspired by traditional rugs and patterns.",
        details: [
        "Textured surface",
        "Statement garment",
        "Cultural reference piece",
        "Limited production",
        ],
    },
    {
        slug: "tarbush",
        title: "Tarbush",
        price: 65,
        currency: "EUR",
        images: [
        "/images/fez-hat-is-studio.jpg",
        "/images/products/tarbush2-is-studio.jpg",
        "/images/products/tarbush3-is-studio.jpg",
        "/images/products/tarbush4-is-studio.jpg",
        "/images/products/tarbush5-is-studio.jpg",
        "/images/products/tarbush6-is-studio.jpg",
        ],
        description: "A reinterpretation of a symbolic headpiece.",
        details: [
        "Structured form",
        "Lightweight feel",
        "Cultural symbolism",
        "Designed as an object, not an accessory",
        ],
    },
    {
        slug: "jakitah",
        title: "جَاكِيت",
        price: 220,
        currency: "EUR",
        images: [
        "/images/chaqueta-cuero-is-studio.jpeg",
        "/images/products/jacket2-is-studio.jpg",
        "/images/products/jacket3-is-studio.jpg",
        "/images/products/jacket4-is-studio.jpg",
        "/images/products/jacket5-is-studio.jpg",
        "/images/products/jacket6-is-studio.jpg",
        ],
        description: "A jacket bridging tradition and modern construction.",
        details: [
        "Tailored structure",
        "Inspired by traditional garments",
        "Layer-friendly design",
        "Built for urban environments",
        ],
    },
    {
        slug: "qamisa",
        title: "Qamisa",
        price: 95,
        currency: "EUR",
        images: [
        "/images/basic-shirt-is-studio.jpg",
        "/images/products/qamisa2-is-studio.jpg",
        "/images/products/qamisa3-is-studio.jpg",
        "/images/products/qamisa4-is-studio.jpg",
        "/images/products/qamisa5-is-studio.jpg",
        "/images/products/qamisa6-is-studio.jpg",
        "/images/products/qamisa7-is-studio.jpg",
        ],
        description: "A daily essential rooted in simplicity and ritual.",
        details: [
        "Clean silhouette",
        "Soft fabric",
        "Minimal branding",
        "Designed for everyday wear",
        ],
    },
];
  
const getProductBySlug = (slug: string) =>
    PRODUCTS.find((p) => p.slug === slug);

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { currentBgColor } = useBackgroundColor();
  const isDefaultBg = currentBgColor === "#F1ECE4";

  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const ui = {
    text: isDefaultBg ? "#000" : "#fff",
    muted: isDefaultBg ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.75)",
    border: isDefaultBg ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.25)",
  };

  return (
    <div className="min-h-screen px-4 py-16" style={{ color: ui.text }}>
      <div className="max-w-6xl mx-auto mt-36 md:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* GALERÍA */}
          <div className="space-y-5">
            <MosaicGallery
                images={product.images}
                title={product.title}
                borderColor={ui.border}
                textColor={ui.text}
            />
          </div>

          {/* INFO */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em]" style={{ color: ui.muted }}>
              Rihla Collection
            </p>

            <h1 className="text-4xl md:text-5xl font-semibold mt-3" style={{ fontFamily: "canela" }}>
              {product.title}
            </h1>

            <p className="mt-4 text-lg" style={{ color: ui.muted }}>
              {product.description}
            </p>

            <p className="mt-8 text-2xl font-medium">
              {product.price} {product.currency ?? "EUR"}
            </p>

            {product.details?.length ? (
              <ul className="mt-8 space-y-2" style={{ color: ui.muted }}>
                {product.details.map((d) => (
                  <li key={d} className="text-sm">— {d}</li>
                ))}
              </ul>
            ) : null}

            <button
              className="mt-10 inline-flex items-center gap-3 rounded-full px-8 py-3 uppercase tracking-[0.25em] text-sm transition"
              style={{
                border: `1px solid ${ui.border}`,
                color: ui.text,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = ui.text;
                (e.currentTarget as HTMLButtonElement).style.color = isDefaultBg ? "#fff" : "#000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = ui.text;
              }}
            >
              Add to inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}