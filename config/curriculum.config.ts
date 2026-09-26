export interface GradeConfig {
  grade: number;
  label: string;
  phase: "A" | "B" | "C";
  mascot: string;
  mascotEmoji: string;
  color: string;
  bgColor: string;
  topics: string[];
}

export const gradeConfigs: GradeConfig[] = [
  {
    grade: 1,
    label: "Kelas 1",
    phase: "A",
    mascot: "Anak Ayam",
    mascotEmoji: "ayam",
    color: "#FBBF24",
    bgColor: "#FEF9C3",
    topics: ["penjumlahan-dasar", "pengurangan-dasar", "penjumlahan-dua-digit", "pola-bilangan", "soal-cerita"],
  },
  {
    grade: 2,
    label: "Kelas 2",
    phase: "A",
    mascot: "Kucing Kecil",
    mascotEmoji: "kucing",
    color: "#FB7185",
    bgColor: "#FFE4E6",
    topics: ["penjumlahan-dua-digit", "pengurangan-dua-digit", "perkalian-awal", "pola-bilangan", "soal-cerita"],
  },
  {
    grade: 3,
    label: "Kelas 3",
    phase: "B",
    mascot: "Kelinci",
    mascotEmoji: "kelinci",
    color: "#34D399",
    bgColor: "#D1FAE5",
    topics: ["perkalian", "pembagian", "pecahan-dasar", "pecahan-operasi", "pola-bilangan", "soal-cerita"],
  },
  {
    grade: 4,
    label: "Kelas 4",
    phase: "B",
    mascot: "Rubah",
    mascotEmoji: "rubah",
    color: "#38BDF8",
    bgColor: "#E0F2FE",
    topics: ["pecahan-senilai", "teori-bilangan", "luas-bangun-datar", "pola-bilangan", "soal-cerita", "desimal-dasar"],
  },
  {
    grade: 5,
    label: "Kelas 5",
    phase: "C",
    mascot: "Beruang",
    mascotEmoji: "beruang",
    color: "#A78BFA",
    bgColor: "#EDE9FE",
    topics: ["pecahan-campuran", "persen", "fpb-kpk", "pola-bilangan", "soal-cerita"],
  },
  {
    grade: 6,
    label: "Kelas 6",
    phase: "C",
    mascot: "Elang",
    mascotEmoji: "elang",
    color: "#F97316",
    bgColor: "#FEF3C7",
    topics: ["aljabar-dasar", "pola-bilangan", "soal-cerita", "perbandingan", "persen-komersial"],
  },
];


export const phaseLabels: Record<string, string> = {
  A: "Fase A — Kelas 1 dan 2",
  B: "Fase B — Kelas 3 dan 4",
  C: "Fase C — Kelas 5 dan 6",
};

export const sessionConfig: Record<string, { minQuestions: number; maxQuestions: number; showTimer: boolean; showNumericScore: boolean }> = {
  A: { minQuestions: 10, maxQuestions: 10, showTimer: false, showNumericScore: false },
  B: { minQuestions: 10, maxQuestions: 10, showTimer: true, showNumericScore: false },
  C: { minQuestions: 10, maxQuestions: 10, showTimer: true, showNumericScore: true },
};
