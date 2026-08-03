import Image from "next/image";
import Link from "next/link";

import { FaMicrophoneAlt } from "react-icons/fa";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  size = "lg",
}: LogoProps) {
  const logoSize = {
    sm: 50,
    md: 70,
    lg: 110,
  };

  const titleSize = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <Link
      href="/"
      className="flex items-center gap-2"
    >
      {/* Microphone */}

      <div className="rounded-full bg-[#C8102E] p-2 text-white shadow-md">

        <FaMicrophoneAlt size={20} />

      </div>

      {/* Logo */}

      <Image
        src="/images/logo.png"
        alt="LOUD OGA NEWS"
        width={logoSize[size]}
        height={logoSize[size]}
        priority
      />

      {/* Brand */}

      <div>

        <h1
          className={`${titleSize[size]} font-black leading-none tracking-tight`}
        >
          <span className="text-[#C99700]">
            LOUD
          </span>{" "}

          <span className="text-[#111827]">
            OGA
          </span>{" "}

          <span className="rounded bg-[#C8102E] px-2 py-1 text-white">
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