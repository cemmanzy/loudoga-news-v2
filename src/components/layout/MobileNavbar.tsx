"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

import type { MenuCategory } from "@/types/menu";
import { socials } from "@/config/socials";

interface Props {
  menu: MenuCategory[];
}

export default function MobileNavbar({
  menu,
}: Props) {
  const [open, setOpen] = useState(false);

  /* =========================================
     LOCK BODY SCROLL WHEN MENU IS OPEN
     ========================================= */

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* =========================================
     CLOSE MENU WITH ESCAPE
     ========================================= */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <>
      {/* =====================================
          MOBILE NAVIGATION BAR
          ===================================== */}

      <div
        className="
          flex
          w-full
          items-center
          justify-between
          border-t
          border-gray-200
          bg-white
          px-4
          py-4
          text-gray-900
          transition-colors
          duration-300
          dark:border-gray-700
          dark:bg-[#0F172A]
          dark:text-white
          lg:hidden
        "
      >

        {/* Menu Button */}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-lg
            text-gray-900
            transition
            hover:bg-gray-100
            hover:text-[#C8102E]
            dark:text-white
            dark:hover:bg-gray-800
            dark:hover:text-[#C8102E]
          "
        >
          <FaBars className="text-2xl" />
        </button>

        {/* Mobile Brand */}

        <Link
          href="/"
          className="
            text-lg
            font-black
            tracking-wide
            text-[#C8102E]
          "
        >
          LOUDOGA NEWS
        </Link>

        {/* Right Spacer */}

        <div className="h-11 w-11" />
      </div>

      {/* =====================================
          DARK OVERLAY
          ===================================== */}

      <div
        aria-hidden={!open}
        onClick={closeMenu}
        className={`
          fixed
          inset-0
          z-[9998]
          bg-black/60
          transition-opacity
          duration-300
          ${
            open
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      {/* =====================================
          MOBILE DRAWER
          ===================================== */}

      <aside
        aria-label="Mobile navigation"
        className={`
          fixed
          left-0
          top-0
          z-[9999]
          flex
          h-[100dvh]
          w-[85vw]
          max-w-[360px]
          flex-col
          overflow-x-hidden
          overflow-y-auto
          bg-white
          text-gray-900
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          dark:bg-[#111827]
          dark:text-white
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* =====================================
            DRAWER HEADER
            ===================================== */}

        <div
          className="
            flex
            flex-shrink-0
            items-center
            justify-between
            border-b
            border-gray-200
            px-5
            py-5
            dark:border-gray-700
          "
        >

          <Link
            href="/"
            onClick={closeMenu}
            className="
              text-xl
              font-black
              tracking-tight
              text-[#C8102E]
            "
          >
            LOUDOGA NEWS
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-gray-800
              transition
              hover:bg-gray-100
              hover:text-[#C8102E]
              dark:text-white
              dark:hover:bg-gray-800
              dark:hover:text-[#C8102E]
            "
          >
            <FaTimes className="text-xl" />
          </button>

        </div>

        {/* =====================================
            MENU
            ===================================== */}

        <nav className="flex-1 py-2">

          {/* Home */}

          <Link
            href="/"
            onClick={closeMenu}
            className="
              flex
              min-h-[58px]
              items-center
              border-b
              border-gray-200
              px-6
              text-base
              font-semibold
              text-gray-900
              transition
              hover:bg-gray-50
              hover:text-[#C8102E]
              dark:border-gray-700
              dark:text-white
              dark:hover:bg-gray-800
            "
          >
            Home
          </Link>

          {/* Categories */}

          {menu.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              onClick={closeMenu}
              className="
                flex
                min-h-[58px]
                items-center
                border-b
                border-gray-200
                px-6
                text-base
                font-medium
                uppercase
                tracking-wide
                text-gray-800
                transition
                hover:bg-gray-50
                hover:text-[#C8102E]
                dark:border-gray-700
                dark:text-gray-200
                dark:hover:bg-gray-800
              "
            >
              {category.title}
            </Link>
          ))}

        </nav>

        {/* =====================================
            DRAWER FOOTER
            ===================================== */}

        <div
          className="
            flex-shrink-0
            border-t
            border-gray-200
            p-6
            dark:border-gray-700
          "
        >

          {/* Subscribe */}

          <Link
            href="/subscribe"
            onClick={closeMenu}
            className="
              block
              rounded-xl
              bg-[#C8102E]
              py-3.5
              text-center
              font-bold
              text-white
              transition
              hover:bg-[#A90D27]
            "
          >
            Subscribe
          </Link>

          {/* Social Icons */}

          <div
            className="
              mt-7
              flex
              justify-center
              gap-6
              text-xl
              text-gray-600
              dark:text-gray-300
            "
          >

            <a
              href={socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="
                transition
                hover:text-[#1877F2]
              "
            >
              <FaFacebookF />
            </a>

            <a
              href={socials.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="
                transition
                hover:text-black
                dark:hover:text-white
              "
            >
              <FaXTwitter />
            </a>

            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                transition
                hover:text-pink-600
              "
            >
              <FaInstagram />
            </a>

            <a
              href={socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="
                transition
                hover:text-red-600
              "
            >
              <FaYoutube />
            </a>

          </div>

          {/* Copyright */}

          <p
            className="
              mt-7
              text-center
              text-xs
              text-gray-500
              dark:text-gray-400
            "
          >
            © {new Date().getFullYear()} Loudoga News
          </p>

        </div>

      </aside>
    </>
  );
}