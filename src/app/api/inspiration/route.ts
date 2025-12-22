import { NextRequest, NextResponse } from "next/server";
import { inspirationItems } from "../../inspiration/inspirationItems";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type CuratedStory = {
  headline: string;
  story: string;
  connection: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemId, angle } = body as { itemId: string; angle?: string };

    const item = inspirationItems.find((i) => i.id === itemId);
    if (!item) {
      return NextResponse.json(
        { error: "Item not found" },
        { status: 404 }
      );
    }

    // --- 1) Relacionados por tags (simple) ---
    const related = inspirationItems
      .filter(
        (i) => i.id !== item.id && i.tags.some((t) => item.tags.includes(t))
      )
      .slice(0, 3);

    // --- 2) Prompts ---
    const systemPrompt = `
You are an AI cultural curator working for "is-studio", a modern Arab-inspired fashion & lifestyle brand.
Tone: modern, minimal, poetic but clear.
Focus: Arab, Muslim and African culture, identity, diaspora, roots, and design.
Never invent specific historical facts. If unsure, speak in terms of possibilities.
Always return ONLY valid JSON.
    `.trim();

    const userPrompt = `
Here is an inspiration item:

Title: ${item.title}
Type: ${item.type}
Location: ${item.location ?? "Unknown"}
Period: ${item.period ?? "Unknown"}
Tags: ${item.tags.join(", ")}

${
  item.textSnippet
    ? `Text snippet (in original language):\n${item.textSnippet}\n`
    : ""
}

Requested angle: ${angle ?? "general overview"}

Return a JSON object with this shape:
{
  "headline": "short poetic title (max 60 chars)",
  "story": "2-3 paragraphs explaining the cultural + emotional meaning",
  "connection": "1 short paragraph linking this piece to identity, roots or diaspora, optionally connecting to modern creative work or fashion"
}
    `.trim();

    // --- 3) Llamada a OpenAI con chat.completions ---
    const completion = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 700,
    });

    const content = completion.choices[0]?.message?.content ?? "{}";

    let aiJson: CuratedStory;
    try {
      aiJson = JSON.parse(content);
    } catch (e) {
      console.error("Failed to parse AI JSON:", content);
      return NextResponse.json(
        { error: "AI returned invalid JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      item,
      ai: aiJson,
      related,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Insufficient credit for OpenAI" },
      { status: 500 }
    );
  }
}

// MOCK SERVER
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { itemId, angle } = body as { itemId: string; angle?: string };

//     const item = inspirationItems.find((i) => i.id === itemId);
//     if (!item) {
//       return NextResponse.json(
//         { error: "Item not found" },
//         { status: 404 }
//       );
//     }

//     const ai = {
//       headline: `Story about "${item.title}"`,
//       story:
//         "This is a mock story from /api/inspiration. If you see this in the UI, the endpoint is working.",
//       connection:
//         "This is a mock connection to identity, roots and diaspora.",
//     };

//     const related = inspirationItems
//       .filter((i) => i.id !== item.id && i.tags.some((t) => item.tags.includes(t)))
//       .slice(0, 3);

//     return NextResponse.json({ item, ai, related });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Unexpected error" },
//       { status: 500 }
//     );
//   }
// }