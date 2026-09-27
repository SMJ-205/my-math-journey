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
  onBack: () => void;
}

export function SpeedMathMasterclassPage({ onBack }: SpeedMathMasterclassPageProps) {
  const language = useLanguageStore((s) => s.language);
  const isEn = language === "en";

  const [activeModule, setActiveModule] = useState<number>(1);

  // ==========================================
  // Interactive states for sandboxes & widgets
  // ==========================================
  // Modul 1
  const [bondsTarget, setBondsTarget] = useState<number>(7);
  const [nikhilamSubtrahend, setNikhilamSubtrahend] = useState<number>(3648);
  const [constDiffA, setConstDiffA] = useState<number>(83);
  const [constDiffB, setConstDiffB] = useState<number>(39);
  const [leftRightA, setLeftRightA] = useState<number>(467);
  const [leftRightB, setLeftRightB] = useState<number>(358);
  const [bridgeA, setBridgeA] = useState<number>(8);
  const [bridgeB, setBridgeB] = useState<number>(5);

  // Modul 2
  const [sameTensA, setSameTensA] = useState<number>(43);
  const [sameTensB, setSameTensB] = useState<number>(47);
  const [tensSum10A, setTensSum10A] = useState<number>(46);
  const [tensSum10B, setTensSum10B] = useState<number>(66);
  const [multElevenNum, setMultElevenNum] = useState<number>(53);
  const [halveDoubleA, setHalveDoubleA] = useState<number>(16);
  const [halveDoubleB, setHalveDoubleB] = useState<number>(35);
  const [crissCrossA, setCrissCrossA] = useState<number>(32);
  const [crissCrossB, setCrissCrossB] = useState<number>(43);
  const [crissCrossPhase, setCrissCrossPhase] = useState<1 | 2 | 3>(1);

  // Modul 3
  const [power10DivInput, setPower10DivInput] = useState<number>(214);
  const [power10DivMode, setPower10DivMode] = useState<5 | 25 | 125>(5);
  const [factoredDivInput, setFactoredDivInput] = useState<number>(432);
  const [factoredDivD, setFactoredDivD] = useState<number>(18);
  const [ladderA, setLadderA] = useState<number>(12);
  const [ladderB, setLadderB] = useState<number>(18);
  const [ladderTab, setLadderTab] = useState<"fpb" | "kpk">("fpb");

  // Modul 4
  const [swapX, setSwapX] = useState<number>(16);
  const [swapY, setSwapY] = useState<number>(50);
  const [excessMode, setExcessMode] = useState<6 | 9>(6);

  // Modul 5
  const [squareFiveTens, setSquareFiveTens] = useState<number>(8);
  const [cubeRootInput, setCubeRootInput] = useState<number>(24389);
  const [base100Mode, setBase100Mode] = useState<"below" | "above" | "mixed">("below");
  const [rewindStep, setRewindStep] = useState<number>(0); // 0: end (12 semangka), 1: +3, 2: x4/3, 3: +4, 4: x3/2 (awal 36)

  // Modul 6
  const [gaussN, setGaussN] = useState<number>(100);
  const [mystery1001Num, setMystery1001Num] = useState<number>(523);
  const [suppositionCorrect, setSuppositionCorrect] = useState<number>(22);

  const modules = [
    {
      id: 1,
      title: isEn ? "1. Basic Arithmetic" : "1. Bilangan Cacah",
      subtitle: isEn ? "Grades 1–2 (Phase A)" : "Fase A (Kelas 1–2)",
      Icon: BookOpen,
    },
    {
      id: 2,
      title: isEn ? "2. Mental Multiplication" : "2. Perkalian Cepat",
      subtitle: isEn ? "Grades 3–4 (Phase B)" : "Fase B (Kelas 3–4)",
      Icon: Zap,
    },
    {
      id: 3,
      title: isEn ? "3. Fast Division & GCF" : "3. Pembagian & KPK",
      subtitle: isEn ? "Grades 4–5 (Phase B/C)" : "Fase B–C (Kelas 4–5)",
      Icon: Layers,
    },
    {
      id: 4,
      title: isEn ? "4. Fractions & Heuristics" : "4. Pecahan & Rasio",
      subtitle: isEn ? "Grades 5–6 (Phase C)" : "Fase C (Kelas 5–6)",
      Icon: Percent,
    },
    {
      id: 5,
      title: isEn ? "5. Powers & Rewind Flow" : "5. Kuadrat & Alur Balik",
      subtitle: isEn ? "Grades 5–6 & Olympiad" : "Kelas 5–6 & Olimpiade",
      Icon: Calculator,
    },
    {
      id: 6,
      title: isEn ? "6. Olympiad Reasoning" : "6. Analisis Olimpiade",
      subtitle: isEn ? "OSN & SASMO SD" : "OSN & SASMO SD",
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

                {/* 1.2 Sutra Komplemen Basis (Nikhilam Subtraction) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? 'Base Complement: "All from 9, Last from 10"' : 'Sutra Komplemen Basis: "Semua dari 9, Terakhir dari 10"'}
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

                {/* 1.3 Metode Selisih Konstan (Dual-Slider Track) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Constant Difference (Dual-Slider Track)" : "Metode Selisih Konstan (Tanpa Meminjam)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "The difference between two numbers remains identical when adding the same value k to both. Turn the subtrahend into a friendly zero-ending number."
                      : "Nilai selisih antara dua bilangan tidak akan berubah jika keduanya ditambah besaran yang sama. Ubah bilangan pengurang menjadi puluhan bulat terdekat agar pengurangan berjalan instan."}
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
                                Puluhan Bulat (Sangat Mudah)
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

                {/* 1.4 Penjumlahan Kiri ke Kanan Berbasis Nilai Tempat */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      1.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Left-to-Right Mental Addition" : "Penjumlahan Kiri ke Kanan (Nilai Tempat)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Conventional paper math works right-to-left. Human mental computation works far better from left to right (most significant digit first) to maintain immediate sense of magnitude."
                      : "Hitungan mental jauh lebih cepat dan intuitif jika dihitung dari kiri ke kanan (ratusan, puluhan, lalu satuan) daripada menyusun ke bawah dari satuan."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#253D5F]">Pilih Pasangan Bilangan:</span>
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
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
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
                        <div className="w-full flex flex-col items-center gap-2.5">
                          {/* Expanding Card Accordion */}
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
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 1.5 Bridging 10 & Near-Doubles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-800 mb-2 border border-indigo-200">
                        1.5 Lompatan Melampaui 10 (Bridging)
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-[#182C48] mb-1.5">
                        {bridgeA} + {bridgeB} = ({bridgeA} + {10 - bridgeA}) + {bridgeB - (10 - bridgeA)} = {bridgeA + bridgeB}
                      </h3>
                      <p className="text-xs text-[#415777] leading-relaxed">
                        Pecah angka kedua menggunakan pasangan sahabat 10 angka pertama agar mendarat mulus di 10 terlebih dahulu.
                      </p>
                    </div>
                    <div className="mt-3 p-2 bg-indigo-50/70 rounded-xl text-center font-mono font-bold text-xs text-indigo-900 border border-indigo-200">
                      8 + 5 = 10 + 3 = 13 | 9 + 6 = 10 + 5 = 15
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 mb-2 border border-amber-200">
                        1.6 Hampir-Kembar (Near-Doubles)
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-[#182C48] mb-1.5">
                        6 + 7 = (6 × 2) + 1 = 13
                      </h3>
                      <p className="text-xs text-[#415777] leading-relaxed">
                        Gunakan jangkar angka kembar yang sudah dihafal (6+6=12). Karena 7 adalah 6+1, jumlahnya adalah 12+1=13.
                      </p>
                    </div>
                    <div className="mt-3 p-2 bg-amber-50/70 rounded-xl text-center font-mono font-bold text-xs text-amber-900 border border-amber-200">
                      7 + 8 = 14 + 1 = 15 | 8 + 9 = 16 + 1 = 17
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 2: PERKALIAN CEPAT & SPASIAL (KELAS 3-4)            */}
            {/* ========================================================= */}
            {activeModule === 2 && (
              <div className="flex flex-col gap-5">
                {/* 2.1 Kaidah Puluhan Sama, Jumlah Satuan Sepuluh */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.1
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
                          {/* Dual-Color Gateway */}
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

                {/* 2.2 Kaidah Satuan Sama, Jumlah Puluhan Sepuluh */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.2
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
                          [46, 66],
                          [37, 77],
                          [28, 88],
                          [19, 99],
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
                          <div className="p-3 bg-sky-50/90 rounded-2xl border-2 border-sky-200 text-center shadow-2xs">
                            <span className="text-[10px] text-sky-700 font-sans font-bold block mb-0.5">
                              Depan [(p1 × p2) + satuan]
                            </span>
                            <span className="font-black text-sm sm:text-base text-sky-950">
                              ({p1} × {p2}) + {u} = <span className="text-sky-700 text-lg">{front}</span>
                            </span>
                          </div>

                          <span className="text-xl font-black text-[#7B94B2]">+</span>

                          <div className="p-3 bg-amber-50/90 rounded-2xl border-2 border-amber-200 text-center shadow-2xs">
                            <span className="text-[10px] text-amber-700 font-sans font-bold block mb-0.5">
                              Belakang [satuan²]
                            </span>
                            <span className="font-black text-sm sm:text-base text-amber-950">
                              {u}² = <span className="text-amber-700 text-lg">{backStr}</span>
                            </span>
                          </div>

                          <span className="text-xl font-black text-[#7B94B2]">=</span>

                          <div className="px-5 py-3 bg-emerald-600 text-white rounded-2xl font-mono font-black text-lg sm:text-xl shadow-xs">
                            {front}{backStr}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 2.3 Model Area 4 Kuadran & Bagi 2 Kali 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Area Model */}
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-800 mb-2 border border-blue-200">
                      2.3 Model Area 4 Kuadran (14 × 12)
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-center font-mono font-bold text-xs my-2">
                      <div className="p-2 bg-indigo-50/90 border border-indigo-200 rounded-lg">
                        <span className="text-[10px] text-indigo-600 block">10 × 10</span>
                        <span className="text-sm text-indigo-950 font-black">100</span>
                      </div>
                      <div className="p-2 bg-amber-50/90 border border-amber-200 rounded-lg">
                        <span className="text-[10px] text-amber-600 block">4 × 10</span>
                        <span className="text-sm text-amber-950 font-black">40</span>
                      </div>
                      <div className="p-2 bg-sky-50/90 border border-sky-200 rounded-lg">
                        <span className="text-[10px] text-sky-600 block">10 × 2</span>
                        <span className="text-sm text-sky-950 font-black">20</span>
                      </div>
                      <div className="p-2 bg-rose-50/90 border border-rose-200 rounded-lg">
                        <span className="text-[10px] text-rose-600 block">4 × 2</span>
                        <span className="text-sm text-rose-950 font-black">8</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-[#CADDF0] text-center font-bold text-xs text-[#182C48]">
                      Total = 100 + 40 + 20 + 8 = <span className="text-emerald-600 font-black">168</span>
                    </div>
                  </div>

                  {/* Halving and Doubling */}
                  <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-teal-100 text-teal-800 mb-2 border border-teal-200">
                        2.4 Jurus Bagi 2 & Kali 2
                      </span>
                      <p className="text-xs text-[#415777] mb-2 leading-relaxed">
                        Bagi 2 bilangan genap, kalikan 2 bilangan berakhiran 5. Hasil tetap sama persis dan langsung dihitung di kepala.
                      </p>
                    </div>
                    <div className="p-2.5 bg-teal-50/80 rounded-xl border border-teal-200 flex items-center justify-center gap-1.5 font-mono text-xs sm:text-sm">
                      <span className="px-2 py-0.5 bg-white rounded border border-teal-200">16 × 35</span>
                      <span className="text-teal-700 font-bold">⟹</span>
                      <span className="px-2 py-0.5 bg-sky-500 text-white font-bold rounded">8</span>
                      <span>×</span>
                      <span className="px-2 py-0.5 bg-amber-500 text-white font-bold rounded">70</span>
                      <span>=</span>
                      <span className="text-emerald-700 font-black text-base">560</span>
                    </div>
                  </div>
                </div>

                {/* 2.5 Perkalian Vertikal-Silang Universal 2-Digit (2x2 Criss-Cross) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      2.5
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Universal 2×2 Criss-Cross Multiplication" : "Perkalian Vertikal-Silang Universal 2-Digit (2×2 Criss-Cross)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Universal matrix multiplication for any two 2-digit numbers: 1. Right vertical (units), 2. Center cross (outer + inner), 3. Left vertical (tens)."
                      : "Jurus universal untuk mengalikan DUA BILANGAN SEMBARANG tanpa corat-coret: Fase 1 (Vertikal Kanan), Fase 2 (Silang X Tengah), Fase 3 (Vertikal Kiri)."}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    {/* Phase Selector Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCrissCrossPhase(1)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          crissCrossPhase === 1
                            ? "bg-orange-500 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Fase 1: Vertikal Kanan
                      </button>
                      <button
                        onClick={() => setCrissCrossPhase(2)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          crissCrossPhase === 2
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Fase 2: Silang X
                      </button>
                      <button
                        onClick={() => setCrissCrossPhase(3)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          crissCrossPhase === 3
                            ? "bg-purple-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Fase 3: Vertikal Kiri
                      </button>
                    </div>

                    {/* Step Calculation Display for 32 x 43 */}
                    <div className="w-full p-3.5 bg-white rounded-2xl border border-[#CADDF0] text-center font-mono">
                      <div className="text-lg font-black text-[#182C48] mb-2">
                        {crissCrossA} × {crissCrossB}
                      </div>

                      {crissCrossPhase === 1 && (
                        <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-orange-950">
                          <span className="text-xs font-bold block text-orange-700">Fase 1: Satuan × Satuan</span>
                          <span className="text-base font-black">2 × 3 = 6</span>
                          <span className="text-xs block text-orange-800 mt-0.5">Tulis digit 6 di posisi paling kanan (simpan 0).</span>
                        </div>
                      )}

                      {crissCrossPhase === 2 && (
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-950">
                          <span className="text-xs font-bold block text-blue-700">Fase 2: Silang Huruf X</span>
                          <span className="text-base font-black">(3 × 3) + (2 × 4) = 9 + 8 = 17</span>
                          <span className="text-xs block text-blue-800 mt-0.5">Tulis digit 7 di tengah, simpan 1 untuk digit ratusan.</span>
                        </div>
                      )}

                      {crissCrossPhase === 3 && (
                        <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-purple-950">
                          <span className="text-xs font-bold block text-purple-700">Fase 3: Puluhan × Puluhan + Simpanan</span>
                          <span className="text-base font-black">(3 × 4) + 1 (simpanan) = 13</span>
                          <span className="text-xs block text-purple-800 mt-0.5">Tulis 13 di depan. Hasil akhir lengkap: <span className="font-black text-emerald-700 text-base">1.376</span></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 3: PEMBAGIAN CEPAT, KPK & FPB (KELAS 4-5)            */}
            {/* ========================================================= */}
            {activeModule === 3 && (
              <div className="flex flex-col gap-5">
                {/* 3.1 Pembagian Manipulasi Pangkat Sepuluh */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Fast Division via Powers of 10 (÷5, ÷25, ÷125)" : "Pembagian Cepat Berbasis Pangkat Sepuluh (÷5, ÷25, ÷125)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "Convert division by 5, 25, 125 into doubling multiplication followed by shifting the decimal point to the left."
                      : "Membagi dengan 5, 25, atau 125 diubah menjadi perkalian ganda (×2, ×4, ×8) lalu menggeser titik koma desimal ke kiri. Jauh lebih ringan daripada pembagian bersusun biasa!"}
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => {
                          setPower10DivMode(5);
                          setPower10DivInput(214);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          power10DivMode === 5
                            ? "bg-emerald-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Bagi 5 (×2 ÷ 10)
                      </button>
                      <button
                        onClick={() => {
                          setPower10DivMode(25);
                          setPower10DivInput(312);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          power10DivMode === 25
                            ? "bg-teal-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Bagi 25 (×4 ÷ 100)
                      </button>
                      <button
                        onClick={() => {
                          setPower10DivMode(125);
                          setPower10DivInput(6250);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          power10DivMode === 125
                            ? "bg-blue-600 text-white shadow-2xs"
                            : "bg-white text-[#253D5F] border border-[#CADDF0]"
                        }`}
                      >
                        Bagi 125 (×8 ÷ 1.000)
                      </button>
                    </div>

                    {/* Visualizer */}
                    {(() => {
                      const mult = power10DivMode === 5 ? 2 : power10DivMode === 25 ? 4 : 8;
                      const divBase = power10DivMode === 5 ? 10 : power10DivMode === 25 ? 100 : 1000;
                      const product = power10DivInput * mult;
                      const result = product / divBase;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                          <div className="p-2.5 bg-white rounded-xl border border-[#CADDF0] w-full sm:w-auto">
                            <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">Soal</span>
                            <span className="font-bold text-sm sm:text-base text-[#182C48]">
                              {power10DivInput} ÷ {power10DivMode}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                          <div className="p-2.5 bg-emerald-50 rounded-xl border-2 border-emerald-300 w-full sm:w-auto">
                            <span className="text-[10px] text-emerald-800 font-sans font-bold block mb-0.5">
                              Kalikan {mult}
                            </span>
                            <span className="font-bold text-sm sm:text-base text-emerald-950">
                              {power10DivInput} × {mult} = {product}
                            </span>
                          </div>

                          <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                          <div className="p-2.5 bg-[#2B4A75] text-white rounded-xl font-black text-sm sm:text-base w-full sm:w-auto shadow-xs">
                            <span className="text-[10px] text-blue-200 font-sans font-bold block mb-0.5">
                              Geser Koma (÷{divBase})
                            </span>
                            <span>{result.toLocaleString("id-ID")}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* 3.2 Dekomposisi Pembagi Majemuk */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Factored Divisors (Split-Funnel)" : "Dekomposisi Pembagi Majemuk (Saringan Bertingkat)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    {isEn
                      ? "When dividing by a tricky two-digit number, factor it into two small friendly numbers. Divide sequentially in two fast steps."
                      : "Membagi bilangan dengan angka dua digit (seperti 18) terasa berat. Pecah angka pembagi menjadi dua faktor ramah (18 = 9 × 2), lalu bagi bertahap dua kali."}
                  </p>

                  <div className="p-3.5 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2.5 font-mono">
                      <div className="p-2.5 bg-white rounded-xl border border-[#CADDF0] text-center w-full sm:w-auto">
                        <span className="text-[10px] text-[#647C9E] font-sans font-bold block mb-0.5">Soal Awal</span>
                        <span className="font-bold text-sm sm:text-base text-[#182C48]">432 ÷ 18</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                      <div className="p-2.5 bg-purple-50 rounded-xl border border-purple-200 text-center w-full sm:w-auto">
                        <span className="text-[10px] text-purple-700 font-sans font-bold block mb-0.5">Saringan 1 (÷ 9)</span>
                        <span className="font-bold text-sm sm:text-base text-purple-950">432 ÷ 9 = 48</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                      <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-200 text-center w-full sm:w-auto">
                        <span className="text-[10px] text-teal-700 font-sans font-bold block mb-0.5">Saringan 2 (÷ 2)</span>
                        <span className="font-bold text-sm sm:text-base text-teal-950">48 ÷ 2 = 24</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-black text-base sm:text-lg shadow-xs">
                        24
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3.3 Metode Tangga (Sengkedan I & L) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      3.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "The Ladder Method (Petak Sawah)" : "Metode Tangga / Sengkedan Petak Sawah"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Mencari FPB dan KPK sekaligus dalam satu petak tanpa menggambar banyak cabang pohon faktor yang berantakan.
                  </p>

                  <div className="flex justify-center gap-2 mb-3.5">
                    <button
                      onClick={() => setLadderTab("fpb")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        ladderTab === "fpb"
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-[#EDF3FA] text-[#364F73] border border-[#D0DFEF]"
                      }`}
                    >
                      Konfigurasi Huruf I (FPB)
                    </button>
                    <button
                      onClick={() => setLadderTab("kpk")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        ladderTab === "kpk"
                          ? "bg-indigo-600 text-white shadow-2xs"
                          : "bg-[#EDF3FA] text-[#364F73] border border-[#D0DFEF]"
                      }`}
                    >
                      Konfigurasi Huruf L (KPK)
                    </button>
                  </div>

                  <div className="p-3.5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl border-2 border-amber-200 text-center font-mono">
                    <span className="inline-block px-2 py-0.5 rounded-lg text-[10px] font-black bg-amber-200 text-amber-900 mb-1">
                      3.4 Rumus Emas Hubungan FPB & KPK
                    </span>
                    <div className="text-sm sm:text-base font-black text-amber-950">
                      FPB(a, b) × KPK(a, b) = a × b
                    </div>
                    <div className="text-xs text-amber-800 font-sans font-semibold mt-0.5">
                      Contoh angka 12 & 18: <span className="font-bold">6 × 36 = 12 × 18 = 216</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 4: PECAHAN, PERSEN & HEURISTIK RASIO (KELAS 5-6)    */}
            {/* ========================================================= */}
            {activeModule === 4 && (
              <div className="flex flex-col gap-5">
                {/* 4.1 Bank Pecahan Acuan */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Benchmark Fraction Memory Bank" : "Bank Pecahan Acuan (Kamus Mental)"}
                    </h2>
                  </div>
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
                      {isEn ? "Percent Swap Trick (x% of y = y% of x)" : "Jurus Sakti Pertukaran Persen (x% dari y = y% dari x)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Sifat komutatif perkalian membuat x% dari y SELALU tepat sama dengan y% dari x. Menghitung 16% dari 50 terdengar sulit, tapi 50% dari 16 adalah setengah dari 16 = 8.
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                      <div className="p-2.5 sm:p-3 bg-rose-50/80 rounded-xl border-2 border-rose-200 text-center font-mono w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-rose-700 font-sans font-bold block mb-0.5">
                          Soal Awal (Sulit)
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-rose-950">16% × 50</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⇄</span>

                      <div className="p-2.5 sm:p-3 bg-emerald-50/80 rounded-xl border-2 border-emerald-300 text-center font-mono w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-emerald-700 font-sans font-bold block mb-0.5">
                          Ditukar (Sangat Mudah)
                        </span>
                        <span className="font-black text-xs sm:text-sm text-emerald-950">50% × 16</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="p-2.5 sm:p-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl shadow-xs text-center font-mono w-full sm:w-auto">
                        <span className="text-[10px] text-blue-200 font-sans font-bold block mb-0.5">
                          Hasil Kilat
                        </span>
                        <span className="font-black text-sm sm:text-base text-white">8</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4.3 Heuristik Kuantitas Satu Sisi Tidak Berubah (Anchor Pin Bar Model) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "One-Quantity Unchanged (Anchor Pin Bar Model)" : "Heuristik Kuantitas Satu Sisi Tidak Berubah (Pin Jangkar)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Soal perbandingan di mana hanya salah satu pihak bertambah/berkurang, sementara pihak lainnya bernilai tetap. Kuncinya: kunci kuantitas pihak yang tidak berubah sebagai dasar unit persekutuan.
                  </p>

                  <div className="bg-[#F1F6FC] p-4 rounded-2xl border border-[#CFDFEF] flex flex-col gap-3 font-sans">
                    <div className="p-3 bg-white rounded-xl border border-[#CADDF0] text-xs text-[#203657] leading-relaxed">
                      <span className="font-bold text-amber-800">Kasus Soal SASMO:</span> Di perpustakaan, rasio buku Fiksi : Non-Fiksi adalah <span className="font-bold font-mono">3 : 4</span>. Setelah dibeli 48 buku fiksi baru, rasionya menjadi <span className="font-bold font-mono">5 : 4</span>. Berapa total buku sekarang?
                    </div>

                    {/* Bar Model with Anchor Pin */}
                    <div className="flex flex-col gap-2 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-24 font-bold text-xs text-[#182C48]">Non-Fiksi:</span>
                        <div className="flex-1 flex items-center gap-1 bg-amber-50 p-1.5 rounded-xl border border-amber-300">
                          <span className="px-3 py-1 bg-amber-500 text-white rounded-lg font-black">
                            4 Unit (Terkunci Pin Emas Tetap)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="w-24 font-bold text-xs text-[#182C48]">Fiksi:</span>
                        <div className="flex-1 flex items-center gap-1 bg-sky-50 p-1.5 rounded-xl border border-sky-300">
                          <span className="px-3 py-1 bg-sky-600 text-white rounded-lg font-black">
                            Mula 3 Unit
                          </span>
                          <span className="text-sky-700 font-bold">+</span>
                          <span className="px-3 py-1 bg-emerald-600 text-white rounded-lg font-black">
                            +2 Unit (+48 Buku)
                          </span>
                          <span className="text-sky-700 font-bold">= 5 Unit</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 font-mono text-xs text-emerald-950 text-center">
                      2 Unit Tambahan = 48 buku ⟹ 1 Unit = 24 buku.<br />
                      Total Buku Sekarang = (5 + 4) Unit × 24 = 9 × 24 = <span className="font-black text-sm text-emerald-800">216 Buku</span>.
                    </div>
                  </div>
                </div>

                {/* 4.4 Heuristik Kelebihan dan Kekurangan (Distribution Tray) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      4.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Excess and Shortage Heuristic" : "Heuristik Kelebihan dan Kekurangan (Distribusi Permen)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Membagi objek dengan dua aturan berbeda: Aturan I menyisakan lebihan (+), Aturan II menghasilkan kekurangan (−). Rumus kilat: Jumlah Penerima = (Kelebihan + Kekurangan) ÷ Selisih per Penerima.
                  </p>

                  <div className="bg-[#F1F6FC] p-4 rounded-2xl border border-[#CFDFEF] flex flex-col gap-3 font-sans">
                    <div className="p-3 bg-white rounded-xl border border-[#CADDF0] text-xs text-[#203657] leading-relaxed">
                      <span className="font-bold text-teal-800">Kasus Soal Olimpiade:</span> Guru membagikan permen. Jika setiap murid diberi 6 permen, tersisa 8 butir (+8). Jika setiap murid diberi 9 permen, guru kekurangan 16 butir (−16). Berapa banyak murid dan total permen?
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
                        <span className="text-[10px] text-amber-700 font-sans font-bold block mb-0.5">Total Celah Kuantitas</span>
                        <span className="font-black text-sm text-amber-950">8 + 16 = 24 permen</span>
                      </div>
                      <div className="p-2.5 bg-sky-50 rounded-xl border border-sky-200">
                        <span className="text-[10px] text-sky-700 font-sans font-bold block mb-0.5">Selisih per Murid</span>
                        <span className="font-black text-sm text-sky-950">9 − 6 = 3 permen</span>
                      </div>
                      <div className="p-2.5 bg-emerald-50 rounded-xl border-2 border-emerald-300">
                        <span className="text-[10px] text-emerald-800 font-sans font-bold block mb-0.5">Banyak Murid</span>
                        <span className="font-black text-base text-emerald-700">24 ÷ 3 = 8 Murid</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#2B4A75] text-white font-mono font-bold text-xs text-center rounded-xl">
                      Total Permen = (8 murid × 6) + 8 = 48 + 8 = <span className="text-amber-300 font-black">56 Permen</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 5: PANGKAT, KUADRAT & ALUR MUNDUR (KELAS 5-6 & OSN)  */}
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
                    Rumus: a5² = [a × (a + 1)] digabung dengan [25]. Kalikan digit puluhan dengan kakaknya (angka berikutnya), lalu pasang 25 di belakang.
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
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

                {/* 5.2 Tarik Akar Pangkat Tiga dalam 3 Detik */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Cube Root in 3 Seconds (3-Digit Curtain)" : "Tarik Akar Pangkat Tiga dalam 3 Detik (Tirai 3 Digit)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Tutup 3 angka terakhir. Digit satuan dipetakan secara unik (2 ↔ 8, 3 ↔ 7, angka lain tetap sama). Angka tersisa di depan menentukan digit puluhan.
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
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

                {/* 5.3 Perkalian Berbasis Selisih Relatif 100 */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Base-100 Cross Multiplication" : "Perkalian Berbasis Selisih Relatif 100 (Kabel Silang)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
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

                {/* 5.4 Heuristik Bekerja Mundur Berantai (Rewind Tape) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      5.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Working Backwards Heuristic (Rewind Tape)" : "Heuristik Bekerja Mundur Berantai (Alur Putar Balik)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Nilai awal tidak diketahui, lalu mengalami serangkaian transaksi dan menyisakan nilai akhir. Putar balik rantai operasi dari belakang ke depan dengan operator inversnya (+ jadi −, − jadi +, pecahan sisa dibalik).
                  </p>

                  <div className="bg-[#F1F6FC] p-4 rounded-2xl border border-[#CFDFEF] flex flex-col gap-3 font-sans">
                    <div className="p-3 bg-white rounded-xl border border-[#CADDF0] text-xs text-[#203657] leading-relaxed">
                      <span className="font-bold text-rose-800">Kasus Semangka Pedagang:</span> Pedagang menjual 1/3 semangka + 4 buah ke pembeli 1. Lalu menjual 1/4 dari sisa semangka + 3 buah ke pembeli 2. Sisa akhir semangka adalah 12 buah. Berapa total semangka mula-mula?
                    </div>

                    {/* Step by step Rewind Tape buttons */}
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
                          15 buah ini adalah 3/4 bagian sisa ⟹ Sisa sebelum pembeli 2 = 15 × (4/3) = <span className="font-black text-sm text-purple-700">20 buah</span>.
                        </div>
                      )}
                      {rewindStep === 2 && (
                        <div className="text-xs text-emerald-950">
                          Mundur Pembeli 1: Kembalikan 4 buah ⟹ (20 + 4 = 24).<br />
                          24 buah ini adalah 2/3 persediaan awal ⟹ Mula-mula = 24 × (3/2) = <span className="font-black text-base text-emerald-700">36 Buah Semangka</span>!
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 6: HEURISTIK & ANALISIS LANJUT OLIMPIADE (OSN/SASMO) */}
            {/* ========================================================= */}
            {activeModule === 6 && (
              <div className="flex flex-col gap-5">
                {/* 6.1 Keajaiban Bilangan 1001 */}
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
                    Bilangan 1001 adalah hasil kali tiga bilangan prima berurutan: 7 × 11 × 13. Setiap bilangan 3 digit yang berulang dua kali (abc.abc) sama dengan abc × 1001, sehingga PASTI selalu habis dibagi 7, 11, dan 13.
                  </p>

                  <div className="bg-[#F1F6FC] p-3.5 sm:p-4 rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3">
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

                {/* 6.2 Heuristik Pengandaian Ekstrem (Supposition Method) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Supposition / Assumption Method" : "Heuristik Pengandaian Ekstrem (Metode Asumsi)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Sering diuji pada kompetisi SASMO dan OSN untuk masalah skor kompetisi atau jumlah kaki hewan. Asumsikan semua jawaban benar, lalu hitung defisit poin dibagi selisih nilai per penggantian.
                  </p>

                  <div className="bg-[#F1F6FC] p-4 rounded-2xl border border-[#CFDFEF] flex flex-col gap-3 font-sans">
                    <div className="p-3 bg-white rounded-xl border border-[#CADDF0] text-xs text-[#203657] leading-relaxed">
                      <span className="font-bold text-blue-800">Kasus Soal Kompetisi:</span> Ujian 30 soal. Benar = +4, Salah = −2. Budi menjawab semua 30 soal dan meraih skor 72. Berapa soal yang dijawab benar?
                    </div>

                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono text-center">
                      <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200 w-full sm:w-auto">
                        <span className="text-[10px] text-blue-700 font-sans font-bold block">1. Andaikan Semua Benar</span>
                        <span className="font-bold text-sm text-blue-950">30 × (+4) = 120 poin</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                      <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 w-full sm:w-auto">
                        <span className="text-[10px] text-rose-700 font-sans font-bold block">2. Surplus Skor Imajiner</span>
                        <span className="font-bold text-sm text-rose-950">120 − 72 = 48 poin</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">⟹</span>

                      <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 w-full sm:w-auto">
                        <span className="text-[10px] text-amber-700 font-sans font-bold block">3. Penalti per Salah</span>
                        <span className="font-bold text-sm text-amber-950">4 − (−2) = 6 poin</span>
                      </div>

                      <span className="text-[#7B94B2] font-black text-sm">=</span>

                      <div className="p-2.5 bg-emerald-600 text-white rounded-xl font-black text-sm sm:text-base w-full sm:w-auto shadow-xs">
                        Salah = 48 ÷ 6 = 8 Soal<br />
                        Benar = 30 − 8 = 22 Soal
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6.3 Heuristik Selisih Tetap Usia (Parallel Bar Bracket) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Constant Difference Age Problem (Bar Bracket)" : "Heuristik Selisih Tetap Masalah Usia"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
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

                {/* 6.4 Deret Simetris Gauss (Lipat Pita) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Gauss Symmetrical Series (Tape Folding)" : "Deret Simetris Gauss (Lipat Pita)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Pasangkan bilangan pertama dan terakhir (1 + 100 = 101, 2 + 99 = 101). Kalikan nilai pasangan tersebut dengan jumlah pasangan (N / 2).
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F1F6FC] rounded-2xl border border-[#CFDFEF] flex flex-col items-center gap-3.5">
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

                {/* 6.5 Deret Teleskopik (Efek Saling Meniadakan) */}
                <div className="bg-white rounded-3xl border-2 border-[#D2E1F0] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                      6.5
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#182C48]">
                      {isEn ? "Telescoping Series (Domino Cancellation)" : "Deret Teleskopik (Efek Saling Meniadakan)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#415777] mb-4 leading-relaxed">
                    Setiap suku pecahan dipecah menjadi selisih: 1 / [n(n+1)] = 1/n − 1/(n+1). Semua suku di tengah saling menghabisi seperti efek domino.
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
