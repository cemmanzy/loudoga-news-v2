import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import ThemeToggle from "./ThemeToggle";

import { getSiteSettings } from "@/sanity/loaders/siteSettings";

/* =========================================
   SOCIAL ICON
========================================= */

interface SocialIconProps {
  platform: string;
}

function SocialIcon({ platform }: SocialIconProps) {
  const name = platform.toLowerCase().trim();

  if (name.includes("facebook")) {
    return <FaFacebookF />;
  }

  if (name.includes("instagram")) {
    return <FaInstagram />;
  }

  if (name.includes("linkedin")) {
    return <FaLinkedinIn />;
  }

  if (name.includes("telegram")) {
    return <FaTelegram />;
  }

  if (name.includes("tiktok")) {
    return <FaTiktok />;
  }

  if (name.includes("youtube")) {
    return <FaYoutube />;
  }

  if (name === "x" || name.includes("twitter")) {
    return <FaXTwitter />;
  }

  return null;
}

/* =========================================
   TOP BAR
========================================= */

export default async function TopBar() {
  const settings = await getSiteSettings();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-[#111827] text-white">
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-4
          py-2
        "
      >
        {/* =====================================
            SOCIAL LINKS
        ====================================== */}

        <div className="flex items-center gap-4">
          {settings?.socialLinks?.map((social) => {
            const icon = (
              <SocialIcon platform={social.platform} />
            );

            if (!icon || !social.url) {
              return null;
            }

            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                title={social.platform}
                className="
                  transition
                  hover:text-[#C8102E]
                "
              >
                {icon}
              </a>
            );
          })}

          {/* =====================================
              THEME TOGGLE
          ====================================== */}

          <span className="mx-1 h-5 w-px bg-white/20" />

          <ThemeToggle />
        </div>

        {/* =====================================
            DATE
        ====================================== */}

        <div className="hidden text-sm md:block">
          {today}
        </div>

        {/* =====================================
            TAGLINE
        ====================================== */}

        <div className="hidden text-sm lg:block">
          Truth • Accuracy • Integrity
        </div>
      </div>
    </div>
  );
}