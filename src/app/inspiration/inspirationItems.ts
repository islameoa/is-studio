// src/data/inspirationItems.ts
export type InspirationItemType = "image" | "video" | "text";

export interface InspirationItem {
  id: string;
  type: InspirationItemType;
  title: string;
  location?: string;
  period?: string;
  tags: string[];
  imageUrl?: string;
  videoUrl?: string;
  textSnippet?: string;
}

export const inspirationItems: InspirationItem[] = [
  {
    id: "zellige-fez-01",
    type: "image",
    title: "Zellige courtyard in Fez",
    location: "Fez, Morocco",
    period: "Marinid period",
    tags: ["zellige", "architecture", "islamic-art", "geometry", "roots"],
    imageUrl: "/images/zellige-is-studio.jpg",
  },
  {
    id: "oud-player-01",
    type: "image",
    title: "Oud player in a Tangier café",
    location: "Tangier, Morocco",
    tags: ["music", "oud", "north-africa", "diaspora", "memory"],
    imageUrl: "/images/oud-players-is-studio.jpg",
  },
  {
    id: "poem-arabic-01",
    type: "text",
    title: "Sufi verse about longing",
    period: "Classical Arabic poetry",
    tags: ["poetry", "sufism", "longing", "spirituality"],
    textSnippet:
      "Oh corazón, ¿por qué no amas y te conformas? Y el alma sigue sedienta, sin saciarse ni con agua ni con alivio.",
  },
  {
    id: "basic-tee-is-studio",
    type: "image",
    title: "Basic tee hanging on a sta7",
    location: "Dchar Rouah, Morocco",
    tags: ["fashion", "street-style", "modernity", "roots"],
    imageUrl: "/images/basic-tee-is-studio.jpg", 
  },
  {
    id: "amigos_saudis_studio",
    type: "video",
    title: "Friends hanging out in Casablanca",
    location: "Morocco",
    period: "2000s",
    tags: ["cinema", "morocco", "urban-life", "youth"],
    videoUrl: "/videos/amigos_saudis_studio.mp4",
  },
  {
    id: "poem-arabic-01",
    type: "text",
    title: "Sufi verse about longing",
    period: "Classical Arabic poetry",
    tags: ["poetry", "sufism", "longing", "spirituality"],
    textSnippet:
      "Desires make slaves out of kings, and patience makes kings out of slaves.",
  },
  {
    id: "land-is-studio",
    type: "image",
    title: "Traditional weaving in the Atlas Mountains",
    location: "Atlas Mountains, Morocco",
    tags: ["weaving", "textiles", "tradition", "craftsmanship", "roots"],
    imageUrl: "/images/land-is-studio.jpg",
  },
  {
    id: "scarf-is-studio",
    type: "image",
    title: "Palestinian scarf with flowers",
    location: "Palestine",
    tags: ["fashion", "identity", "diaspora", "resistance"],
    imageUrl: "/images/scarf-is-studio.jpg",
  },
  {
    id: "boda_is_studio",
    type: "video",
    title: "Marriage celebration in New York",
    location: "New York, USA",
    tags: ["celebration", "diaspora", "family", "tradition"],
    videoUrl: "/videos/boda_is_studio.mp4",
  },
  {
    id: "poem-arabic-02",
    type: "text",
    title: "Verse about patience",
    period: "Classical Arabic poetry",
    tags: ["poetry", "patience", "wisdom", "spirituality"],
    textSnippet:
      "Al final todo sale bien y si no ha salido bien es que no es el final.",
  },
  {
    id: "neTirezPasTee",
    type: "image",
    title: "Ne tirez pas sur le tee-shirt",
    location: "Marrakech, Morocco",
    tags: ["fashion", "street-style", "modernity", "roots"],
    imageUrl: "/images/neTirezPasTee.jpg",
  },
  {
    id: "love_look_is_studio",
    type: "image",
    title: "Love Look",
    location: "Morocco",
    tags: ["fashion", "street-style", "modernity", "roots"],
    imageUrl: "/images/love_look_is_studio.jpg",
  },
  {
    id: "empire_state_is_studio",
    type: "video",
    title: "Empire State of is Studio",
    location: "Morocco",
    tags: ["cinema", "urban-life", "modernity", "roots"],
    videoUrl: "/videos/empire_state_is_studio.mp4",
  },
  {
    id: "poem-arabic-03",
    type: "text",
    title: "Verse about self-transformation",
    period: "Masnavi by Rumi",
    tags: ["poetry", "love", "patience", "spirituality"],
    textSnippet:
      "Ayer era inteligente y quería cambiar el mundo. Hoy soy sabio y me cambio a mí mismo."
  },
  {
    id: "mountain_is_studio",
    type: "image",
    title: "Mountain vibes",
    location: "Atlas Mountains, Morocco",
    tags: ["nature", "landscape", "roots"],
    imageUrl: "/images/mountain_is_studio.jpg",
  },
  {
    id: "islikks_saudi_is_studio",
    type: "video",
    title: "Saudi rich man in Makkah",
    location: "Makkah, Saudi Arabia",
    tags: ["cinema", "culture", "tradition", "roots"],
    videoUrl: "/videos/islikks_saudi_is_studio.mp4",
  },
  {
    id: "poem-arabic-04",
    type: "text",
    title: "Verse about love and patience",
    period: "Tarjumān al-Ashwāq by Ibn Al-Arabi",
    tags: ["poetry", "love", "patience", "spirituality"],
    textSnippet:
      "Mi corazón se ha vuelto capaz de todas las formas: es pradera para gacelas y monasterio para monjes.",
  },
  {
    id: "istanbul_is_studio",
    type: "image",
    title: "Istanbul vibes",
    location: "Istanbul, Turkey",
    tags: ["cityscape", "culture", "roots"],
    imageUrl: "/images/istanbul_is_studio.jpg",
  },
  {
    id: "montana_is_studio",
    type: "video",
    title: "Mountain siu",
    location: "Montseny, Spain",
    tags: ["nature", "landscape", "roots"],
    videoUrl: "/videos/montana_is_studio.mp4",
  },
  {
    id: "poem-arabic-05",
    type: "text",
    title: "Verse about life experiences",
    period: "Mural by Mahmoud Darwish",
    tags: ["poetry", "life", "experience", "spirituality"],
    textSnippet:
      "En esta tierra hay cosas que merecen ser vividas.",
  },
  {
    id: "quran_is_studio",
    type: "image",
    title: "Quran study session",
    location: "Cairo, Egypt",
    tags: ["spirituality", "study", "roots"],
    imageUrl: "/images/quran_is_studio.jpg",
  },
  {
    id: "morocco_trip_is_studio",
    type: "video",
    title: "Sahara Desert trip",
    location: "Sahara Desert, Morocco",
    tags: ["nature", "landscape", "roots"],
    videoUrl: "/videos/morocco_trip_is_studio.mp4",
  }
];