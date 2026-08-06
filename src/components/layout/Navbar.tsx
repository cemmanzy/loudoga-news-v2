import { getMenu } from "@/sanity/loaders/menu";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default async function Navbar() {
  const menu = await getMenu();

  return (
    <nav className="relative z-[9999] border-b bg-white">

      <DesktopNavbar menu={menu} />

      <MobileNavbar menu={menu} />

    </nav>
  );
}