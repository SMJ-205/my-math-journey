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
  const [squareFiveTens, setSquareFiveTens] = useState<number>(3); // 35
  const [cubeRootInput, setCubeRootInput] = useState<number>(12167);

  // Modul 6
  const [gaussN, setGaussN] = useState<number>(100);

  const modules = [
    {
      id: 1,
      title: isEn ? "1. Whole Number Foundations" : "1. Fondasi Bilangan Cacah",
      subtitle: isEn ? "Grades 1–2 (Phase A)" : "Fase A (Kelas 1–2)",
      icon: "🌱",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    },
    {
      id: 2,
      title: isEn ? "2. Mental & Spatial Multiplication" : "2. Perkalian Mental & Spasial",
      subtitle: isEn ? "Grades 3–4 (Phase B)" : "Fase B (Kelas 3–4)",
      icon: "⚡",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
      id: 3,
      title: isEn ? "3. Child-Friendly GCF & LCM" : "3. KPK & FPB Ramah Anak",
      subtitle: isEn ? "Grades 4–5 (Phase B/C)" : "Fase B–C (Kelas 4–5)",
      icon: "🌾",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
      id: 4,
      title: isEn ? "4. Benchmark Fractions & Rapid %" : "4. Pecahan Acuan & Persentase",
      subtitle: isEn ? "Grades 5–6 (Phase C)" : "Fase C (Kelas 5–6)",
      icon: "🍕",
      badgeColor: "bg-violet-100 text-violet-800 border-violet-300",
    },
    {
      id: 5,
      title: isEn ? "5. Powers, Squares & Fast Roots" : "5. Kuadrat & Penarikan Akar Cepat",
      subtitle: isEn ? "Grades 5–6 & Olympiad" : "Kelas 5–6 & Olimpiade",
      icon: "🚀",
      badgeColor: "bg-rose-100 text-rose-800 border-rose-300",
    },
    {
      id: 6,
      title: isEn ? "6. Advanced Olympiad Analysis" : "6. Analisis Lanjut & Olimpiade",
      subtitle: isEn ? "SASMO & OSN Prep" : "OSN & SASMO SD",
      icon: "🏆",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-400",
    },
  ];

  return (
    <div className="min-h-dvh flex flex-col bg-[#FAF9F5]">
      <PageHeader
        showBack
        onBack={onBack}
        title={isEn ? "Speed Math Masterclass" : "Kelas Mahir Hitungan"}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 sm:p-8 text-white shadow-lg">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-white/20 backdrop-blur-md uppercase tracking-wider text-amber-100 border border-white/30">
              <Sparkles size={14} className="text-yellow-300" />
              {isEn ? "CPA Visual & Mental Method" : "Metode Konkret-Piktorial-Abstrak"}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2 leading-tight">
              {isEn
                ? "Speed Math Guide & Mental Calculation Tricks"
                : "Panduan Hitung Cepat & Jurus Mental Matematika SD"}
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-2 font-medium leading-relaxed">
              {isEn
                ? "Interactive case-by-case visual guidelines and mental arithmetic techniques. No rote memorization, pure visual intuition!"
                : "Panduan interaktif per studi kasus dengan visualisasi langsung. Bukan sekadar bank soal, melainkan jurus trik intuitif!"}
            </p>
          </div>
          <div className="absolute right-4 -bottom-6 text-8xl opacity-15 select-none font-black">
            ⚡
          </div>
        </div>

        {/* Module Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {modules.map((m) => {
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveModule(m.id)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                  isActive
                    ? "bg-white border-amber-500 shadow-md scale-102"
                    : "bg-white/70 border-gray-200 hover:border-amber-300 text-gray-600"
                }`}
              >
                <span className="text-2xl mb-1">{m.icon}</span>
                <span className="text-xs font-black text-gray-800 leading-tight">
                  {isEn ? `Mod ${m.id}` : `Modul ${m.id}`}
                </span>
                <span className="text-[10px] text-gray-400 font-semibold mt-0.5">
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* ========================================================= */}
            {/* MODUL 1: FONDASI BILANGAN CACAH */}
            {/* ========================================================= */}
            {activeModule === 1 && (
              <div className="flex flex-col gap-6">
                {/* 1.1 Pasangan Sahabat 10 */}
                <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center">
                      1.1
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Friends of 10 & Ten-Frames" : "Pasangan Sahabat 10 & Bingkai Sepuluh"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Every single digit has a complementary 'Best Friend' that sums to 10. Visualized using a 5x2 Ten-Frame grid."
                      : "Setiap angka memiliki 'Sahabat Karib' yang jika dijumlahkan selalu bernilai 10. Kita visualisasikan dengan Bingkai 10 (kotak 5 × 2)."}
                  </p>

                  {/* Interactive Ten Frame */}
                  <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-700">
                        {isEn ? "Choose number:" : "Pilih angka awal:"}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <button
                            key={n}
                            onClick={() => setBondsTarget(n)}
                            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                              bondsTarget === n
                                ? "bg-amber-500 text-white shadow-sm"
                                : "bg-white text-gray-700 border border-amber-200 hover:bg-amber-100"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 5x2 Ten-Frame */}
                    <div className="grid grid-cols-5 gap-2 p-3 bg-white rounded-2xl border-2 border-amber-300 shadow-inner">
                      {Array.from({ length: 10 }).map((_, i) => {
                        const isFilled = i < bondsTarget;
                        return (
                          <motion.div
                            key={i}
                            layout
                            className={`w-11 h-11 sm:w-13 sm:h-13 rounded-xl border-2 flex items-center justify-center font-black text-sm transition-all ${
                              isFilled
                                ? "bg-amber-400 border-amber-500 text-amber-950 shadow-xs"
                                : "bg-gray-50 border-dashed border-gray-300 text-gray-300"
                            }`}
                          >
                            {isFilled ? "●" : "○"}
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="text-center">
                      <span className="text-base sm:text-lg font-black text-amber-900 bg-white px-4 py-1.5 rounded-xl border border-amber-300 shadow-xs">
                        {bondsTarget} + <span className="text-emerald-600">{10 - bondsTarget}</span> = 10
                      </span>
                      <p className="text-xs text-gray-500 mt-2 font-medium">
                        {isEn
                          ? `Friend of ${bondsTarget} is ${10 - bondsTarget} (the empty slots).`
                          : `Sahabat dari ${bondsTarget} adalah ${10 - bondsTarget} (kotak kosong yang tersisa).`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1.2 Bridging Through 10 */}
                <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center">
                      1.2
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Bridging Through 10 (Lompatan Melampaui 10)" : "Jurus Lompatan Melampaui 10"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "When adding numbers that cross 10, split the second number using the friend of 10 to land exactly on 10, then add the remainder."
                      : "Pecah angka kedua menjadi 'teman 10' angka pertama dan sisanya, agar mendarat mulus di 10 terlebih dahulu."}
                  </p>

                  <div className="bg-orange-50/60 p-4 rounded-2xl border border-orange-200 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 font-mono font-black text-xl sm:text-2xl text-orange-950">
                      <span>{bridgeA}</span>
                      <span>+</span>
                      <span>{bridgeB}</span>
                      <span>=</span>
                      <span className="text-emerald-700">{bridgeA + bridgeB}</span>
                    </div>

                    {/* Step breakdown */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 text-xs sm:text-sm">
                      <div className="p-3 bg-white rounded-xl border border-orange-200 text-center">
                        <span className="text-gray-400 font-bold block mb-1">Langkah 1: Teman 10</span>
                        <span className="font-bold text-orange-800">
                          {bridgeA} butuh <span className="underline decoration-emerald-500 font-black">{10 - bridgeA}</span> untuk jadi 10
                        </span>
                      </div>
                      <span className="text-gray-400 font-black">→</span>
                      <div className="p-3 bg-white rounded-xl border border-orange-200 text-center">
                        <span className="text-gray-400 font-bold block mb-1">Langkah 2: Pecah Angka Kedua</span>
                        <span className="font-bold text-orange-800">
                          {bridgeB} dipecah: ({10 - bridgeA} + {bridgeB - (10 - bridgeA)})
                        </span>
                      </div>
                      <span className="text-gray-400 font-black">→</span>
                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-center">
                        <span className="text-emerald-600 font-bold block mb-1">Hasil Kilat</span>
                        <span className="font-black text-emerald-900">
                          10 + {bridgeB - (10 - bridgeA)} = {bridgeA + bridgeB}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1.3 Near-Doubles & 1.4 Constant Difference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-100 text-pink-800 mb-2">
                        1.3 Near-Doubles (Hampir-Kembar)
                      </span>
                      <h3 className="font-black text-base text-gray-800 mb-2">
                        6 + 7 = 6 + 6 + 1 = 13
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {isEn
                          ? "Anchor to known double facts. Since 6+6=12, adding 7 (which is 6+1) is simply 12+1=13!"
                          : "Gunakan jangkar angka kembar yang sudah dihafal (6+6=12). Karena 7 adalah 6+1, maka 6+7 = 12+1 = 13!"}
                      </p>
                    </div>
                    <div className="mt-4 p-3 bg-pink-50 rounded-xl text-center font-mono font-bold text-xs text-pink-900 border border-pink-200">
                      7 + 8 = (7 × 2) + 1 = 15 | 8 + 9 = (8 × 2) + 1 = 17
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border-2 border-amber-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-100 text-purple-800 mb-2">
                        1.4 Selisih Tetap (Tanpa Meminjam)
                      </span>
                      <h3 className="font-black text-base text-gray-800 mb-2">
                        52 − 19 = 53 − 20 = 33
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {isEn
                          ? "Add or subtract the same value to both numbers to turn the subtrahend into a friendly zero-ending number."
                          : "Tambahkan nilai yang sama pada kedua bilangan agar pengurang menjadi bilangan bulat puluhan. Hilangkan kerumitan meminjam!"}
                      </p>
                    </div>
                    <div className="mt-4 p-3 bg-purple-50 rounded-xl text-center font-mono font-bold text-xs text-purple-900 border border-purple-200">
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
              <div className="flex flex-col gap-6">
                {/* 2.1 Area Model 4 Kuadran */}
                <div className="bg-white rounded-3xl border-2 border-blue-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center">
                      2.1
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "4-Quadrant Area Model" : "Model Area 4 Kuadran (14 × 12)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Decompose 2-digit numbers into tens and ones (14 = 10+4, 12 = 10+2). Calculate the 4 sub-rectangles and sum them mentally."
                      : "Pecah bilangan menjadi puluhan dan satuan (14 = 10 + 4, 12 = 10 + 2). Hitung 4 kotak persegi panjang lalu jumlahkan."}
                  </p>

                  {/* 4 Quadrant visual grid */}
                  <div className="max-w-md mx-auto p-4 bg-blue-50/60 rounded-2xl border border-blue-200">
                    <div className="grid grid-cols-2 gap-2 text-center font-mono font-bold">
                      <div className="p-3 bg-indigo-100 border border-indigo-300 rounded-xl">
                        <span className="text-[10px] text-indigo-700 block">10 × 10</span>
                        <span className="text-lg text-indigo-900 font-black">100</span>
                      </div>
                      <div className="p-3 bg-sky-100 border border-sky-300 rounded-xl">
                        <span className="text-[10px] text-sky-700 block">4 × 10</span>
                        <span className="text-lg text-sky-900 font-black">40</span>
                      </div>
                      <div className="p-3 bg-cyan-100 border border-cyan-300 rounded-xl">
                        <span className="text-[10px] text-cyan-700 block">10 × 2</span>
                        <span className="text-lg text-cyan-900 font-black">20</span>
                      </div>
                      <div className="p-3 bg-amber-100 border border-amber-300 rounded-xl">
                        <span className="text-[10px] text-amber-700 block">4 × 2</span>
                        <span className="text-lg text-amber-900 font-black">8</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-blue-200 text-center font-bold text-xs sm:text-sm text-blue-950">
                      Total = 100 + 40 + 20 + 8 = <span className="text-emerald-700 font-black text-base">168</span>
                    </div>
                  </div>
                </div>

                {/* 2.2 Halving and Doubling */}
                <div className="bg-white rounded-3xl border-2 border-blue-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-teal-500 text-white font-black text-sm flex items-center justify-center">
                      2.2
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Halving & Doubling Technique" : "Jurus Bagi Dua & Kali Dua"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Halve the even number, double the number ending in 5. The product remains identical but turns into an effortless mental calculation!"
                      : "Bagi 2 bilangan genap, kalikan 2 bilangan yang berakhiran 5. Hasilnya tetap sama persis tetapi jauh lebih mudah dihitung di kepala!"}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 p-4 bg-teal-50/70 rounded-2xl border border-teal-200">
                    <div className="flex items-center gap-2 font-mono font-black text-xl text-gray-800">
                      <span className="px-3 py-1 bg-white rounded-xl border border-teal-300">{halveDoubleA}</span>
                      <span>×</span>
                      <span className="px-3 py-1 bg-white rounded-xl border border-teal-300">{halveDoubleB}</span>
                    </div>

                    <div className="flex flex-col items-center text-teal-700 font-bold text-xs">
                      <span>(÷2) ⇄ (×2)</span>
                      <span>⟹</span>
                    </div>

                    <div className="flex items-center gap-2 font-mono font-black text-xl text-teal-900">
                      <span className="px-3 py-1 bg-teal-500 text-white rounded-xl shadow-xs">{halveDoubleA / 2}</span>
                      <span>×</span>
                      <span className="px-3 py-1 bg-teal-500 text-white rounded-xl shadow-xs">{halveDoubleB * 2}</span>
                      <span>=</span>
                      <span className="text-emerald-700 font-black text-2xl">{(halveDoubleA / 2) * (halveDoubleB * 2)}</span>
                    </div>
                  </div>
                </div>

                {/* 2.3 Jurus Pengali Spesial: x5, x9, x11, x25 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Jurus x11 */}
                  <div className="bg-white rounded-3xl border-2 border-blue-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800">
                        Jurus × 11 (Sandwich Digit)
                      </span>
                      <span className="text-xs font-bold text-gray-400">Sandbox</span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      {isEn
                        ? "Insert the sum of the two digits in between them. If sum ≥ 10, carry 1 to the hundreds."
                        : "Jumlahkan kedua digit lalu selipkan di tengah. Jika jumlah ≥ 10, simpan 1 ke digit ratusan."}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-bold text-gray-600">Angka:</span>
                      {[32, 53, 62, 75, 84].map((val) => (
                        <button
                          key={val}
                          onClick={() => setMultElevenNum(val)}
                          className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            multElevenNum === val
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const d1 = Math.floor(multElevenNum / 10);
                      const d2 = multElevenNum % 10;
                      const sum = d1 + d2;
                      const ans = multElevenNum * 11;
                      return (
                        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-center font-mono">
                          <p className="text-sm font-bold text-blue-900">
                            {multElevenNum} × 11 = {d1} [{d1}+{d2}] {d2} ={" "}
                            <span className="text-emerald-700 font-black text-base">{ans}</span>
                          </p>
                          {sum >= 10 && (
                            <p className="text-[11px] text-amber-700 font-sans mt-1">
                              ⚠️ Karena {d1}+{d2}={sum} (≥10), simpan 1 ke depan: ({d1}+1){sum % 10}{d2} = {ans}
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Jurus x5 & x9 */}
                  <div className="bg-white rounded-3xl border-2 border-blue-200 p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 mb-2">
                        Jurus × 5, × 9, & × 25
                      </span>
                      <div className="flex flex-col gap-2 text-xs font-mono">
                        <div className="p-2 bg-gray-50 rounded-lg border">
                          <span className="font-bold text-indigo-700">× 5:</span> n0 ÷ 2
                          <span className="text-gray-500 block text-[11px]">48 × 5 = 480 ÷ 2 = 240</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg border">
                          <span className="font-bold text-indigo-700">× 9:</span> n0 − n
                          <span className="text-gray-500 block text-[11px]">37 × 9 = 370 − 37 = 333</span>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-lg border">
                          <span className="font-bold text-indigo-700">× 25:</span> n00 ÷ 4
                          <span className="text-gray-500 block text-[11px]">36 × 25 = 3.600 ÷ 4 = 900</span>
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
              <div className="flex flex-col gap-6">
                <div className="bg-white rounded-3xl border-2 border-emerald-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center">
                      3.1
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "The Ladder Method (Petak Sawah)" : "Metode Tangga / Sengkedan Petak Sawah"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "A friendly single-table method to find both GCF and LCM simultaneously without complicated prime trees."
                      : "Metode paling ramah anak untuk mencari FPB dan KPK sekaligus dalam satu petak tanpa menggambar banyak pohon faktor yang berantakan."}
                  </p>

                  {/* Preset Buttons */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-gray-600">Contoh Pasangan:</span>
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
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                          ladderA === a && ladderB === b
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        {a} & {b}
                      </button>
                    ))}
                  </div>

                  {/* Toggle I vs L */}
                  <div className="flex justify-center gap-2 mb-4">
                    <button
                      onClick={() => setLadderTab("fpb")}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        ladderTab === "fpb"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Konfigurasi Huruf &quot;I&quot; (FPB)
                    </button>
                    <button
                      onClick={() => setLadderTab("kpk")}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        ladderTab === "kpk"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Konfigurasi Huruf &quot;L&quot; (KPK)
                    </button>
                  </div>

                  {/* Ladder Visualization Card */}
                  <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 max-w-sm mx-auto">
                    <div className="flex flex-col items-center">
                      <table className="border-collapse font-mono font-bold text-base">
                        <tbody>
                          <tr className="border-b-2 border-emerald-300">
                            <td className="pr-3 py-2 text-right">
                              <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                                  ladderTab === "fpb" || ladderTab === "kpk"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-200"
                                }`}
                              >
                                ÷ 2
                              </span>
                            </td>
                            <td className="pl-3 py-2 border-l-4 border-emerald-400">
                              <span className="mr-6">{ladderA}</span>
                              <span>{ladderB}</span>
                            </td>
                          </tr>
                          <tr className="border-b-2 border-emerald-300">
                            <td className="pr-3 py-2 text-right">
                              <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                                  ladderTab === "fpb" || ladderTab === "kpk"
                                    ? "bg-emerald-500 text-white"
                                    : "bg-gray-200"
                                }`}
                              >
                                ÷ 3
                              </span>
                            </td>
                            <td className="pl-3 py-2 border-l-4 border-emerald-400">
                              <span className="mr-6">{ladderA / 2}</span>
                              <span>{ladderB / 2}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-3 py-2 text-right text-xs text-gray-400">-</td>
                            <td className="pl-3 py-2 border-l-4 border-emerald-400">
                              <span
                                className={`px-2 py-0.5 rounded-lg mr-4 ${
                                  ladderTab === "kpk" ? "bg-indigo-500 text-white" : "text-gray-700"
                                }`}
                              >
                                {ladderA / 6}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-lg ${
                                  ladderTab === "kpk" ? "bg-indigo-500 text-white" : "text-gray-700"
                                }`}
                              >
                                {ladderB / 6}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 pt-3 border-t border-emerald-200 text-center">
                      {ladderTab === "fpb" ? (
                        <div className="text-emerald-900 font-bold text-xs sm:text-sm">
                          FPB (Huruf &quot;I&quot; Tegak) = 2 × 3 ={" "}
                          <span className="text-emerald-700 font-black text-base">6</span>
                          <p className="text-[11px] text-gray-500 font-sans font-normal mt-1">
                            Hanya kalikan angka pembagi di sisi tegak kiri.
                          </p>
                        </div>
                      ) : (
                        <div className="text-indigo-900 font-bold text-xs sm:text-sm">
                          KPK (Bentuk &quot;L&quot;) = 2 × 3 × {ladderA / 6} × {ladderB / 6} ={" "}
                          <span className="text-indigo-700 font-black text-base">
                            {(ladderA * ladderB) / 6}
                          </span>
                          <p className="text-[11px] text-gray-500 font-sans font-normal mt-1">
                            Kalikan seluruh angka di sisi tegak dan baris alas paling bawah (huruf L).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3.2 Rumus Emas FPB x KPK */}
                  <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-300 text-center font-mono text-xs text-amber-900">
                    <span className="font-black text-amber-950 font-sans block mb-1">
                      ⭐ Rumus Emas Teorema Bilangan:
                    </span>
                    FPB(a, b) × KPK(a, b) = a × b
                    <span className="block text-[11px] text-gray-600 font-sans mt-0.5">
                      6 × 36 = 12 × 18 = 216 (Terbukti selalu sama!)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 4: PECAHAN ACUAN & PERSENTASE KILAT */}
            {/* ========================================================= */}
            {activeModule === 4 && (
              <div className="flex flex-col gap-6">
                {/* 4.3 Sifat Pertukaran Persen */}
                <div className="bg-white rounded-3xl border-2 border-violet-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-violet-600 text-white font-black text-sm flex items-center justify-center">
                      4.3
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Percent Swap Trick (x% of y = y% of x)" : "Jurus Sakti Pertukaran Persen"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Because multiplication is commutative, x% of y is ALWAYS equal to y% of x. 16% of 50 looks tricky, but 50% of 16 is just half of 16 = 8!"
                      : "Sifat komutatif perkalian membuat x% dari y SELALU sama dengan y% dari x. Menghitung 16% dari 50 terdengar sulit, tapi 50% dari 16 adalah setengah dari 16 = 8!"}
                  </p>

                  {/* Interactive Swap Sandbox */}
                  <div className="bg-violet-50/70 p-4 rounded-2xl border border-violet-200 flex flex-col items-center gap-4">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Coba Kasus:</span>
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
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            swapX === x && swapY === y
                              ? "bg-violet-600 text-white shadow-xs"
                              : "bg-white text-violet-800 border border-violet-200 hover:bg-violet-100"
                          }`}
                        >
                          {x}% dari {y}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <div className="p-3 bg-white rounded-xl border border-violet-200 text-center font-mono">
                        <span className="text-[10px] text-gray-400 font-bold block mb-1">Soal Awal (Sulit)</span>
                        <span className="font-bold text-sm text-gray-700">{swapX}% × {swapY}</span>
                      </div>

                      <span className="text-violet-600 font-black text-xl">⇄</span>

                      <div className="p-3 bg-violet-100 rounded-xl border border-violet-300 text-center font-mono">
                        <span className="text-[10px] text-violet-700 font-bold block mb-1">Ditukar (Sangat Mudah!)</span>
                        <span className="font-black text-sm text-violet-950">{swapY}% × {swapX}</span>
                      </div>

                      <span className="text-gray-400 font-black text-xl">=</span>

                      <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-center font-mono">
                        <span className="text-[10px] text-emerald-700 font-bold block mb-1">Hasil Kilat</span>
                        <span className="font-black text-lg text-emerald-800">
                          {(swapX * swapY) / 100}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4.1 Benchmark Fractions */}
                <div className="bg-white rounded-3xl border-2 border-violet-200 p-5 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-black text-sm flex items-center justify-center">
                      4.1
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Benchmark Fraction Memory Bank" : "Bank Pecahan Acuan (Kamus Mental)"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">50%</span>
                      <span className="text-gray-800 font-black">1/2</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">25%</span>
                      <span className="text-gray-800 font-black">1/4</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">12.5%</span>
                      <span className="text-gray-800 font-black">1/8</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">33.3%</span>
                      <span className="text-gray-800 font-black">1/3</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">20%</span>
                      <span className="text-gray-800 font-black">1/5</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">10%</span>
                      <span className="text-gray-800 font-black">1/10</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">5%</span>
                      <span className="text-gray-800 font-black">1/20</span>
                    </div>
                    <div className="p-2.5 bg-gray-50 border rounded-xl">
                      <span className="text-purple-700 font-bold block">1%</span>
                      <span className="text-gray-800 font-black">1/100</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 5: PANGKAT, KUADRAT & AKAR CEPAT */}
            {/* ========================================================= */}
            {activeModule === 5 && (
              <div className="flex flex-col gap-6">
                {/* 5.1 Kuadrat Berakhiran 5 */}
                <div className="bg-white rounded-3xl border-2 border-rose-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center">
                      5.1
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Squaring Numbers Ending in 5" : "Jurus Kuadrat Berakhiran 5"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Formula: a5² = [a × (a + 1)] & [25]. Multiply the tens digit by the next integer, then simply append 25!"
                      : "Rumus: a5² = [a × (a + 1)] digabung dengan [25]. Kalikan digit puluhan dengan kakaknya (angka berikutnya), lalu pasang 25 di belakang!"}
                  </p>

                  <div className="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Pilih Bilangan:</span>
                      {[2, 3, 4, 6, 7, 8, 9].map((tens) => (
                        <button
                          key={tens}
                          onClick={() => setSquareFiveTens(tens)}
                          className={`w-9 h-8 rounded-xl text-xs font-black transition-all ${
                            squareFiveTens === tens
                              ? "bg-rose-500 text-white shadow-xs"
                              : "bg-white text-gray-700 border border-rose-200 hover:bg-rose-100"
                          }`}
                        >
                          {tens}5
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <div className="p-3 bg-white rounded-xl border border-rose-200 text-center font-mono font-black text-xl text-gray-900">
                        {squareFiveTens}5²
                      </div>
                      <span className="text-rose-500 font-black">=</span>
                      <div className="flex items-center gap-1 font-mono">
                        <span className="px-3 py-1.5 bg-rose-500 text-white font-black text-lg rounded-xl shadow-xs">
                          {squareFiveTens} × {squareFiveTens + 1} = {squareFiveTens * (squareFiveTens + 1)}
                        </span>
                        <span className="px-3 py-1.5 bg-amber-400 text-amber-950 font-black text-lg rounded-xl shadow-xs">
                          25
                        </span>
                      </div>
                      <span className="text-gray-400 font-black">=</span>
                      <div className="px-4 py-2 bg-emerald-50 text-emerald-800 font-mono font-black text-2xl rounded-xl border border-emerald-300">
                        {squareFiveTens * (squareFiveTens + 1)}25
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5.4 Tarik Akar Pangkat Tiga (Tirai 3 Digit) */}
                <div className="bg-white rounded-3xl border-2 border-rose-200 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center">
                      5.4
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Cube Root in 3 Seconds (3-Digit Curtain)" : "Tarik Akar Pangkat Tiga dalam 3 Detik"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Split 3 digits from the right. The units digit is uniquely mapped (2↔8, 3↔7, others stay the same). The remaining left number gives the tens digit!"
                      : "Tutup 3 angka terakhir. Digit satuan dipetakan secara unik (2 ↔ 8, 3 ↔ 7, angka lain tetap sama). Angka tersisa di depan menentukan digit puluhan!"}
                  </p>

                  <div className="p-4 bg-orange-50/70 rounded-2xl border border-orange-200 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700">Contoh:</span>
                      {[
                        { val: 12167, ans: 23 },
                        { val: 24389, ans: 29 },
                        { val: 91125, ans: 45 },
                        { val: 175616, ans: 56 },
                      ].map((item) => (
                        <button
                          key={item.val}
                          onClick={() => setCubeRootInput(item.val)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold font-mono transition-all ${
                            cubeRootInput === item.val
                              ? "bg-orange-600 text-white shadow-xs"
                              : "bg-white text-gray-700 border border-orange-200 hover:bg-orange-100"
                          }`}
                        >
                          ³√{item.val.toLocaleString("id-ID")}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const str = String(cubeRootInput);
                      const leftPart = str.slice(0, -3);
                      const rightPart = str.slice(-3);
                      const lastDigit = Number(str.slice(-1));
                      const unitMap: Record<number, number> = {
                        0: 0, 1: 1, 2: 8, 3: 7, 4: 4, 5: 5, 6: 6, 7: 3, 8: 2, 9: 9,
                      };
                      const ansUnit = unitMap[lastDigit];
                      const ansTens = Math.round(Math.cbrt(cubeRootInput) - ansUnit) / 10;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 font-mono">
                          <div className="p-3 bg-white rounded-xl border border-orange-200 text-center">
                            <span className="text-[10px] text-gray-400 font-sans block mb-1">Depan Tirai</span>
                            <span className="font-bold text-base text-orange-900">{leftPart}</span>
                            <span className="text-[10px] text-gray-500 font-sans block mt-1">
                              ³√{leftPart} mendekati {ansTens}³
                            </span>
                          </div>

                          <span className="text-orange-400 font-black text-xl">|</span>

                          <div className="p-3 bg-white rounded-xl border border-orange-200 text-center">
                            <span className="text-[10px] text-gray-400 font-sans block mb-1">Belakang Tirai</span>
                            <span className="font-bold text-base text-orange-900">
                              ...<span className="text-rose-600 underline font-black">{lastDigit}</span>
                            </span>
                            <span className="text-[10px] text-gray-500 font-sans block mt-1">
                              Satuan {lastDigit} ⟹ {ansUnit}
                            </span>
                          </div>

                          <span className="text-gray-400 font-black text-xl">=</span>

                          <div className="px-4 py-2 bg-emerald-50 text-emerald-800 font-black text-2xl rounded-xl border border-emerald-300">
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
              <div className="flex flex-col gap-6">
                {/* 6.2 Penjumlahan Gauss */}
                <div className="bg-white rounded-3xl border-2 border-amber-300 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center">
                      6.2
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Gauss Symmetrical Series (Tape Folding)" : "Deret Simetris Gauss (Lipat Pita)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Pair the first and last numbers (1+100 = 101, 2+99 = 101). Multiply the constant sum by half the number of elements."
                      : "Pasangkan bilangan pertama dan terakhir (1 + 100 = 101, 2 + 99 = 101). Kalikan nilai pasangan tersebut dengan jumlah pasangan (N / 2)."}
                  </p>

                  <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 font-mono font-bold text-sm text-gray-800">
                      <span>1 + 2 + 3 + ... + 100</span>
                      <span>=</span>
                      <span className="text-amber-800 font-black text-base">(100 ÷ 2) × (1 + 100)</span>
                    </div>

                    <div className="px-5 py-2 bg-amber-500 text-white font-mono font-black text-2xl rounded-2xl shadow-sm">
                      50 × 101 = 5.050
                    </div>
                  </div>
                </div>

                {/* 6.3 Deret Teleskopik */}
                <div className="bg-white rounded-3xl border-2 border-amber-300 p-5 sm:p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center">
                      6.3
                    </span>
                    <h2 className="text-lg font-black text-gray-800">
                      {isEn ? "Telescoping Series (Domino Cancellation)" : "Deret Teleskopik (Efek Saling Meniadakan)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                    {isEn
                      ? "Every term decomposes into a difference: 1 / [n(n+1)] = 1/n - 1/(n+1). All intermediate fractions cancel like falling dominoes!"
                      : "Setiap suku pecahan dipecah menjadi selisih: 1 / [n(n+1)] = 1/n − 1/(n+1). Semua suku di tengah saling menghabisi seperti efek domino!"}
                  </p>

                  <div className="p-4 bg-white rounded-2xl border border-amber-200 flex flex-col items-center gap-3 font-mono">
                    <div className="text-xs sm:text-sm text-gray-700 text-center font-bold">
                      1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(9×10)
                    </div>

                    <div className="text-xs text-amber-800 text-center font-semibold">
                      = (1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4) + ... + (1/9 − 1/10)
                    </div>

                    <div className="px-4 py-2 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl font-black text-base">
                      Tersisa: 1 − 1/10 = 9/10
                    </div>
                  </div>
                </div>

                {/* 6.1 Misteri 1001 */}
                <div className="bg-white rounded-3xl border-2 border-amber-300 p-5 shadow-sm">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-200 text-amber-900 mb-2">
                    6.1 Keajaiban Bilangan 1001
                  </span>
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-mono">
                    1001 = 7 × 11 × 13
                  </p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {isEn
                      ? "Any 3-digit number repeated twice (e.g. 523.523) is exactly equal to 523 × 1001, and is therefore ALWAYS divisible by 7, 11, and 13!"
                      : "Setiap bilangan 3 digit yang berulang dua kali (misal: 523.523) selalu bernilai 523 × 1001, sehingga PASTI habis dibagi oleh 7, 11, dan 13!"}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
