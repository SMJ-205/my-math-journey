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
          title: "Learning Approach & Concrete Visuals",
          desc: "My Math Journey is built around the CPA (Concrete-Pictorial-Abstract) framework. By using interactive visual manipulatives (fruit baskets, pizza slices, balance scales, animated number patterns), children grasp core mathematical ideas intuitively before memorizing abstract formulas.",
        },
        {
          icon: <HeartHandshake className="text-pink-500" size={24} />,
          title: "Tips for Accompanying Your Child",
          points: [
            "Provide Thinking Time: Let children interact with the buttons and explore the numbers independently.",
            "Make Use of 'Smart Hints': If your child hesitates, invite them to read the Smart Hint for problem-solving strategies without spoiling the answer.",
            "Praise the Effort: Celebrate persistence and courage when tackling new challenge formats like number series and word problems.",
          ],
        },
        {
          icon: <Clock className="text-blue-500" size={24} />,
          title: "Recommended Daily Routine",
          desc: "Just 10–15 minutes (1 session = 10 questions) each day consistently. A short, joyful daily session builds confidence and long-term retention far better than lengthy, overwhelming study blocks.",
        },
        {
          icon: <Award className="text-emerald-500" size={24} />,
          title: "Progress Report & Misconception Insights",
          desc: "Upon finishing each 10-question session, the system summarizes the child's understanding. Parents can view specific misconception types (such as carryover slips in column addition or pattern step calculation) with personalized next-step recommendations.",
        },
      ]
    : [
        {
          icon: <Compass className="text-amber-500" size={24} />,
          title: "Pendekatan Belajar & Kurikulum Merdeka",
          desc: "My Math Journey disusun selaras dengan Capaian Pembelajaran Kurikulum Merdeka SD (Fase A: Kelas 1-2, Fase B: Kelas 3-4, Fase C: Kelas 5-6). Kami menggunakan pendekatan CPA (Concrete-Pictorial-Abstract) melalui simulator visual manipulatif sehingga anak memahami konsep dasarnya terlebih dahulu, bukan sekadar menghafal rumus.",
        },
        {
          icon: <HeartHandshake className="text-pink-500" size={24} />,
          title: "Tips Mendampingi Anak Belajar",
          points: [
            "Berikan Ruang Berpikir: Biarkan anak mencoba menekan kotak bilangan dan bereksplorasi secara mandiri.",
            "Manfaatkan Trik Pintar: Jika anak ragu, ajak membuka fitur 'Trik Pintar' yang memberikan strategi pemecahan masalah tanpa membocorkan jawaban langsung.",
            "Fokus Pada Usaha: Apresiasi ketekunan dan keberanian anak mencoba soal-soal baru seperti pola bilangan dan soal cerita.",
          ],
        },
        {
          icon: <Clock className="text-blue-500" size={24} />,
          title: "Durasi & Rutinitas yang Dianjurkan",
          desc: "Cukup 10–15 menit (1 sesi = 10 soal) setiap hari secara konsisten. Latihan harian yang singkat namun menyenangkan jauh lebih efektif membangun kepercayaan diri dan memori jangka panjang anak dibandingkan belajar lama yang membebani.",
        },
        {
          icon: <Award className="text-emerald-500" size={24} />,
          title: "Laporan Kemajuan & Deteksi Miskonsepsi",
          desc: "Setelah menyelesaikan 10 soal, sistem secara otomatis menganalisis pemahaman anak. Orang tua dapat melihat tipe kesalahan spesifik (seperti lupa simpanan pada penjumlahan bersusun atau salah menentukan selisih deret) beserta rekomendasi materi selanjutnya.",
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
