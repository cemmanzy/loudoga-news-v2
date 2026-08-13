import Link from "next/link";

import Container from "../ui/Container";
import Logo from "../ui/Logo";
import SearchBox from "../ui/SearchBox";

export default function Header() {
  return (
    <header className="relative z-50 overflow-x-clip bg-white">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 md:py-5 lg:flex-nowrap lg:py-6">

          {/* Logo */}

          <div className="min-w-0 max-w-full flex-1 lg:flex-none">
            <Logo />
          </div>

          {/* Right Side */}

          <div className="flex w-full min-w-0 items-center justify-end gap-3 lg:w-auto lg:flex-shrink-0 lg:gap-5">

            <div className="relative z-50 min-w-0 flex-1 lg:flex-none">
              <SearchBox />
            </div>

            <Link
              href="/subscribe"
              className="hidden flex-shrink-0 rounded-full bg-[#C8102E] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-[#a90d27] md:inline-flex lg:px-6"
            >
              Subscribe
            </Link>

          </div>

        </div>
      </Container>
    </header>
  );
}