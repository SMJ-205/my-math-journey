export const featureFlags = {
  bilingual: false,          // Toggle Bahasa Indonesia / English
  tts: true,                 // Web Speech API narasi soal untuk Kelas 1-2
  multiProfile: true,        // Beberapa profil anak dalam satu perangkat
  parentReport: true,        // Laporan detail untuk orang tua / guru
  misconceptionTagging: true, // Analisis tag miskonsepsi pada laporan
  adaptiveProgression: true, // Naik / turun tier otomatis berdasarkan sesi
} as const;

export type FeatureFlags = typeof featureFlags;
