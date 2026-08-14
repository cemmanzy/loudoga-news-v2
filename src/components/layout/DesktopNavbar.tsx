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
    <div
      className="
        hidden
        bg-white
        text-gray-900
        transition-colors
        duration-300
        dark:bg-[#0F172A]
        dark:text-white
        lg:block
      "
    >
      <div className="mx-auto hidden max-w-7xl lg:block">

        <div
          className="
            flex
            items-center
            gap-8
            border-x-0
            px-4
            py-4
            text-sm
            font-semibold
          "
        >

          {/* Home */}

          <Link
            href="/"
            className="
              whitespace-nowrap
              transition
              hover:text-[#C8102E]
            "
          >
            Home
          </Link>

          {/* Main Categories */}

          {visibleMenu.map((category) => (
            <MenuItem
              key={category._id}
              title={category.title}
              slug={category.slug}
              articles={category.articles}
            />
          ))}

          {/* More Menu */}

          {moreMenu.length > 0 && (
            <MoreMenu categories={moreMenu} />
          )}

        </div>

      </div>
    </div>
  );
}