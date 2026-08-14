import Link from "next/link";

import Container from "../ui/Container";
import Logo from "../ui/Logo";
import SearchBox from "../ui/SearchBox";

export default function Header() {
  return (
    <header
      className="
        relative
        z-50
        bg-white
        text-gray-900
        transition-colors
        duration-300
        dark:bg-[#111827]
        dark:text-white
      "
    >
      <Container>
        <div
          className="
            flex
            items-center
            justify-between
            gap-8
            py-5
            lg:py-6
          "
        >
          {/* Brand */}

          <div className="min-w-0 flex-shrink-0">
            <Logo size="lg" />
          </div>

          {/* Search + Subscribe */}

          <div
            className="
              hidden
              items-center
              gap-5
              md:flex
              lg:flex-1
              lg:justify-end
            "
          >
            {/* Search */}

            <div className="w-full max-w-[420px]">
              <SearchBox />
            </div>

            {/* Subscribe */}

            <Link
              href="/subscribe"
              className="
                inline-flex
                flex-shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#C8102E]
                px-6
                py-3
                text-sm
                font-bold
                text-white
                transition
                duration-300
                hover:bg-[#A90D27]
              "
            >
              Subscribe
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}