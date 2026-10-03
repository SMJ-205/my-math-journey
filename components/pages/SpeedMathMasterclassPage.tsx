"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  BookOpen,
  Layers,
  Percent,
  Calculator,
  Trophy,
  Sliders,
  RotateCcw,
  Target,
  Split,
  Scale,
  Repeat,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguageStore } from "@/store/languageStore";

interface SpeedMathMasterclassPageProps {
  initialGrade?: number;
  onBack: () => void;
}

export function SpeedMathMasterclassPage({
  initialGrade = 1,
  onBack,
}: SpeedMathMasterclassPageProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";

  const [activeModule, setActiveModule] = useState<number>(() => {
    if (initialGrade >= 1 && initialGrade <= 6) return initialGrade;
    return 1;
  });

  // ==========================================
  // Interactive states for sandboxes & widgets
  // ==========================================
  // Modul 1 (Kelas 1 SD: 1–20)
  const [bondsTarget, setBondsTarget] = useState<number>(7);
  const [bridgePair, setBridgePair] = useState<[number, number]>([8, 5]);
  const [nearDoublesPair, setNearDoublesPair] = useState<[number, number]>([6, 7]);
  const [downTenPair, setDownTenPair] = useState<[number, number]>([14, 6]);
  const [factTriPair, setFactTriPair] = useState<[number, number]>([7, 5]);

  // Modul 2 (Kelas 2 SD: Bilangan 1–100 & Komplemen 100)
  const [nikhilam100Subtrahend, setNikhilam100Subtrahend] = useState<number>(38);
  const [constDiffA, setConstDiffA] = useState<number>(83);
  const [constDiffB, setConstDiffB] = useState<number>(39);
  const [leftRight2A, setLeftRight2A] = useState<number>(46);
  const [leftRight2B, setLeftRight2B] = useState<number>(37);
  const [roundAdjustA, setRoundAdjustA] = useState<number>(38);
  const [roundAdjustB, setRoundAdjustB] = useState<number>(19);

  // Modul 3 (Kelas 3 SD: Ratusan s/d 1.000 & Perkalian Dasar)
  const [nikhilam1000Subtrahend, setNikhilam1000Subtrahend] = useState<number>(437);
  const [leftRightA, setLeftRightA] = useState<number>(467);
  const [leftRightB, setLeftRightB] = useState<number>(358);
  const [multFiveNum, setMultFiveNum] = useState<number>(18);
  const [multNineNum, setMultNineNum] = useState<number>(24);
  const [teenMultA, setTeenMultA] = useState<number>(12);
  const [teenMultB, setTeenMultB] = useState<number>(14);

  // Modul 4 (Kelas 4 SD: Bilangan 10.000 & Perkalian Menengah)
  const [nikhilamSubtrahend, setNikhilamSubtrahend] = useState<number>(3648);
  const [sameTensA, setSameTensA] = useState<number>(43);
  const [sameTensB, setSameTensB] = useState<number>(47);
  const [tensSum10A, setTensSum10A] = useState<number>(74);
  const [tensSum10B, setTensSum10B] = useState<number>(34);
  const [multElevenNum, setMultElevenNum] = useState<number>(53);
  const [halveDoubleA, setHalveDoubleA] = useState<number>(16);
  const [halveDoubleB, setHalveDoubleB] = useState<number>(35);

  // Modul 5 (Kelas 5 SD: Pecahan, Pembagian Cepat & KPK/FPB)
  const [percentSwapCase, setPercentSwapCase] = useState<{ percent: number; num: number }>({
    percent: 16,
    num: 50,
  });
  const [power10DivInput, setPower10DivInput] = useState<number>(214);
  const [power10DivMode, setPower10DivMode] = useState<5 | 25 | 125>(5);
  const [ladderA, setLadderA] = useState<number>(12);
  const [ladderB, setLadderB] = useState<number>(18);
  const [ladderTab, setLadderTab] = useState<"fpb" | "kpk">("fpb");
  const [crissCrossA, setCrissCrossA] = useState<number>(32);
  const [crissCrossB, setCrissCrossB] = useState<number>(43);
  const [crissCrossPhase, setCrissCrossPhase] = useState<1 | 2 | 3>(1);

  // Modul 6 (Kelas 6 SD & Olimpiade: Alur Balik, Pemisalan & OSN)
  const [rewindStep, setRewindStep] = useState<number>(0);
  const [suppositionCorrect, setSuppositionCorrect] = useState<number>(22);
  const [gaussN, setGaussN] = useState<number>(100);
  const [squareFiveTens, setSquareFiveTens] = useState<number>(8);
  const [cubeRootInput, setCubeRootInput] = useState<number>(24389);
  const [base100Mode, setBase100Mode] = useState<"below" | "above" | "mixed">("below");
  const [mystery1001Num, setMystery1001Num] = useState<number>(345);

  const modules = [
    {
      id: 1,
      gradeNum: 1,
      title: isEn ? "Grade 1" : "Kelas 1 SD",
      subtitle: isEn ? "Basic 1–20 (No Fingers)" : "Aritmetika 1–20 Tanpa Jari",
      levelBadge: "Fase A (Kls 1)",
      Icon: BookOpen,
    },
    {
      id: 2,
      gradeNum: 2,
      title: isEn ? "Grade 2" : "Kelas 2 SD",
      subtitle: isEn ? "Numbers 1–100 & 100 Complement" : "Bilangan 1–100 & Komplemen 100",
      levelBadge: "Fase A (Kls 2)",
      Icon: Zap,
    },
    {
      id: 3,
      gradeNum: 3,
      title: isEn ? "Grade 3" : "Kelas 3 SD",
      subtitle: isEn ? "Numbers to 1,000 & Times Tables" : "Bilangan 1.000 & Perkalian",
      levelBadge: "Fase B (Kls 3)",
      Icon: Layers,
    },
    {
      id: 4,
      gradeNum: 4,
      title: isEn ? "Grade 4" : "Kelas 4 SD",
      subtitle: isEn ? "10,000 & Mental Speed Hacks" : "Bilangan 10.000 & Jurus Mental",
      levelBadge: "Fase B (Kls 4)",
      Icon: Calculator,
    },
    {
      id: 5,
      gradeNum: 5,
      title: isEn ? "Grade 5" : "Kelas 5 SD",
      subtitle: isEn ? "Fractions, Division & GCF/LCM" : "Pecahan, Pembagian & KPK",
      levelBadge: "Fase C (Kls 5)",
      Icon: Percent,
    },
    {
      id: 6,
      gradeNum: 6,
      title: isEn ? "Grade 6 & OSN" : "Kelas 6 & OSN",
      subtitle: isEn ? "Rewind Flow & Math Olympiad" : "Alur Balik & Olimpiade",
      levelBadge: "Fase C+ (Kls 6)",
      Icon: Trophy,
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-[#F4F7FB]">
      <PageHeader
        showBack
        onBack={onBack}
        title={isEn ? "Speed Math Masterclass" : "Kelas Mahir"}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col gap-5 sm:gap-6">
        {/* Hero Banner - Soft Light Navy Theme */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EAF1F9] via-[#DEEAF6] to-[#CBDDF1] p-5 sm:p-7 text-[#1E3352] border-2 border-[#B9D1EC] shadow-xs">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-white/80 backdrop-blur-md uppercase tracking-wider text-[#213C63] border border-white/90 shadow-2xs">
              <Sparkles size={13} className="text-[#2B4B77]" />
              {isEn ? "CPA Visual & Math Hacks Blueprint" : "Kompendium Math Hacks & Heuristik SD"}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black mt-2 leading-tight text-[#182C48]">
              {isEn
                ? "Speed Math Guide & Mental Computation"
                : "Panduan Hitung Cepat & Jurus Mental Matematika SD"}
            </h1>
            <p className="text-[#3F587D] text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
              {isEn
                ? "Interactive case-by-case visual guidelines and mental arithmetic techniques. Direct visual understanding without rote memorization."
                : "Panduan interaktif per studi kasus dengan visualisasi langsung. Bukan sekadar bank soal, melainkan jurus trik intuitif dari dasar hingga olimpiade."}
            </p>
          </div>
        </div>

        {/* Module Selector Tabs - Horizontal scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-1.5 px-0.5 max-w-full no-scrollbar sm:grid sm:grid-cols-3 md:grid-cols-6">
          {modules.map((m) => {
            const isActive = activeModule === m.id;
            const TabIcon = m.Icon;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveModule(m.id)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all cursor-pointer shrink-0 min-w-[110px] sm:min-w-0 ${
                  isActive
                    ? "bg-[#2B4A75] text-white border-[#213A5C] shadow-sm scale-[1.02]"
                    : "bg-[#EDF3FA] text-[#364F73] border-[#D0DFEF] hover:bg-[#E3EDF8] hover:border-[#BED3E8]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-colors ${
                    isActive ? "bg-white/20 text-white" : "bg-[#DBE7F5] text-[#24426B]"
                  }`}
                >
                  <TabIcon size={18} />
                </div>
                <span className="font-black text-xs leading-tight line-clamp-1">
                  {m.title}
                </span>
                <span
                  className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isActive ? "text-[#D2E4F8]" : "text-[#5C779B]"
                  }`}
                >
                  {m.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* ========================================================= */}
            {/* MODUL 1: ARITMETIKA DASAR & NILAI TEMPAT (KELAS 1-2)       */}
            {/* ========================================================= */}
            {activeModule === 1 && (
              <div className="flex flex-col gap-5">
                {/* 1.1 Pasangan Sepuluh (Ten-Frame) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Number Bonds of 10 (Ten-Frame)" : "Pasangan Sepuluh (Ten-Frame Sahabat 10)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Every single digit has exactly one companion number that completes it into 10. Visualizing these friendly pairs eliminates reliance on finger counting."
                      : "Setiap angka satu digit memiliki pasangan tepat yang melengkapinya menjadi 10. Visualisasi petak sepuluh ini menghilangkan kebiasaan menghitung jari secara lambat."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">
                        {isEn ? "Choose starting number:" : "Pilih angka awal:"}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <button
                            key={n}
                            onClick={() => setBondsTarget(n)}
                            className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              bondsTarget === n
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-white rounded-2xl border-2 border-[#CADDF0] shadow-2xs max-w-full">
                      {Array.from({ length: 10 }).map((_, i) => {
                        const isFilled = i < bondsTarget;
                        return (
                          <motion.div
                            key={i}
                            layout
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center font-black text-sm transition-all ${
                              isFilled
                                ? "bg-gradient-to-br from-indigo-500 to-blue-600 border-indigo-600 text-white shadow-xs"
                                : "bg-amber-50/80 border-dashed border-amber-300 text-amber-500"
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full inline-block bg-current opacity-90" />
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="text-center">
                      <span className="text-sm sm:text-base font-black text-[#182C48] bg-white px-4 py-1.5 rounded-xl border border-[#CADDF0] shadow-2xs">
                        <span className="text-indigo-600 font-black">{bondsTarget}</span> +{" "}
                        <span className="text-amber-600 font-black">{10 - bondsTarget}</span> = 10
                      </span>
                      <p className="text-xs text-[#415777] mt-2 font-medium">
                        Sahabat dari <span className="font-bold text-indigo-600">{bondsTarget}</span> adalah{" "}
                        <span className="font-bold text-amber-600">{10 - bondsTarget}</span> (kotak jingga madu).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1.2 Lompatan Melampaui 10 (Bridging Through 10) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Bridging Through 10" : "Lompatan Melampaui 10 (Jembatan Sepuluh)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Split the second number using the companion of the first to land smoothly on 10, then add the remainder."
                      : "Pecah bilangan kedua menggunakan sahabat 10 bilangan pertama agar mendarat di 10 terlebih dahulu, lalu tambahkan sisanya. Menghitung jadi secepat kilat tanpa jari!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">
                        {isEn ? "Select addition problem (1–20):" : "Pilih Penjumlahan Melampaui 10:"}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [8, 5],
                          [9, 6],
                          [7, 5],
                          [8, 7],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => setBridgePair([a, b])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              bridgePair[0] === a && bridgePair[1] === b
                                ? "bg-indigo-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} + {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const a = bridgePair[0];
                      const b = bridgePair[1];
                      const needed = 10 - a;
                      const rem = b - needed;
                      const sum = a + b;
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                            <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#CADDF0] shadow-2xs">
                              <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">
                                Soal Awal
                              </span>
                              <span className="font-bold text-sm sm:text-base text-[#182C48]">
                                <span className="text-indigo-600 font-black">{a}</span> +{" "}
                                <span className="text-amber-600 font-black">{b}</span>
                              </span>
                            </div>

                            <span className="text-[#7B94B2] font-black text-xs sm:text-sm">
                              ⟹ Pecah {b} jadi ({needed} + {rem}) ⟹
                            </span>

                            <div className="p-2.5 sm:p-3 bg-indigo-50 rounded-xl border-2 border-indigo-200 shadow-2xs">
                              <span className="text-[10px] text-indigo-700 font-sans font-bold block mb-0.5">
                                Mendarat di 10
                              </span>
                              <span className="font-black text-xs sm:text-sm text-indigo-950">
                                ({a} + {needed}) + {rem} = 10 + {rem}
                              </span>
                            </div>

                            <span className="text-[#7B94B2] font-black text-sm">=</span>

                            <div className="p-2.5 sm:p-3 bg-emerald-600 text-white rounded-xl font-black text-sm sm:text-base shadow-xs">
                              {sum}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 1.3 Bilangan Kembar & Hampir-Kembar (Doubles & Near-Doubles) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Doubles & Near-Doubles Strategy" : "Jurus Angka Kembar & Hampir-Kembar"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Memorize doubles first (6+6=12). For near-doubles, simply add or subtract 1 from the anchor double."
                      : "Hafalkan jangkar kembar (6+6=12, 7+7=14). Untuk angka hampir-kembar (6+7), cukup hitung kembar lalu tambah 1."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Hampir-Kembar:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [6, 7],
                          [7, 8],
                          [8, 9],
                          [5, 6],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => setNearDoublesPair([a, b])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              nearDoublesPair[0] === a && nearDoublesPair[1] === b
                                ? "bg-amber-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} + {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const a = nearDoublesPair[0];
                      const b = nearDoublesPair[1];
                      const doubleVal = a * 2;
                      const finalSum = a + b;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#CADDF0]">
                            <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">
                              Jangkar Kembar
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-[#182C48]">
                              {a} + {a} = <span className="text-amber-600 font-black">{doubleVal}</span>
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">+ 1 lebihnya ⟹</span>

                          <div className="p-2.5 sm:p-3 bg-amber-50 rounded-xl border-2 border-amber-300">
                            <span className="text-[10px] text-amber-800 font-sans font-bold block mb-0.5">
                              Hasil Instan
                            </span>
                            <span className="font-black text-xs sm:text-sm text-amber-950">
                              {doubleVal} + 1 = <span className="text-emerald-700 text-base">{finalSum}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 1.4 Pengurangan Mundur Menembus 10 (Down-Through-10 Subtraction) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Down-Through-10 Subtraction" : "Pengurangan Mundur Menembus 10"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Subtract just enough to hit 10, then subtract the rest from 10 using friendly number bonds."
                      : "Kurangkan sejumlah satuan agar tepat mendarat di 10 terlebih dahulu, lalu kurangkan sisanya dari 10 menggunakan sahabat 10."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Kasus Pengurangan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [14, 6],
                          [13, 5],
                          [15, 8],
                          [12, 7],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => setDownTenPair([a, b])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              downTenPair[0] === a && downTenPair[1] === b
                                ? "bg-teal-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} − {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const total = downTenPair[0];
                      const sub = downTenPair[1];
                      const step1Drop = total - 10;
                      const step2Drop = sub - step1Drop;
                      const res = total - sub;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#CADDF0]">
                            <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">
                              Langkah 1: Mundur ke 10
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-[#182C48]">
                              {total} − {step1Drop} = <span className="text-teal-700 font-black">10</span>
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                          <div className="p-2.5 sm:p-3 bg-teal-50 rounded-xl border-2 border-teal-300">
                            <span className="text-[10px] text-teal-800 font-sans font-bold block mb-0.5">
                              Langkah 2: Kurangkan Sisa ({step2Drop})
                            </span>
                            <span className="font-black text-xs sm:text-sm text-teal-950">
                              10 − {step2Drop} = <span className="text-emerald-700 text-base">{res}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 1.5 Segitiga Fakta Keluarga (Fact Family Triangle 1–20) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.5
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Fact Family Triangle (Addition ⇄ Subtraction)" : "Segitiga Fakta Keluarga (Penjumlahan ⇄ Pengurangan)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Three numbers form a family of 4 interconnected equations. Knowing addition automatically solves subtraction."
                      : "Satu paket 3 angka membentuk 4 fakta hitung yang saling bertukar. Menguasai penjumlahan otomatis membuat pengurangan terasa sangat mudah!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Keluarga Angka:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [7, 5],
                          [8, 4],
                          [9, 6],
                          [6, 8],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => setFactTriPair([a, b])}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              factTriPair[0] === a && factTriPair[1] === b
                                ? "bg-purple-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} & {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const a = factTriPair[0];
                      const b = factTriPair[1];
                      const total = a + b;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
                          {/* Triangle Graphic */}
                          <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border-2 border-purple-200 font-mono shadow-2xs">
                            <span className="px-4 py-1.5 bg-purple-600 text-white rounded-xl font-black text-base shadow-xs">
                              {total} (Puncak)
                            </span>
                            <div className="flex items-center gap-6 mt-1">
                              <span className="px-3 py-1 bg-blue-100 text-blue-900 rounded-lg font-bold text-sm">
                                {a}
                              </span>
                              <span className="px-3 py-1 bg-amber-100 text-amber-900 rounded-lg font-bold text-sm">
                                {b}
                              </span>
                            </div>
                          </div>

                          {/* 4 Equations List */}
                          <div className="grid grid-cols-2 gap-2 font-mono text-xs sm:text-sm">
                            <div className="p-2 bg-blue-50 text-blue-950 rounded-xl border border-blue-200 font-bold text-center">
                              {a} + {b} = {total}
                            </div>
                            <div className="p-2 bg-blue-50 text-blue-950 rounded-xl border border-blue-200 font-bold text-center">
                              {b} + {a} = {total}
                            </div>
                            <div className="p-2 bg-purple-50 text-purple-950 rounded-xl border border-purple-200 font-black text-center">
                              {total} − {a} = {b}
                            </div>
                            <div className="p-2 bg-purple-50 text-purple-950 rounded-xl border border-purple-200 font-black text-center">
                              {total} − {b} = {a}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 2: BILANGAN 1–100 & KOMPLEMEN 100 (KELAS 2 SD)       */}
            {/* ========================================================= */}
            {activeModule === 2 && (
              <div className="flex flex-col gap-5">
                {/* 2.1 Sutra Komplemen 100 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? '100 Complement: "Tens from 9, Units from 10"' : 'Sutra Komplemen 100: "Puluhan dari 9, Satuan dari 10"'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Subtracting from 100 is instant: subtract the tens digit from 9, and subtract the units digit from 10. No borrowing required!"
                      : "Pengurangan terhadap 100 sering macet karena pinjam-meminjam puluhan. Cukup kurangkan puluhan dari 9, dan satuan dari 10. Selesai dalam 1 detik tanpa pinjam!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pengurangan dari 100:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[38, 64, 47, 25].map((val) => (
                          <button
                            key={val}
                            onClick={() => setNikhilam100Subtrahend(val)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              nikhilam100Subtrahend === val
                                ? "bg-amber-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            100 − {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const str = String(nikhilam100Subtrahend).padStart(2, "0");
                      const d0 = Number(str[0]);
                      const d1 = Number(str[1]);
                      const res0 = 9 - d0;
                      const res1 = 10 - d1;
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="flex items-center justify-center gap-4 font-mono">
                            {/* Tens column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs">
                                9
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d0}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res0}
                              </span>
                            </div>

                            {/* Units column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-orange-500 text-white border border-orange-600 shadow-2xs">
                                10
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d1}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res1}
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-emerald-600 text-white font-mono font-black text-base sm:text-lg rounded-xl shadow-xs text-center">
                            100 − {nikhilam100Subtrahend} = {res0}{res1}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 2.2 Metode Selisih Konstan 2-Digit */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Constant Difference (No Borrowing)" : "Metode Selisih Konstan (Tanpa Pinjam)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Add the same value to both numbers so the subtrahend ends in 0. Subtraction becomes effortless!"
                      : "Tambahkan nilai yang sama pada kedua bilangan agar angka pengurang menjadi puluhan bulat (akhiran 0). Pengurangan jadi sangat santai tanpa pinjam!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Contoh Kasus:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [83, 39],
                          [72, 28],
                          [91, 47],
                          [64, 19],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setConstDiffA(a);
                              setConstDiffB(b);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              constDiffA === a && constDiffB === b
                                ? "bg-teal-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} − {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const nextTen = Math.ceil(constDiffB / 10) * 10;
                      const k = nextTen - constDiffB;
                      const shiftedA = constDiffA + k;
                      const shiftedB = constDiffB + k;
                      const result = shiftedA - shiftedB;
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                            <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#CADDF0] w-full sm:w-auto shadow-2xs">
                              <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">
                                Soal Awal
                              </span>
                              <span className="font-bold text-xs sm:text-sm text-[#182C48]">
                                {constDiffA} − {constDiffB}
                              </span>
                            </div>

                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-teal-100 text-teal-800 border border-teal-200">
                              Geser (+{k}) Serentak
                            </span>

                            <div className="p-2.5 sm:p-3 bg-teal-50 rounded-xl border-2 border-teal-300 w-full sm:w-auto shadow-2xs">
                              <span className="text-[10px] text-teal-800 font-sans font-bold block mb-0.5">
                                Puluhan Bulat (Mudah Sekali)
                              </span>
                              <span className="font-black text-xs sm:text-sm text-teal-950">
                                {shiftedA} − {shiftedB}
                              </span>
                            </div>

                            <span className="text-[#7B94B2] font-black text-sm">=</span>

                            <div className="p-2.5 sm:p-3 bg-emerald-600 text-white rounded-xl font-black text-sm sm:text-base w-full sm:w-auto shadow-xs">
                              {result}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 2.3 Penjumlahan Kiri ke Kanan 2-Digit */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Left-to-Right 2-Digit Addition" : "Penjumlahan Kiri ke Kanan 2-Digit"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Mental calculation thrives on adding tens first, followed by units. No need to carry on paper!"
                      : "Tambahkan puluhan terlebih dahulu, kemudian satuan. Anak langsung merasakan besaran angka tanpa bingung simpan-menyimpan!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Bilangan 2-Digit:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [46, 37],
                          [58, 25],
                          [67, 28],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setLeftRight2A(a);
                              setLeftRight2B(b);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              leftRight2A === a && leftRight2B === b
                                ? "bg-blue-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} + {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const tens = Math.floor(leftRight2B / 10) * 10;
                      const ones = leftRight2B % 10;
                      const step1 = leftRight2A + tens;
                      const finalSum = step1 + ones;
                      return (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-center">
                          <div className="p-2.5 bg-blue-50/90 rounded-xl border border-blue-200">
                            <span className="text-[10px] text-blue-700 font-sans font-bold block mb-0.5">
                              Tahap 1: +Puluhan ({tens})
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-blue-950">
                              {leftRight2A} + {tens} = <span className="font-black text-blue-700">{step1}</span>
                            </span>
                          </div>

                          <div className="p-2.5 bg-emerald-50 rounded-xl border-2 border-emerald-300 shadow-2xs">
                            <span className="text-[10px] text-emerald-800 font-sans font-bold block mb-0.5">
                              Tahap 2: +Satuan ({ones})
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-emerald-950">
                              {step1} + {ones} = <span className="font-black text-emerald-700 text-base">{finalSum}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 2.4 Pembulatan & Penyesuaian (Round & Adjust) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Round & Adjust Strategy (Near-Tens)" : "Trik Pembulatan & Kompensasi (Dekat Puluhan)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "When adding a number close to a ten (like 19, 28, 29), round up to the clean ten first, then subtract the adjustment."
                      : "Jika menjumlahkan angka yang mendekati puluhan (seperti 19, 28, 29), bulatkan ke puluhan terdekat lalu kurangi kelebihannya!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Soal:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [38, 19],
                          [47, 28],
                          [64, 29],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setRoundAdjustA(a);
                              setRoundAdjustB(b);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              roundAdjustA === a && roundAdjustB === b
                                ? "bg-purple-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} + {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const rounded = Math.ceil(roundAdjustB / 10) * 10;
                      const diff = rounded - roundAdjustB;
                      const step1 = roundAdjustA + rounded;
                      const res = step1 - diff;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#CADDF0]">
                            <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">
                              Langkah 1: Tambah Puluhan ({rounded})
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-[#182C48]">
                              {roundAdjustA} + {rounded} = <span className="text-purple-700 font-black">{step1}</span>
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                          <div className="p-2.5 sm:p-3 bg-purple-50 rounded-xl border-2 border-purple-300">
                            <span className="text-[10px] text-purple-800 font-sans font-bold block mb-0.5">
                              Langkah 2: Kurangi Lebihnya (−{diff})
                            </span>
                            <span className="font-black text-xs sm:text-sm text-purple-950">
                              {step1} − {diff} = <span className="text-emerald-700 text-base">{res}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 3: BILANGAN 1.000 & PERKALIAN DASAR (KELAS 3 SD)    */}
            {/* ========================================================= */}
            {activeModule === 3 && (
              <div className="flex flex-col gap-5">
                {/* 3.1 Sutra Komplemen Basis 1.000 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? '1,000 Complement: "All from 9, Last from 10"' : 'Sutra Komplemen Basis 1.000 ("Semua dari 9, Satuan dari 10")'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Subtracting 3-digit numbers from 1,000 in seconds: subtract hundreds and tens from 9, and units from 10!"
                      : "Pengurangan bilangan 3 digit dari 1.000 selesai dalam sekejap tanpa pinjam: kurangkan ratusan dan puluhan dari 9, dan digit satuan dari 10!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pengurangan dari 1.000:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[437, 265, 682, 149].map((val) => (
                          <button
                            key={val}
                            onClick={() => setNikhilam1000Subtrahend(val)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              nikhilam1000Subtrahend === val
                                ? "bg-amber-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            1.000 − {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const str = String(nikhilam1000Subtrahend).padStart(3, "0");
                      const d0 = Number(str[0]);
                      const d1 = Number(str[1]);
                      const d2 = Number(str[2]);
                      const res0 = 9 - d0;
                      const res1 = 9 - d1;
                      const res2 = 10 - d2;
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="flex items-center justify-center gap-3 sm:gap-4 font-mono">
                            {/* Hundreds column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs">
                                9
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d0}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res0}
                              </span>
                            </div>

                            {/* Tens column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs">
                                9
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d1}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res1}
                              </span>
                            </div>

                            {/* Units column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-orange-500 text-white border border-orange-600 shadow-2xs">
                                10
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d2}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res2}
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-emerald-600 text-white font-mono font-black text-base sm:text-lg rounded-xl shadow-xs text-center">
                            1.000 − {nikhilam1000Subtrahend} = {res0}{res1}{res2}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 3.2 Penjumlahan Kiri ke Kanan 3-Digit */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Left-to-Right 3-Digit Mental Addition" : "Penjumlahan Kiri ke Kanan 3-Digit (Nilai Tempat)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Add hundreds first, then tens, and finally units. Keep track of magnitude seamlessly in your head."
                      : "Hitung beruntun dari kiri: +ratusan, +puluhan, lalu +satuan. Anak langsung memegang angka besar tanpa beban menyimpan."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Bilangan 3-Digit:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [467, 358],
                          [245, 137],
                          [526, 289],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setLeftRightA(a);
                              setLeftRightB(b);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              leftRightA === a && leftRightB === b
                                ? "bg-purple-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} + {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const hundreds = Math.floor(leftRightB / 100) * 100;
                      const tens = Math.floor((leftRightB % 100) / 10) * 10;
                      const ones = leftRightB % 10;
                      const step1 = leftRightA + hundreds;
                      const step2 = step1 + tens;
                      const finalSum = step2 + ones;
                      return (
                        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
                          <div className="p-2.5 bg-blue-50/90 rounded-xl border border-blue-200">
                            <span className="text-[10px] text-blue-700 font-sans font-bold block mb-0.5">
                              Tahap 1: +Ratusan ({hundreds})
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-blue-950">
                              {leftRightA} + {hundreds} = <span className="font-black text-blue-700">{step1}</span>
                            </span>
                          </div>

                          <div className="p-2.5 bg-purple-50/90 rounded-xl border border-purple-200">
                            <span className="text-[10px] text-purple-700 font-sans font-bold block mb-0.5">
                              Tahap 2: +Puluhan ({tens})
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-purple-950">
                              {step1} + {tens} = <span className="font-black text-purple-700">{step2}</span>
                            </span>
                          </div>

                          <div className="p-2.5 bg-emerald-50 rounded-xl border-2 border-emerald-300 shadow-2xs">
                            <span className="text-[10px] text-emerald-800 font-sans font-bold block mb-0.5">
                              Tahap 3: +Satuan ({ones})
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-emerald-950">
                              {step2} + {ones} = <span className="font-black text-emerald-700 text-base">{finalSum}</span>
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 3.3 Jurus Cepat Perkalian 5 dan 9 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Perkalian 5 */}
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal-100 text-teal-800 mb-2 border border-teal-200">
                        3.3 Jurus Cepat × 5 (Bagi 2 lalu × 10)
                      </span>
                      <p className="text-xs text-[#415777] mb-3 leading-relaxed">
                        Mengalikan 5 sama dengan mencari separuhnya (÷2) lalu menambahkan 0 di belakangnya.
                      </p>
                      <div className="flex items-center gap-1.5 mb-3">
                        {[18, 26, 42].map((num) => (
                          <button
                            key={num}
                            onClick={() => setMultFiveNum(num)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                              multFiveNum === num
                                ? "bg-teal-600 text-white"
                                : "bg-white border border-[#CADDF0]"
                            }`}
                          >
                            {num} × 5
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-200 text-center font-mono text-xs">
                      {multFiveNum} ÷ 2 = <span className="font-black text-teal-700">{multFiveNum / 2}</span> ⟹ Tambah 0 ={" "}
                      <span className="font-black text-emerald-700 text-sm">{multFiveNum * 5}</span>
                    </div>
                  </div>

                  {/* Perkalian 9 */}
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 mb-2 border border-amber-200">
                        3.4 Jurus Cepat × 9 (× 10 − Angka Asli)
                      </span>
                      <p className="text-xs text-[#415777] mb-3 leading-relaxed">
                        Kalikan 10 (tambah 0) lalu kurangi dengan bilangan itu sendiri dalam 1 langkah.
                      </p>
                      <div className="flex items-center gap-1.5 mb-3">
                        {[24, 35, 17].map((num) => (
                          <button
                            key={num}
                            onClick={() => setMultNineNum(num)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                              multNineNum === num
                                ? "bg-amber-600 text-white"
                                : "bg-white border border-[#CADDF0]"
                            }`}
                          >
                            {num} × 9
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center font-mono text-xs">
                      ({multNineNum} × 10) − {multNineNum} = {multNineNum * 10} − {multNineNum} ={" "}
                      <span className="font-black text-emerald-700 text-sm">{multNineNum * 9}</span>
                    </div>
                  </div>
                </div>

                {/* 3.4 Perkalian Bilangan Belasan (11–19) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.5
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Teen Numbers Multiplication (11–19)" : "Jurus Perkalian Bilangan Belasan (11–19)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Multiply two teen numbers: (Number A + Units of B) × 10 + (Units A × Units B)."
                      : "Rumus kilat belasan: (Bilangan A + Satuan B) × 10 + (Satuan A × Satuan B). Sangat mudah dipraktikkan di luar kepala!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Belasan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [12, 14],
                          [13, 15],
                          [14, 16],
                          [17, 13],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setTeenMultA(a);
                              setTeenMultB(b);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              teenMultA === a && teenMultB === b
                                ? "bg-blue-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} × {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const uA = teenMultA % 10;
                      const uB = teenMultB % 10;
                      const sumBase = (teenMultA + uB) * 10;
                      const unitProd = uA * uB;
                      const total = sumBase + unitProd;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                          <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <span className="text-[10px] text-blue-700 font-sans font-bold block mb-0.5">
                              Langkah 1: ({teenMultA} + {uB}) × 10
                            </span>
                            <span className="font-black text-sm text-blue-950">{sumBase}</span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">+</span>

                          <div className="p-2.5 sm:p-3 bg-amber-50 rounded-xl border border-amber-200">
                            <span className="text-[10px] text-amber-700 font-sans font-bold block mb-0.5">
                              Langkah 2: {uA} × {uB}
                            </span>
                            <span className="font-black text-sm text-amber-950">{unitProd}</span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">=</span>

                          <div className="p-2.5 sm:p-3 bg-emerald-600 text-white rounded-xl font-black text-base shadow-xs">
                            {total}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 4: BILANGAN 10.000 & JURUS MENTAL (KELAS 4 SD)       */}
            {/* ========================================================= */}
            {activeModule === 4 && (
              <div className="flex flex-col gap-5">
                {/* 4.1 Sutra Komplemen Basis 10.000 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? 'Base 10,000 Complement: "All from 9, Last from 10"' : 'Sutra Komplemen Basis 10.000: "Semua dari 9, Terakhir dari 10"'}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Subtracting from 10,000 causes borrowing errors. Using the complement rule: subtract each digit from 9 from left to right, and subtract the very last units digit from 10. Solved in 2 seconds without any borrowing!"
                      : "Pengurangan terhadap angka bulat 10.000 sering memicu salah hitung akibat pinjam-meminjam beruntun. Jurus Nikhilam: kurangkan setiap digit dari kiri ke kanan dengan 9, dan digit satuan paling akhir kurangkan dengan 10. Selesai dalam 2 detik tanpa meminjam!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    {/* Preset Selector */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Kasus Pengurangan 10.000:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[3648, 4725, 7819, 1264].map((val) => (
                          <button
                            key={val}
                            onClick={() => setNikhilamSubtrahend(val)}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              nikhilamSubtrahend === val
                                ? "bg-amber-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            10.000 − {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Floating Target Badges [9][9][9][10] and Column Drop Display */}
                    {(() => {
                      const str = String(nikhilamSubtrahend).padStart(4, "0");
                      const d0 = Number(str[0]);
                      const d1 = Number(str[1]);
                      const d2 = Number(str[2]);
                      const d3 = Number(str[3]);
                      const res0 = 9 - d0;
                      const res1 = 9 - d1;
                      const res2 = 9 - d2;
                      const res3 = 10 - d3;
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="flex items-center justify-center gap-2 sm:gap-4 font-mono">
                            {/* Thousands column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs">
                                9
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d0}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res0}
                              </span>
                            </div>

                            {/* Hundreds column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs">
                                9
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d1}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res1}
                              </span>
                            </div>

                            {/* Tens column */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs">
                                9
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d2}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res2}
                              </span>
                            </div>

                            {/* Units column: Last from 10 */}
                            <div className="flex flex-col items-center gap-1">
                              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-orange-500 text-white border border-orange-600 shadow-2xs">
                                10
                              </span>
                              <span className="text-xs text-[#7B94B2]">−</span>
                              <span className="text-base sm:text-xl font-bold text-[#182C48] bg-white px-2.5 py-1 rounded-xl border border-[#CADDF0]">
                                {d3}
                              </span>
                              <span className="text-xs text-[#7B94B2]">↓</span>
                              <span className="text-base sm:text-xl font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-300">
                                {res3}
                              </span>
                            </div>
                          </div>

                          <div className="p-2.5 bg-emerald-600 text-white font-mono font-black text-base sm:text-lg rounded-xl shadow-xs text-center">
                            10.000 − {nikhilamSubtrahend} = {res0}{res1}{res2}{res3}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 4.2 Kaidah Puluhan Sama, Jumlah Satuan Sepuluh */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Same Tens, Units Add to 10" : "Kaidah Puluhan Sama, Jumlah Satuan Sepuluh"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "When multiplying two numbers with the same tens digit and units adding to 10: Front = a × (a + 1), Back = b × c (mandatory 2 digits!)."
                      : "Perkalian dua bilangan dua digit dengan angka puluhan kembar dan jumlah satuannya tepat 10: Bagian depan = [puluhan × (puluhan + 1)], Bagian belakang = [satuan × satuan] (wajib ditulis 2 digit)."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Bilangan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [43, 47],
                          [71, 79],
                          [84, 86],
                          [32, 38],
                          [65, 65],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setSameTensA(a);
                              setSameTensB(b);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              sameTensA === a && sameTensB === b
                                ? "bg-purple-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} × {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const tens = Math.floor(sameTensA / 10);
                      const u1 = sameTensA % 10;
                      const u2 = sameTensB % 10;
                      const front = tens * (tens + 1);
                      const backNum = u1 * u2;
                      const backStr = backNum < 10 ? `0${backNum}` : String(backNum);
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                            <div className="p-3 bg-purple-50/90 rounded-2xl border-2 border-purple-200 text-center shadow-2xs">
                              <span className="text-[10px] text-purple-700 font-sans font-bold block mb-0.5">
                                Bagian Depan [a × (a+1)]
                              </span>
                              <span className="font-black text-sm sm:text-base text-purple-950">
                                {tens} × ({tens} + 1) = <span className="text-purple-700 text-lg">{front}</span>
                              </span>
                            </div>

                            <span className="text-xl font-black text-[#7B94B2]">+</span>

                            <div className="p-3 bg-teal-50/90 rounded-2xl border-2 border-teal-200 text-center shadow-2xs">
                              <span className="text-[10px] text-teal-700 font-sans font-bold block mb-0.5">
                                Bagian Belakang [b × c (2-Digit)]
                              </span>
                              <span className="font-black text-sm sm:text-base text-teal-950">
                                {u1} × {u2} = <span className="text-teal-700 text-lg">{backStr}</span>
                              </span>
                            </div>

                            <span className="text-xl font-black text-[#7B94B2]">=</span>

                            <div className="px-5 py-3 bg-[#2B4A75] text-white rounded-2xl font-mono font-black text-lg sm:text-xl shadow-xs">
                              {front}{backStr}
                            </div>
                          </div>

                          {u1 * u2 < 10 && (
                            <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs font-sans text-center">
                              Perhatian Proteksi 2-Digit: Karena {u1} × {u2} = {u1 * u2}, wajib ditulis <span className="font-bold underline">0{u1 * u2}</span> agar nilai tempat ratusan tidak hilang!
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 4.3 Kaidah Satuan Sama, Jumlah Puluhan Sepuluh */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Tens Add to 10, Same Units" : "Kaidah Satuan Sama, Jumlah Puluhan Sepuluh"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "When multiplying numbers where tens add to 10 and units are identical: Front = (p1 × p2) + unit, Back = unit² (2 digits)."
                      : "Perkalian dua bilangan jika digit puluhan berjumlah 10 dan digit satuannya kembar: Bagian depan = [(puluhan 1 × puluhan 2) + satuan], Bagian belakang = [satuan²] (2 digit)."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Bilangan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [74, 34],
                          [63, 43],
                          [82, 22],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setTensSum10A(a);
                              setTensSum10B(b);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              tensSum10A === a && tensSum10B === b
                                ? "bg-blue-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} × {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const p1 = Math.floor(tensSum10A / 10);
                      const p2 = Math.floor(tensSum10B / 10);
                      const u = tensSum10A % 10;
                      const front = p1 * p2 + u;
                      const backNum = u * u;
                      const backStr = backNum < 10 ? `0${backNum}` : String(backNum);
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                          <div className="p-3 bg-blue-50/90 rounded-2xl border-2 border-blue-200 text-center shadow-2xs">
                            <span className="text-[10px] text-blue-700 font-sans font-bold block mb-0.5">
                              Bagian Depan [(p1 × p2) + satuan]
                            </span>
                            <span className="font-black text-sm sm:text-base text-blue-950">
                              ({p1} × {p2}) + {u} = <span className="text-blue-700 text-lg">{front}</span>
                            </span>
                          </div>

                          <span className="text-xl font-black text-[#7B94B2]">+</span>

                          <div className="p-3 bg-teal-50/90 rounded-2xl border-2 border-teal-200 text-center shadow-2xs">
                            <span className="text-[10px] text-teal-700 font-sans font-bold block mb-0.5">
                              Bagian Belakang [satuan² (2-Digit)]
                            </span>
                            <span className="font-black text-sm sm:text-base text-teal-950">
                              {u}² = <span className="text-teal-700 text-lg">{backStr}</span>
                            </span>
                          </div>

                          <span className="text-xl font-black text-[#7B94B2]">=</span>

                          <div className="px-5 py-3 bg-[#2B4A75] text-white rounded-2xl font-mono font-black text-lg sm:text-xl shadow-xs">
                            {front}{backStr}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 4.4 Perkalian Cepat Angka 11 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Multiplying by 11 (Spread & Sum Inside)" : "Perkalian Cepat Angka 11 (Regang & Sisip)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "To multiply a 2-digit number by 11: spread the two digits, and insert their sum in the middle."
                      : "Regangkan kedua digit ke samping kiri dan kanan, lalu sisipkan hasil penjumlahan kedua digit di tengah-tengahnya."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Bilangan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[53, 34, 72, 85].map((val) => (
                          <button
                            key={val}
                            onClick={() => setMultElevenNum(val)}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              multElevenNum === val
                                ? "bg-emerald-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {val} × 11
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const d1 = Math.floor(multElevenNum / 10);
                      const d2 = multElevenNum % 10;
                      const midSum = d1 + d2;
                      const finalProduct = multElevenNum * 11;
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="flex items-center justify-center gap-2 font-mono">
                            <span className="p-3 bg-white border-2 border-emerald-300 rounded-xl text-lg sm:text-xl font-black text-emerald-800 shadow-2xs">
                              {d1}
                            </span>
                            <span className="text-xs text-[#7B94B2] font-black">+</span>
                            <span className="p-3 bg-white border-2 border-emerald-300 rounded-xl text-lg sm:text-xl font-black text-emerald-800 shadow-2xs">
                              {d2}
                            </span>
                            <span className="text-xs text-[#7B94B2] font-black">⟹ Sisip</span>
                            <span className="px-3 py-2 bg-amber-400 text-amber-950 border border-amber-500 rounded-xl text-base sm:text-lg font-black shadow-2xs">
                              {midSum}
                            </span>
                            <span className="text-xs text-[#7B94B2] font-black">=</span>
                            <span className="px-4 py-2 bg-[#2B4A75] text-white rounded-xl text-base sm:text-lg font-black shadow-xs">
                              {finalProduct}
                            </span>
                          </div>
                          {midSum >= 10 && (
                            <span className="text-xs text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                              Karena {d1} + {d2} = {midSum} (melebihi 9), digit 1 disimpan ke depan: ({d1} + 1 = {d1 + 1}), tengah tetap {midSum % 10}.
                            </span>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 4.5 Bagi Dua & Kali Dua (Halve & Double) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.5
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Halve and Double Method" : "Metode Bagi Dua & Kali Dua (Keseimbangan Skalar)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "When multiplying an even number with a number ending in 5: halve the even number and double the 5-ending number to make it a multiple of 10."
                      : "Bagi dua bilangan genap dan kalikan dua bilangan berakhiran 5. Hasil perkaliannya identik namun jauh lebih mudah dihitung secara mental."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Bilangan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [16, 35],
                          [14, 45],
                          [18, 25],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setHalveDoubleA(a);
                              setHalveDoubleB(b);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                              halveDoubleA === a && halveDoubleB === b
                                ? "bg-orange-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} × {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const half = halveDoubleA / 2;
                      const dbl = halveDoubleB * 2;
                      const product = half * dbl;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                          <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#CADDF0]">
                            <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">
                              Soal Awal
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-[#182C48]">
                              {halveDoubleA} × {halveDoubleB}
                            </span>
                          </div>

                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-orange-100 text-orange-800 border border-orange-200">
                            (÷2) & (×2)
                          </span>

                          <div className="p-2.5 sm:p-3 bg-orange-50 rounded-xl border-2 border-orange-300">
                            <span className="text-[10px] text-orange-800 font-sans font-bold block mb-0.5">
                              Bentuk Mudah Puluhan
                            </span>
                            <span className="font-black text-xs sm:text-sm text-orange-950">
                              {half} × {dbl}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">=</span>

                          <div className="p-2.5 sm:p-3 bg-emerald-600 text-white rounded-xl font-black text-sm sm:text-base shadow-xs">
                            {product}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 5: PECAHAN, PEMBAGIAN CEPAT & KPK/FPB (KELAS 5 SD)   */}
            {/* ========================================================= */}
            {activeModule === 5 && (
              <div className="flex flex-col gap-5">
                {/* 5.1 Bank Pecahan Acuan & Jurus Tukar Persen */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Benchmark Fractions & Percent Swap" : "Bank Pecahan Acuan & Jurus Tukar Persen"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Hukum Komutatif Persentase: <span className="font-mono font-bold text-rose-700">x% dari y = y% dari x</span>. Menghitung 16% dari 50 tampak sulit, tapi jika ditukar menjadi <span className="font-bold text-rose-700">50% dari 16</span>, jawabannya langsung setengah dari 16, yaitu 8!
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Kasus Persentase:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          { percent: 16, num: 50 },
                          { percent: 44, num: 25 },
                          { percent: 12, num: 75 },
                          { percent: 36, num: 25 },
                          { percent: 48, num: 50 },
                        ].map((c) => (
                          <button
                            key={`${c.percent}-${c.num}`}
                            onClick={() => setPercentSwapCase(c)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              percentSwapCase.percent === c.percent && percentSwapCase.num === c.num
                                ? "bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {c.percent}% dari {c.num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const p = percentSwapCase.percent;
                      const n = percentSwapCase.num;
                      const fractionStr = n === 50 ? "1/2" : n === 25 ? "1/4" : n === 75 ? "3/4" : `${n}/100`;
                      const result = (p * n) / 100;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-mono">
                          <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-center w-full sm:w-auto shadow-2xs">
                            <span className="text-[10px] text-rose-700 font-sans font-bold block mb-0.5">Soal Asli</span>
                            <span className="font-black text-sm sm:text-base text-rose-950">
                              {p}% dari {n}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-xs sm:text-sm">Tukar ⟹</span>

                          <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200 text-center w-full sm:w-auto shadow-2xs">
                            <span className="text-[10px] text-sky-700 font-sans font-bold block mb-0.5">Setelah Ditukar</span>
                            <span className="font-black text-sm sm:text-base text-sky-950">
                              {n}% dari {p}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-xs sm:text-sm">=</span>

                          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center w-full sm:w-auto shadow-2xs">
                            <span className="text-[10px] text-amber-700 font-sans font-bold block mb-0.5">Pecahan Acuan</span>
                            <span className="font-black text-sm sm:text-base text-amber-950">
                              {fractionStr} × {p}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-xs sm:text-sm">=</span>

                          <div className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-base sm:text-lg shadow-xs">
                            {result}
                          </div>
                        </div>
                      );
                    })()}

                    {/* Cheat-sheet benchmark fractions */}
                    <div className="w-full pt-2 border-t border-[#CADDF0] flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-[#334F75]">
                      <span className="font-bold text-[#182C48] font-sans">Pecahan Acuan Wajib:</span>
                      <span className="px-2 py-0.5 bg-white rounded-lg border border-[#CFDFEF]">50% = ½</span>
                      <span className="px-2 py-0.5 bg-white rounded-lg border border-[#CFDFEF]">25% = ¼</span>
                      <span className="px-2 py-0.5 bg-white rounded-lg border border-[#CFDFEF]">75% = ¾</span>
                      <span className="px-2 py-0.5 bg-white rounded-lg border border-[#CFDFEF]">20% = ⅕</span>
                      <span className="px-2 py-0.5 bg-white rounded-lg border border-[#CFDFEF]">12,5% = ⅛</span>
                    </div>
                  </div>
                </div>

                {/* 5.2 Manipulasi Pembagian Pangkat Sepuluh (÷5, ÷25, ÷125) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Powers of 10 Division Hack (÷5, ÷25, ÷125)" : "Jurus Pembagian Manipulasi Pangkat Sepuluh (÷5, ÷25, ÷125)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Ubah pembagian menjemukan menjadi perkalian komplementer: Bagi 5 = (×2) ÷ 10, Bagi 25 = (×4) ÷ 100, Bagi 125 = (×8) ÷ 1.000. Geser koma desimal ke kiri!
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPower10DivMode(5);
                          setPower10DivInput(214);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          power10DivMode === 5
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        ÷ 5 (Kali 2 lalu Bagi 10)
                      </button>
                      <button
                        onClick={() => {
                          setPower10DivMode(25);
                          setPower10DivInput(320);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          power10DivMode === 25
                            ? "bg-purple-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        ÷ 25 (Kali 4 lalu Bagi 100)
                      </button>
                      <button
                        onClick={() => {
                          setPower10DivMode(125);
                          setPower10DivInput(1500);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          power10DivMode === 125
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        ÷ 125 (Kali 8 lalu Bagi 1.000)
                      </button>
                    </div>

                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Angka yang Dibagi:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {(power10DivMode === 5
                          ? [214, 345, 680, 142]
                          : power10DivMode === 25
                          ? [320, 450, 725, 1200]
                          : [1500, 3250, 625, 4125]
                        ).map((num) => (
                          <button
                            key={num}
                            onClick={() => setPower10DivInput(num)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              power10DivInput === num
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const factor = power10DivMode === 5 ? 2 : power10DivMode === 25 ? 4 : 8;
                      const baseDiv = power10DivMode === 5 ? 10 : power10DivMode === 25 ? 100 : 1000;
                      const multiplied = power10DivInput * factor;
                      const finalAns = power10DivInput / power10DivMode;

                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-mono">
                          <div className="p-2.5 bg-white rounded-xl border border-[#CADDF0] text-center">
                            <span className="text-[10px] text-[#415777] font-sans font-bold block">Soal Asli</span>
                            <span className="font-bold text-sm text-[#182C48]">
                              {power10DivInput} ÷ {power10DivMode}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">=</span>

                          <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-center">
                            <span className="text-[10px] text-blue-700 font-sans font-bold block">1. Kalikan {factor}</span>
                            <span className="font-bold text-sm text-blue-950">
                              {power10DivInput} × {factor} = {multiplied}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                          <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                            <span className="text-[10px] text-amber-700 font-sans font-bold block">2. Bagi {baseDiv}</span>
                            <span className="font-bold text-sm text-amber-950">
                              {multiplied} ÷ {baseDiv}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">=</span>

                          <div className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-base sm:text-lg shadow-xs">
                            {finalAns.toLocaleString("id-ID")}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 5.3 Metode Tangga FPB & KPK (Ladder Method / Sengkedan) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Ladder Method for GCF & LCM (Sengkedan)" : "Metode Tangga FPB & KPK (Teknik Sengkedan Sekaligus)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Tinggalkan pohon faktor yang bercabang-cabang dan rawan salah hitung. Gunakan metode tangga: bagi kedua bilangan sekaligus dengan pembagi prima bersama. FPB = kalikan kolom kiri, KPK = kalikan semua bilangan pembagi membentuk huruf "L".
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan:</span>
                        {[
                          [12, 18],
                          [24, 36],
                          [36, 60],
                          [30, 45],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setLadderA(a);
                              setLadderB(b);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              ladderA === a && ladderB === b
                                ? "bg-emerald-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} & {b}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#CADDF0]">
                        <button
                          onClick={() => setLadderTab("fpb")}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            ladderTab === "fpb"
                              ? "bg-indigo-600 text-white shadow-2xs"
                              : "text-[#415777] hover:bg-[#E8F1FB]"
                          }`}
                        >
                          Cari FPB (Kolom Kiri)
                        </button>
                        <button
                          onClick={() => setLadderTab("kpk")}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            ladderTab === "kpk"
                              ? "bg-amber-600 text-white shadow-2xs"
                              : "text-[#415777] hover:bg-[#E8F1FB]"
                          }`}
                        >
                          Cari KPK (Bentuk "L")
                        </button>
                      </div>
                    </div>

                    {/* Step-by-step Ladder Calculation */}
                    {(() => {
                      // Compute common prime factors
                      let curA = ladderA;
                      let curB = ladderB;
                      const steps: { divisor: number; resA: number; resB: number }[] = [];
                      const primes = [2, 3, 5, 7, 11, 13];
                      for (const p of primes) {
                        while (curA % p === 0 && curB % p === 0) {
                          curA = curA / p;
                          curB = curB / p;
                          steps.push({ divisor: p, resA: curA, resB: curB });
                        }
                      }
                      const fpbVal = steps.reduce((acc, s) => acc * s.divisor, 1);
                      const kpkVal = fpbVal * curA * curB;

                      return (
                        <div className="w-full flex flex-col md:flex-row items-center justify-around gap-4 p-3 bg-white rounded-2xl border border-[#CADDF0]">
                          {/* Visual Ladder Table */}
                          <div className="font-mono text-sm border-collapse">
                            <div className="flex items-center gap-3 pb-1 border-b-2 border-slate-700">
                              <span className="w-8 text-center font-bold text-slate-400">÷</span>
                              <span className="w-12 text-center font-black text-slate-800">{ladderA}</span>
                              <span className="w-12 text-center font-black text-slate-800">{ladderB}</span>
                            </div>
                            {steps.map((st, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center gap-3 py-1 ${
                                  idx < steps.length - 1 ? "border-b border-slate-300" : "border-b-2 border-slate-700"
                                }`}
                              >
                                <span
                                  className={`w-8 text-center font-black rounded-md py-0.5 ${
                                    ladderTab === "fpb"
                                      ? "bg-indigo-100 text-indigo-900 border border-indigo-300"
                                      : "bg-amber-100 text-amber-900 border border-amber-300"
                                  }`}
                                >
                                  {st.divisor}
                                </span>
                                <span className="w-12 text-center font-bold text-slate-700">{st.resA}</span>
                                <span className="w-12 text-center font-bold text-slate-700">{st.resB}</span>
                              </div>
                            ))}
                            <div className="flex items-center gap-3 pt-1">
                              <span className="w-8 text-center text-xs text-slate-400">Sisa</span>
                              <span
                                className={`w-12 text-center font-black rounded-md py-0.5 ${
                                  ladderTab === "kpk"
                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                    : "text-slate-600"
                                }`}
                              >
                                {curA}
                              </span>
                              <span
                                className={`w-12 text-center font-black rounded-md py-0.5 ${
                                  ladderTab === "kpk"
                                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                                    : "text-slate-600"
                                }`}
                              >
                                {curB}
                              </span>
                            </div>
                          </div>

                          {/* Result Summary */}
                          <div className="flex flex-col items-center gap-2 text-center max-w-xs">
                            {ladderTab === "fpb" ? (
                              <>
                                <span className="text-xs font-bold text-indigo-900">
                                  FPB = Perkalian Kolom Kiri
                                </span>
                                <div className="font-mono text-xs sm:text-sm bg-indigo-50 p-2.5 rounded-xl border border-indigo-200 text-indigo-950">
                                  {steps.map((s) => s.divisor).join(" × ")} ={" "}
                                  <span className="font-black text-base text-indigo-700">{fpbVal}</span>
                                </div>
                                <span className="text-[11px] text-[#415777]">
                                  Faktor persekutuan terbesar yang membagi habis {ladderA} dan {ladderB}.
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="text-xs font-bold text-amber-900">
                                  KPK = Perkalian Huruf "L" (Kiri & Bawah)
                                </span>
                                <div className="font-mono text-xs sm:text-sm bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-950">
                                  ({steps.map((s) => s.divisor).join(" × ")}) × {curA} × {curB} ={" "}
                                  <span className="font-black text-base text-amber-800">{kpkVal}</span>
                                </div>
                                <span className="text-[11px] text-[#415777]">
                                  Kelipatan terkecil yang sama-sama bisa dibagi oleh {ladderA} dan {ladderB}.
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 5.4 Perkalian Silang Vertikal 2-Digit (2×2 Criss-Cross) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Vertical & Cross Multiplication (2×2 Criss-Cross)" : "Perkalian Silang Vertikal 2-Digit (Jurus Criss-Cross 1 Baris)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Kalikan bilangan 2 digit apa saja dalam 1 baris tanpa susun panjang berundak. Tiga gerakan: (1) Tegak Kanan Satuan, (2) Kali Silang Dalam-Luar dijumlahkan, (3) Tegak Kiri Puluhan.
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-bold text-[#253D5F]">Pilih Perkalian:</span>
                        {[
                          [32, 43],
                          [24, 31],
                          [42, 23],
                          [51, 32],
                        ].map(([a, b]) => (
                          <button
                            key={`${a}-${b}`}
                            onClick={() => {
                              setCrissCrossA(a);
                              setCrissCrossB(b);
                            }}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              crissCrossA === a && crissCrossB === b
                                ? "bg-purple-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {a} × {b}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#CADDF0]">
                        <button
                          onClick={() => setCrissCrossPhase(1)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            crissCrossPhase === 1 ? "bg-purple-600 text-white shadow-2xs" : "text-[#415777]"
                          }`}
                        >
                          1. Satuan
                        </button>
                        <button
                          onClick={() => setCrissCrossPhase(2)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            crissCrossPhase === 2 ? "bg-purple-600 text-white shadow-2xs" : "text-[#415777]"
                          }`}
                        >
                          2. Silang
                        </button>
                        <button
                          onClick={() => setCrissCrossPhase(3)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            crissCrossPhase === 3 ? "bg-purple-600 text-white shadow-2xs" : "text-[#415777]"
                          }`}
                        >
                          3. Puluhan
                        </button>
                      </div>
                    </div>

                    {(() => {
                      const aTens = Math.floor(crissCrossA / 10);
                      const aUnits = crissCrossA % 10;
                      const bTens = Math.floor(crissCrossB / 10);
                      const bUnits = crissCrossB % 10;

                      const step1 = aUnits * bUnits;
                      const carry1 = Math.floor(step1 / 10);
                      const write1 = step1 % 10;

                      const crossSum = aTens * bUnits + aUnits * bTens + carry1;
                      const carry2 = Math.floor(crossSum / 10);
                      const write2 = crossSum % 10;

                      const step3 = aTens * bTens + carry2;
                      const finalProduct = crissCrossA * crissCrossB;

                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 p-3 bg-white rounded-2xl border border-[#CADDF0]">
                          <div className="font-mono text-center">
                            <div className="text-xl sm:text-2xl font-black text-[#182C48] tracking-widest">
                              <span className={crissCrossPhase === 3 ? "text-purple-600 underline" : ""}>{aTens}</span>
                              <span className={crissCrossPhase === 1 ? "text-rose-600 underline" : ""}>{aUnits}</span>
                            </div>
                            <div className="text-xl sm:text-2xl font-black text-[#182C48] tracking-widest border-b-2 border-slate-700 pb-1">
                              <span className={crissCrossPhase === 3 ? "text-purple-600 underline" : ""}>{bTens}</span>
                              <span className={crissCrossPhase === 1 ? "text-rose-600 underline" : ""}>{bUnits}</span>
                              <span className="text-xs text-slate-400 font-sans ml-1">×</span>
                            </div>
                            <div className="text-xl sm:text-2xl font-black text-emerald-700 tracking-widest pt-1">
                              {finalProduct}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1.5 text-xs text-[#203657] max-w-sm">
                            {crissCrossPhase === 1 && (
                              <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200">
                                <span className="font-black text-rose-800 block mb-1">Langkah 1: Tegak Kanan (Satuan × Satuan)</span>
                                <div>{aUnits} × {bUnits} = {step1}</div>
                                <div className="text-[11px] text-rose-700 mt-0.5">
                                  Tulis angka <span className="font-black">{write1}</span> di satuan{carry1 > 0 ? `, simpan ${carry1} ke langkah silang.` : "."}
                                </div>
                              </div>
                            )}

                            {crissCrossPhase === 2 && (
                              <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200">
                                <span className="font-black text-purple-800 block mb-1">Langkah 2: Kali Silang (Luar + Dalam)</span>
                                <div>({aTens} × {bUnits}) + ({aUnits} × {bTens}){carry1 > 0 ? ` + simpanan ${carry1}` : ""} = {crossSum}</div>
                                <div className="text-[11px] text-purple-700 mt-0.5">
                                  Tulis angka <span className="font-black">{write2}</span> di puluhan{carry2 > 0 ? `, simpan ${carry2} ke langkah kiri.` : "."}
                                </div>
                              </div>
                            )}

                            {crissCrossPhase === 3 && (
                              <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-200">
                                <span className="font-black text-indigo-800 block mb-1">Langkah 3: Tegak Kiri (Puluhan × Puluhan)</span>
                                <div>({aTens} × {bTens}){carry2 > 0 ? ` + simpanan ${carry2}` : ""} = {step3}</div>
                                <div className="text-[11px] text-indigo-700 mt-0.5">
                                  Tulis langsung angka <span className="font-black">{step3}</span> di paling depan.
                                </div>
                              </div>
                            )}

                            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold text-center">
                              Hasil Akhir: {crissCrossA} × {crissCrossB} = <span className="text-emerald-700 font-black text-sm">{finalProduct}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 6: ALUR BALIK & OLIMPIADE MATEMATIKA (KELAS 6 & OSN) */}
            {/* ========================================================= */}
            {activeModule === 6 && (
              <div className="flex flex-col gap-5">
                {/* 6.1 Heuristik Bekerja Mundur Berantai (Rewind Tape) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Working Backwards Heuristic (Rewind Tape)" : "Heuristik Bekerja Mundur Berantai (Alur Putar Balik)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Nilai awal tidak diketahui, lalu mengalami serangkaian transaksi dan menyisakan nilai akhir. Putar balik rantai operasi dari belakang ke depan dengan operator inversnya (+ jadi −, − jadi +, pecahan sisa dibalik).
                  </p>

                  <div className="bg-[#F1F6FC] p-4 rounded-2xl border border-[#CFDFEF] flex flex-col gap-3 font-sans">
                    <div className="p-3 bg-white rounded-xl border border-[#CADDF0] text-xs text-[#203657] leading-relaxed">
                      <span className="font-bold text-rose-800">Kasus Semangka Pedagang:</span> Pedagang menjual 1/3 semangka + 4 buah ke pembeli 1. Lalu menjual 1/4 dari sisa semangka + 3 buah ke pembeli 2. Sisa akhir semangka adalah 12 buah. Berapa total semangka mula-mula?
                    </div>

                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setRewindStep(0)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          rewindStep === 0 ? "bg-rose-600 text-white" : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        1. Sisa Akhir: 12
                      </button>
                      <button
                        onClick={() => setRewindStep(1)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          rewindStep === 1 ? "bg-purple-600 text-white" : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        2. Mundur Pembeli 2
                      </button>
                      <button
                        onClick={() => setRewindStep(2)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          rewindStep === 2 ? "bg-emerald-600 text-white" : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        3. Mundur Pembeli 1
                      </button>
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-[#CADDF0] font-mono text-center">
                      {rewindStep === 0 && (
                        <div className="text-xs text-[#182C48]">
                          Kondisi Terakhir di Meja Pedagang: <span className="font-black text-sm text-rose-700">12 buah</span>.
                        </div>
                      )}
                      {rewindStep === 1 && (
                        <div className="text-xs text-purple-950">
                          Mundur Pembeli 2: Kembalikan 3 buah ⟹ (12 + 3 = 15).<br />
                          15 buah ini adalah ¾ bagian sisa ⟹ Sisa sebelum pembeli 2 = 15 × (4/3) = <span className="font-black text-sm text-purple-700">20 buah</span>.
                        </div>
                      )}
                      {rewindStep === 2 && (
                        <div className="text-xs text-emerald-950">
                          Mundur Pembeli 1: Kembalikan 4 buah ⟹ (20 + 4 = 24).<br />
                          24 buah ini adalah ⅔ persediaan awal ⟹ Mula-mula = 24 × (3/2) = <span className="font-black text-base text-emerald-700">36 Buah Semangka</span>!
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 6.2 Heuristik Pengandaian Ekstrem (Supposition Method) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Supposition / Assumption Method" : "Heuristik Pengandaian Ekstrem (Metode Asumsi SASMO/OSN)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Sering diuji pada kompetisi SASMO dan OSN untuk masalah skor kompetisi atau jumlah kaki hewan. Asumsikan semua jawaban benar, lalu hitung defisit poin dibagi selisih nilai per penggantian.
                  </p>

                  <div className="bg-[#F1F6FC] p-4 rounded-2xl border border-[#CFDFEF] flex flex-col gap-3 font-sans">
                    <div className="p-3 bg-white rounded-xl border border-[#CADDF0] text-xs text-[#203657] leading-relaxed">
                      <span className="font-bold text-blue-800">Kasus Soal Kompetisi:</span> Ujian 30 soal. Benar = +4, Salah = −2. Budi menjawab semua 30 soal dan meraih skor 72. Berapa soal yang dijawab benar?
                    </div>

                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                      <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-blue-700 font-sans font-bold block">1. Andaikan Semua Benar</span>
                        <span className="font-bold text-sm text-blue-950">30 × (+4) = 120 poin</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                      <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-rose-700 font-sans font-bold block">2. Surplus Skor Imajiner</span>
                        <span className="font-bold text-sm text-rose-950">120 − 72 = 48 poin</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-amber-700 font-sans font-bold block">3. Penalti per Salah</span>
                        <span className="font-bold text-sm text-amber-950">4 − (−2) = 6 poin</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-black text-xs sm:text-sm w-full sm:w-auto shadow-xs">
                        Salah = 48 ÷ 6 = 8 Soal<br />
                        Benar = 30 − 8 = 22 Soal
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6.3 Heuristik Selisih Tetap Usia */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Constant Difference Age Problem (Bar Bracket)" : "Heuristik Selisih Tetap Masalah Usia"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Perubahan waktu (usia) menambah umur kedua pihak secara identik, sehingga selisih umur mereka selalu konstan sepanjang masa.
                  </p>

                  <div className="bg-[#F1F6FC] p-4 rounded-2xl border border-[#CFDFEF] flex flex-col gap-3 font-sans">
                    <div className="p-3 bg-white rounded-xl border border-[#CADDF0] text-xs text-[#203657] leading-relaxed">
                      <span className="font-bold text-teal-800">Kasus Soal Usia:</span> Saat ini usia Ayah 38 tahun dan anak 10 tahun. Berapa tahun yang lalu usia Ayah tepat 5 kali usia anaknya?
                    </div>

                    <div className="p-3.5 bg-white rounded-xl border border-[#CADDF0] font-mono text-xs flex flex-col gap-1.5 text-center">
                      <div>Selisih usia selalu tetap: <span className="font-black text-teal-800">38 − 10 = 28 tahun</span>.</div>
                      <div>Kondisi masa lalu: Ayah = 5 Unit, Anak = 1 Unit ⟹ Selisih = 5 − 1 = 4 Unit.</div>
                      <div className="p-2 bg-emerald-50 rounded-lg text-emerald-950 font-bold border border-emerald-300">
                        4 Unit = 28 tahun ⟹ 1 Unit (Usia Anak saat itu) = 7 tahun.<br />
                        Waktu yang telah berlalu = 10 − 7 = <span className="text-emerald-700 font-black text-sm">3 Tahun yang Lalu</span>.
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6.4 Jurus Kuadrat Berakhiran 5 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Squaring Numbers Ending in 5" : "Jurus Kuadrat Berakhiran 5"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Rumus: a5² = [a × (a + 1)] digabung dengan [25]. Kalikan digit puluhan dengan kakaknya (angka berikutnya), lalu pasang 25 di belakang.
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Bilangan Puluhan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[3, 6, 8, 9, 10].map((tens) => (
                          <button
                            key={tens}
                            onClick={() => setSquareFiveTens(tens)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              squareFiveTens === tens
                                ? "bg-indigo-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {tens}5²
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <div className="px-4 py-2 bg-white rounded-xl border-2 border-indigo-200 text-center font-mono font-black text-lg sm:text-xl text-indigo-950 shadow-2xs">
                        {squareFiveTens}5²
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="px-3 py-1.5 bg-indigo-600 text-white font-black text-sm sm:text-base rounded-xl shadow-2xs">
                          {squareFiveTens} × {squareFiveTens + 1} = {squareFiveTens * (squareFiveTens + 1)}
                        </span>
                        <span className="px-3 py-1.5 bg-amber-500 text-white font-black text-sm sm:text-base rounded-xl shadow-2xs">
                          25
                        </span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="px-4 py-2 bg-emerald-50 text-emerald-900 font-mono font-black text-xl sm:text-2xl rounded-xl border-2 border-emerald-300 shadow-2xs">
                        {squareFiveTens * (squareFiveTens + 1)}25
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6.5 Tarik Akar Pangkat Tiga dalam 3 Detik */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.5
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Cube Root in 3 Seconds (3-Digit Curtain)" : "Tarik Akar Pangkat Tiga dalam 3 Detik (Tirai 3 Digit)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Tutup 3 angka terakhir. Digit satuan dipetakan secara unik (2 ↔ 8, 3 ↔ 7, angka lain tetap sama). Angka tersisa di depan menentukan digit puluhan.
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Bilangan Kubik:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[24389, 42875, 91125, 117649].map((val) => (
                          <button
                            key={val}
                            onClick={() => setCubeRootInput(val)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              cubeRootInput === val
                                ? "bg-teal-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            ³√{val.toLocaleString("id-ID")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const str = String(cubeRootInput);
                      const leftPart = str.slice(0, -3);
                      const lastDigit = Number(str.slice(-1));
                      const unitMap: Record<number, number> = {
                        0: 0, 1: 1, 2: 8, 3: 7, 4: 4, 5: 5, 6: 6, 7: 3, 8: 2, 9: 9,
                      };
                      const ansUnit = unitMap[lastDigit];
                      const ansTens = Math.round(Math.cbrt(cubeRootInput) - ansUnit) / 10;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                          <div className="p-2.5 bg-sky-50/90 rounded-xl border-2 border-sky-200 text-center w-full sm:w-auto shadow-2xs">
                            <span className="text-[10px] text-sky-700 font-sans font-bold block mb-0.5">Depan Tirai</span>
                            <span className="font-bold text-sm sm:text-base text-sky-950">{leftPart}</span>
                            <span className="text-[10px] text-sky-700 font-sans block mt-0.5">
                              ³√{leftPart} mendekati {ansTens}³ ({Math.pow(ansTens, 3)})
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">|</span>

                          <div className="p-2.5 bg-amber-50/90 rounded-xl border-2 border-amber-200 text-center w-full sm:w-auto shadow-2xs">
                            <span className="text-[10px] text-amber-700 font-sans font-bold block mb-0.5">Belakang Tirai</span>
                            <span className="font-bold text-sm sm:text-base text-amber-950">
                              ...<span className="text-amber-800 underline font-black">{lastDigit}</span>
                            </span>
                            <span className="text-[10px] text-amber-800 font-sans block mt-0.5">
                              Satuan {lastDigit} ⟹ {ansUnit}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">=</span>

                          <div className="px-4 py-2 bg-emerald-600 text-white font-black text-xl sm:text-2xl rounded-xl shadow-xs">
                            {ansTens}{ansUnit}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 6.6 Perkalian Berbasis Selisih Relatif 100 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.6
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Base-100 Cross Multiplication" : "Perkalian Berbasis Selisih Relatif 100 (Kabel Silang)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    Pemanfaatan deviasi aljabar terhadap bilangan acuan 100. Kiri = kurangkan/jumlahkan silang, Kanan = kalikan deviasi.
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setBase100Mode("below")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          base100Mode === "below"
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Keduanya di Bawah 100 (96 × 93)
                      </button>
                      <button
                        onClick={() => setBase100Mode("above")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          base100Mode === "above"
                            ? "bg-purple-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Keduanya di Atas 100 (104 × 108)
                      </button>
                      <button
                        onClick={() => setBase100Mode("mixed")}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          base100Mode === "mixed"
                            ? "bg-orange-500 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Campuran (106 × 95)
                      </button>
                    </div>

                    {base100Mode === "below" && (
                      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                        <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 text-center">
                          <span className="text-[10px] text-blue-700 font-sans font-bold block">Kiri: Kurang Silang</span>
                          <span className="font-bold text-sm text-blue-950">96 − 7 = 89</span>
                        </div>
                        <span className="text-[#7B94B2] font-black">+</span>
                        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                          <span className="text-[10px] text-amber-700 font-sans font-bold block">Kanan: Kali Deviasi</span>
                          <span className="font-bold text-sm text-amber-950">(−4) × (−7) = 28</span>
                        </div>
                        <span className="text-[#7B94B2] font-black">=</span>
                        <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-black text-base shadow-xs">
                          8.928
                        </div>
                      </div>
                    )}

                    {base100Mode === "above" && (
                      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                        <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-center">
                          <span className="text-[10px] text-purple-700 font-sans font-bold block">Kiri: Jumlah Silang</span>
                          <span className="font-bold text-sm text-purple-950">104 + 8 = 112</span>
                        </div>
                        <span className="text-[#7B94B2] font-black">+</span>
                        <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center">
                          <span className="text-[10px] text-amber-700 font-sans font-bold block">Kanan: Kali Deviasi</span>
                          <span className="font-bold text-sm text-amber-950">(+4) × (+8) = 32</span>
                        </div>
                        <span className="text-[#7B94B2] font-black">=</span>
                        <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-black text-base shadow-xs">
                          11.232
                        </div>
                      </div>
                    )}

                    {base100Mode === "mixed" && (
                      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                        <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-200 text-center">
                          <span className="text-[10px] text-orange-700 font-sans font-bold block">Kiri: Basis Ratusan</span>
                          <span className="font-bold text-sm text-orange-950">(106 − 5) × 100 = 10.100</span>
                        </div>
                        <span className="text-[#7B94B2] font-black">−</span>
                        <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-center">
                          <span className="text-[10px] text-rose-700 font-sans font-bold block">Kanan: Deviasi Minus</span>
                          <span className="font-bold text-sm text-rose-950">(+6) × (−5) = −30</span>
                        </div>
                        <span className="text-[#7B94B2] font-black">=</span>
                        <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-black text-base shadow-xs">
                          10.070
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 6.7 Kunci Rahasia OSN: Keajaiban 1001 & Deret Gauss */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.7
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Olympiad Secrets: 1001 Factor & Gauss Series" : "Kunci Rahasia OSN: Keajaiban 1001 & Deret Gauss"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    1001 = 7 × 11 × 13. Setiap bilangan 3-digit berulang (abc.abc) pasti habis dibagi 7, 11, dan 13. Pasangkan pula deret simetris Gauss dengan melipat pita (1 + 100 = 101).
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="w-full p-3 bg-white rounded-xl border-2 border-amber-200 text-center font-mono">
                      <div className="text-xs sm:text-sm font-bold text-[#182C48]">
                        <span className="text-amber-700 font-black">{mystery1001Num}</span> × 1001 ={" "}
                        <span className="text-emerald-700 font-black text-sm sm:text-base">
                          {mystery1001Num}.{mystery1001Num}
                        </span>
                      </div>
                      <div className="text-[11px] text-amber-800 font-sans font-medium mt-1">
                        Artinya angka berulang {mystery1001Num}.{mystery1001Num} pasti habis dibagi{" "}
                        <span className="font-bold text-purple-700">7</span>,{" "}
                        <span className="font-bold text-sky-700">11</span>, dan{" "}
                        <span className="font-bold text-rose-700">13</span> tanpa sisa!
                      </div>
                    </div>

                    {/* Gauss series */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                      <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200 text-center w-full sm:w-auto">
                        <span className="text-[10px] text-sky-700 font-sans font-bold block">Nilai Pasangan</span>
                        <span className="font-black text-xs sm:text-sm text-sky-950">1 + {gaussN} = {gaussN + 1}</span>
                      </div>
                      <span className="text-[#7B94B2] font-black text-sm">×</span>
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-center w-full sm:w-auto">
                        <span className="text-[10px] text-amber-700 font-sans font-bold block">Banyak Pasangan</span>
                        <span className="font-black text-xs sm:text-sm text-amber-950">{gaussN} ÷ 2 = {gaussN / 2}</span>
                      </div>
                      <span className="text-[#7B94B2] font-black text-sm">=</span>
                      <div className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black text-base rounded-xl shadow-xs">
                        {((gaussN / 2) * (gaussN + 1)).toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
