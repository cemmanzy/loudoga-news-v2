import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

export default function TopBar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-[#111827] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">

        <div className="flex items-center gap-4">

          <Link
            href="https://x.com"
            target="_blank"
            className="transition hover:text-[#C8102E]"
          >
            <FaXTwitter />
          </Link>

          <Link
            href="https://instagram.com"
            target="_blank"
            className="transition hover:text-[#C8102E]"
          >
            <FaInstagram />
          </Link>

          <Link
            href="https://facebook.com"
            target="_blank"
            className="transition hover:text-[#C8102E]"
          >
            <FaFacebookF />
          </Link>

          <Link
            href="https://t.me"
            target="_blank"
            className="transition hover:text-[#C8102E]"
          >
            <FaTelegram />
          </Link>

          <Link
            href="https://linkedin.com"
            target="_blank"
            className="transition hover:text-[#C8102E]"
          >
            <FaLinkedinIn />
          </Link>

          <Link
            href="https://tiktok.com"
            target="_blank"
            className="transition hover:text-[#C8102E]"
          >
            <FaTiktok />
          </Link>

          <Link
            href="https://youtube.com"
            target="_blank"
            className="transition hover:text-[#C8102E]"
          >
            <FaYoutube />
          </Link>

        </div>

        <div className="hidden md:block text-sm">
          {today}
        </div>

        <div className="hidden lg:block text-sm">
          Truth • Accuracy • Integrity
        </div>

      </div>
    </div>
  );
}