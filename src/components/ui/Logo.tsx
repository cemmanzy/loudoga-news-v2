import Image from "next/image";
import Link from "next/link";
import { FaMicrophoneAlt } from "react-icons/fa";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({ size = "lg" }: LogoProps) {
  const config = {
    sm: {
      logo: 42,
      mic: 34,
      title: "text-xl",
      subtitle: "text-[10px]",
      news: "px-1.5 py-0.5",
      micIcon: 14,
    },

    md: {
      logo: 52,
      mic: 40,
      title: "text-3xl",
      subtitle: "text-xs",
      news: "px-2 py-1",
      micIcon: 17,
    },

    lg: {
      logo: 50,
      mic: 42,
      title: "text-5xl",
      subtitle: "text-sm",
      news: "px-2 py-1",
      micIcon: 20,
    },
  };

  const current = config[size];

  return (
    <Link
      href="/"
      className="flex items-center"
      aria-label="Loudoga News"
    >
      {/* =================================
          BRAND ICONS
      ================================= */}

      <div className="flex items-center gap-1">
        {/* Microphone */}

        <div
          className="
            flex
            items-center
            justify-center
            rounded-full
            bg-[#C8102E]
            text-white
            shadow-sm
            flex-shrink-0
          "
          style={{
            width: current.mic,
            height: current.mic,
          }}
        >
          <FaMicrophoneAlt
            size={current.micIcon}
          />
        </div>

        {/* Fan Logo */}

        <Image
          src="/images/loudoga-fan-logo-transparent.png"
          alt="Loudoga News logo"
          width={current.logo}
          height={current.logo}
          priority
          className="object-contain flex-shrink-0"
        />
      </div>

      {/* =================================
          BRAND NAME
      ================================= */}

      <div className="ml-1.5 min-w-0">
        <h1
          className={`
            ${current.title}
            flex
            items-center
            whitespace-nowrap
            font-black
            leading-none
            tracking-tight
          `}
        >
          <span className="text-[#C99700]">
            LOUD
          </span>

          <span className="text-[#111827] dark:text-white">
            OGA
          </span>

          <span
            className={`
              ${current.news}
              ml-1
              rounded
              bg-[#C8102E]
              text-white
              leading-none
            `}
          >
            NEWS
          </span>
        </h1>

        {/* Subtitle */}

        <p
          className={`
            ${current.subtitle}
            mt-1
            whitespace-nowrap
            tracking-wide
            text-gray-500
            dark:text-gray-400
          `}
        >
          Trusted Journalism • Breaking News
        </p>
      </div>
    </Link>
  );
}