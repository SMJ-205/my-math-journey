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

export function getMisconceptionLabel(tag: string, lang: "id" | "en" = "id"): string {
  const labelsId: Record<string, string> = {
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
    "pattern-rule-error": "Pola langkah deret belum sesuai",
    "discount-subtraction-omitted": "Lupa mengurangkan diskon dari harga awal",
    "base-value-confusion": "Menghitung persentase dari nilai yang keliru",
    "remainder-subtraction-misunderstood": "Salah menentukan nilai sisa pembagian",
    "lcm-gcd-inverted": "Tertukar antara FPB dan KPK",
    "prime-factorization-incomplete": "Faktorisasi prima belum lengkap",
    "composite-identified-as-prime": "Bilangan komposit teridentifikasi sebagai prima",
    "prime-missed": "Melewatkan bilangan prima",
    "angle-type-inverted": "Tertukar antara jenis sudut lancip dan tumpul",
    "clock-hour-off-by-one": "Selisih satu jam pada pembacaan jarum jam",
    "duration-minutes-borrow-omitted": "Lupa konversi 1 jam = 60 menit saat hitung durasi",
    "metric-prefix-reversed": "Tertukar pengali atau pembagi konversi metrik",
    "unit-boundary-confusion": "Salah batas satuan ukuran",
  };

  const labelsEn: Record<string, string> = {
    "numerator-denominator-swap": "Swapped numerator and denominator",
    "wrong-segment-count": "Incorrect count of segments/parts",
    "counted-remaining-not-eaten": "Counted remaining parts instead of target parts",
    "off-by-one-count": "Off by one from the correct answer",
    "carry-omitted": "Forgot to carry over tens digit during addition",
    "borrow-not-applied": "Forgot to borrow from left column during subtraction",
    "column-order-reversed": "Reversed the subtraction order in column",
    "partial-product-misalignment": "Misaligned partial products in long multiplication",
    "division-remainder-ignored": "Omitted remainder in division",
    "add-instead-of-multiply": "Added instead of multiplying",
    "place-value-confusion": "Confused place value alignment",
    "unit-conversion-error": "Unit conversion error",
    "pattern-rule-error": "Pattern rule step was not matched",
    "discount-subtraction-omitted": "Forgot to subtract discount from original price",
    "base-value-confusion": "Calculated percentage from the incorrect base value",
    "remainder-subtraction-misunderstood": "Miscalculated division remainder",
    "lcm-gcd-inverted": "Confused GCD and LCM",
    "prime-factorization-incomplete": "Prime factorization is incomplete",
    "composite-identified-as-prime": "Composite number mistakenly identified as prime",
    "prime-missed": "Missed identifying a prime number",
    "angle-type-inverted": "Swapped acute and obtuse angle types",
    "clock-hour-off-by-one": "Off by one hour when reading analog clock",
    "duration-minutes-borrow-omitted": "Forgot 1 hour = 60 minutes when calculating duration",
    "metric-prefix-reversed": "Reversed metric conversion multiplier/divisor",
    "unit-boundary-confusion": "Confused measurement unit boundary",
  };

  const map = lang === "en" ? labelsEn : labelsId;
  return map[tag] ?? tag;
}

export function getRecommendationText(
  report: SessionReport,
  lang: "id" | "en" = "id",
  topicLabel?: string
): string {
  const { nextTierRecommendation, topic, tier, misconceptionSummary } = report;

  const displayTopic =
    topicLabel ||
    topic
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Find dominant misconception
  const topTag = Object.entries(misconceptionSummary).sort((a, b) => b[1] - a[1])[0]?.[0];
  const tagLabel = topTag ? getMisconceptionLabel(topTag, lang) : "";

  if (lang === "en") {
    if (nextTierRecommendation === "up") {
      return `Awesome! You have mastered ${displayTopic} level ${tier}. Ready for the next challenge?`;
    }
    if (nextTierRecommendation === "down") {
      let base = `Let's reinforce the fundamentals of ${displayTopic} before leveling up.`;
      if (topTag) {
        base += ` Focus practice on: ${tagLabel}.`;
      }
      return base;
    }
    // stay
    let base = `Great job! Keep practicing with different ${displayTopic} questions to build even stronger skills.`;
    if (topTag) {
      base += ` Pay attention to: ${tagLabel}.`;
    }
    return base;
  }

  // Indonesian (default)
  if (nextTierRecommendation === "up") {
    return `Luar biasa! Kamu sudah menguasai ${displayTopic} level ${tier}. Siap untuk tantangan berikutnya?`;
  }
  if (nextTierRecommendation === "down") {
    let base = `Yuk perkuat dulu dasar-dasar ${displayTopic} sebelum naik level.`;
    if (topTag) {
      base += ` Fokuskan latihan pada: ${tagLabel}.`;
    }
    return base;
  }
  // stay
  let base = `Bagus! Latihan lagi dengan soal-soal ${displayTopic} yang berbeda untuk semakin kuat.`;
  if (topTag) {
    base += ` Perhatikan: ${tagLabel}.`;
  }
  return base;
}
