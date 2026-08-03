import Link from "next/link";

import { getMenu } from "@/sanity/loaders/menu";

import MenuItem from "./MenuItem";

export default async function Navbar() {
  const menu = await getMenu();

  return (
    <nav className="relative z-50 border-b bg-white">

      <div className="mx-auto flex max-w-7xl items-center gap-8 px-4 py-4 text-sm font-semibold">

        <Link
          href="/"
          className="whitespace-nowrap transition hover:text-[#C8102E]"
        >
          Home
        </Link>

        {menu.map((category) => (

          <MenuItem
            key={category._id}
            title={category.title}
            slug={category.slug}
            articles={category.articles}
          />

        ))}

      </div>

    </nav>
  );
}