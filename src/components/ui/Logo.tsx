import Image from "next/image";
import Link from "next/link";
import { FaMicrophoneAlt } from "react-icons/fa";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  size = "lg",
}: LogoProps) {
  const config = {
    sm: {
      logo: 42,
      mic: 34,
      title: "text-xl",
      subtitle: "text-[10px]",
    },

    md: {
      logo: 52,
      mic: 40,
      title: "text-3xl",
      subtitle: "text-xs",
    },

    lg: {
      logo: 50,
      mic: 42,
      title: "text-5xl",
      subtitle: "text-sm",
    },
  };

  const current = config[size];

  return (
    <Link
      href="/"
      className="
        flex
        items-center
      "
      aria-label="Loudoga News"
    >

      {/* =====================================
          BRAND ICON
          ===================================== */}

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
          "
          style={{
            width: current.mic,
            height: current.mic,
          }}
        >
          <FaMicrophoneAlt
            size={
              size === "lg"
                ? 20
                : size === "md"
                ? 17
                : 14
            }
          />
        </div>

        {/* Fan Logo */}

        <Image
          src="/images/loudoga-fan-logo.webp"
          alt="Loudoga News logo"
          width={current.logo}
          height={current.logo}
          priority
          className="
            object-contain
          "
        />

      </div>

      {/* =====================================
          BRAND NAME
          ===================================== */}

      <div className="ml-1.5">

        <h1
          className={`
            ${current.title}
            font-black
            leading-none
            tracking-tight
          `}
        >

          {/* LOUD */}

          <span className="text-[#C99700]">
            LOUD
          </span>

          {" "}

          {/* OGA */}

          <span
            className="
              text-[#111827]
              dark:text-white
            "
          >
            OGA
          </span>

          {" "}

          {/* NEWS */}

          <span
            className="
              rounded
              bg-[#C8102E]
              px-2
              py-1
              text-white
            "
          >
            NEWS
          </span>

        </h1>

        {/* Subtitle */}

        <p
          className={`
            ${current.subtitle}
            mt-1
            tracking-wide
            text-gray-500
            dark:text-gray-300
          `}
        >
          Trusted Journalism • Breaking News
        </p>

      </div>

    </Link>
  );
}