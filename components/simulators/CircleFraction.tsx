"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguageStore } from "@/store/languageStore";

interface CircleFractionProps {
  totalSegments: number;
  filledSegments: number;
  interactive?: boolean;
  showFractionLabel?: boolean;
  onSegmentSelect?: (filled: number) => void;
}

export function CircleFractionSimulator({
  totalSegments,
  filledSegments,
  interactive = false,
  showFractionLabel = false,
  onSegmentSelect,
}: CircleFractionProps) {
  const { language } = useLanguageStore();
  const isEn = language === "en";
  const [selected, setSelected] = useState(filledSegments);

  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 90;

  function polarToXY(angle: number, radius: number) {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  }

  function segmentPath(index: number) {
    const anglePerSegment = 360 / totalSegments;
    const startAngle = index * anglePerSegment;
    const endAngle = startAngle + anglePerSegment;
    const start = polarToXY(startAngle, r);
    const end = polarToXY(endAngle, r);
    const largeArc = anglePerSegment > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`;
  }

  const handleSegmentClick = (i: number) => {
    if (!interactive) return;
    const newSelected = i + 1 === selected ? 0 : i + 1;
    setSelected(newSelected);
    onSegmentSelect?.(newSelected);
  };

  return (
    <div className="flex flex-col items-center gap-5 py-2">
      <p className="text-gray-500 text-sm font-semibold">
        {interactive
          ? (isEn ? "Click parts to select" : "Klik bagian untuk memilih")
          : (isEn ? "Look at the shape below" : "Perhatikan gambar di bawah")}
      </p>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {Array.from({ length: totalSegments }).map((_, i) => {
          const isFilled = i < selected;
          return (
            <motion.path
              key={i}
              d={segmentPath(i)}
              fill={isFilled ? "#FBBF24" : "#FEF3C7"}
              stroke="white"
              strokeWidth={3}
              onClick={() => handleSegmentClick(i)}
              whileHover={interactive ? { scale: 1.04, originX: "50%", originY: "50%" } : {}}
              whileTap={interactive ? { scale: 0.97 } : {}}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 250 }}
              className={interactive ? "cursor-pointer" : ""}
              aria-label={`Bagian ${i + 1} dari ${totalSegments}`}
            />
          );
        })}
        {/* Center circle for pizza look */}
        <circle cx={cx} cy={cy} r={12} fill="#FDE68A" stroke="white" strokeWidth={2} />
      </svg>

      {/* Fraction label or segments indicator */}
      {showFractionLabel ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 bg-white rounded-2xl shadow px-6 py-3 border border-amber-100"
        >
          <div className="flex flex-col items-center leading-none">
            <span className="text-2xl font-black text-amber-600">{selected}</span>
            <div className="w-8 h-0.5 bg-gray-400 my-1" />
            <span className="text-2xl font-black text-gray-700">{totalSegments}</span>
          </div>
          <span className="text-base text-gray-500 font-semibold">
            {isEn ? "parts selected" : "bagian dipilih"}
          </span>
        </motion.div>
      ) : (
        <div className="flex items-center gap-2 bg-amber-50 text-amber-800 text-xs font-bold px-4 py-2 rounded-full border border-amber-200">
          <span>
            {isEn
              ? `Circle is divided into ${totalSegments} equal parts`
              : `Lingkaran dibagi menjadi ${totalSegments} bagian sama besar`}
          </span>
        </div>
      )}
    </div>
  );
}
