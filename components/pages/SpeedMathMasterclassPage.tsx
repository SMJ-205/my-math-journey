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
    <div className="min-h-dvh flex flex-col bg-[#FFFDF4]">
      {/* Header with compact title on mobile to prevent 'Speed Mat...' truncation */}
      <PageHeader
        showBack
        onBack={onBack}
        title={isEn ? "Speed Math" : "Kelas Mahir"}
      />

      <main className="flex-1 max-w-4xl mx-auto w-full px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col gap-5 sm:gap-6">
        {/* Hero Banner - Beach Sand / Pasir Pantai Palette */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8DAC5] via-[#DFCEB7] to-[#CEBA9F] p-5 sm:p-7 text-[#443322] border-2 border-[#D5C2A8] shadow-xs">
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-white/70 backdrop-blur-md uppercase tracking-wider text-[#6E4F28] border border-white/80 shadow-2xs">
              <Sparkles size={13} className="text-[#8B673A]" />
              {isEn ? "CPA Visual & Mental Method" : "Metode Konkret-Piktorial-Abstrak"}
            </span>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black mt-2 leading-tight text-[#3A2919]">
              {isEn
                ? "Speed Math Guide & Mental Calculation Tricks"
                : "Panduan Hitung Cepat & Jurus Mental Matematika SD"}
            </h1>
            <p className="text-[#5F4B35] text-xs sm:text-sm mt-1.5 font-medium leading-relaxed">
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
                    ? "bg-[#9A7342] text-white border-[#876233] shadow-sm scale-[1.02]"
                    : "bg-[#F8F4EC] text-[#5C4935] border-[#E3D7C5] hover:bg-[#F2ECE0] hover:border-[#D5C6B0]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-colors ${
                    isActive ? "bg-white/20 text-white" : "bg-[#ECE3D4] text-[#7A5B36]"
                  }`}
                >
                  <TabIcon size={18} />
                </div>
                <span className={`text-xs font-black leading-tight ${isActive ? "text-white" : "text-[#423120]"}`}>
                  {m.title}
                </span>
                <span
                  className={`text-[10px] font-semibold mt-0.5 ${
                    isActive ? "text-amber-100" : "text-[#826F5A]"
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
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#9A7342] text-white font-black text-xs flex items-center justify-center">
                      1.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Friends of 10 & Ten-Frames" : "Pasangan Sahabat 10 & Bingkai Sepuluh"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Every single digit has a complementary 'Best Friend' that sums to 10. Visualized using a 5x2 Ten-Frame grid."
                      : "Setiap angka memiliki Sahabat Karib yang jika dijumlahkan selalu bernilai 10. Divisualisasikan dengan Bingkai 10 (kotak 5 × 2)."}
                  </p>

                  <div className="bg-[#F8F4EC] p-3.5 sm:p-4 rounded-2xl border border-[#E3D7C5] flex flex-col items-center gap-3.5">
                    {/* Selector - stacked label and wrap buttons */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#6B543D]">
                        {isEn ? "Choose starting number:" : "Pilih angka awal:"}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <button
                            key={n}
                            onClick={() => setBondsTarget(n)}
                            className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                              bondsTarget === n
                                ? "bg-[#9A7342] text-white shadow-xs"
                                : "bg-white text-[#574431] border border-[#D9CCBA] hover:bg-[#F2ECE1]"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 5x2 Ten-Frame with responsive cells */}
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 p-2.5 sm:p-3 bg-white rounded-2xl border-2 border-[#D8C7B0] shadow-2xs max-w-full">
                      {Array.from({ length: 10 }).map((_, i) => {
                        const isFilled = i < bondsTarget;
                        return (
                          <motion.div
                            key={i}
                            layout
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border-2 flex items-center justify-center font-black text-sm transition-all ${
                              isFilled
                                ? "bg-[#C4A070] border-[#A88252] text-[#362514] shadow-2xs"
                                : "bg-[#FBF9F5] border-dashed border-[#DACDBE] text-[#C4B7A7]"
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full inline-block bg-current opacity-80" />
                          </motion.div>
                        );
                      })}
                    </div>

                    <div className="text-center">
                      <span className="text-sm sm:text-base font-black text-[#3B2B1B] bg-white px-4 py-1.5 rounded-xl border border-[#D5C5AE] shadow-2xs">
                        {bondsTarget} + <span className="text-[#2C6347] font-black">{10 - bondsTarget}</span> = 10
                      </span>
                      <p className="text-xs text-[#725E47] mt-2 font-medium">
                        {isEn
                          ? `Friend of ${bondsTarget} is ${10 - bondsTarget} (the empty slots).`
                          : `Sahabat dari ${bondsTarget} adalah ${10 - bondsTarget} (kotak kosong yang tersisa).`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 1.2 Bridging Through 10 */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#8E6A3A] text-white font-black text-xs flex items-center justify-center">
                      1.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Bridging Through 10" : "Jurus Lompatan Melampaui 10"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "When adding numbers that cross 10, split the second number using the friend of 10 to land exactly on 10, then add the remainder."
                      : "Pecah angka kedua menjadi teman 10 angka pertama dan sisanya, agar mendarat mulus di 10 terlebih dahulu."}
                  </p>

                  <div className="bg-[#F8F4EC] p-3.5 sm:p-4 rounded-2xl border border-[#E3D7C5] flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 font-mono font-black text-xl sm:text-2xl text-[#3A2919]">
                      <span>{bridgeA}</span>
                      <span>+</span>
                      <span>{bridgeB}</span>
                      <span>=</span>
                      <span className="text-[#245439]">{bridgeA + bridgeB}</span>
                    </div>

                    {/* Step breakdown - responsive wrap */}
                    <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 text-xs sm:text-sm">
                      <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#DFD1BD] text-center">
                        <span className="text-[#87745E] font-bold block text-[10px] sm:text-xs mb-0.5">
                          Langkah 1: Teman 10
                        </span>
                        <span className="font-bold text-[#543F2B]">
                          {bridgeA} butuh <span className="underline decoration-[#2C6347] font-black">{10 - bridgeA}</span> untuk jadi 10
                        </span>
                      </div>
                      <span className="text-[#9C8A74] font-black text-center sm:text-left">→</span>
                      <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#DFD1BD] text-center">
                        <span className="text-[#87745E] font-bold block text-[10px] sm:text-xs mb-0.5">
                          Langkah 2: Pecah Angka Kedua
                        </span>
                        <span className="font-bold text-[#543F2B]">
                          {bridgeB} dipecah: ({10 - bridgeA} + {bridgeB - (10 - bridgeA)})
                        </span>
                      </div>
                      <span className="text-[#9C8A74] font-black text-center sm:text-left">→</span>
                      <div className="p-2.5 sm:p-3 bg-[#EEF5F0] rounded-xl border border-[#BDD7C6] text-center">
                        <span className="text-[#2B5E41] font-bold block text-[10px] sm:text-xs mb-0.5">
                          Hasil Kilat
                        </span>
                        <span className="font-black text-[#1C422D]">
                          10 + {bridgeB - (10 - bridgeA)} = {bridgeA + bridgeB}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1.3 Near-Doubles & 1.4 Constant Difference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#EFE4D3] text-[#6B4E2B] mb-2 border border-[#DECDB7]">
                        1.3 Near-Doubles (Hampir-Kembar)
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-[#3E2F1F] mb-1.5">
                        6 + 7 = 6 + 6 + 1 = 13
                      </h3>
                      <p className="text-xs text-[#66533E] leading-relaxed">
                        {isEn
                          ? "Anchor to known double facts. Since 6+6=12, adding 7 (which is 6+1) is simply 12+1=13."
                          : "Gunakan jangkar angka kembar yang sudah dihafal (6+6=12). Karena 7 adalah 6+1, maka 6+7 = 12+1 = 13."}
                      </p>
                    </div>
                    <div className="mt-3 p-2.5 bg-[#F8F4EC] rounded-xl text-center font-mono font-bold text-xs text-[#523F2A] border border-[#E3D7C5]">
                      7 + 8 = (7 × 2) + 1 = 15 | 8 + 9 = (8 × 2) + 1 = 17
                    </div>
                  </div>

                  <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#EFE4D3] text-[#6B4E2B] mb-2 border border-[#DECDB7]">
                        1.4 Selisih Tetap (Tanpa Meminjam)
                      </span>
                      <h3 className="font-black text-sm sm:text-base text-[#3E2F1F] mb-1.5">
                        52 − 19 = 53 − 20 = 33
                      </h3>
                      <p className="text-xs text-[#66533E] leading-relaxed">
                        {isEn
                          ? "Add or subtract the same value to both numbers to turn the subtrahend into a friendly zero-ending number."
                          : "Tambahkan nilai yang sama pada kedua bilangan agar pengurang menjadi bilangan bulat puluhan tanpa perlu meminjam."}
                      </p>
                    </div>
                    <div className="mt-3 p-2.5 bg-[#F8F4EC] rounded-xl text-center font-mono font-bold text-xs text-[#523F2A] border border-[#E3D7C5]">
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
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#9A7342] text-white font-black text-xs flex items-center justify-center">
                      2.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "4-Quadrant Area Model" : "Model Area 4 Kuadran (14 × 12)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Decompose 2-digit numbers into tens and ones (14 = 10+4, 12 = 10+2). Calculate the 4 sub-rectangles and sum them mentally."
                      : "Pecah bilangan menjadi puluhan dan satuan (14 = 10 + 4, 12 = 10 + 2). Hitung 4 kotak persegi panjang lalu jumlahkan."}
                  </p>

                  <div className="max-w-md mx-auto p-3.5 bg-[#F8F4EC] rounded-2xl border border-[#E3D7C5]">
                    <div className="grid grid-cols-2 gap-2 text-center font-mono font-bold">
                      <div className="p-2.5 bg-white border border-[#D9CCBA] rounded-xl">
                        <span className="text-[10px] text-[#7A644D] block">10 × 10</span>
                        <span className="text-base sm:text-lg text-[#3E2F1F] font-black">100</span>
                      </div>
                      <div className="p-2.5 bg-white border border-[#D9CCBA] rounded-xl">
                        <span className="text-[10px] text-[#7A644D] block">4 × 10</span>
                        <span className="text-base sm:text-lg text-[#3E2F1F] font-black">40</span>
                      </div>
                      <div className="p-2.5 bg-white border border-[#D9CCBA] rounded-xl">
                        <span className="text-[10px] text-[#7A644D] block">10 × 2</span>
                        <span className="text-base sm:text-lg text-[#3E2F1F] font-black">20</span>
                      </div>
                      <div className="p-2.5 bg-white border border-[#D9CCBA] rounded-xl">
                        <span className="text-[10px] text-[#7A644D] block">4 × 2</span>
                        <span className="text-base sm:text-lg text-[#3E2F1F] font-black">8</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#D9CCBA] text-center font-bold text-xs sm:text-sm text-[#4E3A24]">
                      Total = 100 + 40 + 20 + 8 = <span className="text-[#245439] font-black text-base">168</span>
                    </div>
                  </div>
                </div>

                {/* 2.2 Halving and Doubling */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#8E6A3A] text-white font-black text-xs flex items-center justify-center">
                      2.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Halving & Doubling Technique" : "Jurus Bagi Dua & Kali Dua"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Halve the even number, double the number ending in 5. The product remains identical but turns into an effortless mental calculation."
                      : "Bagi 2 bilangan genap, kalikan 2 bilangan yang berakhiran 5. Hasilnya tetap sama persis tetapi jauh lebih mudah dihitung di kepala."}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3.5 bg-[#F8F4EC] rounded-2xl border border-[#E3D7C5]">
                    <div className="flex items-center gap-1.5 font-mono font-black text-lg sm:text-xl text-[#4A3825]">
                      <span className="px-2.5 py-1 bg-white rounded-xl border border-[#D9CCBA]">{halveDoubleA}</span>
                      <span>×</span>
                      <span className="px-2.5 py-1 bg-white rounded-xl border border-[#D9CCBA]">{halveDoubleB}</span>
                    </div>

                    <div className="flex flex-col items-center text-[#7F5E36] font-bold text-xs">
                      <span>(÷2) ⇄ (×2)</span>
                      <span>⟹</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono font-black text-lg sm:text-xl text-[#382614]">
                      <span className="px-2.5 py-1 bg-[#9A7342] text-white rounded-xl shadow-2xs">{halveDoubleA / 2}</span>
                      <span>×</span>
                      <span className="px-2.5 py-1 bg-[#9A7342] text-white rounded-xl shadow-2xs">{halveDoubleB * 2}</span>
                      <span>=</span>
                      <span className="text-[#245439] font-black text-xl sm:text-2xl">
                        {(halveDoubleA / 2) * (halveDoubleB * 2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 2.3 Jurus Pengali Spesial: x11, x5, x9, x25 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Jurus x11 */}
                  <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-5 shadow-xs">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#EFE4D3] text-[#6B4E2B] mb-2 border border-[#DECDB7]">
                      Jurus × 11 (Sandwich Digit)
                    </span>
                    <p className="text-xs text-[#66533E] mb-3">
                      {isEn
                        ? "Insert the sum of the two digits in between them. If sum ≥ 10, carry 1 to the hundreds."
                        : "Jumlahkan kedua digit lalu selipkan di tengah. Jika jumlah ≥ 10, simpan 1 ke digit ratusan."}
                    </p>

                    {/* Stacked label and wrap buttons */}
                    <div className="w-full flex flex-col gap-1.5 mb-3">
                      <span className="text-xs font-bold text-[#6B543D]">Pilih Angka:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[32, 53, 62, 75, 84].map((val) => (
                          <button
                            key={val}
                            onClick={() => setMultElevenNum(val)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                              multElevenNum === val
                                ? "bg-[#9A7342] text-white shadow-2xs"
                                : "bg-[#F8F4EC] text-[#54412E] border border-[#D9CCBA] hover:bg-[#F0E8DC]"
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
                        <div className="p-3 bg-[#F8F4EC] rounded-xl border border-[#E3D7C5] text-center font-mono">
                          <p className="text-xs sm:text-sm font-bold text-[#443220]">
                            {multElevenNum} × 11 = {d1} [{d1}+{d2}] {d2} ={" "}
                            <span className="text-[#245439] font-black text-sm sm:text-base">{ans}</span>
                          </p>
                          {sum >= 10 && (
                            <p className="text-[11px] text-[#8C5E28] font-sans mt-1">
                              Karena {d1}+{d2}={sum} (≥10), simpan 1 ke depan: ({d1}+1){sum % 10}{d2} = {ans}
                            </p>
                          )}
                        </div>
                      );
                    })()}
                  </div>

                  {/* Jurus x5, x9 & x25 */}
                  <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#EFE4D3] text-[#6B4E2B] mb-2 border border-[#DECDB7]">
                        Jurus × 5, × 9, & × 25
                      </span>
                      <div className="flex flex-col gap-2 text-xs font-mono">
                        <div className="p-2 bg-[#F8F4EC] rounded-lg border border-[#E3D7C5]">
                          <span className="font-bold text-[#805F36]">× 5:</span> n0 ÷ 2
                          <span className="text-[#75624E] block text-[11px]">48 × 5 = 480 ÷ 2 = 240</span>
                        </div>
                        <div className="p-2 bg-[#F8F4EC] rounded-lg border border-[#E3D7C5]">
                          <span className="font-bold text-[#805F36]">× 9:</span> n0 − n
                          <span className="text-[#75624E] block text-[11px]">37 × 9 = 370 − 37 = 333</span>
                        </div>
                        <div className="p-2 bg-[#F8F4EC] rounded-lg border border-[#E3D7C5]">
                          <span className="font-bold text-[#805F36]">× 25:</span> n00 ÷ 4
                          <span className="text-[#75624E] block text-[11px]">36 × 25 = 3.600 ÷ 4 = 900</span>
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
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#9A7342] text-white font-black text-xs flex items-center justify-center">
                      3.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "The Ladder Method (Petak Sawah)" : "Metode Tangga / Sengkedan Petak Sawah"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "A single-table method to find both GCF and LCM simultaneously without complicated prime trees."
                      : "Metode paling ramah anak untuk mencari FPB dan KPK sekaligus dalam satu petak tanpa menggambar banyak pohon faktor yang berantakan."}
                  </p>

                  {/* Preset Buttons - stacked label and wrap buttons */}
                  <div className="w-full flex flex-col gap-1.5 mb-3.5">
                    <span className="text-xs font-bold text-[#6B543D]">Contoh Pasangan:</span>
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
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            ladderA === a && ladderB === b
                              ? "bg-[#9A7342] text-white shadow-2xs"
                              : "bg-[#F8F4EC] text-[#54412E] border border-[#D9CCBA] hover:bg-[#F0E8DC]"
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
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        ladderTab === "fpb"
                          ? "bg-[#9A7342] text-white shadow-2xs"
                          : "bg-[#F8F4EC] text-[#63503C] border border-[#E3D7C5]"
                      }`}
                    >
                      Konfigurasi Huruf I (FPB)
                    </button>
                    <button
                      onClick={() => setLadderTab("kpk")}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        ladderTab === "kpk"
                          ? "bg-[#5D4632] text-white shadow-2xs"
                          : "bg-[#F8F4EC] text-[#63503C] border border-[#E3D7C5]"
                      }`}
                    >
                      Konfigurasi Huruf L (KPK)
                    </button>
                  </div>

                  {/* Ladder Grid Card */}
                  <div className="p-3.5 bg-[#F8F4EC] rounded-2xl border border-[#E3D7C5] max-w-sm mx-auto">
                    <div className="flex flex-col items-center">
                      <table className="border-collapse font-mono font-bold text-sm sm:text-base">
                        <tbody>
                          <tr className="border-b-2 border-[#D9CCBA]">
                            <td className="pr-3 py-1.5 text-right">
                              <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                                  ladderTab === "fpb" || ladderTab === "kpk"
                                    ? "bg-[#9A7342] text-white"
                                    : "bg-gray-200"
                                }`}
                              >
                                ÷ 2
                              </span>
                            </td>
                            <td className="pl-3 py-1.5 border-l-4 border-[#C4A070]">
                              <span className="mr-5">{ladderA}</span>
                              <span>{ladderB}</span>
                            </td>
                          </tr>
                          <tr className="border-b-2 border-[#D9CCBA]">
                            <td className="pr-3 py-1.5 text-right">
                              <span
                                className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                                  ladderTab === "fpb" || ladderTab === "kpk"
                                    ? "bg-[#9A7342] text-white"
                                    : "bg-gray-200"
                                }`}
                              >
                                ÷ 3
                              </span>
                            </td>
                            <td className="pl-3 py-1.5 border-l-4 border-[#C4A070]">
                              <span className="mr-5">{ladderA / 2}</span>
                              <span>{ladderB / 2}</span>
                            </td>
                          </tr>
                          <tr>
                            <td className="pr-3 py-1.5 text-right text-xs text-[#9E8B76]">-</td>
                            <td className="pl-3 py-1.5 border-l-4 border-[#C4A070]">
                              <span
                                className={`px-2 py-0.5 rounded-lg mr-3 ${
                                  ladderTab === "kpk" ? "bg-[#5D4632] text-white" : "text-[#4A3825]"
                                }`}
                              >
                                {ladderA / 6}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-lg ${
                                  ladderTab === "kpk" ? "bg-[#5D4632] text-white" : "text-[#4A3825]"
                                }`}
                              >
                                {ladderB / 6}
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-[#D9CCBA] text-center">
                      {ladderTab === "fpb" ? (
                        <div className="text-[#4E3924] font-bold text-xs sm:text-sm">
                          FPB (Huruf I Tegak) = 2 × 3 ={" "}
                          <span className="text-[#245439] font-black text-base">6</span>
                          <p className="text-[11px] text-[#7A644D] font-sans font-normal mt-1">
                            Hanya kalikan angka pembagi di sisi tegak kiri.
                          </p>
                        </div>
                      ) : (
                        <div className="text-[#3E2D1D] font-bold text-xs sm:text-sm">
                          KPK (Bentuk L) = 2 × 3 × {ladderA / 6} × {ladderB / 6} ={" "}
                          <span className="text-[#245439] font-black text-base">
                            {(ladderA * ladderB) / 6}
                          </span>
                          <p className="text-[11px] text-[#7A644D] font-sans font-normal mt-1">
                            Kalikan seluruh angka di sisi tegak dan baris alas paling bawah (huruf L).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3.2 Rumus Emas FPB x KPK */}
                  <div className="mt-3.5 p-3 bg-[#F8F4EC] rounded-xl border border-[#E3D7C5] text-center font-mono text-xs text-[#523F2B]">
                    <span className="font-black text-[#3E2F1F] font-sans block mb-0.5">
                      Rumus Emas Teorema Bilangan:
                    </span>
                    FPB(a, b) × KPK(a, b) = a × b
                    <span className="block text-[11px] text-[#7A6652] font-sans mt-0.5">
                      6 × 36 = 12 × 18 = 216 (Terbukti selalu sama)
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODUL 4: PECAHAN ACUAN & PERSENTASE KILAT */}
            {/* ========================================================= */}
            {activeModule === 4 && (
              <div className="flex flex-col gap-5">
                {/* 4.3 Sifat Pertukaran Persen */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#9A7342] text-white font-black text-xs flex items-center justify-center">
                      4.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Percent Swap Trick (x% of y = y% of x)" : "Jurus Sakti Pertukaran Persen"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Because multiplication is commutative, x% of y is ALWAYS equal to y% of x. 16% of 50 looks tricky, but 50% of 16 is just half of 16 = 8."
                      : "Sifat komutatif perkalian membuat x% dari y SELALU sama dengan y% dari x. Menghitung 16% dari 50 terdengar sulit, tapi 50% dari 16 adalah setengah dari 16 = 8."}
                  </p>

                  <div className="bg-[#F8F4EC] p-3.5 sm:p-4 rounded-2xl border border-[#E3D7C5] flex flex-col items-center gap-3.5">
                    {/* Selector - stacked label and wrap buttons */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#6B543D]">Coba Kasus:</span>
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
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                              swapX === x && swapY === y
                                ? "bg-[#9A7342] text-white shadow-2xs"
                                : "bg-white text-[#574431] border border-[#D9CCBA] hover:bg-[#F2ECE1]"
                            }`}
                          >
                            {x}% dari {y}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculation step cards - responsive layout */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2">
                      <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#DFD1BD] text-center font-mono w-full sm:w-auto">
                        <span className="text-[10px] text-[#87745E] font-sans font-bold block mb-0.5">
                          Soal Awal (Sulit)
                        </span>
                        <span className="font-bold text-xs sm:text-sm text-[#543F2B]">{swapX}% × {swapY}</span>
                      </div>

                      <span className="text-[#9C8A74] font-black text-sm">⇄</span>

                      <div className="p-2.5 sm:p-3 bg-white rounded-xl border border-[#C5B39A] text-center font-mono w-full sm:w-auto shadow-2xs">
                        <span className="text-[10px] text-[#7F5E36] font-sans font-bold block mb-0.5">
                          Ditukar (Sangat Mudah)
                        </span>
                        <span className="font-black text-xs sm:text-sm text-[#382614]">{swapY}% × {swapX}</span>
                      </div>

                      <span className="text-[#9C8A74] font-black text-sm">=</span>

                      <div className="p-2.5 sm:p-3 bg-[#EEF5F0] rounded-xl border border-[#BDD7C6] text-center font-mono w-full sm:w-auto">
                        <span className="text-[10px] text-[#2B5E41] font-sans font-bold block mb-0.5">
                          Hasil Kilat
                        </span>
                        <span className="font-black text-sm sm:text-base text-[#1C422D]">
                          {(swapX * swapY) / 100}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4.1 Benchmark Fractions */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#8E6A3A] text-white font-black text-xs flex items-center justify-center">
                      4.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Benchmark Fraction Memory Bank" : "Bank Pecahan Acuan (Kamus Mental)"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono text-xs">
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">50%</span>
                      <span className="text-[#3E2F1F] font-black">1/2</span>
                    </div>
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">25%</span>
                      <span className="text-[#3E2F1F] font-black">1/4</span>
                    </div>
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">12.5%</span>
                      <span className="text-[#3E2F1F] font-black">1/8</span>
                    </div>
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">33.3%</span>
                      <span className="text-[#3E2F1F] font-black">1/3</span>
                    </div>
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">20%</span>
                      <span className="text-[#3E2F1F] font-black">1/5</span>
                    </div>
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">10%</span>
                      <span className="text-[#3E2F1F] font-black">1/10</span>
                    </div>
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">5%</span>
                      <span className="text-[#3E2F1F] font-black">1/20</span>
                    </div>
                    <div className="p-2.5 bg-[#F8F4EC] border border-[#E3D7C5] rounded-xl">
                      <span className="text-[#805F36] font-bold block">1%</span>
                      <span className="text-[#3E2F1F] font-black">1/100</span>
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
                {/* 5.1 Kuadrat Berakhiran 5 (Fixed Mobile Overlapping) */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#9A7342] text-white font-black text-xs flex items-center justify-center">
                      5.1
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Squaring Numbers Ending in 5" : "Jurus Kuadrat Berakhiran 5"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Formula: a5² = [a × (a + 1)] & [25]. Multiply the tens digit by the next integer, then simply append 25."
                      : "Rumus: a5² = [a × (a + 1)] digabung dengan [25]. Kalikan digit puluhan dengan kakaknya (angka berikutnya), lalu pasang 25 di belakang."}
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F8F4EC] rounded-2xl border border-[#E3D7C5] flex flex-col items-center gap-3.5">
                    {/* Fixed: Label on top, buttons wrap cleanly on any screen */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#6B543D]">Pilih Bilangan:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {[2, 3, 4, 6, 7, 8, 9].map((tens) => (
                          <button
                            key={tens}
                            onClick={() => setSquareFiveTens(tens)}
                            className={`w-9 h-8 rounded-xl text-xs font-black transition-all ${
                              squareFiveTens === tens
                                ? "bg-[#9A7342] text-white shadow-2xs"
                                : "bg-white text-[#574431] border border-[#D9CCBA] hover:bg-[#F2ECE1]"
                            }`}
                          >
                            {tens}5
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculation step cards - responsive wrapping */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                      <div className="px-4 py-2 bg-white rounded-xl border border-[#DFD1BD] text-center font-mono font-black text-lg sm:text-xl text-[#3E2F1F] shadow-2xs">
                        {squareFiveTens}5²
                      </div>

                      <span className="text-[#9C8A74] font-black text-sm">=</span>

                      <div className="flex items-center gap-1 font-mono">
                        <span className="px-3 py-1.5 bg-[#9A7342] text-white font-black text-sm sm:text-base rounded-xl shadow-2xs">
                          {squareFiveTens} × {squareFiveTens + 1} = {squareFiveTens * (squareFiveTens + 1)}
                        </span>
                        <span className="px-3 py-1.5 bg-[#C9A675] text-[#362514] font-black text-sm sm:text-base rounded-xl shadow-2xs">
                          25
                        </span>
                      </div>

                      <span className="text-[#9C8A74] font-black text-sm">=</span>

                      <div className="px-4 py-2 bg-[#EEF5F0] text-[#1C422D] font-mono font-black text-xl sm:text-2xl rounded-xl border border-[#BDD7C6]">
                        {squareFiveTens * (squareFiveTens + 1)}25
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5.4 Tarik Akar Pangkat Tiga (Tirai 3 Digit - Fixed Mobile Overlapping) */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#8E6A3A] text-white font-black text-xs flex items-center justify-center">
                      5.4
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Cube Root in 3 Seconds (3-Digit Curtain)" : "Tarik Akar Pangkat Tiga dalam 3 Detik"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Split 3 digits from the right. The units digit is uniquely mapped (2↔8, 3↔7, others stay the same). The remaining left number gives the tens digit."
                      : "Tutup 3 angka terakhir. Digit satuan dipetakan secara unik (2 ↔ 8, 3 ↔ 7, angka lain tetap sama). Angka tersisa di depan menentukan digit puluhan."}
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F8F4EC] rounded-2xl border border-[#E3D7C5] flex flex-col items-center gap-3">
                    {/* Fixed: Label on top, buttons wrap cleanly without overflowing */}
                    <div className="w-full flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-[#6B543D]">Contoh:</span>
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
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono transition-all ${
                              cubeRootInput === item.val
                                ? "bg-[#9A7342] text-white shadow-2xs"
                                : "bg-white text-[#574431] border border-[#D9CCBA] hover:bg-[#F2ECE1]"
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
                      const rightPart = str.slice(-3);
                      const lastDigit = Number(str.slice(-1));
                      const unitMap: Record<number, number> = {
                        0: 0, 1: 1, 2: 8, 3: 7, 4: 4, 5: 5, 6: 6, 7: 3, 8: 2, 9: 9,
                      };
                      const ansUnit = unitMap[lastDigit];
                      const ansTens = Math.round(Math.cbrt(cubeRootInput) - ansUnit) / 10;
                      return (
                        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-2 font-mono">
                          <div className="p-2.5 bg-white rounded-xl border border-[#DFD1BD] text-center w-full sm:w-auto">
                            <span className="text-[10px] text-[#87745E] font-sans block mb-0.5">Depan Tirai</span>
                            <span className="font-bold text-sm sm:text-base text-[#443220]">{leftPart}</span>
                            <span className="text-[10px] text-[#87745E] font-sans block mt-0.5">
                              ³√{leftPart} mendekati {ansTens}³
                            </span>
                          </div>

                          <span className="text-[#9C8A74] font-black text-sm">|</span>

                          <div className="p-2.5 bg-white rounded-xl border border-[#DFD1BD] text-center w-full sm:w-auto">
                            <span className="text-[10px] text-[#87745E] font-sans block mb-0.5">Belakang Tirai</span>
                            <span className="font-bold text-sm sm:text-base text-[#443220]">
                              ...<span className="text-[#9A7342] underline font-black">{lastDigit}</span>
                            </span>
                            <span className="text-[10px] text-[#87745E] font-sans block mt-0.5">
                              Satuan {lastDigit} ⟹ {ansUnit}
                            </span>
                          </div>

                          <span className="text-[#9C8A74] font-black text-sm">=</span>

                          <div className="px-4 py-2 bg-[#EEF5F0] text-[#1C422D] font-black text-xl sm:text-2xl rounded-xl border border-[#BDD7C6]">
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
                {/* 6.2 Penjumlahan Gauss */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#9A7342] text-white font-black text-xs flex items-center justify-center">
                      6.2
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Gauss Symmetrical Series (Tape Folding)" : "Deret Simetris Gauss (Lipat Pita)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Pair the first and last numbers (1+100 = 101, 2+99 = 101). Multiply the constant sum by half the number of elements."
                      : "Pasangkan bilangan pertama dan terakhir (1 + 100 = 101, 2 + 99 = 101). Kalikan nilai pasangan tersebut dengan jumlah pasangan (N / 2)."}
                  </p>

                  <div className="p-3.5 sm:p-4 bg-[#F8F4EC] rounded-2xl border border-[#E3D7C5] flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2 font-mono font-bold text-xs sm:text-sm text-[#4A3825]">
                      <span>1 + 2 + 3 + ... + 100</span>
                      <span>=</span>
                      <span className="text-[#3A2919] font-black">(100 ÷ 2) × (1 + 100)</span>
                    </div>

                    <div className="px-5 py-2 bg-[#9A7342] text-white font-mono font-black text-xl sm:text-2xl rounded-2xl shadow-2xs">
                      50 × 101 = 5.050
                    </div>
                  </div>
                </div>

                {/* 6.3 Deret Teleskopik */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-6 shadow-xs">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-7 h-7 rounded-xl bg-[#8E6A3A] text-white font-black text-xs flex items-center justify-center">
                      6.3
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-[#3E2F1F]">
                      {isEn ? "Telescoping Series (Domino Cancellation)" : "Deret Teleskopik (Efek Saling Meniadakan)"}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#66533E] mb-4 leading-relaxed">
                    {isEn
                      ? "Every term decomposes into a difference: 1 / [n(n+1)] = 1/n - 1/(n+1). All intermediate fractions cancel like falling dominoes."
                      : "Setiap suku pecahan dipecah menjadi selisih: 1 / [n(n+1)] = 1/n − 1/(n+1). Semua suku di tengah saling menghabisi seperti efek domino."}
                  </p>

                  <div className="p-3.5 bg-white rounded-2xl border border-[#E3D7C5] flex flex-col items-center gap-2 font-mono">
                    <div className="text-xs sm:text-sm text-[#4E3B26] text-center font-bold">
                      1/(1×2) + 1/(2×3) + 1/(3×4) + ... + 1/(9×10)
                    </div>

                    <div className="text-xs text-[#725D46] text-center font-semibold">
                      = (1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4) + ... + (1/9 − 1/10)
                    </div>

                    <div className="px-4 py-1.5 bg-[#EEF5F0] text-[#1C422D] border border-[#BDD7C6] rounded-xl font-black text-sm sm:text-base">
                      Tersisa: 1 − 1/10 = 9/10
                    </div>
                  </div>
                </div>

                {/* 6.1 Misteri 1001 */}
                <div className="bg-white rounded-3xl border-2 border-[#E5DACE] p-4 sm:p-5 shadow-xs">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#EFE4D3] text-[#6B4E2B] mb-2 border border-[#DECDB7]">
                    6.1 Keajaiban Bilangan 1001
                  </span>
                  <p className="text-xs sm:text-sm text-[#3E2F1F] leading-relaxed font-mono font-bold">
                    1001 = 7 × 11 × 13
                  </p>
                  <p className="text-xs text-[#66533E] mt-1 leading-relaxed">
                    {isEn
                      ? "Any 3-digit number repeated twice (e.g. 523.523) is exactly equal to 523 × 1001, and is therefore ALWAYS divisible by 7, 11, and 13."
                      : "Setiap bilangan 3 digit yang berulang dua kali (misal: 523.523) selalu bernilai 523 × 1001, sehingga PASTI habis dibagi oleh 7, 11, dan 13."}
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
