import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim();
    const page = Number(searchParams.get("page") || "1");

    if (!q) {
      return NextResponse.json({ results: [] });
    }

    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "Missing UNSPLASH_ACCESS_KEY" },
        { status: 500 }
      );
    }

    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", q);
    url.searchParams.set("page", String(page));
    url.searchParams.set("per_page", "24");
    url.searchParams.set("orientation", "portrait"); // moodboard vibe (puedes cambiar)
    url.searchParams.set("content_filter", "high");

    const r = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${key}`,
        "Accept-Version": "v1",
      },
      // cache suave para no comerte el rate limit al teclear
      next: { revalidate: 60 },
    });

    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json(
        { error: `Unsplash error: ${r.status}`, details: errText },
        { status: 500 }
      );
    }

    const data = await r.json();

    // Devolvemos solo lo que necesitas para el grid + attribution
    const results = (data.results || []).map((p: any) => ({
      id: p.id,
      alt: p.alt_description || p.description || "Unsplash photo",
      // Usa SIEMPRE las urls devueltas por la API (hotlink)
      urls: {
        thumb: p.urls.thumb,
        small: p.urls.small,
        regular: p.urls.regular,
      },
      width: p.width,
      height: p.height,
      color: p.color,
      // Attribution (obligatorio por guideline)
      user: {
        name: p.user?.name,
        username: p.user?.username,
        profile: p.user?.links?.html,
      },
      link: p.links?.html,
      download_location: p.links?.download_location,
    }));

    return NextResponse.json({ results, total: data.total, total_pages: data.total_pages });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}