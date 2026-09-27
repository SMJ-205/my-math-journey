"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  ArrowRight,
  BookOpen,
  Compass,
  Calculator,
  Layers,
  Percent,
  CheckCircle2,
  RefreshCw,
  Trophy,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { useLanguageStore } from "@/store/languageStore";

interface SpeedMathMasterclassPageProps {
  onBack: () => void;
}

export function SpeedMathMasterclassPage({ onBack }: SpeedMathMasterclassPageProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";

  const [activeModule, setActiveModule] = useState<number>(1);

  // Interactive state for sandboxes
  // Modul 1
  const [bondsTarget, setBondsTarget] = useState<number>(7);
  const [bridgeA, setBridgeA] = useState<number>(8);
  const [bridgeB, setBridgeB] = useState<number>(5);

  // Modul 2
  const [multElevenNum, setMultElevenNum] = useState<number>(53);
  const [halveDoubleA, setHalveDoubleA] = useState<number>(16);
  const [halveDoubleB, setHalveDoubleB] = useState<number>(35);

  // Modul 3
  const [ladderA, setLadderA] = useState<number>(12);
  const [ladderB, setLadderB] = useState<number>(18);
  const [ladderTab, setLadderTab] = useState<"fpb" | "kpk">("fpb");

  // Modul 4
  const [swapX, setSwapX] = useState<number>(16);
  const [swapY, setSwapY] = useState<number>(50);

  // Modul 5
  const [squareFiveTens, setSquareFiveTens] = useState<number>(8); // default 85 as in screenshot
  const [cubeRootInput, setCubeRootInput] = useState<number>(24389);

  // Modul 6
  const [gaussN, setGaussN] = useState<number>(100);
  const [mystery1001Num, setMystery1001Num] = useState<number>(523);

  const modules = [
    {
      id: 1,
      title: isEn ? "1. Whole Numbers" : "1. Bilangan Cacah",
      subtitle: isEn ? "Grades 1–2 (Phase A)" : "Fase A (Kelas 1–2)",
      Icon: BookOpen,
    },
    {
      id: 2,
      title: isEn ? "2. Mental Multiplication" : "2. Perkalian Mental",
      subtitle: isEn ? "Grades 3–4 (Phase B)" : "Fase B (Kelas 3–4)",
      Icon: Zap,
    },
    {
      id: 3,
      title: isEn ? "3. Friendly GCF & LCM" : "3. KPK & FPB Ramah",
      subtitle: isEn ? "Grades 4–5 (Phase B/C)" : "Fase B–C (Kelas 4–5)",
      Icon: Layers,
    },
    {
      id: 4,
      title: isEn ? "4. Fractions & Rapid %" : "4. Pecahan & Persen",
      subtitle: isEn ? "Grades 5–6 (Phase C)" : "Fase C (Kelas 5–6)",
      Icon: Percent,
    },
    {
      id: 5,
      title: isEn ? "5. Squares & Roots" : "5. Kuadrat & Akar Cepat",
      subtitle: isEn ? "Grades 5–6 & Olympiad" : "Kelas 5–6 & Olimpiade",
      Icon: Calculator,
    },
    {
      id: 6,
      title: isEn ? "6. Olympiad Tricks" : "6. Analisis Olimpiade",
      subtitle: isEn ? "SASMO & OSN Prep" : "OSN & SASMO SD",
      Icon: Trophy,
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-[#F4F7FB]">
      {/* Header with compact title on mobile to prevent 'Speed Mat...' truncation */}
      <PageHeader
        showBack
        onBack={onBack}
        title={isEn ? "Speed Math" : "Kelas Mahir"}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col gap-5 sm:gap-6">
        {/* Hero Banner - Soft Light Navy Palette */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EAF1F9] via-[#DEEAF6] to-[#CBDDF1] p-5 sm:p-7 text-[#1E3352] border-2 border-[#B9D1EC] shadow-xs">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-white/80 backdrop-blur-md uppercase tracking-wider text-[#213C63] border border-white/90 shadow-2xs">
              <Sparkles size={13} className="text-[#2B4B77]" />
              {isEn ? "CPA Visual & Mental Method" : "Metode Konkret-Piktorial-Abstrak"}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black mt-2 leading-tight text-[#182C48]">
              {isEn
                ? "Speed Math Guide & Mental Calculation Tricks"
                : "Panduan Hitung Cepat & Jurus Mental Matematika SD"}
            </h1>
            <p className="text-[#3F587D] text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
              {isEn
                ? "Interactive case-by-case visual guidelines and mental arithmetic techniques. Direct visual understanding without rote memorization."
                : "Panduan interaktif per studi kasus dengan visualisasi langsung. Bukan sekadar bank soal, melainkan jurus trik intuitif."}
            </p>
          </div>
        </div>

        {/* Module Selector Tabs - Horizontal scrollable on mobile, never squished */}
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
                <span className={`text-xs font-black leading-tight ${isActive ? "text-white" : "text-[#182C48]"}`}>
                  {m.title}
                </span>
                <span
                  className={`text-[10px] font-semibold mt-0.5 ${
                    isActive ? "text-blue-100" : "text-[#6B82A0]"
                  }`}
                >
                  {m.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* ========================================================= */}
            {/* MODUL 1: FONDASI BILANGAN CACAH */}
            {/* ========================================================= */}
            {activeModule === 1 && (
              <div className="flex flex-col gap-5">
                {/* 1.1 Pasangan Sahabat 10 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Friends of 10 & Ten-Frames" : "Pasangan Sahabat 10 & Bingkai Sepuluh"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Every single digit has a complementary 'Best Friend' that sums to 10. Visualized using a 5x2 Ten-Frame grid."
                      : "Setiap angka memiliki Sahabat Karib yang jika dijumlahkan selalu bernilai 10. Divisualisasikan dengan Bingkai 10 (kotak 5 × 2)."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    {/* Selector - stacked label and wrap buttons */}
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

                    {/* 5x2 Ten-Frame with kid-friendly color distinction: Indigo for filled, Warm Amber for friend slots */}
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
                        {isEn ? (
                          <>
                            Friend of <span className="font-bold text-indigo-600">{bondsTarget}</span> is{" "}
                            <span className="font-bold text-amber-600">{10 - bondsTarget}</span> (the amber slots).
                          </>
                        ) : (
                          <>
                            Sahabat dari <span className="font-bold text-indigo-600">{bondsTarget}</span> adalah{" "}
                            <span className="font-bold text-amber-600">{10 - bondsTarget}</span> (kotak jingga).
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1.2 Bridging Through 10 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Bridging Through 10" : "Jurus Lompatan Melampaui 10"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "When adding numbers that cross 10, split the second number using the friend of 10 to land exactly on 10, then add the remainder."
                      : "Pecah angka kedua menjadi teman 10 angka pertama dan sisanya, agar mendarat mulus di 10 terlebih dahulu."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 font-mono font-black text-xl sm:text-2xl text-[#182C48]">
                      <span className="text-blue-600">{bridgeA}</span>
                      <span>+</span>
                      <span className="text-purple-600">{bridgeB}</span>
                      <span>=</span>
                      <span className="text-emerald-600">{bridgeA + bridgeB}</span>
                    </div>

                    {/* Step breakdown - colorful kid-friendly progression */}
                    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 text-xs sm:text-sm">
                      <div className="p-2.5 sm:p-3 bg-blue-50/90 rounded-xl border border-blue-200 text-center">
                        <span className="text-blue-600 font-bold block text-[10px] sm:text-xs mb-0.5">
                          Langkah 1: Teman 10
                        </span>
                        <span className="font-bold text-blue-950">
                          {bridgeA} butuh <span className="underline decoration-blue-500 font-black">{10 - bridgeA}</span> untuk jadi 10
                        </span>
                      </div>
                      <span className="text-[#7B94B2] font-black text-center sm:text-left">→</span>
                      <div className="p-2.5 sm:p-3 bg-purple-50/90 rounded-xl border border-purple-200 text-center">
                        <span className="text-purple-600 font-bold block text-[10px] sm:text-xs mb-0.5">
                          Langkah 2: Pecah Angka Kedua
                        </span>
                        <span className="font-bold text-purple-950">
                          {bridgeB} dipecah: ({10 - bridgeA} + {bridgeB - (10 - bridgeA)})
                        </span>
                      </div>
                      <span className="text-[#7B94B2] font-black text-center sm:text-left">→</span>
                      <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-center shadow-2xs">
                        <span className="text-emerald-700 font-bold block text-[10px] sm:text-xs mb-0.5">
                          Hasil Kilat
                        </span>
                        <span className="font-black text-emerald-900">
                          10 + {bridgeB - (10 - bridgeA)} = {bridgeA + bridgeB}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1.3 Near-Doubles & 1.4 Constant Difference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 mb-2 border border-amber-200">
                        1.3 Near-Doubles (Hampir-Kembar)
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-[#182C48] mb-1.5">
                        6 + 7 = 6 + 6 + 1 = 13
                      </h3>
                      <p className="text-xs text-[#415777] leading-relaxed">
                        {isEn
                          ? "Anchor to known double facts. Since 6+6=12, adding 7 (which is 6+1) is simply 12+1=13."
                          : "Gunakan jangkar angka kembar yang sudah dihafal (6+6=12). Karena 7 adalah 6+1, maka 6+7 = 12+1 = 13."}
                      </p>
                    </div>
                    <div className="mt-3 p-2.5 bg-amber-50/70 rounded-xl text-center font-mono font-bold text-xs text-amber-900 border border-amber-200">
                      7 + 8 = (7 × 2) + 1 = 15 | 8 + 9 = (8 × 2) + 1 = 17
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal-100 text-teal-800 mb-2 border border-teal-200">
                        1.4 Selisih Tetap (Tanpa Meminjam)
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-[#182C48] mb-1.5">
                        52 − 19 = 53 − 20 = 33
                      </h3>
                      <p className="text-xs text-[#415777] leading-relaxed">
                        {isEn
                          ? "Add or subtract the same value to both numbers to turn the subtrahend into a friendly zero-ending number."
                          : "Tambahkan nilai yang sama pada kedua bilangan agar pengurang menjadi bilangan bulat puluhan tanpa perlu meminjam."}
                      </p>
                    </div>
                    <div className="mt-3 p-2.5 bg-teal-50/70 rounded-xl text-center font-mono font-bold text-xs text-teal-900 border border-teal-200">
                      84 − 38 = (84 + 2) − (38 + 2) = 86 − 40 = 46
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 2: PERKALIAN MENTAL & SPASIAL */}
            {/* ========================================================= */}
            {activeModule === 2 && (
              <div className="flex flex-col gap-5">
                {/* 2.1 Area Model 4 Kuadran */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "4-Quadrant Area Model" : "Model Area 4 Kuadran (14 × 12)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Decompose 2-digit numbers into tens and ones (14 = 10+4, 12 = 10+2). Calculate the 4 sub-rectangles and sum them mentally."
                      : "Pecah bilangan menjadi puluhan dan satuan (14 = 10 + 4, 12 = 10 + 2). Hitung 4 kotak persegi panjang lalu jumlahkan."}
                  </p>

                  <div className="max-w-md mx-auto p-3.5 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF]">
                    {/* 4 Colorful Quadrants for Visual Distinction */}
                    <div className="grid grid-cols-2 gap-2.5 text-center font-mono font-bold">
                      <div className="p-2.5 bg-indigo-50/90 border-2 border-indigo-200 rounded-xl shadow-2xs">
                        <span className="text-[10px] text-indigo-600 font-bold block">10 × 10</span>
                        <span className="text-base sm:text-lg text-indigo-950 font-black">100</span>
                      </div>
                      <div className="p-2.5 bg-amber-50/90 border-2 border-amber-200 rounded-xl shadow-2xs">
                        <span className="text-[10px] text-amber-600 font-bold block">4 × 10</span>
                        <span className="text-base sm:text-lg text-amber-950 font-black">40</span>
                      </div>
                      <div className="p-2.5 bg-sky-50/90 border-2 border-sky-200 rounded-xl shadow-2xs">
                        <span className="text-[10px] text-sky-600 font-bold block">10 × 2</span>
                        <span className="text-base sm:text-lg text-sky-950 font-black">20</span>
                      </div>
                      <div className="p-2.5 bg-rose-50/90 border-2 border-rose-200 rounded-xl shadow-2xs">
                        <span className="text-[10px] text-rose-600 font-bold block">4 × 2</span>
                        <span className="text-base sm:text-lg text-rose-950 font-black">8</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#CADDF0] text-center font-bold text-xs sm:text-sm text-[#182C48]">
                      Total = 100 + 40 + 20 + 8 = <span className="text-emerald-600 font-black text-base">168</span>
                    </div>
                  </div>
                </div>

                {/* 2.2 Halving and Doubling */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Halving & Doubling Technique" : "Jurus Bagi Dua & Kali Dua"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Halve the even number, double the number ending in 5. The product remains identical but turns into an effortless mental calculation."
                      : "Bagi 2 bilangan genap, kalikan 2 bilangan yang berakhiran 5. Hasilnya tetap sama persis tetapi jauh lebih mudah dihitung di kepala."}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3.5 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF]">
                    <div className="flex items-center gap-1.5 font-mono font-black text-lg sm:text-xl text-[#182C48]">
                      <span className="px-2.5 py-1 bg-white rounded-xl border border-[#CADDF0]">{halveDoubleA}</span>
                      <span>×</span>
                      <span className="px-2.5 py-1 bg-white rounded-xl border border-[#CADDF0]">{halveDoubleB}</span>
                    </div>

                    <div className="flex flex-col items-center text-blue-600 font-bold text-xs">
                      <span>(÷2) ⇄ (×2)</span>
                      <span>⟹</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono font-black text-lg sm:text-xl text-[#182C48]">
                      <span className="px-2.5 py-1 bg-sky-500 text-white rounded-xl shadow-2xs">{halveDoubleA / 2}</span>
                      <span>×</span>
                      <span className="px-2.5 py-1 bg-amber-500 text-white rounded-xl shadow-2xs">{halveDoubleB * 2}</span>
                      <span>=</span>
                      <span className="text-emerald-600 font-black text-xl sm:text-2xl">
                        {(halveDoubleA / 2) * (halveDoubleB * 2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2.3 & 2.4 Jurus Pengali Spesial */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 2.3 Jurus x11 */}
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-100 text-purple-800 mb-2 border border-purple-200">
                      2.3 Jurus × 11 (Sandwich Digit)
                    </span>
                    <p className="text-xs text-[#415777] mb-3">
                      {isEn
                        ? "Insert the sum of the two digits in between them. If sum ≥ 10, carry 1 to the hundreds."
                        : "Jumlahkan kedua digit lalu selipkan di tengah. Jika jumlah ≥ 10, simpan 1 ke digit ratusan."}
                    </p>

                    {/* Stacked label and wrap buttons */}
                    <div className="w-full flex flex-col gap-1.5 mb-3">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Angka:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[32, 53, 62, 75, 84].map((val) => (
                          <button
                            key={val}
                            onClick={() => setMultElevenNum(val)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              multElevenNum === val
                                ? "bg-purple-600 text-white shadow-2xs"
                                : "bg-[#F1F6FC] text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(() => {
                      const d1 = Math.floor(multElevenNum / 10);
                      const d2 = multElevenNum % 10;
                      const sum = d1 + d2;
                      const ans = multElevenNum * 11;
                      return (
                        <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-200 text-center font-mono">
                          <p className="text-xs sm:text-sm font-bold text-purple-950">
                            {multElevenNum} × 11 = {d1} [{d1}+{d2}] {d2} ={" "}
                            <span className="text-emerald-600 font-black text-sm sm:text-base">{ans}</span>
                          </p>
                          {sum >= 10 && (
                            <p className="text-[11px] text-purple-700 font-sans mt-1">
                              Karena {d1}+{d2}={sum} (≥10), simpan 1 ke depan: ({d1}+1){sum % 10}{d2} = {ans}
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* 2.4 Jurus x5, x9 & x25 */}
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-orange-100 text-orange-800 mb-2 border border-orange-200">
                        2.4 Jurus × 5, × 9, & × 25
                      </span>
                      <div className="flex flex-col gap-2 text-xs font-mono">
                        <div className="p-2 bg-emerald-50/70 rounded-lg border border-emerald-200">
                          <span className="font-bold text-emerald-800">× 5:</span> n0 ÷ 2
                          <span className="text-emerald-950 block text-[11px]">48 × 5 = 480 ÷ 2 = 240</span>
                        </div>
                        <div className="p-2 bg-amber-50/70 rounded-lg border border-amber-200">
                          <span className="font-bold text-amber-800">× 9:</span> n0 − n
                          <span className="text-amber-950 block text-[11px]">37 × 9 = 370 − 37 = 333</span>
                        </div>
                        <div className="p-2 bg-blue-50/70 rounded-lg border border-blue-200">
                          <span className="font-bold text-blue-800">× 25:</span> n00 ÷ 4
                          <span className="text-blue-950 block text-[11px]">36 × 25 = 3.600 ÷ 4 = 900</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 3: TEORI BILANGAN: KPK & FPB RAMAH ANAK */}
            {/* ========================================================= */}
            {activeModule === 3 && (
              <div className="flex flex-col gap-5">
                {/* 3.1 Metode Tangga (Sengkedan) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "The Ladder Method (Petak Sawah)" : "Metode Tangga / Sengkedan Petak Sawah"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "A single-table method to find both GCF and LCM simultaneously without complicated prime trees."
                      : "Metode paling ramah anak untuk mencari FPB dan KPK sekaligus dalam satu petak tanpa menggambar banyak pohon faktor yang berantakan."}
                  </p>

                  {/* Preset Buttons - stacked label and wrap buttons */}
                  <div className="w-full flex flex-col gap-1.5 mb-3.5">
                    <span className="text-xs font-bold text-[#253D5F]">Contoh Pasangan:</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        [12, 18],
                        [16, 24],
                        [24, 36],
                        [30, 45],
                      ].map(([a, b]) => (
                        <button
                          key={`${a}-${b}`}
                          onClick={() => {
                            setLadderA(a);
                            setLadderB(b);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            ladderA === a && ladderB === b
                              ? "bg-emerald-600 text-white shadow-2xs"
                              : "bg-[#F1F6FC] text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                          }`}
                        >
                          {a} & {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Toggle I vs L */}
                  <div className="flex justify-center gap-2 mb-3.5">
                    <button
                      onClick={() => setLadderTab("fpb")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        ladderTab === "fpb"
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-[#EDF3FA] text-[#364F73] border border-[#D0DFEF] hover:bg-[#E3EDF8]"
                      }`}
                    >
                      Konfigurasi Huruf I (FPB)
                    </button>
                    <button
                      onClick={() => setLadderTab("kpk")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        ladderTab === "kpk"
                          ? "bg-indigo-600 text-white shadow-2xs"
                          : "bg-[#EDF3FA] text-[#364F73] border border-[#D0DFEF] hover:bg-[#E3EDF8]"
                      }`}
                    >
                      Konfigurasi Huruf L (KPK)
                    </button>
                  </div>

                  {/* Ladder Grid Card */}
                  <div className="p-3.5 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] max-w-sm mx-auto">
                    <div className="flex flex-col items-center">
                      <table className="border-collapse font-mono font-bold text-sm sm:text-base">
                        <tbody>
                          <tr className="border-b-2 border-[#CADDF0]">
                            <td className="pr-3 py-1.5 text-right">
                              <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-black shadow-2xs ${
                                  ladderTab === "fpb" || ladderTab === "kpk"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-200"
                                }`}
                              >
                                ÷ 2
                              </span>
                            </td>
                            <td className="pl-3 py-1.5 border-l-4 border-emerald-400">
                              <span className="mr-5 text-[#182C48]">{ladderA}</span>
                              <span className="text-[#182C48]">{ladderB}</span>
                            </td>
                          </tr>
                          <tr className="border-b-2 border-[#CADDF0]">
                            <td className="pr-3 py-1.5 text-right">
                              <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-black shadow-2xs ${
                                  ladderTab === "fpb" || ladderTab === "kpk"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-200"
                                }`}
                              >
                                ÷ 3
                              </span>
                            </td>
                            <td className="pl-3 py-1.5 border-l-4 border-emerald-400">
                              <span className="mr-5 text-[#182C48]">{ladderA / 2}</span>
                              <span className="text-[#182C48]">{ladderB / 2}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-3 py-1.5 text-right text-xs text-[#8299B5]">-</td>
                            <td className="pl-3 py-1.5 border-l-4 border-emerald-400">
                              <span
                                className={`px-2 py-0.5 rounded-lg mr-3 ${
                                  ladderTab === "kpk" ? "bg-indigo-600 text-white shadow-2xs" : "text-[#203657]"
                                }`}
                              >
                                {ladderA / 6}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-lg ${
                                  ladderTab === "kpk" ? "bg-indigo-600 text-white shadow-2xs" : "text-[#203657]"
                                }`}
                              >
                                {ladderB / 6}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-[#CADDF0] text-center">
                      {ladderTab === "fpb" ? (
                        <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold text-xs sm:text-sm">
                          FPB (Huruf I Tegak) = 2 × 3 ={" "}
                          <span className="text-emerald-700 font-black text-base">6</span>
                          <p className="text-[11px] text-emerald-700 font-sans font-normal mt-0.5">
                            Hanya kalikan angka pembagi di sisi tegak kiri.
                          </p>
                        </div>
                      ) : (
                        <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-200 text-indigo-950 font-bold text-xs sm:text-sm">
                          KPK (Bentuk L) = 2 × 3 × {ladderA / 6} × {ladderB / 6} ={" "}
                          <span className="text-indigo-700 font-black text-base">
                            {(ladderA * ladderB) / 6}
                          </span>
                          <p className="text-[11px] text-indigo-700 font-sans font-normal mt-0.5">
                            Kalikan seluruh angka di sisi tegak dan baris alas paling bawah (huruf L).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 3.2 Rumus Emas FPB x KPK */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Golden Rule of Number Theory" : "Rumus Emas Hubungan FPB & KPK"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3 leading-relaxed">
                    {isEn
                      ? "The product of two numbers is ALWAYS equal to the product of their GCF and LCM."
                      : "Hasil kali dua bilangan selalu tepat sama dengan perkalian antara FPB dan KPK kedua bilangan tersebut."}
                  </p>

                  <div className="p-3.5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-amber-200 text-center font-mono">
                    <div className="text-sm sm:text-base font-black text-amber-950">
                      FPB(a, b) × KPK(a, b) = a × b
                    </div>
                    <div className="text-xs text-amber-800 font-sans font-semibold mt-1">
                      Contoh angka 12 & 18: <span className="font-bold">6 × 36 = 12 × 18 = 216</span> (Terbukti selalu sama)
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 4: PECAHAN ACUAN & PERSENTASE KILAT */}
            {/* ========================================================= */}
            {activeModule === 4 && (
              <div className="flex flex-col gap-5">
                {/* 4.1 Bank Pecahan Acuan (Kamus Mental) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Benchmark Fraction Memory Bank" : "Bank Pecahan Acuan (Kamus Mental)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3 leading-relaxed">
                    {isEn
                      ? "Memorize these essential fraction-percentage anchors to solve percent problems instantaneously."
                      : "Hafalkan pasangan pecahan-persentase jangkar ini agar dapat menghitung diskon dan persen dalam hitungan detik."}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
                    <div className="p-2.5 bg-sky-50/90 border-2 border-sky-200 rounded-xl shadow-2xs">
                      <span className="text-sky-700 font-bold block text-[11px]">50%</span>
                      <span className="text-sky-950 font-black text-base">1/2</span>
                    </div>
                    <div className="p-2.5 bg-emerald-50/90 border-2 border-emerald-200 rounded-xl shadow-2xs">
                      <span className="text-emerald-700 font-bold block text-[11px]">25%</span>
                      <span className="text-emerald-950 font-black text-base">1/4</span>
                    </div>
                    <div className="p-2.5 bg-teal-50/90 border-2 border-teal-200 rounded-xl shadow-2xs">
                      <span className="text-teal-700 font-bold block text-[11px]">12.5%</span>
                      <span className="text-teal-950 font-black text-base">1/8</span>
                    </div>
                    <div className="p-2.5 bg-purple-50/90 border-2 border-purple-200 rounded-xl shadow-2xs">
                      <span className="text-purple-700 font-bold block text-[11px]">33.3%</span>
                      <span className="text-purple-950 font-black text-base">1/3</span>
                    </div>
                    <div className="p-2.5 bg-amber-50/90 border-2 border-amber-200 rounded-xl shadow-2xs">
                      <span className="text-amber-700 font-bold block text-[11px]">20%</span>
                      <span className="text-amber-950 font-black text-base">1/5</span>
                    </div>
                    <div className="p-2.5 bg-orange-50/90 border-2 border-orange-200 rounded-xl shadow-2xs">
                      <span className="text-orange-700 font-bold block text-[11px]">10%</span>
                      <span className="text-orange-950 font-black text-base">1/10</span>
                    </div>
                    <div className="p-2.5 bg-rose-50/90 border-2 border-rose-200 rounded-xl shadow-2xs">
                      <span className="text-rose-700 font-bold block text-[11px]">5%</span>
                      <span className="text-rose-950 font-black text-base">1/20</span>
                    </div>
                    <div className="p-2.5 bg-indigo-50/90 border-2 border-indigo-200 rounded-xl shadow-2xs">
                      <span className="text-indigo-700 font-bold block text-[11px]">1%</span>
                      <span className="text-indigo-950 font-black text-base">1/100</span>
                    </div>
                  </div>
                </div>

                {/* 4.2 Jurus Sakti Pertukaran Persen */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Percent Swap Trick (x% of y = y% of x)" : "Jurus Sakti Pertukaran Persen"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Because multiplication is commutative, x% of y is ALWAYS equal to y% of x. 16% of 50 looks tricky, but 50% of 16 is just half of 16 = 8."
                      : "Sifat komutatif perkalian membuat x% dari y SELALU sama dengan y% dari x. Menghitung 16% dari 50 terdengar sulit, tapi 50% dari 16 adalah setengah dari 16 = 8."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    {/* Selector */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Coba Kasus:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          [16, 50],
                          [8, 25],
                          [44, 50],
                          [12, 75],
                          [36, 25],
                        ].map(([x, y]) => (
                          <button
                            key={`${x}-${y}`}
                            onClick={() => {
                              setSwapX(x);
                              setSwapY(y);
                            }}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              swapX === x && swapY === y
                                ? "bg-purple-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {x}% dari {y}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculation step cards with distinct kid-friendly color palettes */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                      <div className="p-2.5 sm:p-3 bg-rose-50/80 rounded-xl border-2 border-rose-200 text-center font-mono w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-rose-700 font-sans font-bold block mb-0.5">
                          Soal Awal (Terlihat Rumit)
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-rose-950">{swapX}% × {swapY}</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⇄</span>

                      <div className="p-2.5 sm:p-3 bg-emerald-50/80 rounded-xl border-2 border-emerald-300 text-center font-mono w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-emerald-700 font-sans font-bold block mb-0.5">
                          Ditukar (Sangat Mudah)
                        </span>
                        <span className="font-black text-xs sm:text-sm text-emerald-950">{swapY}% × {swapX}</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl shadow-xs text-center font-mono w-full sm:w-auto">
                        <span className="text-[10px] text-blue-200 font-sans font-bold block mb-0.5">
                          Hasil Kilat
                        </span>
                        <span className="font-black text-sm sm:text-base text-white">
                          {(swapX * swapY) / 100}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 5: PANGKAT, KUADRAT & AKAR CEPAT */}
            {/* ========================================================= */}
            {activeModule === 5 && (
              <div className="flex flex-col gap-5">
                {/* 5.1 Kuadrat Berakhiran 5 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Squaring Numbers Ending in 5" : "Jurus Kuadrat Berakhiran 5"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Formula: a5² = [a × (a + 1)] & [25]. Multiply the tens digit by the next integer, then simply append 25."
                      : "Rumus: a5² = [a × (a + 1)] digabung dengan [25]. Kalikan digit puluhan dengan kakaknya (angka berikutnya), lalu pasang 25 di belakang."}
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    {/* Selector */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Bilangan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[2, 3, 4, 6, 7, 8, 9].map((tens) => (
                          <button
                            key={tens}
                            onClick={() => setSquareFiveTens(tens)}
                            className={`w-9 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                              squareFiveTens === tens
                                ? "bg-indigo-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {tens}5
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculation step cards */}
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

                {/* 5.2 Tarik Akar Pangkat Tiga (Tirai 3 Digit) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Cube Root in 3 Seconds (3-Digit Curtain)" : "Tarik Akar Pangkat Tiga dalam 3 Detik"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Split 3 digits from the right. The units digit is uniquely mapped (2↔8, 3↔7, others stay the same). The remaining left number gives the tens digit."
                      : "Tutup 3 angka terakhir. Digit satuan dipetakan secara unik (2 ↔ 8, 3 ↔ 7, angka lain tetap sama). Angka tersisa di depan menentukan digit puluhan."}
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    {/* Selector */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Contoh:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[
                          { val: 12167, ans: 23 },
                          { val: 24389, ans: 29 },
                          { val: 91125, ans: 45 },
                          { val: 175616, ans: 56 },
                        ].map((item) => (
                          <button
                            key={item.val}
                            onClick={() => setCubeRootInput(item.val)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              cubeRootInput === item.val
                                ? "bg-teal-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            ³√{item.val.toLocaleString("id-ID")}
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
                              ³√{leftPart} mendekati {ansTens}³
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">|</span>

                          <div className="p-2.5 bg-amber-50/90 rounded-xl border-2 border-amber-200 text-center w-full sm:w-auto shadow-2xs">
                            <span className="text-[10px] text-amber-700 font-sans font-bold block mb-0.5">Belakang Tirai</span>
                            <span className="font-bold text-sm sm:text-base text-amber-950">
                              ...<span className="text-amber-800 underline font-black">{lastDigit}</span>
                            </span>
                            <span className="text-[10px] text-amber-800 font-sans font-bold block mt-0.5">
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
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 6: ANALISIS LANJUT & OLIMPIADE */}
            {/* ========================================================= */}
            {activeModule === 6 && (
              <div className="flex flex-col gap-5">
                {/* 6.1 Keajaiban Bilangan 1001 (Kunci Rahasia OSN & SASMO) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "The Magic of 1001 (Olympiad Secret)" : "Keajaiban Bilangan 1001 (Kunci Rahasia OSN)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-3.5 leading-relaxed">
                    {isEn
                      ? "The number 1001 is the product of three consecutive primes: 7 × 11 × 13. Any 3-digit number repeated twice (abc.abc) is equal to abc × 1001, so it is ALWAYS divisible by 7, 11, and 13."
                      : "Bilangan 1001 adalah hasil kali tiga bilangan prima berurutan: 7 × 11 × 13. Setiap bilangan 3 digit yang berulang dua kali (abc.abc) sama dengan abc × 1001, sehingga PASTI selalu habis dibagi 7, 11, dan 13."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    {/* Prime factors display */}
                    <div className="flex items-center gap-2 font-mono text-sm sm:text-base">
                      <span className="px-3 py-1 bg-white rounded-xl border border-[#CADDF0] font-black text-[#182C48]">
                        1001
                      </span>
                      <span className="text-[#7B94B2] font-black">=</span>
                      <span className="px-2.5 py-1 bg-purple-100 text-purple-900 border border-purple-200 rounded-xl font-black">
                        7
                      </span>
                      <span className="text-[#7B94B2] font-black">×</span>
                      <span className="px-2.5 py-1 bg-sky-100 text-sky-900 border border-sky-200 rounded-xl font-black">
                        11
                      </span>
                      <span className="text-[#7B94B2] font-black">×</span>
                      <span className="px-2.5 py-1 bg-rose-100 text-rose-900 border border-rose-200 rounded-xl font-black">
                        13
                      </span>
                    </div>

                    {/* Interactive 3-digit selector */}
                    <div className="w-full flex flex-col gap-1.5 mt-1">
                      <span className="text-xs font-bold text-[#253D5F]">Coba Pilih Bilangan 3-Digit:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[345, 523, 789, 412].map((num) => (
                          <button
                            key={num}
                            onClick={() => setMystery1001Num(num)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              mystery1001Num === num
                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step breakdown */}
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
                  </div>
                </div>

                {/* 6.2 Deret Simetris Gauss (Lipat Pita) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Gauss Symmetrical Series (Tape Folding)" : "Deret Simetris Gauss (Lipat Pita)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Pair the first and last numbers (1+100 = 101, 2+99 = 101). Multiply the constant sum by half the number of elements."
                      : "Pasangkan bilangan pertama dan terakhir (1 + 100 = 101, 2 + 99 = 101). Kalikan nilai pasangan tersebut dengan jumlah pasangan (N / 2)."}
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    {/* Quick selector for N */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Rentang Deret (1 s.d. N):</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[10, 20, 50, 100].map((n) => (
                          <button
                            key={n}
                            onClick={() => setGaussN(n)}
                            className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              gaussN === n
                                ? "bg-blue-600 text-white shadow-2xs"
                                : "bg-white text-[#253D5F] border border-[#CADDF0] hover:bg-[#E8F1FB]"
                            }`}
                          >
                            1 s.d. {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Step cards with vibrant SD color accents */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                      <div className="p-2.5 bg-sky-50/90 rounded-xl border-2 border-sky-200 text-center w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-sky-700 font-sans font-bold block mb-0.5">Nilai Pasangan</span>
                        <span className="font-black text-xs sm:text-sm text-sky-950">1 + {gaussN} = {gaussN + 1}</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">×</span>

                      <div className="p-2.5 bg-amber-50/90 rounded-xl border-2 border-amber-200 text-center w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-amber-700 font-sans font-bold block mb-0.5">Banyak Pasangan</span>
                        <span className="font-black text-xs sm:text-sm text-amber-950">{gaussN} ÷ 2 = {gaussN / 2}</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="px-4 py-2 bg-gradient-to-r from-blue-700 to-indigo-800 text-white font-black text-lg sm:text-xl rounded-xl shadow-xs">
                        {((gaussN / 2) * (gaussN + 1)).toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6.3 Deret Teleskopik (Efek Saling Meniadakan) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Telescoping Series (Domino Cancellation)" : "Deret Teleskopik (Efek Saling Meniadakan)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Every term decomposes into a difference: 1 / [n(n+1)] = 1/n - 1/(n+1). All intermediate fractions cancel like falling dominoes."
                      : "Setiap suku pecahan dipecah menjadi selisih: 1 / [n(n+1)] = 1/n − 1/(n+1). Semua suku di tengah saling menghabisi seperti efek domino."}
                  </p>

                  <div className="p-3.5 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-2.5 font-mono">
                    <div className="text-xs sm:text-sm text-[#182C48] text-center font-bold">
                      1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(9×10)
                    </div>

                    <div className="text-[11px] sm:text-xs text-[#415777] text-center font-semibold bg-white p-2.5 rounded-xl border border-[#CADDF0]">
                      = <span className="text-emerald-700 font-bold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">1</span>{" "}
                      <span className="text-rose-400 line-through opacity-75">− 1/2 + 1/2 − 1/3 + 1/3 ... − 1/9 + 1/9</span>{" "}
                      <span className="text-rose-700 font-bold bg-rose-50 px-1 py-0.5 rounded border border-rose-200">− 1/10</span>
                    </div>

                    <div className="px-4 py-1.5 bg-emerald-600 text-white rounded-xl font-black text-sm sm:text-base shadow-xs">
                      Tersisa: 1 − 1/10 = 9/10
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
