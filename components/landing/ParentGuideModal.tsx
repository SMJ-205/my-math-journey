"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles, Clock, Compass, Award, HeartHandshake, X } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

interface ParentGuideModalProps {
  onClose: () => void;
}

export function ParentGuideModal({ onClose }: ParentGuideModalProps) {
  const { language } = useLanguageStore();

  const isEn = language === "en";

  const sections = isEn
    ? [
        {
          icon: <Compass className="text-amber-500" size={24} />,
          title: "Integrated Curriculum: Merdeka & Cambridge Primary",
          desc: "My Math Journey integrates Indonesia's Kurikulum Merdeka learning phases with the globally recognized Cambridge Primary Mathematics curriculum, adopting the CPA (Concrete — Pictorial — Abstract) framework:",
          points: [
            "Phase A (Grades 1–2): Concrete number sense, place values, 2-digit column addition & subtraction (including carry-over and borrowing introduced early).",
            "Phase B (Grades 3–4): Times tables, fair sharing division, visual fractions, number theory (factors, multiples, prime numbers), and 2D area & perimeter.",
            "Phase C (Grades 5–6): Mixed fractions, GCF & LCM, commercial percentages (discounts, profit/loss), proportional ratios, and balance-scale algebra modeling.",
          ],
        },
        {
          icon: <Sparkles className="text-violet-500" size={24} />,
          title: "3-Tier Difficulty Progression",
          desc: "Parents and educators can freely tailor the challenge level before every practice session:",
          points: [
            "Level 1 — Easy (Foundational): Core concepts, guided numbers, clean calculations without heavy carry/borrow.",
            "Level 2 — Medium (Curriculum Standard): Column addition with carry-over, subtraction with regrouping (borrowing), and 3-step word problems (e.g. A + B + C or A − B − C).",
            "Level 3 — Challenge (Enrichment & Olympiad Prep): Multi-digit calculations exceeding 100, 4-component multi-step stories (A + B + C − D), and consecutive square sequences.",
            "Smart Recommendation: When your child scores ≥ 85% accuracy, the report automatically recommends leveling up!",
          ],
        },
        {
          icon: <HeartHandshake className="text-pink-500" size={24} />,
          title: "Tips for Accompanying Your Child",
          points: [
            "Provide Thinking Time: Let children interact with number buttons and visual manipulatives independently before giving answers.",
            "Make Use of 'Smart Hints': If your child hesitates, encourage them to open Smart Hints. It explains conceptual steps and formulas without spoiling the answer numbers.",
            "Praise the Process: Appreciate resilience and logical effort rather than speed. Mistakes are treated as valuable learning checkpoints.",
          ],
        },
        {
          icon: <Clock className="text-blue-500" size={24} />,
          title: "Recommended Daily Routine & Star Rewards",
          desc: "Just 10–15 minutes (1 session = 10 questions) each day consistently. Every completed session earns 1 to 3 stars, permanently accumulating on the child's profile and across Grade Cards (Grades 1–6) to celebrate everyday progress.",
        },
        {
          icon: <Award className="text-emerald-500" size={24} />,
          title: "Session Report & Misconception Insights",
          desc: "Upon finishing each session, the report summarizes performance. The Parent & Educator View reveals specific mistake patterns (such as forgetting to carry tens, miscounting segments, or swapping numerator-denominator) with targeted next-step recommendations.",
        },
      ]
    : [
        {
          icon: <Compass className="text-amber-500" size={24} />,
          title: "Kurikulum Terintegrasi: Kurikulum Merdeka & Cambridge Primary",
          desc: "My Math Journey menggabungkan capaian Kurikulum Merdeka SD dengan standar internasional Cambridge Primary Mathematics melalui pendekatan CPA (Concrete — Pictorial — Abstract):",
          points: [
            "Fase A (Kelas 1–2): Pemahaman bilangan konkret, nilai tempat, penjumlahan & pengurangan 2 digit bersusun (termasuk teknik simpan dan pinjam yang diperkenalkan sejak dini).",
            "Fase B (Kelas 3–4): Perkalian tabel dasar, pembagian, pecahan lingkaran visual, teori bilangan (faktor, kelipatan, bilangan prima), serta luas & keliling bangun datar.",
            "Fase C (Kelas 5–6): Pecahan campuran, FPB & KPK, persen komersial (diskon & untung/rugi), rasio perbandingan, dan pemodelan aljabar timbangan.",
          ],
        },
        {
          icon: <Sparkles className="text-violet-500" size={24} />,
          title: "Tingkat Kesulitan Soal (3-Tier Difficulty Progression)",
          desc: "Orang tua dan guru dapat memilih level tantangan belajar sesuai kesiapan anak sebelum memulai latihan:",
          points: [
            "Level 1 — Mudah (Fondasi): Konsep inti dengan visual terpandu, angka bersih tanpa teknik simpan/pinjam rumit.",
            "Level 2 — Sedang (Standar Kurikulum): Penjumlahan simpan (carry-over), pengurangan pinjam (regrouping), dan soal cerita 3x operasi penambahan/pengurangan (misal A + B + C atau A − B − C).",
            "Level 3 — Tantangan (Pengayaan & Lomba): Hitung bersusun angka ratusan (>100), soal cerita multi-langkah 4 komponen (A + B + C − D), dan barisan bilangan kuadrat berturut-turut.",
            "Rekomendasi Cerdas: Ketika anak mencapai akurasi ≥ 85%, sistem di halaman laporan otomatis menyarankan untuk 'Naik Level'!",
          ],
        },
        {
          icon: <HeartHandshake className="text-pink-500" size={24} />,
          title: "Tips Mendampingi Anak Belajar",
          points: [
            "Berikan Ruang Berpikir: Biarkan anak bereksplorasi dengan simulator dan mini numberpad secara mandiri.",
            "Manfaatkan Trik Pintar: Ajak anak membaca 'Trik Pintar' jika ragu. Fitur ini menguraikan logika konsep dan rumus tanpa membocorkan angka jawaban langsung.",
            "Rayakan Proses: Apresiasi keberanian mencoba dan ketekunan anak, bukan sekadar nilai. Kesalahan adalah kesempatan belajar, bukan kegagalan.",
          ],
        },
        {
          icon: <Clock className="text-blue-500" size={24} />,
          title: "Rutinitas Belajar & Akumulasi Bintang",
          desc: "Cukup 10–15 menit (1 sesi = 10 soal acak tak terbatas) setiap hari secara konsisten. Bintang yang diperoleh (1–3 bintang per sesi) kini tersimpan permanen di profil anak dan terakumulasi di kartu kelas (Kelas 1–6) sebagai apresiasi nyata atas kebiasaan baik anak.",
        },
        {
          icon: <Award className="text-emerald-500" size={24} />,
          title: "Laporan Sesi & Deteksi Miskonsepsi untuk Orang Tua",
          desc: "Setelah sesi selesai, fitur Catatan Orang Tua/Pendidik menyajikan analisis spesifik pola kekeliruan anak (seperti lupa simpanan puluhan, salah hitung segmen, atau tertukar pembilang-penyebut) lengkap dengan saran materi lanjutan.",
        },
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border-2 border-amber-100"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-white flex items-center justify-center shadow-sm">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="font-fredoka text-xl font-bold text-gray-800">
                {isEn ? "Parent & Educator Guide" : "Panduan Orang Tua"}
              </h2>
              <p className="text-xs text-gray-500 font-semibold">
                {isEn ? "Accompanying Children's Math Journey at Home" : "Mendampingi Petualangan Matematika Anak di Rumah"}
              </p>
            </div>
          </div>
          <button
            id="btn-close-parent-guide"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            aria-label={isEn ? "Close guide" : "Tutup panduan"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 text-gray-700">
          <div className="bg-amber-100/60 rounded-2xl p-4 border border-amber-200 flex items-start gap-3">
            <Sparkles size={22} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-amber-900 leading-relaxed">
              {isEn ? (
                <>
                  Welcome to <span className="font-bold">My Math Journey</span>! Crafted to make elementary school mathematics an intuitive, visual, interactive, and stress-free adventure.
                </>
              ) : (
                <>
                  Selamat datang di <span className="font-bold">My Math Journey</span>! Dirancang agar matematika menjadi petualangan visual yang menyenangkan, interaktif, dan bebas stres bagi anak usia Sekolah Dasar (SD).
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {sections.map((sec, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-gray-50/80 border border-gray-100 flex flex-col gap-2"
              >
                <div className="flex items-center gap-2.5">
                  {sec.icon}
                  <h3 className="font-bold text-gray-800 text-base">
                    {sec.title}
                  </h3>
                </div>
                {sec.desc && (
                  <p className="text-sm text-gray-600 leading-relaxed pl-8">
                    {sec.desc}
                  </p>
                )}
                {sec.points && (
                  <ul className="text-sm text-gray-600 pl-8 space-y-1.5 list-disc list-outside">
                    {sec.points.map((pt, pIdx) => (
                      <li key={pIdx} className="leading-relaxed">
                        {pt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <button
            id="btn-finish-guide"
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-amber-400 hover:bg-amber-500 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {isEn ? "Understood & Close" : "Mengerti & Tutup"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
