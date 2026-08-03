import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents } from "@portabletext/react";

import { urlFor } from "@/sanity/lib/image";

export const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-12 mb-6 text-4xl font-black">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mt-10 mb-5 text-3xl font-bold">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-8 mb-4 text-2xl font-bold">
        {children}
      </h3>
    ),

    normal: ({ children }) => (
      <p className="mb-7 text-xl leading-9 text-gray-800">
        {children}
      </p>
    ),

    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-[#C8102E] bg-gray-50 px-6 py-4 italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 list-disc space-y-3 pl-8">
        {children}
      </ul>
    ),

    number: ({ children }) => (
      <ol className="my-6 list-decimal space-y-3 pl-8">
        {children}
      </ol>
    ),
  },

  marks: {
    link: ({ children, value }) => (
      <Link
        href={value.href}
        className="font-semibold text-[#C8102E] underline"
      >
        {children}
      </Link>
    ),
  },

  types: {
    image: ({ value }) => (
      <figure className="my-10">

        <img
  src={urlFor(value).width(1200).url()}
  alt=""
  className="w-full rounded-xl"
/>

      </figure>
    ),
  },
};