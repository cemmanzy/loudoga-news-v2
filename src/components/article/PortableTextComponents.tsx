import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mb-6 mt-12 text-4xl font-black leading-tight tracking-tight text-[#0B1324] md:text-5xl">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mb-5 mt-12 text-3xl font-extrabold leading-tight tracking-tight text-[#0B1324] md:text-4xl">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 text-2xl font-bold leading-tight text-[#0B1324] md:text-3xl">
        {children}
      </h3>
    ),

    normal: ({ children }) => (
      <p className="mb-7 text-xl leading-9 text-[#17233C]">
        {children}
      </p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-10 border-l-4 border-[#C8102E] bg-gray-50 px-6 py-5 text-xl italic leading-8 text-gray-700">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-7 list-disc space-y-3 pl-8 text-xl leading-8 text-[#17233C]">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="my-7 list-decimal space-y-3 pl-8 text-xl leading-8 text-[#17233C]">
        {children}
      </ol>
    ),
  },

  marks: {
    link: ({ children, value }) => (
      <Link
        href={value?.href || "#"}
        className="font-semibold text-[#C8102E] underline decoration-2 underline-offset-2 transition hover:text-[#a90d27]"
      >
        {children}
      </Link>
    ),

    strong: ({ children }) => (
      <strong className="font-bold text-[#0B1324]">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic">
        {children}
      </em>
    ),
  },

  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <img
          src={urlFor(value).width(1400).url()}
          alt={value?.alt || ""}
          className="w-full rounded-2xl object-cover"
        />

        {value?.caption && (
          <figcaption className="mt-3 text-sm leading-6 text-gray-500">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
};