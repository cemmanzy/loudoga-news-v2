import Link from "next/link";

import Container from "../ui/Container";
import Logo from "../ui/Logo";
import SearchBox from "../ui/SearchBox";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <Container>

        <div className="flex flex-wrap items-center justify-between gap-4 py-4 lg:flex-nowrap lg:py-6">

          {/* Logo */}

          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Right Side */}

          <div className="flex w-full items-center justify-end gap-3 lg:w-auto lg:gap-5">

            <div className="flex-1 lg:flex-none">
              <SearchBox />
            </div>

            <Link
              href="/subscribe"
              className="hidden rounded-full bg-[#C8102E] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#a90d27] md:inline-flex lg:px-6"
            >
              Subscribe
            </Link>

          </div>

        </div>

      </Container>
    </header>
  );
}