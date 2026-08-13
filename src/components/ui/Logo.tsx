import Image from "next/image";
import Link from "next/link";
import { FaMicrophoneAlt } from "react-icons/fa";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  size = "lg",
}: LogoProps) {
  const sizes = {
    sm: {
      image: "h-8 w-8",
      title: "text-lg",
      mic: "p-1.5",
      micSize: 14,
    },

    md: {
      image: "h-12 w-12",
      title: "text-2xl md:text-3xl",
      mic: "p-2",
      micSize: 18,
    },

    lg: {
      image: "h-8 w-8 sm:h-10 sm:w-10 md:h-14 md:w-14 lg:h-20 lg:w-20",
      title:
        "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
      mic: "p-1.5 sm:p-2 md:p-2.5",
      micSize: 16,
    },
  };

  const current = sizes[size];

  return (
    <Link
      href="/"
      className="flex min-w-0 max-w-full items-center gap-2 overflow-hidden"
    >
      {/* Microphone */}

      <div
        className={`flex-shrink-0 rounded-full bg-[#C8102E] text-white shadow-md ${current.mic}`}
      >
        <FaMicrophoneAlt size={current.micSize} />
      </div>

      {/* Small logo image */}

      <Image
        src="/images/logo.png"
        alt="LOUD OGA NEWS"
        width={110}
        height={110}
        priority
        className={`flex-shrink-0 object-contain ${current.image}`}
      />

      {/* Brand */}

      <div className="min-w-0 overflow-hidden">
        <h1
          className={`${current.title} whitespace-nowrap font-black leading-none tracking-tight`}
        >
          <span className="text-[#C99700]">
            LOUD
          </span>{" "}

          <span className="text-[#111827]">
            OGA
          </span>{" "}

          <span className="rounded bg-[#C8102E] px-1.5 py-1 text-white sm:px-2">
            NEWS
          </span>
        </h1>

        <p className="hidden text-sm tracking-wide text-gray-500 md:block">
          Trusted Journalism • Breaking News
        </p>
      </div>
    </Link>
  );
}