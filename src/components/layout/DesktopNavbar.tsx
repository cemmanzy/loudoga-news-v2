import Link from "next/link";

import MenuItem from "./MenuItem";
import MoreMenu from "./MoreMenu";

import type { MenuCategory } from "@/types/menu";

interface Props {
  menu: MenuCategory[];
}

export default function DesktopNavbar({
  menu,
}: Props) {
  const visibleMenu = menu.slice(0, 7);
  const moreMenu = menu.slice(7);

  return (
    <div className="hidden lg:block">

      <div className="mx-auto max-w-7xl">

        <div className="flex items-center gap-8 px-4 py-4 text-sm font-semibold">

          <Link
            href="/"
            className="whitespace-nowrap transition hover:text-[#C8102E]"
          >
            Home
          </Link>

          {visibleMenu.map((category) => (
            <MenuItem
              key={category._id}
              title={category.title}
              slug={category.slug}
              articles={category.articles}
            />
          ))}

          {moreMenu.length > 0 && (
            <MoreMenu categories={moreMenu} />
          )}

        </div>

      </div>

    </div>
  );
}