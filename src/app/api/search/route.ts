import { NextRequest, NextResponse } from "next/server";

import { searchArticles } from "@/sanity/loaders/search";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("q") ?? "";

  if (search.trim().length < 2) {
    return NextResponse.json([]);
  }

  const articles = await searchArticles(search);

  return NextResponse.json(articles);
}