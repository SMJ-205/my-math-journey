import { Answer } from "@/store/sessionStore";

export interface SessionReport {
  sessionId: string;
  profileId: string;
  grade: number;
  topic: string;
  tier: number;
  startedAt: string;
  completedAt: string;
  totalQuestions: number;
  correctCount: number;
  accuracy: number;
  starsEarned: number;
  avgTimeMs: number;
  hintsUsed: number;
  misconceptionSummary: Record<string, number>; // tag -> count
  nextTierRecommendation: "up" | "stay" | "down";
}

export function buildReport(params: {
  sessionId: string;
  profileId: string;
  grade: number;
  topic: string;
  tier: number;
  startedAt: string;
  answers: Answer[];
}): SessionReport {
  const { answers } = params;
  const completedAt = new Date().toISOString();
  const correctCount = answers.filter((a) => a.correct).length;
  const accuracy = answers.length > 0 ? correctCount / answers.length : 0;
  const hintsUsed = answers.filter((a) => a.hintUsed).length;
  const avgTimeMs = answers.length > 0
    ? answers.reduce((sum, a) => sum + a.timeMs, 0) / answers.length
    : 0;

  // Tally misconception tags from wrong answers
  const misconceptionSummary: Record<string, number> = {};
  for (const a of answers) {
    if (!a.correct && a.misconceptionTag) {
      misconceptionSummary[a.misconceptionTag] =
        (misconceptionSummary[a.misconceptionTag] ?? 0) + 1;
    }
  }

  // Tier progression rule
  let nextTierRecommendation: "up" | "stay" | "down";
  if (accuracy >= 0.85) {
    nextTierRecommendation = "up";
  } else if (accuracy >= 0.5) {
    nextTierRecommendation = "stay";
  } else {
    nextTierRecommendation = "down";
  }

  // Stars: 3 = >=85%, 2 = >=60%, 1 = any attempt
  const starsEarned = accuracy >= 0.85 ? 3 : accuracy >= 0.6 ? 2 : 1;

  return {
    ...params,
    completedAt,
    totalQuestions: answers.length,
    correctCount,
    accuracy,
    starsEarned,
    avgTimeMs,
    hintsUsed,
    misconceptionSummary,
    nextTierRecommendation,
  };
}

export function getMisconceptionLabel(tag: string): string {
  const labels: Record<string, string> = {
    "numerator-denominator-swap": "Menukar pembilang dan penyebut",
    "wrong-segment-count": "Salah menghitung jumlah bagian",
    "counted-remaining-not-eaten": "Menghitung bagian tersisa, bukan bagian yang dimaksud",
    "off-by-one-count": "Selisih satu dari jawaban benar",
    "carry-omitted": "Lupa menyimpan angka puluhan saat penjumlahan",
    "borrow-not-applied": "Lupa meminjam dari kolom sebelah kiri saat pengurangan",
    "column-order-reversed": "Mengurangi angka bawah dari angka atas (terbalik)",
    "partial-product-misalignment": "Salah menggeser posisi hasil perkalian bersusun",
    "division-remainder-ignored": "Tidak menuliskan sisa pembagian",
    "add-instead-of-multiply": "Menjumlahkan alih-alih mengalikan",
    "place-value-confusion": "Salah menempatkan nilai tempat",
    "unit-conversion-error": "Salah mengkonversi satuan",
  };
  return labels[tag] ?? tag;
}

export function getRecommendationText(report: SessionReport): string {
  const { nextTierRecommendation, topic, tier, misconceptionSummary } = report;

  // Find dominant misconception
  const topTag = Object.entries(misconceptionSummary).sort((a, b) => b[1] - a[1])[0]?.[0];

  if (nextTierRecommendation === "up") {
    return `Luar biasa! Kamu sudah menguasai ${topic} level ${tier}. Siap untuk tantangan berikutnya?`;
  }
  if (nextTierRecommendation === "down") {
    let base = `Yuk perkuat dulu dasar-dasar ${topic} sebelum naik level.`;
    if (topTag) {
      base += ` Fokuskan latihan pada: ${getMisconceptionLabel(topTag)}.`;
    }
    return base;
  }
  // stay
  let base = `Bagus! Latihan lagi dengan soal-soal ${topic} yang berbeda untuk semakin kuat.`;
  if (topTag) {
    base += ` Perhatikan: ${getMisconceptionLabel(topTag)}.`;
  }
  return base;
}
