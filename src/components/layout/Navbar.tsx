import { getMenu } from "@/sanity/loaders/menu";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default async function Navbar() {
  const menu = await getMenu();

  return (
    <nav className="relative z-10 border-y border-gray-200 bg-white">
      <DesktopNavbar menu={menu} />

      <MobileNavbar menu={menu} />
    </nav>
  );
}