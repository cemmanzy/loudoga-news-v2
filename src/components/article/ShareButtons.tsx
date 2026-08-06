"use client";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
  FaLink,
} from "react-icons/fa6";

interface Props {
  title: string;
}

export default function ShareButtons({
  title,
}: Props) {
  const url =
    typeof window !== "undefined"
      ? window.location.href
      : "";

  const encodedUrl = encodeURIComponent(url);

  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);

    alert("Article link copied.");
  };

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">

      <button
        onClick={() =>
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            "_blank"
          )
        }
        className="rounded-full bg-[#1877F2] p-3 text-white transition hover:scale-110"
      >
        <FaFacebookF />
      </button>

      <button
        onClick={() =>
          window.open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
            "_blank"
          )
        }
        className="rounded-full bg-black p-3 text-white transition hover:scale-110"
      >
        <FaXTwitter />
      </button>

      <button
        onClick={() =>
          window.open(
            `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
            "_blank"
          )
        }
        className="rounded-full bg-green-500 p-3 text-white transition hover:scale-110"
      >
        <FaWhatsapp />
      </button>

      <button
        onClick={() =>
          window.open(
            `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
            "_blank"
          )
        }
        className="rounded-full bg-sky-500 p-3 text-white transition hover:scale-110"
      >
        <FaTelegram />
      </button>

      <button
        onClick={() =>
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
            "_blank"
          )
        }
        className="rounded-full bg-[#0A66C2] p-3 text-white transition hover:scale-110"
      >
        <FaLinkedinIn />
      </button>

      <button
        onClick={copyLink}
        className="rounded-full bg-gray-700 p-3 text-white transition hover:scale-110"
      >
        <FaLink />
      </button>

    </div>
  );
}