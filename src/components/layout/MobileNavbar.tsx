"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

import type { MenuCategory } from "@/types/menu";

import { socials } from "@/config/socials";




import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

interface Props {
  menu: MenuCategory[];
}

export default function MobileNavbar({
  menu,
}: Props) {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      {/* Mobile Navigation Bar */}

      <div className="flex items-center justify-between px-4 py-4 lg:hidden">

        <button
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
          className="rounded-lg p-2 hover:bg-gray-100"
        >
          <FaBars className="text-2xl" />
        </button>

        <Link
          href="/"
          className="text-lg font-black tracking-wide text-[#C8102E]"
        >
          LOUDOGA NEWS
        </Link>

        <div className="w-8" />
      </div>

      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300 ${
          open
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}

      <aside
        className={`fixed left-0 top-0 z-[9999] h-screen w-[320px] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-black text-[#C8102E]">
            LOUDOGA NEWS
          </h2>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close Menu"
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <FaTimes className="text-xl" />
          </button>

        </div>

        {/* Menu */}

        <nav className="py-2">

          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block border-b px-6 py-4 font-semibold hover:bg-gray-50"
          >
            Home
          </Link>

          {menu.map((category) => (
            <Link
              key={category._id}
              href={`/category/${category.slug}`}
              onClick={() => setOpen(false)}
              className="block border-b px-6 py-4 hover:bg-gray-50"
            >
              {category.title}
            </Link>
          ))}

        </nav>

        {/* Footer */}

<div className="border-t p-6">

  <Link
    href="/subscribe"
    onClick={() => setOpen(false)}
    className="block rounded-xl bg-[#C8102E] py-3 text-center font-bold text-white transition hover:bg-[#a90d27]"
  >
    Subscribe
  </Link>

  <div className="mt-8 flex justify-center gap-6 text-xl text-gray-600">

  <a
    href={socials.facebook}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="transition hover:text-[#1877F2]"
  >
    <FaFacebookF />
  </a>

  <a
    href={socials.x}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="X"
    className="transition hover:text-black"
  >
    <FaXTwitter />
  </a>

  <a
    href={socials.instagram}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="transition hover:text-pink-600"
  >
    <FaInstagram />
  </a>

  <a
    href={socials.youtube}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
    className="transition hover:text-red-600"
  >
    <FaYoutube />
  </a>

</div>

  <p className="mt-8 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Loudoga News
  </p>

</div>
      </aside>
    </>
  );
}