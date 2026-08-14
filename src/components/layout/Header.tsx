import Link from "next/link";

import Container from "../ui/Container";
import Logo from "../ui/Logo";
import SearchBox from "../ui/SearchBox";

export default function Header() {
  return (
    <header className="relative z-50 bg-white dark:bg-[#0F172A]">
      <Container>
        <div
          className="
            flex
            items-center
            justify-between
            gap-4
            py-4

            sm:gap-6
            sm:py-5

            lg:gap-8
            lg:py-6
          "
        >
          {/* =================================
              BRAND
          ================================= */}

          <div className="min-w-0 flex-shrink-0">

            {/* Mobile / Small screens */}

            <div className="block md:hidden">
              <Logo size="md" />
            </div>

            {/* Desktop */}

            <div className="hidden md:block">
              <Logo size="lg" />
            </div>

          </div>

          {/* =================================
              SEARCH + SUBSCRIBE
          ================================= */}

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
            <div className="w-full max-w-[420px]">
              <SearchBox />
            </div>

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