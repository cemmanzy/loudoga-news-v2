import { getMenu } from "@/sanity/loaders/menu";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default async function Navbar() {
  const menu = await getMenu();

  return (
    <nav
      className="
        sticky
        top-0
        z-[1000]
        border-y
        border-gray-200
        bg-white

        dark:border-gray-700
        dark:bg-[#0F172A]
      "
    >
      <DesktopNavbar menu={menu} />

      <MobileNavbar menu={menu} />
    </nav>
  );
}