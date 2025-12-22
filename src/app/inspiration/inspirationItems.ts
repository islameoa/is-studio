// src/data/inspirationItems.ts
export type InspirationItemType = "image" | "video" | "text";

export interface InspirationItem {
  id: string;
  type: InspirationItemType;
  title: string;
  location?: string;          // Ej: "Fez, Morocco"
  period?: string;            // Ej: "Siglo XIV"
  tags: string[];             // Ej: ["zellige", "architecture", "andalusi", "roots"]
  imageUrl?: string;
  videoUrl?: string;
  textSnippet?: string;       // Fragmento de poema, frase, etc.
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
      "يا قلبُ ما لك لا تهوى وتكتفي\nوالروحُ تظمأُ لا ريٌّ ولا سُقيا",
  },
  // añade más piezas poco a poco
];