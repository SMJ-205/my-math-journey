import { generateSessionQuestions } from "./questionGenerator";

export interface QuestionOption {
  value: string;
  isCorrect: boolean;
  misconceptionTag?: string;
}

export interface Question {
  id: string;
  grade: number;
  difficultyTier: number;
  topic: string;
  question: { id: string; en?: string };
  simulator: {
    type: string;
    [key: string]: unknown;
  };
  options: QuestionOption[];
  smartHint: { id: string; en?: string };
}

export const questionBank: Question[] = [

  // ══════════════════════════════════════════════════════
  // KELAS 1 — Penjumlahan Dasar
  // ══════════════════════════════════════════════════════
  {
    id: "g1-add-01", grade: 1, difficultyTier: 1, topic: "penjumlahan-dasar",
    question: {
      id: "Ada 3 apel, lalu ditambah 2 apel lagi. Berapa total apel sekarang?",
      en: "There are 3 apples, then 2 more apples are added. What is the total count of apples now?",
    },
    simulator: { type: "fruit-basket", fruits: ["apel"], initialCount: 3, addCount: 2 },
    options: [
      { value: "5", isCorrect: true },
      { value: "4", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "6", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Mulai menghitung dari jumlah apel di keranjang pertama, lalu lanjutkan menghitung buah yang ditambahkan.",
      en: "Start counting from the first basket of apples, then continue counting the added apples.",
    },
  },
  {
    id: "g1-add-02", grade: 1, difficultyTier: 1, topic: "penjumlahan-dasar",
    question: {
      id: "Ada 4 jeruk dan 3 jeruk. Berapa jumlahnya?",
      en: "There are 4 oranges and 3 oranges. What is the total?",
    },
    simulator: { type: "fruit-basket", fruits: ["jeruk"], initialCount: 4, addCount: 3 },
    options: [
      { value: "7", isCorrect: true },
      { value: "6", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "8", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Mulai dari angka 4, lalu hitung maju sebanyak 3 langkah ke depan.",
      en: "Start from 4, then count forward 3 steps.",
    },
  },
  {
    id: "g1-add-03", grade: 1, difficultyTier: 1, topic: "penjumlahan-dasar",
    question: {
      id: "Berapa hasil 5 + 4?",
      en: "What is 5 + 4?",
    },
    simulator: { type: "fruit-basket", fruits: ["bintang"], initialCount: 5, addCount: 4 },
    options: [
      { value: "9", isCorrect: true },
      { value: "8", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "10", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Pilih angka yang lebih besar yaitu 5, lalu hitung maju sebanyak 4 jari.",
      en: "Pick the larger number (5), then count forward 4 steps on your fingers.",
    },
  },
  {
    id: "g1-add-04", grade: 1, difficultyTier: 1, topic: "penjumlahan-dasar",
    question: {
      id: "Budi punya 2 kelereng, lalu diberi 6 kelereng lagi. Berapa total kelerengnya?",
      en: "Budi has 2 marbles, then receives 6 more marbles. What is the total count of marbles?",
    },
    simulator: { type: "fruit-basket", fruits: ["kelereng"], initialCount: 2, addCount: 6 },
    options: [
      { value: "8", isCorrect: true },
      { value: "7", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "9", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Lebih mudah jika mulai dari angka yang lebih besar (6), lalu hitung maju 2 langkah.",
      en: "It is easier to start from the larger number (6) and count forward 2 steps.",
    },
  },
  {
    id: "g1-add-05", grade: 1, difficultyTier: 2, topic: "penjumlahan-dasar",
    question: {
      id: "Berapa hasil 7 + 6?",
      en: "What is 7 + 6?",
    },
    simulator: { type: "fruit-basket", fruits: ["apel"], initialCount: 7, addCount: 6 },
    options: [
      { value: "13", isCorrect: true },
      { value: "12", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "14", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Buat kelompok 10 terlebih dahulu: 7 butuh berapa agar jadi 10? Ambil sisanya dari 6.",
      en: "Make 10 first: 7 needs 3 to become 10. Take the remaining from 6.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 1 — Pengurangan Dasar
  // ══════════════════════════════════════════════════════
  {
    id: "g1-sub-01", grade: 1, difficultyTier: 1, topic: "pengurangan-dasar",
    question: {
      id: "Ada 6 apel, dimakan 2. Berapa sisa apel?",
      en: "There are 6 apples, 2 are eaten. How many apples remain?",
    },
    simulator: { type: "fruit-basket", fruits: ["apel"], initialCount: 6, removeCount: 2 },
    options: [
      { value: "4", isCorrect: true },
      { value: "3", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "5", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Bayangkan mengambil 2 apel dari keranjang, lalu hitung berapa apel yang masih tertinggal.",
      en: "Picture taking 2 apples from the basket, then count how many remain.",
    },
  },
  {
    id: "g1-sub-02", grade: 1, difficultyTier: 1, topic: "pengurangan-dasar",
    question: {
      id: "Budi punya 8 kelereng, hilang 3. Berapa sisa kelerengnya?",
      en: "Budi has 8 marbles, 3 are lost. How many marbles are left?",
    },
    simulator: { type: "fruit-basket", fruits: ["kelereng"], initialCount: 8, removeCount: 3 },
    options: [
      { value: "5", isCorrect: true },
      { value: "4", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "6", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Mulai dari 8, lalu hitung mundur ke belakang sebanyak 3 langkah.",
      en: "Start from 8, then count backwards 3 steps.",
    },
  },
  {
    id: "g1-sub-03", grade: 1, difficultyTier: 1, topic: "pengurangan-dasar",
    question: {
      id: "Ada 9 jeruk, diberikan 4. Berapa sisa jeruknya?",
      en: "There are 9 oranges, 4 are given away. How many oranges remain?",
    },
    simulator: { type: "fruit-basket", fruits: ["jeruk"], initialCount: 9, removeCount: 4 },
    options: [
      { value: "5", isCorrect: true },
      { value: "4", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "6", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Gunakan jari atau hitung mundur sebanyak 4 langkah mulai dari angka 9.",
      en: "Count backwards 4 steps starting from 9.",
    },
  },
  {
    id: "g1-sub-04", grade: 1, difficultyTier: 2, topic: "pengurangan-dasar",
    question: {
      id: "Berapa hasil 10 dikurangi 7?",
      en: "What is 10 minus 7?",
    },
    simulator: { type: "fruit-basket", fruits: ["bintang"], initialCount: 10, removeCount: 7 },
    options: [
      { value: "3", isCorrect: true },
      { value: "2", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "4", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Pikirkan pasangan angka 10: angka 7 butuh ditambah berapa lagi agar tepat menjadi 10?",
      en: "Think of number bonds of 10: what number plus 7 makes 10?",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 2 — Penjumlahan Dua Digit (column-arithmetic)
  // ══════════════════════════════════════════════════════
  {
    id: "g2-add-01", grade: 2, difficultyTier: 1, topic: "penjumlahan-dua-digit",
    question: {
      id: "Berapa hasil 23 + 14?",
      en: "What is 23 + 14?",
    },
    simulator: { type: "column-arithmetic", operation: "add", operands: [23, 14], digitCount: 2 },
    options: [
      { value: "37", isCorrect: true },
      { value: "36", isCorrect: false, misconceptionTag: "carry-omitted" },
      { value: "38", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Kerjakan dari kanan ke kiri: jumlahkan kolom satuan terlebih dahulu, lalu lanjutkan dengan kolom puluhan.",
      en: "Work from right to left: add the ones column first, then the tens column.",
    },
  },
  {
    id: "g2-add-02", grade: 2, difficultyTier: 1, topic: "penjumlahan-dua-digit",
    question: {
      id: "Berapa hasil 35 + 28?",
      en: "What is 35 + 28?",
    },
    simulator: { type: "column-arithmetic", operation: "add", operands: [35, 28], digitCount: 2 },
    options: [
      { value: "63", isCorrect: true },
      { value: "53", isCorrect: false, misconceptionTag: "carry-omitted" },
      { value: "64", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Jumlahkan satuan terlebih dahulu. Jika hasilnya 10 atau lebih, tulis angka satuannya dan simpan angka puluhannya ke kolom puluhan.",
      en: "Add the ones column first. If it's 10 or more, write down the ones digit and carry over 1 to the tens column.",
    },
  },
  {
    id: "g2-add-03", grade: 2, difficultyTier: 1, topic: "penjumlahan-dua-digit",
    question: {
      id: "Berapa hasil 41 + 36?",
      en: "What is 41 + 36?",
    },
    simulator: { type: "column-arithmetic", operation: "add", operands: [41, 36], digitCount: 2 },
    options: [
      { value: "77", isCorrect: true },
      { value: "76", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "78", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Jumlahkan angka di kolom satuan di sebelah kanan terlebih dahulu, setelah itu jumlahkan angka di kolom puluhan.",
      en: "Add the ones column on the right first, then sum the tens column.",
    },
  },
  {
    id: "g2-add-04", grade: 2, difficultyTier: 2, topic: "penjumlahan-dua-digit",
    question: {
      id: "Berapa hasil 56 + 37?",
      en: "What is 56 + 37?",
    },
    simulator: { type: "column-arithmetic", operation: "add", operands: [56, 37], digitCount: 2 },
    options: [
      { value: "93", isCorrect: true },
      { value: "83", isCorrect: false, misconceptionTag: "carry-omitted" },
      { value: "94", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Hitung kolom satuan di sebelah kanan: jika hasilnya lebih dari 9, simpan angka 1 ke atas kolom puluhan.",
      en: "Calculate the ones column on the right: if the sum exceeds 9, carry over 1 to the tens column.",
    },
  },
  {
    id: "g2-add-05", grade: 2, difficultyTier: 2, topic: "penjumlahan-dua-digit",
    question: {
      id: "Berapa hasil 74 + 19?",
      en: "What is 74 + 19?",
    },
    simulator: { type: "column-arithmetic", operation: "add", operands: [74, 19], digitCount: 2 },
    options: [
      { value: "93", isCorrect: true },
      { value: "83", isCorrect: false, misconceptionTag: "carry-omitted" },
      { value: "92", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Jumlahkan kolom satuan terlebih dahulu, dan jangan lupa tambahkan angka simpanan ke kolom puluhan.",
      en: "Add the ones column first, and don't forget to include the carried over digit in the tens column.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 2 — Pengurangan Dua Digit (column-arithmetic)
  // ══════════════════════════════════════════════════════
  {
    id: "g2-sub-01", grade: 2, difficultyTier: 1, topic: "pengurangan-dua-digit",
    question: {
      id: "Berapa hasil 57 dikurangi 23?",
      en: "What is 57 minus 23?",
    },
    simulator: { type: "column-arithmetic", operation: "subtract", operands: [57, 23], digitCount: 2 },
    options: [
      { value: "34", isCorrect: true },
      { value: "33", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "35", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Kurangkan angka di kolom satuan di sebelah kanan terlebih dahulu, lalu kurangkan angka di kolom puluhan.",
      en: "Subtract the ones column on the right first, then subtract the tens column.",
    },
  },
  {
    id: "g2-sub-02", grade: 2, difficultyTier: 1, topic: "pengurangan-dua-digit",
    question: {
      id: "Berapa hasil 84 dikurangi 31?",
      en: "What is 84 minus 31?",
    },
    simulator: { type: "column-arithmetic", operation: "subtract", operands: [84, 31], digitCount: 2 },
    options: [
      { value: "53", isCorrect: true },
      { value: "52", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "54", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Mulai dari kolom satuan di sebelah kanan, kemudian lanjutkan pengurangan untuk kolom puluhan di sebelah kiri.",
      en: "Start with the ones column on the right, then perform the subtraction on the tens column.",
    },
  },
  {
    id: "g2-sub-03", grade: 2, difficultyTier: 2, topic: "pengurangan-dua-digit",
    question: {
      id: "Berapa hasil 72 dikurangi 38?",
      en: "What is 72 minus 38?",
    },
    simulator: { type: "column-arithmetic", operation: "subtract", operands: [72, 38], digitCount: 2 },
    options: [
      { value: "34", isCorrect: true },
      { value: "44", isCorrect: false, misconceptionTag: "borrow-not-applied" },
      { value: "33", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Karena angka satuan di atas lebih kecil dari di bawah, pinjam 1 puluhan dari sebelah kiri sehingga satuan bertambah 10.",
      en: "Because the top ones digit is smaller than the bottom, borrow 1 ten from the left to add 10 to the ones column.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 3 — Pecahan Dasar
  // ══════════════════════════════════════════════════════
  {
    id: "g3-frac-01", grade: 3, difficultyTier: 1, topic: "pecahan-dasar",
    question: {
      id: "Siti membagi pizza menjadi 4 bagian sama besar dan memakan 1 potong. Berapa bagian yang dimakan?",
      en: "Siti slices a pizza into 4 equal slices and eats 1 slice. What fraction of the pizza was eaten?",
    },
    simulator: { type: "circle-fraction", totalSegments: 4, filledSegments: 1, interactive: true },
    options: [
      { value: "1/4", isCorrect: true },
      { value: "4/1", isCorrect: false, misconceptionTag: "numerator-denominator-swap" },
      { value: "1/2", isCorrect: false, misconceptionTag: "wrong-segment-count" },
      { value: "3/4", isCorrect: false, misconceptionTag: "counted-remaining-not-eaten" },
    ],
    smartHint: {
      id: "Angka atas = bagian yang dimakan. Angka bawah = total bagian.",
      en: "Top number = slices eaten. Bottom number = total slices.",
    },
  },
  {
    id: "g3-frac-02", grade: 3, difficultyTier: 1, topic: "pecahan-dasar",
    question: {
      id: "Cokelat dibagi 6 bagian sama besar. Andi memakan 2 bagian. Berapa pecahannya?",
      en: "A chocolate bar is divided into 6 equal parts. Andi eats 2 parts. What is the fraction eaten?",
    },
    simulator: { type: "circle-fraction", totalSegments: 6, filledSegments: 2, interactive: true },
    options: [
      { value: "2/6", isCorrect: true },
      { value: "6/2", isCorrect: false, misconceptionTag: "numerator-denominator-swap" },
      { value: "1/3", isCorrect: false, misconceptionTag: "wrong-segment-count" },
      { value: "4/6", isCorrect: false, misconceptionTag: "counted-remaining-not-eaten" },
    ],
    smartHint: {
      id: "Tuliskan jumlah bagian yang dimakan sebagai angka di atas (pembilang), dan jumlah seluruh bagian sebagai angka di bawah (penyebut).",
      en: "Write the eaten parts on top (numerator), and total slices on bottom (denominator).",
    },
  },
  {
    id: "g3-frac-03", grade: 3, difficultyTier: 1, topic: "pecahan-dasar",
    question: {
      id: "Sebuah kue dibagi 8 bagian. Rini memakan 3 bagian. Berapa bagian yang dimakan Rini?",
      en: "A cake is sliced into 8 parts. Rini eats 3 parts. What fraction did Rini eat?",
    },
    simulator: { type: "circle-fraction", totalSegments: 8, filledSegments: 3, interactive: true },
    options: [
      { value: "3/8", isCorrect: true },
      { value: "8/3", isCorrect: false, misconceptionTag: "numerator-denominator-swap" },
      { value: "5/8", isCorrect: false, misconceptionTag: "counted-remaining-not-eaten" },
      { value: "3/5", isCorrect: false, misconceptionTag: "wrong-segment-count" },
    ],
    smartHint: {
      id: "Perhatikan berapa potong yang dimakan untuk angka bagian atas, dan berapa total semua potongan untuk angka bagian bawah.",
      en: "Check how many slices were eaten for the top number, and total slices for the bottom number.",
    },
  },
  {
    id: "g3-frac-04", grade: 3, difficultyTier: 2, topic: "pecahan-dasar",
    question: {
      id: "Ibu memotong semangka menjadi 5 bagian. Budi mengambil 2 bagian. Berapa sisa semangkanya?",
      en: "Mother slices a watermelon into 5 equal parts. Budi takes 2 parts. What fraction remains?",
    },
    simulator: { type: "circle-fraction", totalSegments: 5, filledSegments: 3, interactive: true },
    options: [
      { value: "3/5", isCorrect: true },
      { value: "2/5", isCorrect: false, misconceptionTag: "counted-remaining-not-eaten" },
      { value: "5/3", isCorrect: false, misconceptionTag: "numerator-denominator-swap" },
      { value: "2/3", isCorrect: false, misconceptionTag: "wrong-segment-count" },
    ],
    smartHint: {
      id: "Pertanyaan menanyakan sisa semangka: hitung berapa potong yang belum diambil dibandingkan total potongan seluruhnya.",
      en: "The question asks for the remaining portion: count slices left compared to total slices.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 3 — Perkalian (column-arithmetic)
  // ══════════════════════════════════════════════════════
  {
    id: "g3-mult-01", grade: 3, difficultyTier: 1, topic: "perkalian",
    question: {
      id: "Berapa hasil 4 dikali 6?",
      en: "What is 4 times 6?",
    },
    simulator: { type: "column-arithmetic", operation: "multiply", operands: [4, 6], digitCount: 2 },
    options: [
      { value: "24", isCorrect: true },
      { value: "22", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "26", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Perkalian adalah penjumlahan berulang: bayangkan ada 4 kelompok yang masing-masing berisi 6 benda.",
      en: "Multiplication is repeated addition: imagine 4 groups with 6 items each.",
    },
  },
  {
    id: "g3-mult-02", grade: 3, difficultyTier: 1, topic: "perkalian",
    question: {
      id: "Berapa hasil 7 dikali 3?",
      en: "What is 7 times 3?",
    },
    simulator: { type: "column-arithmetic", operation: "multiply", operands: [7, 3], digitCount: 2 },
    options: [
      { value: "21", isCorrect: true },
      { value: "20", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "22", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Jumlahkan angka 7 sebanyak 3 kali, atau jumlahkan angka 3 sebanyak 7 kali.",
      en: "Add the number 7 three times, or add 3 seven times.",
    },
  },
  {
    id: "g3-mult-03", grade: 3, difficultyTier: 1, topic: "perkalian",
    question: {
      id: "Berapa hasil 8 dikali 5?",
      en: "What is 8 times 5?",
    },
    simulator: { type: "column-arithmetic", operation: "multiply", operands: [8, 5], digitCount: 2 },
    options: [
      { value: "40", isCorrect: true },
      { value: "38", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "42", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Trik perkalian 5: bilangan genap jika dikalikan 5 hasilnya selalu berakhiran angka 0.",
      en: "Trick for times 5: even numbers multiplied by 5 always end in 0.",
    },
  },
  {
    id: "g3-mult-04", grade: 3, difficultyTier: 2, topic: "perkalian",
    question: {
      id: "Berapa hasil 9 dikali 7?",
      en: "What is 9 times 7?",
    },
    simulator: { type: "column-arithmetic", operation: "multiply", operands: [9, 7], digitCount: 2 },
    options: [
      { value: "63", isCorrect: true },
      { value: "62", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "64", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Trik perkalian 9: kalikan angka tersebut dengan 10 terlebih dahulu, kemudian kurangi dengan angka itu sendiri.",
      en: "Times 9 trick: multiply by 10 first (70), then subtract the number itself (70 - 7 = 63).",
    },
  },
  {
    id: "g3-mult-05", grade: 3, difficultyTier: 2, topic: "perkalian",
    question: {
      id: "Berapa hasil 6 dikali 8?",
      en: "What is 6 times 8?",
    },
    simulator: { type: "column-arithmetic", operation: "multiply", operands: [6, 8], digitCount: 2 },
    options: [
      { value: "48", isCorrect: true },
      { value: "46", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "50", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Pecah perkaliannya: kalikan 6 dengan 4 terlebih dahulu, lalu gandakan hasilnya.",
      en: "Break it down: multiply 6 by 4 (24), then double it (48).",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 3 — Pembagian (column-arithmetic)
  // ══════════════════════════════════════════════════════
  {
    id: "g3-div-01", grade: 3, difficultyTier: 1, topic: "pembagian",
    question: {
      id: "Berapa hasil 24 dibagi 4?",
      en: "What is 24 divided by 4?",
    },
    simulator: { type: "column-arithmetic", operation: "divide", operands: [24, 4], digitCount: 1 },
    options: [
      { value: "6", isCorrect: true },
      { value: "5", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "7", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Pembagian adalah kebalikan dari perkalian: cari angka berapa yang jika dikalikan 4 menghasilkan 24.",
      en: "Division is the opposite of multiplication: what number times 4 equals 24?",
    },
  },
  {
    id: "g3-div-02", grade: 3, difficultyTier: 1, topic: "pembagian",
    question: {
      id: "Berapa hasil 36 dibagi 9?",
      en: "What is 36 divided by 9?",
    },
    simulator: { type: "column-arithmetic", operation: "divide", operands: [36, 9], digitCount: 1 },
    options: [
      { value: "4", isCorrect: true },
      { value: "3", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "5", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Pikirkan tabel perkalian 9: angka berapa yang jika dikalikan 9 tepat menghasilkan 36?",
      en: "Think of times 9 table: what number times 9 equals exactly 36?",
    },
  },
  {
    id: "g3-div-03", grade: 3, difficultyTier: 2, topic: "pembagian",
    question: {
      id: "Berapa hasil 56 dibagi 8?",
      en: "What is 56 divided by 8?",
    },
    simulator: { type: "column-arithmetic", operation: "divide", operands: [56, 8], digitCount: 1 },
    options: [
      { value: "7", isCorrect: true },
      { value: "6", isCorrect: false, misconceptionTag: "off-by-one-count" },
      { value: "8", isCorrect: false, misconceptionTag: "off-by-one-count" },
    ],
    smartHint: {
      id: "Gunakan hubungan pembagian dengan perkalian: 8 dikali berapa yang hasilnya sama dengan 56?",
      en: "Use the link between division and multiplication: 8 times what number equals 56?",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 4 — Pecahan Senilai
  // ══════════════════════════════════════════════════════
  {
    id: "g4-frac-01", grade: 4, difficultyTier: 1, topic: "pecahan-senilai",
    question: {
      id: "Pecahan manakah yang senilai dengan 1/2?",
      en: "Which fraction is equivalent to 1/2?",
    },
    simulator: { type: "circle-fraction", totalSegments: 4, filledSegments: 2, interactive: false },
    options: [
      { value: "2/4", isCorrect: true },
      { value: "1/4", isCorrect: false, misconceptionTag: "wrong-segment-count" },
      { value: "3/4", isCorrect: false, misconceptionTag: "wrong-segment-count" },
      { value: "2/3", isCorrect: false, misconceptionTag: "numerator-denominator-swap" },
    ],
    smartHint: {
      id: "Pecahan senilai memiliki luas bagian yang sama. Kalikan angka atas dan angka bawah dengan bilangan yang sama.",
      en: "Equivalent fractions represent the same portion. Multiply numerator and denominator by the same number.",
    },
  },
  {
    id: "g4-frac-02", grade: 4, difficultyTier: 1, topic: "pecahan-senilai",
    question: {
      id: "Pecahan mana yang senilai dengan 2/3?",
      en: "Which fraction is equivalent to 2/3?",
    },
    simulator: { type: "circle-fraction", totalSegments: 6, filledSegments: 4, interactive: false, showFractionLabel: false },
    options: [
      { value: "4/6", isCorrect: true },
      { value: "2/6", isCorrect: false, misconceptionTag: "wrong-segment-count" },
      { value: "3/6", isCorrect: false, misconceptionTag: "wrong-segment-count" },
      { value: "6/4", isCorrect: false, misconceptionTag: "numerator-denominator-swap" },
    ],
    smartHint: {
      id: "Untuk mencari pecahan yang senilai, coba kalikan pembilang dan penyebut dengan angka yang sama (misalnya dikali 2).",
      en: "To find an equivalent fraction, multiply both numerator and denominator by the same factor (e.g. by 2).",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 4 — Desimal Dasar
  // ══════════════════════════════════════════════════════
  {
    id: "g4-dec-01", grade: 4, difficultyTier: 1, topic: "desimal-dasar",
    question: {
      id: "Berapakah bentuk desimal dari pecahan 4/10?",
      en: "What is the decimal equivalent of the fraction 4/10?",
    },
    simulator: { type: "circle-fraction", totalSegments: 10, filledSegments: 4, interactive: false, showFractionLabel: false },
    options: [
      { value: "0,4", isCorrect: true },
      { value: "0,04", isCorrect: false },
      { value: "4,0", isCorrect: false },
      { value: "0,6", isCorrect: false },
    ],
    smartHint: {
      id: "Pecahan persepuluhan memiliki satu angka di belakang tanda koma.",
      en: "Tenth fractions have one digit after the decimal point.",
    },
  },
  {
    id: "g4-dec-02", grade: 4, difficultyTier: 1, topic: "desimal-dasar",
    question: {
      id: "Berapakah hasil penjumlahan 0,3 + 0,5?",
      en: "What is 0.3 + 0.5?",
    },
    simulator: { type: "circle-fraction", totalSegments: 10, filledSegments: 8, interactive: false, showFractionLabel: false },
    options: [
      { value: "0,8", isCorrect: true },
      { value: "0,08", isCorrect: false },
      { value: "8,0", isCorrect: false },
      { value: "0,2", isCorrect: false },
    ],
    smartHint: {
      id: "Jumlahkan angka persepuluhan: 3 ditambah 5 sama dengan 8, sehingga menjadi 0,8.",
      en: "Add the tenths digits: 3 plus 5 equals 8, giving 0.8.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 5 — Pecahan Campuran
  // ══════════════════════════════════════════════════════
  {
    id: "g5-mix-01", grade: 5, difficultyTier: 1, topic: "pecahan-campuran",
    question: {
      id: "Ubahlah pecahan biasa 5/2 menjadi pecahan campuran:",
      en: "Convert the improper fraction 5/2 into a mixed fraction:",
    },
    simulator: { type: "circle-fraction", totalSegments: 2, filledSegments: 1, interactive: false, showFractionLabel: false },
    options: [
      { value: "2 1/2", isCorrect: true },
      { value: "1 1/2", isCorrect: false },
      { value: "2 2/2", isCorrect: false },
      { value: "3 1/2", isCorrect: false },
    ],
    smartHint: {
      id: "5 dibagi 2 menghasilkan 2 dengan sisa 1. Hasil bagi menjadi angka bulat dan sisa menjadi pembilang.",
      en: "5 divided by 2 gives 2 with remainder 1. The quotient is the whole number and remainder is the numerator.",
    },
  },
  {
    id: "g5-mix-02", grade: 5, difficultyTier: 1, topic: "pecahan-campuran",
    question: {
      id: "Bentuk pecahan biasa dari 1 3/4 adalah:",
      en: "What is the improper fraction form of 1 3/4?",
    },
    simulator: { type: "circle-fraction", totalSegments: 4, filledSegments: 3, interactive: false, showFractionLabel: false },
    options: [
      { value: "7/4", isCorrect: true },
      { value: "4/7", isCorrect: false },
      { value: "5/4", isCorrect: false },
      { value: "3/4", isCorrect: false },
    ],
    smartHint: {
      id: "Kalikan bilangan bulat di depan dengan 4, lalu tambahkan 3: (1 × 4) + 3 = 7.",
      en: "Multiply the whole number by 4, then add 3: (1 × 4) + 3 = 7.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 5 — Persen
  // ══════════════════════════════════════════════════════
  {
    id: "g5-pct-01", grade: 5, difficultyTier: 1, topic: "persen",
    question: {
      id: "Berapakah bentuk persen (%) dari pecahan 1/2?",
      en: "What is the percentage (%) equivalent of the fraction 1/2?",
    },
    simulator: { type: "circle-fraction", totalSegments: 2, filledSegments: 1, interactive: false, showFractionLabel: false },
    options: [
      { value: "50%", isCorrect: true },
      { value: "25%", isCorrect: false },
      { value: "20%", isCorrect: false },
      { value: "100%", isCorrect: false },
    ],
    smartHint: {
      id: "Persen berarti per seratus. Setengah bagian dari 100% adalah 50%.",
      en: "Percent means per hundred. Half of 100% is 50%.",
    },
  },
  {
    id: "g5-pct-02", grade: 5, difficultyTier: 1, topic: "persen",
    question: {
      id: "Berapakah bentuk persen (%) dari pecahan 3/4?",
      en: "What is the percentage (%) equivalent of the fraction 3/4?",
    },
    simulator: { type: "circle-fraction", totalSegments: 4, filledSegments: 3, interactive: false, showFractionLabel: false },
    options: [
      { value: "75%", isCorrect: true },
      { value: "50%", isCorrect: false },
      { value: "25%", isCorrect: false },
      { value: "34%", isCorrect: false },
    ],
    smartHint: {
      id: "Kalikan 3/4 dengan 100%: (3 × 100) ÷ 4 = 75%.",
      en: "Multiply 3/4 by 100%: (3 × 100) ÷ 4 = 75%.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 6 — Aljabar Dasar
  // ══════════════════════════════════════════════════════
  {
    id: "g6-alg-01", grade: 6, difficultyTier: 1, topic: "aljabar-dasar",
    question: {
      id: "Tentukan nilai n dari persamaan: n + 15 = 40",
      en: "Find the value of n in the equation: n + 15 = 40",
    },
    simulator: { type: "algebra-balance", leftExpr: "n + 15", rightExpr: "40", variableName: "n" },
    options: [
      { value: "25", isCorrect: true },
      { value: "55", isCorrect: false },
      { value: "20", isCorrect: false },
      { value: "35", isCorrect: false },
    ],
    smartHint: {
      id: "Gunakan pengurangan kebalikan: kurangkan 40 dengan 15.",
      en: "Use inverse operation: subtract 15 from 40.",
    },
  },
  {
    id: "g6-alg-02", grade: 6, difficultyTier: 1, topic: "aljabar-dasar",
    question: {
      id: "Tentukan nilai x dari persamaan: 4 × x = 32",
      en: "Find the value of x in the equation: 4 × x = 32",
    },
    simulator: { type: "algebra-balance", leftExpr: "4 × x", rightExpr: "32", variableName: "x" },
    options: [
      { value: "8", isCorrect: true },
      { value: "6", isCorrect: false },
      { value: "7", isCorrect: false },
      { value: "9", isCorrect: false },
    ],
    smartHint: {
      id: "Kebalikan dari perkalian adalah pembagian: bagi 32 dengan 4.",
      en: "The opposite of multiplication is division: divide 32 by 4.",
    },
  },

  // ══════════════════════════════════════════════════════
  // KELAS 6 — Perbandingan
  // ══════════════════════════════════════════════════════
  {
    id: "g6-ratio-01", grade: 6, difficultyTier: 1, topic: "perbandingan",
    question: {
      id: "Bentuk paling sederhana dari perbandingan 6 : 9 adalah:",
      en: "What is the simplest form of the ratio 6 : 9?",
    },
    simulator: { type: "circle-fraction", totalSegments: 5, filledSegments: 2, interactive: false, showFractionLabel: false },
    options: [
      { value: "2 : 3", isCorrect: true },
      { value: "3 : 2", isCorrect: false },
      { value: "1 : 3", isCorrect: false },
      { value: "3 : 4", isCorrect: false },
    ],
    smartHint: {
      id: "Bagi kedua bilangan dengan FPB yaitu 3: 6 ÷ 3 = 2 dan 9 ÷ 3 = 3.",
      en: "Divide both numbers by their GCF (3): 6 ÷ 3 = 2 and 9 ÷ 3 = 3.",
    },
  },
  {
    id: "g6-ratio-02", grade: 6, difficultyTier: 1, topic: "perbandingan",
    question: {
      id: "Perbandingan kelereng Budi dan Andi adalah 3 : 5. Jika kelereng Budi berjumlah 12 butir, berapa kelereng Andi?",
      en: "The ratio of Budi's marbles to Andi's marbles is 3 : 5. If Budi has 12 marbles, how many marbles does Andi have?",
    },
    simulator: { type: "circle-fraction", totalSegments: 8, filledSegments: 3, interactive: false, showFractionLabel: false },
    options: [
      { value: "20", isCorrect: true },
      { value: "15", isCorrect: false },
      { value: "25", isCorrect: false },
      { value: "18", isCorrect: false },
    ],
    smartHint: {
      id: "Cari faktor pengali: 12 ÷ 3 = 4. Maka kelereng Andi adalah 5 × 4.",
      en: "Find the multiplier: 12 ÷ 3 = 4. Andi's marbles = 5 × 4 = 20.",
    },
  },
];

const runtimeQuestionCache = new Map<string, Question>();

export function getQuestionsByGradeAndTopic(
  grade: number,
  topic: string,
  tier: number = 1
): Question[] {
  // 1. Gather curated static matches for this specific grade and topic
  let staticMatches = questionBank.filter(
    (q) => q.grade === grade && q.topic === topic && q.difficultyTier === tier
  );
  if (staticMatches.length === 0) {
    staticMatches = questionBank.filter(
      (q) => q.grade === grade && q.topic === topic
    );
  }

  // 2. Generate dynamic questions strictly for this topic
  const dynamicQuestions = generateSessionQuestions(grade, topic, tier, 10).filter(
    (q) => q.topic === topic
  );

  // 3. Cache questions for lookup by ID
  staticMatches.forEach((q) => runtimeQuestionCache.set(q.id, q));
  dynamicQuestions.forEach((q) => runtimeQuestionCache.set(q.id, q));

  // 4. Combine matching questions: curated static first, then dynamic
  const pool = [...staticMatches, ...dynamicQuestions].filter((q) => q.topic === topic);

  // Fallback generation if pool is somehow empty
  if (pool.length === 0) {
    const fallbackDynamic = generateSessionQuestions(grade, topic, 1, 10).filter(
      (q) => q.topic === topic
    );
    fallbackDynamic.forEach((q) => runtimeQuestionCache.set(q.id, q));
    pool.push(...fallbackDynamic);
  }

  // 5. Ensure at least 10 questions of this exact topic by cycling if needed
  if (pool.length > 0 && pool.length < 10) {
    const originalLength = pool.length;
    let cycleIdx = 0;
    while (pool.length < 10) {
      const template = pool[cycleIdx % originalLength];
      const clonedId = `${template.id}-rep-${pool.length}-${Date.now()}`;
      const cloned: Question = { ...template, id: clonedId };
      runtimeQuestionCache.set(clonedId, cloned);
      pool.push(cloned);
      cycleIdx++;
    }
  }

  // STRICT ASSERTION: Every single returned question MUST match the requested topic
  const finalQuestions = pool.filter((q) => q.topic === topic).slice(0, 10);
  return finalQuestions;
}

export function getQuestionById(id: string): Question | undefined {
  if (runtimeQuestionCache.has(id)) {
    return runtimeQuestionCache.get(id);
  }
  return questionBank.find((q) => q.id === id);
}

/** Register a batch of freshly-generated questions into the runtime lookup cache. */
export function registerQuestionsToCache(questions: Question[]): void {
  questions.forEach((q) => runtimeQuestionCache.set(q.id, q));
}


