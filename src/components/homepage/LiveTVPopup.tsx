"use client";

import { useEffect, useState } from "react";

import {
  FaYoutube,
  FaShareAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface Props {
  youtubeUrl: string;
  title?: string;
}

/* =========================================
   GET YOUTUBE VIDEO ID
========================================= */

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    /*
     * youtube.com/watch?v=VIDEO_ID
     */
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return videoId;
      }

      /*
       * youtube.com/live/VIDEO_ID
       */
      const liveMatch = parsedUrl.pathname.match(
        /\/live\/([^/?]+)/
      );

      if (liveMatch?.[1]) {
        return liveMatch[1];
      }

      /*
       * youtube.com/embed/VIDEO_ID
       */
      const embedMatch = parsedUrl.pathname.match(
        /\/embed\/([^/?]+)/
      );

      if (embedMatch?.[1]) {
        return embedMatch[1];
      }
    }

    /*
     * youtu.be/VIDEO_ID
     */
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.replace("/", "");
    }

    return null;
  } catch {
    return null;
  }
}

/* =========================================
   LIVE TV
========================================= */

export default function LiveTVPopup({
  youtubeUrl,
  title = "Loud Oga News Live",
}: Props) {
  const [visible, setVisible] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [shared, setShared] = useState(false);

  /* =========================================
     SHOW PLAYER AFTER 5 SECONDS
  ========================================== */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  /* =========================================
     WATCH HERO VISIBILITY

     IMPORTANT:
     This ONLY controls visual visibility.

     It NEVER pauses the YouTube player.
  ========================================== */

  useEffect(() => {
    const hero = document.getElementById(
      "hero-section"
    );

    if (!hero) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  const videoId = getYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    return null;
  }

  const youtubeWatchUrl =
    `https://www.youtube.com/watch?v=${videoId}`;

  /* =========================================
     SHARE
  ========================================== */

  const handleShare = async () => {
    const shareData = {
      title,
      text: "Watch Loud Oga News & TV live.",
      url: youtubeWatchUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          youtubeWatchUrl
        );

        setShared(true);

        window.setTimeout(() => {
          setShared(false);
        }, 2500);
      }
    } catch {
      /*
       * User cancelled the native share dialog.
       */
    }
  };

  return (
    /*
     * IMPORTANT:
     *
     * This component remains mounted for the
     * entire homepage.
     *
     * We NEVER unmount the iframe because of
     * scrolling.
     */
    <div className="relative w-full">
      {/* =========================================
          PLAYER
      ========================================== */}

      <section
        aria-label={title}
        className={`
          w-full
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-[#0F172A]
          shadow-xl

          transition-all
          duration-500
          ease-out

          ${
            visible && heroInView
              ? "translate-x-0 opacity-100"
              : "pointer-events-none -translate-x-[115%] opacity-0"
          }
        `}
      >
        {/* =========================================
            HEADER
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-4
            py-3

            sm:px-5
          "
        >
          {/* Brand */}

          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex
                h-9
                w-9
                flex-shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#C8102E]
                text-white
              "
            >
              <FaYoutube />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-2
                    w-2
                    animate-pulse
                    rounded-full
                    bg-red-500
                  "
                />

                <span
                  className="
                    text-[11px]
                    font-black
                    uppercase
                    tracking-widest
                    text-red-400
                  "
                >
                  Live
                </span>
              </div>

              <h2
                className="
                  truncate
                  text-sm
                  font-bold
                  text-white

                  sm:text-base
                "
              >
                {title}
              </h2>
            </div>
          </div>

          {/* YouTube link */}

          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              flex-shrink-0
              items-center
              gap-2
              text-xs
              font-semibold
              text-gray-300
              transition
              hover:text-white
            "
          >
            <span className="hidden sm:inline">
              YouTube
            </span>

            <FaExternalLinkAlt className="text-xs" />
          </a>
        </div>

        {/* =========================================
            VIDEO

            IMPORTANT:
            We NEVER remove this iframe when
            scrolling.

            YouTube therefore keeps the same
            playback session.
        ========================================== */}

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={
              `https://www.youtube.com/embed/${videoId}` +
              `?autoplay=1` +
              `&mute=1` +
              `&rel=0` +
              `&playsinline=1` +
              `&enablejsapi=1` +
              `&origin=${
                typeof window !== "undefined"
                  ? window.location.origin
                  : ""
              }`
            }
            title={title}
            className="
              absolute
              inset-0
              h-full
              w-full
            "
            allow="
              autoplay;
              encrypted-media;
              picture-in-picture;
              fullscreen
            "
            allowFullScreen
          />
        </div>

        {/* =========================================
            ACTION BAR
        ========================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-4
            py-3

            sm:px-5
          "
        >
          <p className="truncate text-xs text-gray-400">
            Watch Loud Oga News & TV live
          </p>

          <div
            className="
              flex
              flex-shrink-0
              items-center
              gap-2
            "
          >
            {/* Share */}

            <button
              type="button"
              onClick={handleShare}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                px-3
                py-2
                text-xs
                font-bold
                text-white
                transition
                hover:border-white/30
                hover:bg-white/10
              "
            >
              <FaShareAlt />

              <span>
                {shared ? "Copied!" : "Share"}
              </span>
            </button>

            {/* Watch on YouTube */}

            <a
              href={youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#C8102E]
                px-3
                py-2
                text-xs
                font-bold
                text-white
                transition
                hover:bg-[#A90D27]
              "
            >
              <FaYoutube />

              <span className="hidden sm:inline">
                Watch on YouTube
              </span>

              <span className="sm:hidden">
                YouTube
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}