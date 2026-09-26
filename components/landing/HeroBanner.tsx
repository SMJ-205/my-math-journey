"use client";

import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/lib/translations";

interface HeroBannerProps {
  onStartClick: () => void;
}

export function HeroBanner({ onStartClick }: HeroBannerProps) {
  const { language } = useLanguageStore();
  const t = translations[language] || translations.id;

  return (
    <section className="relative w-full overflow-hidden rounded-3xl shadow-2xl bg-[#d4eef7]">
      {/* Responsive hero image
          Mobile: natural height, image anchored to top (title "My Math Journey" always visible)
          Desktop: fixed height, image anchored to top
      */}
      <picture className="block w-full">
        {/* Desktop / tablet — horizontal 16:9, capped height, top-anchored */}
        <source media="(min-width: 768px)" srcSet="/images/hero-web.jpeg" />
        {/* Mobile — vertical 9:16, full natural height so nothing is cut off */}
        <img
          src="/images/hero-mobile.jpeg"
          alt={`${t.appTitle} — ${t.appSubtitle}`}
          className="
            w-full
            object-cover object-top
            md:max-h-[560px]
          "
          loading="eager"
          fetchPriority="high"
        />
      </picture>

      {/* Subtle bottom shadow overlay */}
      <div className="absolute inset-x-0 bottom-0 h-48 md:h-36 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none" />

      {/* CTA button positioned right in the center of the grass meadow on mobile */}
      <div className="hero-cta-container">
        <button
          id="btn-start-journey"
          onClick={onStartClick}
          className="
            w-full max-w-xs md:max-w-sm
            py-4 px-8
            text-xl md:text-2xl font-bold text-white
            bg-amber-500 hover:bg-amber-400 active:scale-95
            rounded-full shadow-2xl border-4 border-white
            transition-all duration-150 cursor-pointer
            focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300
          "
        >
          {t.startAdventure}
        </button>
      </div>
    </section>
  );
}
