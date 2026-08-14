"use client";

import { useEffect, useState } from "react";

import type { Article } from "@/types/article";

import HeroArticleCard from "../cards/HeroArticleCard";

interface Props {
  articles: Article[];
}

export default function HeroCarousel({
  articles,
}: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((previous) =>
        (previous + 1) % articles.length
      );
    }, 60_000);

    return () => clearInterval(timer);
  }, [articles.length]);

  const article = articles[current];

  if (!article) return null;

  return (
    <div className="relative">

      <div
        key={article._id}
        className="animate-hero-fade"
      >
        <HeroArticleCard
          article={article}
        />
      </div>

      {/* Slide indicators */}

      {articles.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {articles.map((item, index) => (
            <button
              key={item._id}
              type="button"
              aria-label={`Show hero story ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current
                  ? "w-7 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

    </div>
  );
}