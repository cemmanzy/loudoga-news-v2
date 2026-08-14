import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";

import { FaXTwitter } from "react-icons/fa6";

import ThemeToggle from "./ThemeToggle";

export default function TopBar() {
  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="bg-[#111827] text-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

        {/* Social Links */}

        <div className="flex items-center gap-4">

          <Link
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#C8102E]"
          >
            <FaXTwitter />
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#C8102E]"
          >
            <FaInstagram />
          </Link>

          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#C8102E]"
          >
            <FaFacebookF />
          </Link>

          <Link
            href="https://t.me"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#C8102E]"
          >
            <FaTelegram />
          </Link>

          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#C8102E]"
          >
            <FaLinkedinIn />
          </Link>

          <Link
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#C8102E]"
          >
            <FaTiktok />
          </Link>

          <Link
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-[#C8102E]"
          >
            <FaYoutube />
          </Link>

          {/* Theme Toggle */}

          <span className="mx-1 h-5 w-px bg-white/20" />

          <ThemeToggle />

        </div>


        {/* Date */}

        <div className="hidden text-sm md:block">
          {today}
        </div>


        {/* Tagline */}

        <div className="hidden text-sm lg:block">
          Truth • Accuracy • Integrity
        </div>

      </div>

    </div>
  );
}