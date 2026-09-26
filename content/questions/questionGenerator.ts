import { Question } from "./questionBank";

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const FRUITS_BILINGUAL = [
  { id: "apel", en: "apples" },
  { id: "jeruk", en: "oranges" },
  { id: "stroberi", en: "strawberries" },
  { id: "mangga", en: "mangoes" },
  { id: "bintang", en: "stars" },
  { id: "kelereng", en: "marbles" },
  { id: "permen", en: "candies" },
  { id: "kue", en: "cupcakes" },
];
const FRUIT_NAMES = FRUITS_BILINGUAL.map((f) => f.id);
const NAMES = ["Budi", "Siti", "Adi", "Dayu", "Rini", "Edo", "Lani", "Udin", "Beni", "Doni"];
const OBJECTS_BILINGUAL = [
  { id: "kelereng", en: "marbles" },
  { id: "permen", en: "candies" },
  { id: "pensil", en: "pencils" },
  { id: "buku cerita", en: "storybooks" },
  { id: "stiker kartun", en: "stickers" },
  { id: "kue donat", en: "donuts" },
  { id: "balon warna-warni", en: "balloons" },
  { id: "biskuit", en: "biscuits" },
];

// ─── 1. Pola Bilangan / Deret Matematika (Differentiated Grades 1 - 6) ────────
export function generatePatternQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    let customSeq: number[] | null = null;
    let ruleTextId = "";
    let ruleTextEn = "";
    let hintId = "Hitung selisih antara dua angka berurutan yang terlihat untuk mengetahui berapa penambahan atau pengurangannya.";
    let hintEn = "Calculate the difference between adjacent visible numbers to discover the step pattern.";

    // ── GRADE 1: Concrete Single Digits (Steps +1, +2, +5)
    if (grade === 1) {
      const step = pickRandom(tier === 1 ? [1, 2] : [2, 3, 5]);
      const start = randInt(1, 10);
      customSeq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
      ruleTextId = `Bertambah ${step} setiap langkah`;
      ruleTextEn = `Increases by ${step} each step`;
      hintId = `Amati dua angka pertama. Angka berikutnya bertambah ${step}.`;
      hintEn = `Observe the first two numbers. The next number increases by ${step}.`;
    }

    // ── GRADE 2: Up to 100 (Add/Sub steps, Alternating in Tier 3)
    else if (grade === 2) {
      if (tier === 1) {
        const step = pickRandom([2, 5, 10, -2, -5]);
        const start = step > 0 ? randInt(2, 20) : randInt(30, 50);
        customSeq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
        ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
        ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
      } else if (tier === 2) {
        const step = pickRandom([3, 4, 6, -3, -4]);
        const start = step > 0 ? randInt(5, 30) : randInt(40, 70);
        customSeq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step, start + 5 * step];
        ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
        ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
        hintId = `Hitung selisih tetap antara dua angka berdekatan.`;
        hintEn = `Calculate the constant step difference between adjacent numbers.`;
      } else {
        // Tier 3: Alternating +add, -sub
        const add = pickRandom([4, 5, 6]);
        const sub = pickRandom([1, 2]);
        const start = randInt(10, 25);
        const s0 = start;
        const s1 = s0 + add;
        const s2 = s1 - sub;
        const s3 = s2 + add;
        const s4 = s3 - sub;
        const s5 = s4 + add;
        customSeq = [s0, s1, s2, s3, s4, s5];
        ruleTextId = `Pola berselang: ditambah ${add}, lalu dikurang ${sub}`;
        ruleTextEn = `Alternating pattern: add ${add}, then subtract ${sub}`;
        hintId = `Perhatikan pola lompatan: pertama ditambah ${add}, kemudian dikurangi ${sub}.`;
        hintEn = `Look at the jump pattern: first add ${add}, then subtract ${sub}.`;
      }
    }

    // ── GRADE 3 (Fase B / Cambridge Stage 3): Multiplication Tables, Second-Order & Fibonacci
    else if (grade === 3) {
      if (tier === 1) {
        // Tier 1: Single arithmetic steps based on times tables
        const step = pickRandom([3, 4, 6, 7, 8, 9, -3, -4]);
        const start = step > 0 ? randInt(3, 30) : randInt(50, 90);
        customSeq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
        ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
        ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
      } else if (tier === 2) {
        const mode = i % 3;
        if (mode === 0) {
          // Second-Order Difference (Growing Difference: +2, +3, +4, +5, +6)
          const start = randInt(2, 6);
          const dStart = randInt(2, 3);
          const s: number[] = [start];
          let curDiff = dStart;
          for (let k = 0; k < 5; k++) {
            s.push(s[s.length - 1] + curDiff);
            curDiff += 1;
          }
          customSeq = s;
          ruleTextId = `Selisih bertambah 1 di setiap langkah (+${dStart}, +${dStart + 1}, +${dStart + 2}...)`;
          ruleTextEn = `Difference grows by 1 each step (+${dStart}, +${dStart + 1}, +${dStart + 2}...)`;
          hintId = `Hitung selisih antar angka berurutan. Perhatikan bahwa selisihnya bertambah 1 setiap langkah!`;
          hintEn = `Check the differences between adjacent numbers. Notice the difference grows by 1!`;
        } else if (mode === 1) {
          // Alternating operations (+6, -2, +6, -2, +6)
          const add = pickRandom([5, 6, 8, 10]);
          const sub = pickRandom([2, 3, 4]);
          const start = randInt(12, 30);
          const s = [start];
          for (let k = 0; k < 5; k++) {
            s.push(k % 2 === 0 ? s[s.length - 1] + add : s[s.length - 1] - sub);
          }
          customSeq = s;
          ruleTextId = `Pola berselang: ditambah ${add}, lalu dikurangi ${sub}`;
          ruleTextEn = `Alternating rule: add ${add}, then subtract ${sub}`;
          hintId = `Amati pola dua langkah: dari suku ke-1 ke suku ke-2 (tambah), lalu ke suku ke-3 (kurang).`;
          hintEn = `Observe the 2-step alternation: step 1 adds, step 2 subtracts.`;
        } else {
          // Odd differences: +3, +5, +7, +9, +11
          const start = randInt(2, 8);
          customSeq = [start, start + 3, start + 8, start + 15, start + 24, start + 35];
          ruleTextId = `Selisih bertambah dengan bilangan ganjil berturut-turut (+3, +5, +7, +9, +11)`;
          ruleTextEn = `Difference grows by consecutive odd numbers (+3, +5, +7, +9, +11)`;
          hintId = `Selisih antar angka membentuk barisan bilangan ganjil: +3, +5, +7, +9.`;
          hintEn = `Differences form consecutive odd numbers: +3, +5, +7, +9.`;
        }
      } else {
        // TIER 3 (Challenge): Recursive (×2 ± 1), Fibonacci, or Square Differences
        const mode = i % 3;
        if (mode === 0) {
          // Recursive ×2 + 1 or ×2 - 1
          const isPlus = i % 2 === 0;
          const start = isPlus ? randInt(2, 4) : randInt(3, 5);
          const s = [start];
          for (let k = 0; k < 5; k++) {
            s.push(isPlus ? s[s.length - 1] * 2 + 1 : s[s.length - 1] * 2 - 1);
          }
          customSeq = s;
          ruleTextId = isPlus ? `Dikalikan 2 lalu ditambah 1 setiap langkah` : `Dikalikan 2 lalu dikurangi 1 setiap langkah`;
          ruleTextEn = isPlus ? `Multiplied by 2 then add 1 each step` : `Multiplied by 2 then minus 1 each step`;
          hintId = `Coba aturan rekursif dua operasi: angka saat ini dikalikan 2 lalu ${isPlus ? "ditambah 1" : "dikurang 1"}.`;
          hintEn = `Try a two-operation rule: multiply current term by 2, then ${isPlus ? "add 1" : "subtract 1"}.`;
        } else if (mode === 1) {
          // Early Fibonacci: Each number is the sum of previous two
          const a = pickRandom([1, 2, 3]);
          const b = pickRandom([2, 3, 4]);
          const s = [a, b];
          for (let k = 0; k < 4; k++) {
            s.push(s[s.length - 1] + s[s.length - 2]);
          }
          customSeq = s;
          ruleTextId = `Deret Fibonacci: setiap angka adalah penjumlahan dari dua angka sebelumnya`;
          ruleTextEn = `Fibonacci sequence: each number is the sum of the two preceding numbers`;
          hintId = `Jumlahkan dua angka yang berdampingan di sebelah kiri untuk mendapatkan angka berikutnya!`;
          hintEn = `Add the two adjacent numbers on the left to get the next term!`;
        } else {
          // Even differences: +4, +6, +8, +10, +12
          const start = randInt(2, 6);
          customSeq = [start, start + 4, start + 10, start + 18, start + 28, start + 40];
          ruleTextId = `Selisih bertambah dengan bilangan genap (+4, +6, +8, +10, +12)`;
          ruleTextEn = `Differences grow by consecutive even numbers (+4, +6, +8, +10, +12)`;
          hintId = `Perhatikan selisihnya: bertambah 4, lalu 6, lalu 8, dan seterusnya.`;
          hintEn = `Look at the differences: +4, then +6, then +8, and so forth.`;
        }
      }
    }

    // ── GRADE 4 (Fase B / Cambridge Stage 4): Triangular, Multipliers, Interleaved & Shifted Squares
    else if (grade === 4) {
      if (tier === 1) {
        // Tier 1: Double-digit steps: +15, +20, +25, -12, -15 up to 200
        const step = pickRandom([15, 20, 25, -12, -15, -20]);
        const start = step > 0 ? randInt(15, 60) : randInt(120, 180);
        customSeq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
        ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
        ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
      } else if (tier === 2) {
        const mode = i % 3;
        if (mode === 0) {
          // Triangular numbers sequence (+2, +3, +4, +5, +6, +7)
          const offset = pickRandom([0, 2, 5]);
          customSeq = [
            1 + offset,
            3 + offset,
            6 + offset,
            10 + offset,
            15 + offset,
            21 + offset,
          ];
          ruleTextId = `Pola bilangan segitiga: selisih bertambah 1 (+2, +3, +4, +5, +6)`;
          ruleTextEn = `Triangular numbers pattern: differences grow by 1 (+2, +3, +4, +5, +6)`;
          hintId = `Hitung selisih antar angka berdekatan. Selisih tersebut membentuk barisan: 2, 3, 4, 5, 6.`;
          hintEn = `Calculate step differences. They form consecutive integers: 2, 3, 4, 5, 6.`;
        } else if (mode === 1) {
          // Geometric multipliers ×3 or ×4
          const factor = pickRandom([3, 4]);
          const start = factor === 3 ? randInt(2, 4) : randInt(2, 3);
          customSeq = [
            start,
            start * factor,
            start * Math.pow(factor, 2),
            start * Math.pow(factor, 3),
            start * Math.pow(factor, 4),
          ];
          ruleTextId = `Dikalikan ${factor} setiap langkah`;
          ruleTextEn = `Multiplied by ${factor} each step`;
          hintId = `Bagi angka kedua dengan angka pertama untuk menemukan faktor pengalinya.`;
          hintEn = `Divide the second number by the first to find the multiplier.`;
        } else {
          // Alternating ×2, -3 or ×2, -4
          const sub = pickRandom([3, 4]);
          const start = randInt(4, 7);
          const s = [start];
          for (let k = 0; k < 5; k++) {
            s.push(k % 2 === 0 ? s[s.length - 1] * 2 : s[s.length - 1] - sub);
          }
          customSeq = s;
          ruleTextId = `Pola berselang: dikalikan 2 lalu dikurangi ${sub}`;
          ruleTextEn = `Alternating rule: multiply by 2 then subtract ${sub}`;
          hintId = `Aturan bergantian: kalikan 2 pada langkah genap, kurangi ${sub} pada langkah ganjil.`;
          hintEn = `Alternating rule: multiply by 2, then subtract ${sub}.`;
        }
      } else {
        // TIER 3 (Challenge): Interleaved double sequence, Doubling difference, or Shifted Squares
        const mode = i % 3;
        if (mode === 0) {
          // Interleaved sequence (odd positions: +4, even positions: -5)
          const startA = randInt(4, 10);
          const startB = randInt(70, 90);
          const stepA = pickRandom([3, 4, 5]);
          const stepB = pickRandom([4, 5, 6]);
          customSeq = [
            startA,
            startB,
            startA + stepA,
            startB - stepB,
            startA + 2 * stepA,
            startB - 2 * stepB,
            startA + 3 * stepA,
            startB - 3 * stepB,
          ];
          ruleTextId = `Dua deret mandiri bersilangan: posisi ganjil bertambah ${stepA}, posisi genap berkurang ${stepB}`;
          ruleTextEn = `Two interleaved sequences: odd terms increase by ${stepA}, even terms decrease by ${stepB}`;
          hintId = `Perhatikan deret dengan melompat satu angka! Angka di urutan ganjil dan genap memiliki aturan sendiri.`;
          hintEn = `Notice the interleaved pattern! Skip one number: odd and even positions follow separate rules.`;
        } else if (mode === 1) {
          // Doubling differences: +2, +4, +8, +16, +32
          const start = randInt(3, 7);
          customSeq = [
            start,
            start + 2,
            start + 6,
            start + 14,
            start + 30,
            start + 62,
          ];
          ruleTextId = `Selisih bertambah dua kali lipat setiap langkah (+2, +4, +8, +16, +32)`;
          ruleTextEn = `Difference doubles at each step (+2, +4, +8, +16, +32)`;
          hintId = `Selisih antar angka berlipat dua kali lipat: 2, 4, 8, 16, 32.`;
          hintEn = `Differences double every step: 2, 4, 8, 16, 32.`;
        } else {
          // Shifted squares n² - 1: (3, 8, 15, 24, 35, 48)
          customSeq = [3, 8, 15, 24, 35, 48];
          ruleTextId = `Pola kuadrat dikurangi 1: (2²−1, 3²−1, 4²−1, 5²−1, 6²−1, 7²−1)`;
          ruleTextEn = `Shifted squares pattern n² − 1: (2²−1, 3²−1, 4²−1, 5²−1, 6²−1, 7²−1)`;
          hintId = `Perhatikan selisihnya (+5, +7, +9, +11, +13) yang berasal dari bilangan kuadrat dikurangi 1.`;
          hintEn = `Look at the differences (+5, +7, +9, +11, +13), stemming from square numbers minus 1.`;
        }
      }
    }

    // ── GRADE 5 (Fase C / Cambridge Stage 5): Cubes, Primes, Quadratic Differences & Pronic Numbers
    else if (grade === 5) {
      if (tier === 1) {
        // Large regular progressions (+50, +75, +125, +250)
        const step = pickRandom([50, 75, 125, 250, -50, -75]);
        const start = step > 0 ? randInt(100, 300) : randInt(600, 950);
        customSeq = [start, start + step, start + 2 * step, start + 3 * step, start + 4 * step];
        ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
        ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
      } else if (tier === 2) {
        const mode = i % 4;
        if (mode === 0) {
          // Consecutive Cubes: n³ (1, 8, 27, 64, 125, 216)
          customSeq = [1, 8, 27, 64, 125, 216];
          ruleTextId = `Pola bilangan kubik / pangkat tiga berurutan: 1³, 2³, 3³, 4³, 5³, 6³`;
          ruleTextEn = `Consecutive cubic numbers pattern: 1³, 2³, 3³, 4³, 5³, 6³`;
          hintId = `Pola ini merupakan hasil perpangkatan tiga dari bilangan asli: 1³, 2³, 3³, 4³...`;
          hintEn = `This sequence represents cubes of consecutive integers: 1³, 2³, 3³, 4³...`;
        } else if (mode === 1) {
          // Quadratic difference (+1, +4, +9, +16, +25)
          const start = randInt(2, 6);
          customSeq = [
            start,
            start + 1,
            start + 5,
            start + 14,
            start + 30,
            start + 55,
          ];
          ruleTextId = `Selisih antar angka adalah bilangan kuadrat (+1, +4, +9, +16, +25)`;
          ruleTextEn = `Differences between terms are square numbers (+1, +4, +9, +16, +25)`;
          hintId = `Selisih antar dua angka membentuk bilangan kuadrat: 1, 4, 9, 16, 25.`;
          hintEn = `Differences between adjacent terms are squares: 1, 4, 9, 16, 25.`;
        } else if (mode === 2) {
          // Consecutive Primes
          const primeSets = [
            [11, 13, 17, 19, 23, 29, 31],
            [17, 19, 23, 29, 31, 37, 41],
            [2, 3, 5, 7, 11, 13, 17],
          ];
          customSeq = pickRandom(primeSets);
          ruleTextId = `Barisan bilangan prima berturut-turut`;
          ruleTextEn = `Consecutive prime numbers sequence`;
          hintId = `Perhatikan bahwa semua angka pada deret ini hanya dapat dibagi oleh 1 dan dirinya sendiri (bilangan prima).`;
          hintEn = `All numbers in this sequence are prime numbers (divisible only by 1 and themselves).`;
        } else {
          // Recursive ×3 - 2
          const start = randInt(3, 4);
          const s = [start];
          for (let k = 0; k < 4; k++) {
            s.push(s[s.length - 1] * 3 - 2);
          }
          customSeq = s;
          ruleTextId = `Aturan rekursif: dikalikan 3 lalu dikurangi 2 setiap langkah`;
          ruleTextEn = `Recursive rule: multiply by 3 then subtract 2 each step`;
          hintId = `Kalikan angka saat ini dengan 3, kemudian kurangi dengan 2.`;
          hintEn = `Multiply the current term by 3, then subtract 2.`;
        }
      } else {
        // TIER 3 (Challenge): Shifted Cubes, Pronic Numbers, or Triple Differences
        const mode = i % 3;
        if (mode === 0) {
          // Shifted Cubes n³ - 1: (0, 7, 26, 63, 124, 215)
          customSeq = [0, 7, 26, 63, 124, 215];
          ruleTextId = `Pola bilangan kubik dikurangi 1: (1³−1, 2³−1, 3³−1, 4³−1, 5³−1, 6³−1)`;
          ruleTextEn = `Cubic numbers shifted by −1: (1³−1, 2³−1, 3³−1, 4³−1, 5³−1, 6³−1)`;
          hintId = `Tambahkan 1 ke setiap angka, lalu perhatikan hasilnya: 1, 8, 27, 64, 125... (bilangan kubik).`;
          hintEn = `Add 1 to each number: 1, 8, 27, 64, 125... which are perfect cubes.`;
        } else if (mode === 1) {
          // Pronic / Oblong numbers n × (n + 1): 2, 6, 12, 20, 30, 42, 56
          customSeq = [2, 6, 12, 20, 30, 42, 56];
          ruleTextId = `Pola bilangan persegi panjang / pronik: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7, 7×8`;
          ruleTextEn = `Oblong / pronic numbers pattern: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7, 7×8`;
          hintId = `Perhatikan selisihnya yang bertambah genap (+4, +6, +8, +10, +12, +14). Pola ini dibentuk dari n × (n + 1).`;
          hintEn = `Differences grow by even numbers (+4, +6, +8, +10, +12, +14). Formed by n × (n + 1).`;
        } else {
          // Triple exponential difference (+3, +9, +27, +81, +243)
          const start = randInt(2, 5);
          customSeq = [
            start,
            start + 3,
            start + 12,
            start + 39,
            start + 120,
            start + 363,
          ];
          ruleTextId = `Selisih antar angka berlipat 3 kali lipat (+3, +9, +27, +81, +243)`;
          ruleTextEn = `Differences triple at each step (+3, +9, +27, +81, +243)`;
          hintId = `Selisih antar angka adalah kelipatan eksponensial dari 3: 3, 9, 27, 81.`;
          hintEn = `Step differences are powers of 3: 3, 9, 27, 81.`;
        }
      }
    }

    // ── GRADE 6 (Fase C / Cambridge Stage 6 & OSN SD): Double Interleaved, Mersenne, Recursive Olympiad
    else {
      if (tier === 1) {
        // Consecutive squares 4²..9² or 5²..10²
        const offset = pickRandom([3, 4, 5]);
        customSeq = [
          offset * offset,
          (offset + 1) * (offset + 1),
          (offset + 2) * (offset + 2),
          (offset + 3) * (offset + 3),
          (offset + 4) * (offset + 4),
          (offset + 5) * (offset + 5),
        ];
        ruleTextId = `Pola bilangan kuadrat berturut-turut: n²`;
        ruleTextEn = `Consecutive square numbers pattern: n²`;
        hintId = `Pola ini adalah kuadrat dari bilangan berurutan.`;
        hintEn = `This sequence is the squares of consecutive integers.`;
      } else if (tier === 2) {
        const mode = i % 3;
        if (mode === 0) {
          // Mersenne Exponential: 2ⁿ - 1 (1, 3, 7, 15, 31, 63, 127)
          customSeq = [1, 3, 7, 15, 31, 63, 127];
          ruleTextId = `Pola eksponensial biner: 2ⁿ − 1 (selisih +2, +4, +8, +16, +32, +64)`;
          ruleTextEn = `Binary exponential sequence: 2ⁿ − 1 (differences +2, +4, +8, +16, +32, +64)`;
          hintId = `Tambahkan 1 ke setiap angka untuk melihat deret perpangkatan 2: 2, 4, 8, 16, 32, 64, 128.`;
          hintEn = `Add 1 to each number to discover powers of 2: 2, 4, 8, 16, 32, 64, 128.`;
        } else if (mode === 1) {
          // Shifted Pronic: n(n+2): (3, 8, 15, 24, 35, 48, 63)
          customSeq = [3, 8, 15, 24, 35, 48, 63];
          ruleTextId = `Pola perkalian dua bilangan ganjil/genap berjarak 2: n × (n + 2)`;
          ruleTextEn = `Product pattern with gap of 2: n × (n + 2)`;
          hintId = `Selisih antar angka bertambah 2 setiap langkah (+5, +7, +9, +11, +13, +15).`;
          hintEn = `Differences grow by 2 (+5, +7, +9, +11, +13, +15).`;
        } else {
          // Advanced Fibonacci: 5, 8, 13, 21, 34, 55, 89, 144
          customSeq = [5, 8, 13, 21, 34, 55, 89, 144];
          ruleTextId = `Barisan Fibonacci lanjutan: suku ke-n = suku sebelumnya dijumlahkan`;
          ruleTextEn = `Advanced Fibonacci: each term is the sum of the two preceding terms`;
          hintId = `Setiap angka adalah hasil penjumlahan dari dua angka tepat di sebelah kirinya.`;
          hintEn = `Each term is the exact sum of the two terms directly to its left.`;
        }
      } else {
        // TIER 3 (Olimpiade SD & Cambridge Stage 6 Mastery):
        const mode = i % 4;
        if (mode === 0) {
          // Double Interleaved: Geometric & Arithmetic
          // Sub-A: ×3 (3, 9, 27, 81), Sub-B: -25 (200, 175, 150, 125)
          customSeq = [3, 200, 9, 175, 27, 150, 81, 125, 243];
          ruleTextId = `Dua barisan mandiri selang-seling: posisi ganjil dikali 3, posisi genap dikurang 25`;
          ruleTextEn = `Interleaved double sequence: odd terms multiplied by 3, even terms subtracted by 25`;
          hintId = `Lompati satu angka! Barisan ganjil dikalikan 3, sedangkan barisan genap dikurangi 25.`;
          hintEn = `Skip one number! The odd sequence multiplies by 3, while the even sequence subtracts 25.`;
        } else if (mode === 1) {
          // Hexagonal / n² + n + 1: (3, 7, 13, 21, 31, 43, 57, 73)
          customSeq = [3, 7, 13, 21, 31, 43, 57, 73];
          ruleTextId = `Pola n² + n + 1 (selisih genap berturut-turut +4, +6, +8, +10, +12, +14, +16)`;
          ruleTextEn = `Sequence n² + n + 1 (consecutive even differences +4, +6, +8, +10, +12, +14, +16)`;
          hintId = `Hitung selisihnya: bertambah 4, lalu 6, 8, 10, 12, 14... yang selalu bertambah 2.`;
          hintEn = `Check differences: +4, +6, +8, +10, +12, +14... growing steadily by 2.`;
        } else if (mode === 2) {
          // Recursive Olympiad: Un = 2 × U(n-1) + 3
          // [1, 5, 13, 29, 61, 125, 253]
          customSeq = [1, 5, 13, 29, 61, 125, 253];
          ruleTextId = `Barisan rekursif olimpiade: suku berikutnya = 2 × suku sebelumnya + 3`;
          ruleTextEn = `Olympiad recursive sequence: next term = 2 × previous term + 3`;
          hintId = `Uji rumus rekursif: kalikan angka dengan 2, lalu tambahkan 3 untuk mendapatkan angka di kanannya.`;
          hintEn = `Test recursive formula: multiply number by 2 and add 3 to obtain the next number.`;
        } else {
          // Tetrahedral Numbers (Sum of Triangular numbers): 1, 4, 10, 20, 35, 56, 84
          customSeq = [1, 4, 10, 20, 35, 56, 84];
          ruleTextId = `Bilangan tetrahedral: selisih antar angka membentuk bilangan segitiga (+3, +6, +10, +15, +21, +28)`;
          ruleTextEn = `Tetrahedral numbers: differences between terms form triangular numbers (+3, +6, +10, +15, +21, +28)`;
          hintId = `Selisih antar angka adalah: 3, 6, 10, 15, 21 (bilangan segitiga).`;
          hintEn = `Differences between terms are 3, 6, 10, 15, 21 (triangular numbers).`;
        }
      }
    }

    const seq: number[] = customSeq ?? [2, 4, 6, 8, 10];
    const length = seq.length;

    // Pick missing index (keeping at least the first two visible for clear deduction)
    const minMissingIdx = 2;
    const maxMissingIdx = length - 1;
    const missingIdx = randInt(minMissingIdx, maxMissingIdx);
    const correctVal = seq[missingIdx];
    const displaySeq: (number | null)[] = seq.map((v, idx) => (idx === missingIdx ? null : v));

    // Construct plausible options
    const optStep = Math.max(1, Math.abs(seq[Math.min(length - 1, missingIdx + 1)] - correctVal) || 2);
    const distractor1 = correctVal + optStep;
    const distractor2 = Math.max(1, correctVal - optStep);

    const qId = `dyn-pat-${grade}-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;
    list.push({
      id: qId,
      grade,
      difficultyTier: tier,
      topic: "pola-bilangan",
      question: {
        id: `Perhatikan deret bilangan berikut. Berapakah angka yang tepat untuk mengisi kotak kosong?`,
        en: `Observe the number sequence below. What number correctly fills the blank box?`,
      },
      simulator: {
        type: "pattern-sequence",
        sequence: displaySeq,
        missingIndices: [missingIdx],
        correctValues: [correctVal],
        ruleDescription: ruleTextId,
      },
      options: [
        { value: String(correctVal), isCorrect: true },
        { value: String(distractor1), isCorrect: false, misconceptionTag: "pattern-rule-error" },
        { value: String(distractor2), isCorrect: false, misconceptionTag: "pattern-rule-error" },
      ],
      smartHint: {
        id: hintId,
        en: hintEn,
      },
    });
  }

  return list;
}

// ─── 2. Soal Cerita Ekspresi Matematika (Differentiated Grades 1 - 6) ──────────
export function generateWordProblemQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const name = pickRandom(NAMES);
    const objItem = pickRandom(OBJECTS_BILINGUAL);
    const objId = objItem.id;
    const objEn = objItem.en;

    let textId = "";
    let textEn = "";
    let slots: { type: "number" | "operator"; target: string }[] = [];
    let expectedAnswer = "0";
    let hintId = "";
    let hintEn = "";

    // ── GRADE 1: Concrete Single Digits (A + B, A - B, A - B + C)
    if (grade === 1) {
      const mode = i % 3;
      if (mode === 0) {
        // A + B
        const a = randInt(2, 6);
        const b = randInt(1, 6);
        const ans = a + b;
        textId = `${name} memiliki ${a} ${objId}. Ibu memberikan ${b} ${objId} lagi. Berapa total ${objId} ${name} sekarang?`;
        textEn = `${name} has ${a} ${objEn}. Mother gives ${b} more ${objEn}. How many total ${objEn} does ${name} have now?`;
        slots = [
          { type: "number", target: String(a) },
          { type: "operator", target: "+" },
          { type: "number", target: String(b) },
        ];
        expectedAnswer = String(ans);
        hintId = "Tuliskan jumlah awal, lalu tambahkan (+) dengan jumlah yang diberikan Ibu.";
        hintEn = "Write the initial amount, then add (+) the amount given by Mother.";
      } else if (mode === 1) {
        // A - B
        const a = randInt(5, 10);
        const b = randInt(1, a - 1);
        const ans = a - b;
        textId = `${name} mempunyai ${a} ${objId}. Sebanyak ${b} ${objId} diberikan kepada adik. Berapa sisa ${objId} ${name} sekarang?`;
        textEn = `${name} has ${a} ${objEn}. ${name} gives ${b} ${objEn} to younger sibling. How many ${objEn} are left?`;
        slots = [
          { type: "number", target: String(a) },
          { type: "operator", target: "−" },
          { type: "number", target: String(b) },
        ];
        expectedAnswer = String(ans);
        hintId = "Tuliskan jumlah awal, lalu kurangkan (−) dengan jumlah yang diberikan.";
        hintEn = "Write the initial count, then subtract (−) the count given away.";
      } else {
        // A - B + C
        const a = randInt(4, 8);
        const b = randInt(1, a - 1);
        const c = randInt(1, 4);
        const ans = a - b + c;
        textId = `Ibu memiliki ${a} ${objId}. Sebanyak ${b} ${objId} dimakan adik, lalu Kakak membawakan ${c} ${objId} lagi. Berapa jumlah ${objId} sekarang?`;
        textEn = `Mother has ${a} ${objEn}. Little brother eats ${b} ${objEn}, then older sister brings ${c} more ${objEn}. How many ${objEn} are there now?`;
        slots = [
          { type: "number", target: String(a) },
          { type: "operator", target: "−" },
          { type: "number", target: String(b) },
          { type: "operator", target: "+" },
          { type: "number", target: String(c) },
        ];
        expectedAnswer = String(ans);
        hintId = "Urutkan: jumlah awal dikurangi yang dimakan, lalu ditambah yang baru.";
        hintEn = "Order: start count minus eaten items, then plus newly added items.";
      }
    }

    // ── GRADE 2: 2-Digit Numbers up to 100 (A + B, A - B, A + B - C, A + B + C, A - B - C, A + B + C - D)
    else if (grade === 2) {
      const mode = i % 3;
      if (tier === 1) {
        if (mode === 0) {
          // A + B (2-digit dasar)
          const a = randInt(20, 55);
          const b = randInt(15, 35);
          const ans = a + b;
          textId = `Di perpustakaan sekolah terdapat ${a} buku cerita dan ${b} buku sains. Berapa jumlah seluruh buku tersebut?`;
          textEn = `The school library has ${a} storybooks and ${b} science books. How many books are there in total?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "+" },
            { type: "number", target: String(b) },
          ];
          expectedAnswer = String(ans);
          hintId = "Jumlahkan kedua jenis buku tersebut untuk mengetahui total seluruhnya.";
          hintEn = "Add the two quantities together to find the grand total.";
        } else if (mode === 1) {
          // A - B (2-digit dasar)
          const a = randInt(45, 95);
          const b = randInt(15, a - 10);
          const ans = a - b;
          textId = `Sebuah toko memiliki persediaan ${a} ${objId}. Hari ini terjual ${b} ${objId}. Berapa sisa ${objId} yang ada di toko?`;
          textEn = `A stationery shop has a stock of ${a} ${objEn}. Today, ${b} ${objEn} were sold. How many ${objEn} remain in the shop?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kurangkan stok awal dengan jumlah barang yang sudah terjual.";
          hintEn = "Subtract the sold items from the initial inventory.";
        } else {
          // A + B - C (2-step dasar)
          const a = randInt(25, 45);
          const b = randInt(15, 35);
          const c = randInt(10, 25);
          const ans = a + b - c;
          textId = `Paman memanen ${a} ${objId} di pagi hari dan ${b} ${objId} di siang hari. Sebanyak ${c} ${objId} dibagikan ke tetangga. Berapa sisa ${objId} Paman?`;
          textEn = `Uncle harvested ${a} ${objEn} in the morning and ${b} ${objEn} in the afternoon. He gave ${c} ${objEn} to neighbors. How many ${objEn} does Uncle have left?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "+" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Jumlahkan hasil panen pagi dan siang, lalu kurangkan dengan yang dibagikan.";
          hintEn = "Add morning and afternoon harvests, then subtract the shared amount.";
        }
      } else if (tier === 2) {
        // TIER 2: 3-step operations (3x penambahan / pengurangan berturut-turut)
        if (mode === 0) {
          // 3x Penambahan: A + B + C
          const a = randInt(15, 35);
          const b = randInt(15, 30);
          const c = randInt(10, 25);
          const ans = a + b + c;
          textId = `Petani memetik ${a} ${objId} di kebun pertama, ${b} ${objId} di kebun kedua, dan ${c} ${objId} di kebun ketiga. Berapa total seluruh ${objId} yang dipetik?`;
          textEn = `A farmer picked ${a} ${objEn} from the first orchard, ${b} ${objEn} from the second, and ${c} ${objEn} from the third. What is the total count of ${objEn}?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "+" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Jumlahkan hasil dari ketiga kebun secara berurutan: pertama + kedua + ketiga.";
          hintEn = "Add the yields from all three orchards in sequence: first + second + third.";
        } else if (mode === 1) {
          // 3x Pengurangan: A - B - C
          const a = randInt(65, 95);
          const b = randInt(15, 30);
          const c = randInt(10, 25);
          const ans = a - b - c;
          textId = `Sebuah toko roti memiliki ${a} roti. Pada pagi hari laku terjual ${b} roti, lalu pada siang hari terjual lagi ${c} roti. Berapa sisa roti di toko sekarang?`;
          textEn = `A bakery holds ${a} bread loaves. In the morning ${b} loaves were sold, and in the afternoon ${c} more loaves were sold. How many loaves remain now?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kurangkan stok mula-mula dengan penjualan pagi, lalu kurangkan lagi dengan penjualan siang.";
          hintEn = "Subtract morning sales from starting inventory, then subtract afternoon sales.";
        } else {
          // Kombinasi dengan simpan/pinjam: A + B - C
          const a = randInt(35, 58);
          const b = randInt(25, 48);
          const c = randInt(18, 39);
          const ans = a + b - c;
          textId = `${name} mengumpulkan ${a} stiker, lalu mendapatkan ${b} stiker baru dari temannya. Sebanyak ${c} stiker kemudian ditempelkan di buku gambar. Berapa sisa stiker ${name}?`;
          textEn = `${name} collects ${a} stickers, then receives ${b} new stickers from a friend. Later, ${c} stickers are pasted into a sketchbook. How many stickers are left?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "+" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung dulu total stiker yang dimiliki (tambah), lalu kurangkan dengan yang sudah ditempel.";
          hintEn = "Calculate the total stickers owned (addition), then subtract those that were pasted.";
        }
      } else {
        // TIER 3 (Tantangan): Multi-langkah lebih tinggi (A + B + C - D atau A - B - C + D)
        if (mode === 0) {
          // A + B + C - D (3x penambahan & pengurangan)
          const a = randInt(25, 40);
          const b = randInt(15, 30);
          const c = randInt(15, 25);
          const d = randInt(20, 35);
          const ans = a + b + c - d;
          textId = `Koperasi sekolah memiliki ${a} buku tulis, mendapat pasokan ${b} buku di pagi hari dan ${c} buku di siang hari. Sore harinya terjual ${d} buku kepada siswa. Berapa sisa buku di koperasi?`;
          textEn = `The school cooperative has ${a} notebooks, receives ${b} books in morning and ${c} books at noon. In the afternoon, ${d} books are sold to students. How many books remain?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "+" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Jumlahkan seluruh stok yang ada (awal + pagi + siang), lalu kurangkan buku yang terjual.";
          hintEn = "Add all incoming inventory (start + morning + noon), then subtract the sold books.";
        } else if (mode === 1) {
          // A - B - C + D
          const a = randInt(70, 95);
          const b = randInt(15, 25);
          const c = randInt(15, 25);
          const d = randInt(10, 20);
          const ans = a - b - c + d;
          textId = `Dalam sebuah kotak terdapat ${a} krayon. Dipinjam kelompok A sebanyak ${b} krayon dan kelompok B sebanyak ${c} krayon, lalu guru menambahkan ${d} krayon baru. Berapa jumlah krayon sekarang?`;
          textEn = `There are ${a} crayons in a box. Team A borrows ${b} crayons and Team B borrows ${c} crayons, then the teacher adds ${d} new crayons. How many crayons are there now?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
            { type: "operator", target: "+" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kurangkan krayon yang dipinjam satu per satu, kemudian tambahkan dengan krayon baru dari guru.";
          hintEn = "Subtract borrowed crayons one by one, then add the new crayons from the teacher.";
        } else {
          // 3x Penambahan angka besar: A + B + C
          const a = randInt(30, 48);
          const b = randInt(25, 45);
          const c = randInt(20, 35);
          const ans = a + b + c;
          textId = `Di kebun binatang ada ${a} burung kakatua, ${b} burung jalak, dan ${c} burung merpati. Berapa jumlah seluruh burung tersebut?`;
          textEn = `At the zoo there are ${a} cockatoos, ${b} starlings, and ${c} doves. What is the grand total of birds?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "+" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Gunakan penjumlahan bersusun 3 bilangan: simpan puluhan pada kolom berikutnya jika satuan melebihi 9.";
          hintEn = "Use 3-number column addition: carry over tens if the ones sum exceeds 9.";
        }
      }
    }

    // ── GRADE 3 (Fase B / Cambridge Stage 3): Multi-Step Word Problems & Times Tables
    else if (grade === 3) {
      if (tier === 1) {
        // TIER 1 (Foundational): Single-step multiplication & division
        const mode = i % 3;
        if (mode === 0) {
          // A * B
          const a = randInt(4, 9);
          const b = randInt(4, 9);
          const ans = a * b;
          textId = `${name} membeli ${a} kotak donat. Setiap kotak berisi ${b} buah donat. Berapa banyak donat yang dibeli ${name} seluruhnya?`;
          textEn = `${name} buys ${a} boxes of donuts. Each box contains ${b} donuts. How many donuts did ${name} buy in total?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
          ];
          expectedAnswer = String(ans);
          hintId = "Gunakan perkalian (×): kalikan jumlah kotak dengan isi per kotak.";
          hintEn = "Use multiplication (×): multiply the number of boxes by the items per box.";
        } else if (mode === 1) {
          // A / B
          const b = randInt(3, 7);
          const ans = randInt(4, 9);
          const a = b * ans;
          textId = `Ibu guru membawa ${a} pensil untuk dibagikan sama rata kepada ${b} regu belajar. Berapa pensil yang diterima tiap regu?`;
          textEn = `The teacher brings ${a} pencils to distribute equally among ${b} study teams. How many pencils does each team receive?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(b) },
          ];
          expectedAnswer = String(ans);
          hintId = "Gunakan pembagian (÷): bagi total pensil dengan jumlah regu.";
          hintEn = "Use division (÷): divide the total pencils by the number of teams.";
        } else {
          // A * B
          const a = randInt(5, 8);
          const b = randInt(6, 9);
          const ans = a * b;
          textId = `Di kebun terdapat ${a} baris pohon jeruk. Di setiap baris tertanam ${b} pohon. Berapa banyak pohon jeruk seluruhnya?`;
          textEn = `In an orchard there are ${a} rows of orange trees. Each row has ${b} trees. How many orange trees are there in total?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kalikan banyak baris dengan pohon per baris.";
          hintEn = "Multiply rows by trees per row.";
        }
      } else if (tier === 2) {
        // TIER 2 (Standard): 2–3 step operations with tens & commercial context
        const mode = i % 3;
        if (mode === 0) {
          // A * B + C
          const a = randInt(4, 7);
          const b = randInt(12, 16);
          const c = randInt(10, 25);
          const ans = a * b + c;
          textId = `${name} membeli ${a} pak buku tulis berisi ${b} buku per pak. Ayah memberinya ${c} buku lagi sebagai hadiah. Berapa total buku tulis ${name}?`;
          textEn = `${name} buys ${a} packs of notebooks containing ${b} books each. Father gives ${c} more books as a gift. What is ${name}'s total count of notebooks?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kalikan jumlah pak dengan isinya, lalu tambahkan buku hadiah dari Ayah.";
          hintEn = "Multiply packs by content, then add the gift books from Father.";
        } else if (mode === 1) {
          // A * B - C
          const a = randInt(5, 8);
          const b = randInt(14, 20);
          const c = randInt(18, 35);
          const ans = a * b - c;
          textId = `Toko kelontong memiliki ${a} dus air mineral yang masing-masing berisi ${b} botol. Hari ini terjual ${c} botol. Berapa sisa botol air mineral di toko?`;
          textEn = `A grocery store has ${a} cartons of mineral water containing ${b} bottles each. Today, ${c} bottles were sold. How many bottles remain?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung persediaan mula-mula dengan perkalian, lalu kurangkan dengan botol yang terjual.";
          hintEn = "Calculate initial stock by multiplication, then subtract the sold bottles.";
        } else {
          // A - B * C
          const b = randInt(4, 6);
          const c = randInt(12, 15);
          const ans = 100 - b * c;
          textId = `${name} membawa uang saku 100 ribu rupiah. Ia membeli ${b} buku cerita seharga ${c} ribu rupiah per buku. Berapa ribu rupiah sisa uang ${name}?`;
          textEn = `${name} brings 100 thousand rupiahs. He buys ${b} storybooks at ${c} thousand rupiahs each. How many thousand rupiahs are left?`;
          slots = [
            { type: "number", target: "100" },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Uang mula-mula (100) dikurangi total harga seluruh buku yang dibeli.";
          hintEn = "Initial pocket money (100) minus the total expenditure on books.";
        }
      } else {
        // TIER 3 (Challenge): 3–4 step operations (A × B + C × D, A × B − C × D, A − B × C − D, A × B ÷ C + D)
        const mode = i % 4;
        if (mode === 0) {
          // A * B + C * D
          const a = randInt(5, 8);
          const b = randInt(12, 16);
          const c = randInt(4, 6);
          const d = randInt(10, 14);
          const ans = a * b + c * d;
          textId = `Pak Tani memanen ${a} peti mangga berisi ${b} buah per peti, dan ${c} peti apel berisi ${d} buah per peti. Berapa total seluruh buah yang dipanen?`;
          textEn = `A farmer harvests ${a} crates of mangoes with ${b} fruits each, and ${c} crates of apples with ${d} fruits each. How many fruits are harvested in total?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung hasil panen mangga (peti × isi) dan apel (peti × isi), lalu jumlahkan keduanya.";
          hintEn = "Calculate mango yield (crates × content) and apple yield (crates × content), then add them.";
        } else if (mode === 1) {
          // A * B - C * D
          const a = randInt(7, 9);
          const b = randInt(15, 20);
          const c = randInt(4, 6);
          const d = randInt(6, 10);
          const ans = a * b - c * d;
          textId = `Toko memiliki ${a} kardus minuman berisi ${b} kaleng per kardus. Laku terjual ${c} paket bingkisan berisi ${d} kaleng per paket. Berapa kaleng minuman yang tersisa?`;
          textEn = `A shop has ${a} cartons of drinks containing ${b} cans each. A total of ${c} gift packs containing ${d} cans each are sold. How many cans of drinks remain?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung persediaan awal (kardus × kaleng) dikurangi penjualan (paket × kaleng).";
          hintEn = "Initial inventory (cartons × cans) minus sold quantity (packs × cans).";
        } else if (mode === 2) {
          // A - B * C - D
          const a = 150;
          const b = randInt(3, 5);
          const c = randInt(20, 25);
          const d = randInt(15, 25);
          const ans = a - b * c - d;
          textId = `Ibu membawa uang belanja 150 ribu rupiah. Beliau membeli ${b} kg telur seharga ${c} ribu rupiah per kg dan sebotol kecap seharga ${d} ribu rupiah. Berapa ribu rupiah sisa uang belanja Ibu?`;
          textEn = `Mother brings 150 thousand rupiahs. She purchases ${b} kg of eggs at ${c} thousand rupiahs per kg and a bottle of soy sauce for ${d} thousand rupiahs. How many thousand rupiahs remain?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Uang awal (150) dikurangi perkalian harga telur, lalu dikurangi lagi harga kecap.";
          hintEn = "Starting money (150) minus cost of eggs, then minus cost of soy sauce.";
        } else {
          // A * B / C + D
          const c = pickRandom([4, 5, 6]);
          const perTeam = randInt(12, 18);
          const totalPencils = c * perTeam;
          const a = pickRandom([4, 6]);
          const b = Math.round(totalPencils / a);
          const actualTotal = a * b;
          const actualPerTeam = Math.floor(actualTotal / c);
          const d = randInt(6, 10);
          const ans = actualPerTeam + d;
          textId = `Pak Guru menyiapkan ${a} kotak pensil berisi ${b} pensil per kotak. Pensil tersebut dibagikan rata ke ${c} kelompok belajar, lalu setiap kelompok mendapat bonus ${d} pensil cadangan. Berapa pensil yang diterima tiap kelompok?`;
          textEn = `The teacher prepares ${a} pencil boxes with ${b} pencils each. Pencils are divided equally into ${c} study groups, then each group receives ${d} bonus spare pencils. How many pencils does each group get?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "+" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kalikan total pensil awal, bagi dengan jumlah kelompok, lalu tambahkan pensil bonus.";
          hintEn = "Multiply pencil crates, divide by study groups, then add the bonus pencils.";
        }
      }
    }

    // ── GRADE 4 (Fase B / Cambridge Stage 4): Multi-Step Inventory, PEMDAS & Budget Modeling
    else if (grade === 4) {
      if (tier === 1) {
        // TIER 1: Standard 2–3 step operations
        const mode = i % 3;
        if (mode === 0) {
          // A - B * C
          const b = randInt(3, 5);
          const c = pickRandom([15, 18, 20]);
          const ans = 100 - b * c;
          textId = `${name} membawa uang 100 ribu rupiah. Ia membeli ${b} buku ensiklopedia seharga ${c} ribu rupiah per buku. Berapa ribu rupiah sisa uang ${name}?`;
          textEn = `${name} brings 100 thousand rupiahs. He buys ${b} encyclopedia books at ${c} thousand rupiahs each. How many thousand rupiahs are left?`;
          slots = [
            { type: "number", target: "100" },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Uang awal (100) dikurangi hasil kali jumlah buku dengan harganya.";
          hintEn = "Initial cash (100) minus the product of books and their price.";
        } else if (mode === 1) {
          // A * B / C
          const a = randInt(6, 8);
          const b = randInt(12, 16);
          const c = pickRandom([4, 6]);
          const total = a * b;
          const adjustedTotal = Math.floor(total / c) * c;
          const finalB = Math.round(adjustedTotal / a);
          const ans = (a * finalB) / c;
          textId = `Sebanyak ${a} regu pramuka masing-masing beranggotakan ${finalB} anak berkumpul di aula. Mereka kemudian diatur kembali menjadi ${c} barisan sama rata. Berapa anak pada setiap barisan?`;
          textEn = `A total of ${a} scout troops with ${finalB} members each assemble in the hall. They are then reorganized into ${c} equal rows. How many children are in each row?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(finalB) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kalikan banyak regu dengan anggotanya, lalu bagi dengan jumlah barisan baru.";
          hintEn = "Multiply troops by members to find total, then divide by the new rows.";
        } else {
          // A * B + C
          const a = randInt(14, 22);
          const b = randInt(4, 6);
          const c = randInt(25, 45);
          const ans = a * b + c;
          textId = `Sebuah toko roti mengemas roti ke dalam ${b} kardus besar berisi ${a} roti per kardus, serta terdapat ${c} roti dalam etalase toko. Berapa jumlah seluruh roti?`;
          textEn = `A bakery packs loaves into ${b} large cartons containing ${a} loaves each, plus ${c} loaves on the shop shelf. What is the total count of loaves?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kalikan isi kardus dengan jumlah kardus, lalu tambahkan roti di etalase.";
          hintEn = "Multiply carton capacity by count of cartons, then add display loaves.";
        }
      } else if (tier === 2) {
        // TIER 2: 3–4 step operations (A × B − C − D, A × B ÷ C − D, A × B + C × D)
        const mode = i % 3;
        if (mode === 0) {
          // A * B - C - D
          const a = randInt(6, 9);
          const b = randInt(16, 20);
          const c = randInt(25, 40);
          const d = randInt(25, 40);
          const ans = a * b - c - d;
          textId = `Toko kue memanggang ${a} loyang brownies. Tiap loyang dipotong menjadi ${b} potong. Di pagi hari terjual ${c} potong dan di sore hari terjual ${d} potong. Berapa potong brownies yang tersisa?`;
          textEn = `A cake shop bakes ${a} trays of brownies. Each tray yields ${b} slices. In the morning, ${c} slices were sold and in the afternoon ${d} slices were sold. How many slices are left?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung seluruh potongan brownies (${a} × ${b}), lalu kurangkan penjualan pagi dan sore berturut-turut.";
          hintEn = "Calculate all brownie slices (${a} × ${b}), then subtract morning and afternoon sales sequentially.";
        } else if (mode === 1) {
          // A * B / C - D
          const a = randInt(6, 8);
          const b = randInt(20, 28);
          const c = pickRandom([4, 6, 8]);
          const total = a * b;
          const adjustedTotal = Math.floor(total / c) * c;
          const finalB = Math.round(adjustedTotal / a);
          const quotient = (a * finalB) / c;
          const d = randInt(8, 15);
          const ans = quotient - d;
          textId = `Gudang memiliki ${a} peti buah berbobot ${finalB} kg per peti. Seluruh buah dikemas rata ke dalam keranjang kecil berkapasitas ${c} kg. Sebanyak ${d} keranjang langsung dikirim ke pasar. Berapa keranjang buah yang tersisa di gudang?`;
          textEn = `A warehouse has ${a} fruit crates weighing ${finalB} kg each. Fruits are repacked equally into small baskets of ${c} kg capacity. A total of ${d} baskets are dispatched to the market. How many baskets remain in the warehouse?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(finalB) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung berat total buah (${a} × ${finalB}), bagi kapasitas keranjang (${c}), lalu kurangkan keranjang yang dikirim (${d}).";
          hintEn = "Multiply total fruit weight (${a} × ${finalB}), divide by basket capacity (${c}), then subtract sent baskets (${d}).";
        } else {
          // A * B + C * D
          const a = randInt(6, 10);
          const b = randInt(20, 25);
          const c = randInt(5, 8);
          const d = randInt(15, 20);
          const ans = a * b + c * d;
          textId = `Kantin sekolah memesan ${a} dus jus apel berisi ${b} kotak per dus dan ${c} dus jus mangga berisi ${d} kotak per dus. Berapa total seluruh kotak jus yang dipesan kantin?`;
          textEn = `The school cafeteria orders ${a} cartons of apple juice containing ${b} boxes each and ${c} cartons of mango juice containing ${d} boxes each. How many juice boxes were ordered in total?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung perkalian pada kelompok pertama dan kedua, lalu jumlahkan seluruh hasilnya.";
          hintEn = "Multiply the first and second batches, then add both totals.";
        }
      } else {
        // TIER 3 (Challenge): 4–5 step multi-tier expressions (A − B × C − D × E, A × B + C × D − E, A × B ÷ C + D × E, A × B − C × D − E)
        const mode = i % 4;
        if (mode === 0) {
          // A - B * C - D * E
          const a = 260;
          const b = randInt(4, 5);
          const c = randInt(24, 28);
          const d = randInt(3, 4);
          const e = randInt(18, 22);
          const ans = a - b * c - d * e;
          textId = `Koperasi siswa memiliki kas ${a} ribu rupiah. Koperasi memesan ${b} paket buku gambar seharga ${c} ribu per paket dan ${d} set pensil warna seharga ${e} ribu per set. Berapa ribu rupiah sisa saldo kas koperasi?`;
          textEn = `A student cooperative holds a cash balance of ${a} thousand rupiahs. It purchases ${b} drawing book bundles at ${c} thousand per bundle and ${d} coloring pencil sets at ${e} thousand per set. How many thousand rupiahs remain in balance?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Kas mula-mula (${a}) dikurangi biaya buku (${b} × ${c}), lalu dikurangi biaya pensil warna (${d} × ${e}).`;
          hintEn = `Initial cash (${a}) minus book cost (${b} × ${c}), then minus pencil cost (${d} × ${e}).`;
        } else if (mode === 1) {
          // A * B + C * D - E
          const a = randInt(6, 8);
          const b = randInt(40, 48);
          const c = randInt(4, 6);
          const d = randInt(30, 36);
          const totalEggs = a * b + c * d;
          const e = randInt(220, 280);
          const ans = totalEggs - e;
          textId = `Peternakan ayam menghasilkan telur dari ${a} kandang besar berisi ${b} butir per kandang dan ${c} kandang sedang berisi ${d} butir per kandang. Sebanyak ${e} butir telur disetorkan ke supermarket. Berapa butir telur yang tersisa di peternakan?`;
          textEn = `A poultry farm collects eggs from ${a} large coops with ${b} eggs each and ${c} medium coops with ${d} eggs each. A total of ${e} eggs are delivered to the supermarket. How many eggs remain on the farm?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
            { type: "operator", target: "−" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = "Jumlahkan hasil dari kandang besar dan sedang terlebih dahulu dengan perkalian, lalu kurangkan telur yang disetor.";
          hintEn = "Compute egg yield from both coop sets using multiplication, then subtract delivered eggs.";
        } else if (mode === 2) {
          // A * B / C + D * E
          const c = pickRandom([5, 6]);
          const a = 10;
          const b = 24; // 240
          const quotient = (a * b) / c; // 48 or 40
          const d = randInt(3, 4);
          const e = randInt(5, 7);
          const ans = quotient + d * e;
          textId = `Perpustakaan menerima kiriman ${a} dus buku berisi ${b} buku per dus. Buku-buku ditata rata ke dalam ${c} rak utama. Selain itu, setiap rak diberi tambahan ${d} paket sumbangan alumni berisi ${e} buku per paket. Berapa total buku di setiap rak?`;
          textEn = `A library receives ${a} boxes of books with ${b} books each. Books are shelved equally across ${c} main shelves. In addition, each shelf gets ${d} alumni donation packages with ${e} books each. How many books are on each shelf now?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "+" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung buku kiriman per rak (${a} × ${b} ÷ ${c}), lalu tambahkan buku paket sumbangan (${d} × ${e}).`;
          hintEn = `Calculate delivered books per shelf (${a} × ${b} ÷ ${c}), then add donation packages (${d} × ${e}).`;
        } else {
          // A * B - C * D - E
          const a = randInt(12, 16);
          const b = randInt(18, 22);
          const c = randInt(5, 7);
          const d = randInt(20, 24);
          const e = randInt(40, 60);
          const ans = a * b - c * d - e;
          textId = `Pabrik memproduksi ${a} loyang kue lapis berisi ${b} potong per loyang. Toko Mitra A memborong ${c} paket kemasan berisi ${d} potong, dan Toko Mitra B membeli langsung ${e} potong. Berapa potong kue lapis yang masih tersisa di pabrik?`;
          textEn = `A bakery produces ${a} trays of layered cake containing ${b} slices each. Partner Shop A buys ${c} packages of ${d} slices, and Partner Shop B buys ${e} slices directly. How many slices of cake remain in the bakery?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
            { type: "operator", target: "−" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung produksi total (${a} × ${b}), kurangkan pesanan Toko A (${c} × ${d}), lalu kurangkan pembelian Toko B (${e}).`;
          hintEn = `Calculate total production (${a} × ${b}), subtract Shop A orders (${c} × ${d}), then subtract Shop B purchase (${e}).`;
        }
      }
    }

    // ── GRADE 5 (Fase C / Cambridge Stage 5): Commercial Batches, Large Inventories & Financial Deductions
    else if (grade === 5) {
      if (tier === 1) {
        // TIER 1: Standard combined operations
        const mode = i % 3;
        if (mode === 0) {
          // A * B + C * D
          const a = randInt(4, 7);
          const b = randInt(14, 18);
          const c = randInt(3, 6);
          const d = randInt(12, 16);
          const ans = a * b + c * d;
          textId = `Kantin memesan ${a} dus susu cokelat berisi ${b} kotak per dus, dan ${c} dus susu vanila berisi ${d} kotak per dus. Berapa total seluruh susu kotak yang dipesan?`;
          textEn = `The cafeteria orders ${a} crates of chocolate milk with ${b} cartons each, and ${c} crates of vanilla milk with ${d} cartons each. How many cartons were ordered in total?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung perkalian kelompok pertama dan kelompok kedua, lalu jumlahkan keduanya.";
          hintEn = "Calculate the product of the first batch and second batch, then add them.";
        } else if (mode === 1) {
          // A * B - C
          const a = randInt(12, 16);
          const b = pickRandom([25, 30]);
          const c = randInt(60, 95);
          const ans = a * b - c;
          textId = `Gudang logistik menerima ${a} karung beras seberat ${b} kg per karung. Hari ini disalurkan bantuan sebanyak ${c} kg beras. Berapa kg beras yang tersisa di gudang?`;
          textEn = `A logistics hub receives ${a} sacks of rice weighing ${b} kg each. Today, ${c} kg of rice was distributed for aid. How many kg of rice remain?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung berat total persediaan dengan perkalian, lalu kurangkan beras bantuan.";
          hintEn = "Multiply sacks by unit weight to find total supply, then subtract distributed aid.";
        } else {
          // A * B / C + D
          const a = 12;
          const b = 25; // 300
          const c = 6;  // 50
          const d = randInt(15, 25);
          const ans = 50 + d;
          textId = `Petani memetik ${a} keranjang buah berisi ${b} buah per keranjang. Buah tersebut dibagi rata ke ${c} peti besar, lalu setiap peti ditambah ${d} buah bonus. Berapa isi setiap peti sekarang?`;
          textEn = `A farmer harvests ${a} fruit crates containing ${b} fruits each. The fruits are divided equally among ${c} large bins, and ${d} bonus fruits are added to each bin. How many fruits are in each bin now?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "+" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = "Kalikan isi keranjang, bagi dengan jumlah peti, lalu tambahkan buah bonus.";
          hintEn = "Multiply crate content, divide by bin count, then add bonus fruits.";
        }
      } else if (tier === 2) {
        // TIER 2: 3–4 step operations with hundreds of thousands & supply logistics
        const mode = i % 3;
        if (mode === 0) {
          // A - B * C - D * E
          const a = 500;
          const b = randInt(6, 8);
          const c = randInt(40, 46);
          const d = randInt(4, 6);
          const e = randInt(25, 30);
          const ans = a - b * c - d * e;
          textId = `Panitia pentas seni memiliki anggaran ${a} ribu rupiah. Panitia menyewa ${b} set lampu panggung seharga ${c} ribu per set dan membeli ${d} roll kain dekorasi seharga ${e} ribu per roll. Berapa ribu rupiah sisa anggaran panitia?`;
          textEn = `The arts event committee holds a budget of ${a} thousand rupiahs. It rents ${b} stage light sets at ${c} thousand per set and buys ${d} decorative fabric rolls at ${e} thousand per roll. How many thousand rupiahs remain in budget?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Anggaran mula-mula (${a}) dikurangi sewa lampu (${b} × ${c}), lalu dikurangi pembelian kain (${d} × ${e}).`;
          hintEn = `Starting budget (${a}) minus light rental (${b} × ${c}), then minus fabric cost (${d} × ${e}).`;
        } else if (mode === 1) {
          // A * B + C * D - E
          const a = randInt(14, 18);
          const b = randInt(40, 48);
          const c = randInt(10, 14);
          const d = randInt(30, 36);
          const totalStock = a * b + c * d;
          const e = randInt(650, 750);
          const ans = totalStock - e;
          textId = `Gudang sembako menerima ${a} karung beras super seberat ${b} kg per karung dan ${c} karung beras medium seberat ${d} kg per karung. Disalurkan sebanyak ${e} kg untuk pasar murah. Berapa kg beras yang masih ada di gudang?`;
          textEn = `A food grain warehouse receives ${a} sacks of premium rice weighing ${b} kg each and ${c} sacks of regular rice weighing ${d} kg each. A total of ${e} kg is distributed for aid. How many kg of rice remain in the warehouse?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
            { type: "operator", target: "−" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung persediaan total beras super dan medium dengan perkalian, lalu kurangkan beras yang disalurkan.";
          hintEn = "Calculate total stock from both rice batches with multiplication, then subtract the distributed aid.";
        } else {
          // A * B / C + D
          const a = 16;
          const b = 45; // 720
          const c = 12; // 60
          const d = randInt(12, 18);
          const ans = 60 + d;
          textId = `Pabrik garmen memotong ${a} gulung bahan sepanjang ${b} meter per gulung untuk dijadikan ${c} unit tenda pramuka secara sama rata. Setiap tenda kemudian diberi tambahan terpal pelindung sepanjang ${d} meter. Berapa total panjang bahan dan terpal per tenda?`;
          textEn = `A garment factory cuts ${a} rolls of fabric of ${b} meters each to fabricate ${c} scout tents equally. Each tent is then fitted with an extra protective tarpaulin of ${d} meters. What is the total length of fabric and tarpaulin per tent?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "+" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung panjang bahan per tenda (${a} × ${b} ÷ ${c}), lalu tambahkan panjang terpal pelindung (${d}).`;
          hintEn = `Calculate tent fabric length (${a} × ${b} ÷ ${c}), then add tarpaulin length (${d}).`;
        }
      } else {
        // TIER 3 (Challenge): Advanced multi-commodity financial reconciliation & bulk distributions
        const mode = i % 4;
        if (mode === 0) {
          // A - B * C - D * E - F
          const a = 800;
          const b = randInt(10, 12);
          const c = randInt(40, 45);
          const d = randInt(7, 9);
          const e = randInt(30, 35);
          const f = pickRandom([35, 40, 45]);
          const ans = a - b * c - d * e - f;
          textId = `Koperasi sekolah memiliki dana kas belanja ${a} ribu rupiah. Koperasi memesan ${b} lusin seragam seharga ${c} ribu per lusin, ${d} tas ransel seharga ${e} ribu per buah, dan membayar ongkos ekspedisi barang ${f} ribu rupiah. Berapa ribu rupiah sisa dana kas koperasi?`;
          textEn = `A school cooperative has a procurement cash fund of ${a} thousand rupiahs. It orders ${b} dozen uniforms at ${c} thousand per dozen, ${d} backpacks at ${e} thousand each, and pays a shipping fee of ${f} thousand rupiahs. How many thousand rupiahs remain in fund?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
            { type: "operator", target: "−" },
            { type: "number", target: String(f) },
          ];
          expectedAnswer = String(ans);
          hintId = `Dana mula-mula (${a}) dikurangi seragam (${b} × ${c}), dikurangi tas (${d} × ${e}), lalu dikurangi biaya ekspedisi (${f}).`;
          hintEn = `Initial fund (${a}) minus uniforms (${b} × ${c}), minus bags (${d} × ${e}), then minus shipping (${f}).`;
        } else if (mode === 1) {
          // A * B + C * D - E * F
          const a = randInt(20, 24);
          const b = randInt(32, 38);
          const c = randInt(16, 20);
          const d = randInt(28, 34);
          const e = randInt(14, 18);
          const f = randInt(48, 55);
          const ans = a * b + c * d - e * f;
          textId = `Toko grosir mendatangkan ${a} peti buah pir berisi ${b} kg per peti dan ${c} peti buah apel berisi ${d} kg per peti. Selama sepekan, terjual ${e} paket borongan seberat ${f} kg per paket. Berapa kg buah yang tersisa di toko grosir?`;
          textEn = `A wholesale shop imports ${a} crates of pears at ${b} kg per crate and ${c} crates of apples at ${d} kg per crate. Over the week, ${e} wholesale packs of ${f} kg each were sold. How many kg of fruits remain?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
            { type: "operator", target: "−" },
            { type: "number", target: String(e) },
            { type: "operator", target: "×" },
            { type: "number", target: String(f) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung persediaan kedua jenis buah (${a} × ${b} + ${c} × ${d}), lalu kurangkan penjualan borongan (${e} × ${f}).`;
          hintEn = `Calculate incoming supply of both fruits (${a} × ${b} + ${c} × ${d}), then subtract bulk sales (${e} × ${f}).`;
        } else if (mode === 2) {
          // A * B / C - D * E
          const a = 24;
          const b = 30; // 720
          const c = 12; // 60
          const d = randInt(5, 7);
          const e = randInt(6, 8);
          const ans = 60 - d * e;
          textId = `Pabrik mengemas ${a} dus biskuit berisi ${b} bungkus per dus. Seluruh biskuit dikemas ulang sama rata ke dalam ${c} kotak kado besar. Dari kotak kado yang terbentuk, sebanyak ${d} panti asuhan masing-masing menerima ${e} kotak kado. Berapa kotak kado yang tersisa di pabrik?`;
          textEn = `A confectionery packs ${a} cartons of biscuits of ${b} packs each. All biscuits are repacked equally into ${c} large gift boxes. From these gift boxes, ${d} orphanages receive ${e} gift boxes each. How many gift boxes remain?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung jumlah kotak kado yang dikemas (${a} × ${b} ÷ ${c}), lalu kurangkan kotak yang dibagikan (${d} × ${e}).`;
          hintEn = `Calculate total packaged gift boxes (${a} × ${b} ÷ ${c}), then subtract distributed boxes (${d} × ${e}).`;
        } else {
          // A * B - C * D + E
          const a = randInt(14, 16);
          const b = randInt(60, 68);
          const c = randInt(5, 7);
          const d = randInt(25, 30);
          const e = pickRandom([35, 40, 45]);
          const ans = a * b - c * d + e;
          textId = `Toko olahraga membeli ${a} pasang sepatu futsal seharga ${b} ribu per pasang. Toko memperoleh diskon berupa ${c} lembar voucer senilai ${d} ribu per lembar, serta dikenakan biaya asuransi pengiriman sebesar ${e} ribu rupiah. Berapa ribu rupiah total bersih yang harus dibayar?`;
          textEn = `A sports store buys ${a} pairs of futsal shoes at ${b} thousand per pair. It earns a discount of ${c} vouchers worth ${d} thousand each, but incurs a shipment insurance fee of ${e} thousand rupiahs. What is the net payable in thousand rupiahs?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
            { type: "operator", target: "+" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung harga bruto (${a} × ${b}), kurangkan nilai potongan voucer (${c} × ${d}), lalu tambahkan biaya asuransi (${e}).`;
          hintEn = `Calculate gross cost (${a} × ${b}), subtract voucher discounts (${c} × ${d}), then add insurance (${e}).`;
        }
      }
    }

    // ── GRADE 6 (Fase C / Cambridge Stage 6 & OSN SD): Algebraic Modeling, Cascading Ratios, Multi-Item Budgets
    else {
      if (tier === 1) {
        // TIER 1: Foundational 3-step commercial operations
        const mode = i % 3;
        if (mode === 0) {
          // 300 - A * B
          const a = randInt(5, 7);
          const b = pickRandom([30, 35, 40]);
          const ans = 300 - a * b;
          textId = `Koperasi sekolah memiliki anggaran kas 300 ribu rupiah. Koperasi memesan ${a} paket perlengkapan seharga ${b} ribu rupiah per paket. Berapa ribu rupiah sisa saldo koperasi?`;
          textEn = `A school cooperative holds a 300 thousand rupiah budget. It procures ${a} equipment bundles at ${b} thousand rupiahs per bundle. How many thousand rupiahs remain in balance?`;
          slots = [
            { type: "number", target: "300" },
            { type: "operator", target: "−" },
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
          ];
          expectedAnswer = String(ans);
          hintId = "Modal awal (300) dikurangi total biaya pembelian paket perlengkapan.";
          hintEn = "Initial capital (300) minus the total expenditure on equipment bundles.";
        } else if (mode === 1) {
          // A * B / C
          const c = randInt(4, 6);
          const b = randInt(5, 8);
          const mult = randInt(15, 25);
          const a = c * mult;
          const ans = (a * b) / c;
          textId = `Perbandingan antara banyak buku fiksi dan non-fiksi adalah ${c} : ${b}. Jika perpustakaan memiliki ${a} buku fiksi, susun kalimat matematika dan hitung jumlah buku non-fiksi!`;
          textEn = `The ratio of fiction to non-fiction books is ${c} : ${b}. If the library holds ${a} fiction books, formulate the math sentence and solve for non-fiction books!`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
          ];
          expectedAnswer = String(ans);
          hintId = "Gunakan prinsip rasio: kalikan jumlah buku yang diketahui dengan rasio target, lalu bagi dengan rasio asal.";
          hintEn = "Apply ratio rule: multiply known book count by target ratio, then divide by initial ratio.";
        } else {
          // A * B - C * D
          const a = randInt(8, 12);
          const b = pickRandom([25, 30]);
          const c = randInt(3, 5);
          const d = pickRandom([15, 20]);
          const ans = a * b - c * d;
          textId = `Toko grosir membeli ${a} koli barang seharga ${b} ribu rupiah per koli dan memperoleh potongan diskon berupa ${c} voucer senilai ${d} ribu rupiah per voucer. Berapa ribu rupiah total bersih yang dibayar?`;
          textEn = `A wholesale shop buys ${a} cartons of merchandise at ${b} thousand rupiahs each and receives a discount of ${c} coupons worth ${d} thousand rupiahs each. What is the net payable in thousand rupiahs?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "−" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung harga bruto (${a} × ${b}) lalu kurangkan dengan nilai diskon (${c} × ${d}).`;
          hintEn = `Calculate gross cost (${a} × ${b}) then subtract the total discount (${c} × ${d}).`;
        }
      } else if (tier === 2) {
        // TIER 2: 3–4 step operations (Ratio + Addition, Budget Reconciliation, Dual Production)
        const mode = i % 3;
        if (mode === 0) {
          // A * B / C + D
          const c = pickRandom([4, 5, 6]);
          const b = randInt(7, 9);
          const mult = randInt(25, 35);
          const a = c * mult;
          const initialTarget = (a * b) / c;
          const d = randInt(35, 65);
          const ans = initialTarget + d;
          textId = `Perbandingan antara banyak buku sains dan matematika di perpustakaan adalah ${c} : ${b}. Jika terdapat ${a} buku sains, dan perpustakaan baru saja membeli ${d} buku matematika tambahan, berapa jumlah seluruh buku matematika sekarang?`;
          textEn = `The ratio of science books to math books in the library is ${c} : ${b}. If there are ${a} science books, and the library has just procured ${d} additional math books, what is the total count of math books now?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "+" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung buku matematika mula-mula dengan prinsip rasio (${a} × ${b} ÷ ${c}), lalu tambahkan buku baru (${d}).`;
          hintEn = `Calculate initial math books with ratio (${a} × ${b} ÷ ${c}), then add newly acquired books (${d}).`;
        } else if (mode === 1) {
          // A - B * C - D * E
          const a = 1000;
          const b = randInt(12, 15);
          const c = randInt(42, 48);
          const d = randInt(8, 10);
          const e = randInt(32, 38);
          const ans = a - b * c - d * e;
          textId = `Kas operasional sekolah berjumlah ${a} ribu rupiah. Kas tersebut digunakan untuk membeli ${b} unit papan tulis whiteboard seharga ${c} ribu per unit dan ${d} proyektor mini seharga ${e} ribu per proyektor. Berapa ribu rupiah sisa saldo kas operasional?`;
          textEn = `The school operations fund stands at ${a} thousand rupiahs. It is spent to purchase ${b} whiteboard units at ${c} thousand per unit and ${d} mini projectors at ${e} thousand per projector. How many thousand rupiahs remain in balance?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Kas awal (${a}) dikurangi biaya papan tulis (${b} × ${c}), lalu dikurangi biaya proyektor (${d} × ${e}).`;
          hintEn = `Starting funds (${a}) minus whiteboard expenditure (${b} × ${c}), then minus projector expenditure (${d} × ${e}).`;
        } else {
          // A * B + C * D - E
          const a = randInt(22, 26);
          const b = randInt(40, 48);
          const c = randInt(15, 18);
          const d = randInt(32, 38);
          const totalStock = a * b + c * d;
          const e = randInt(350, 450);
          const ans = totalStock - e;
          textId = `Pabrik garmen memproduksi ${a} koli kemeja berisi ${b} potong per koli dan ${c} koli celana berisi ${d} potong per koli. Sebelum pengapalan ke luar negeri, sebanyak ${e} potong pakaian disisihkan untuk uji kendali mutu. Berapa potong pakaian yang siap dikapalkan?`;
          textEn = `A garment factory manufactures ${a} cartons of shirts with ${b} pieces each and ${c} cartons of trousers with ${d} pieces each. Before international shipment, ${e} garments are set aside for quality inspection. How many garments are ready for shipment?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
            { type: "operator", target: "−" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = "Hitung produksi kemeja dan celana dengan perkalian, lalu kurangkan pakaian yang diuji mutu.";
          hintEn = "Calculate shirt and trousers production via multiplication, then subtract garments selected for QC inspection.";
        }
      } else {
        // TIER 3 (Challenge / OSN SD & Cambridge Stage 6 Mastery):
        // 5-6 operation multi-tier financial reconciliations, cascading ratios, multi-commodity logistics
        const mode = i % 5;
        if (mode === 0) {
          // A - B * C - D * E + F * G
          const a = 1200;
          const b = randInt(16, 18);
          const c = randInt(40, 44);
          const d = randInt(14, 16);
          const e = randInt(20, 24);
          const f = randInt(5, 7);
          const g = 25; // 25k voucher
          const ans = a - b * c - d * e + f * g;
          textId = `Sebuah yayasan sosial memiliki dana kas ${a} ribu rupiah. Yayasan memesan ${b} meja belajar seharga ${c} ribu per meja dan ${d} kursi belajar seharga ${e} ribu per kursi. Karena belanja dalam jumlah besar, yayasan memperoleh cashback berupa ${f} lembar voucer belanja senilai ${g} ribu rupiah per lembar. Berapa ribu rupiah total kas yayasan sekarang?`;
          textEn = `An educational foundation has a cash fund of ${a} thousand rupiahs. It orders ${b} study desks at ${c} thousand per desk and ${d} study chairs at ${e} thousand per chair. Because of the bulk order, it receives cashback of ${f} vouchers worth ${g} thousand rupiahs each. What is the foundation's total cash balance now?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
            { type: "operator", target: "+" },
            { type: "number", target: String(f) },
            { type: "operator", target: "×" },
            { type: "number", target: String(g) },
          ];
          expectedAnswer = String(ans);
          hintId = `Kas awal (${a}) dikurangi belanja meja (${b} × ${c}), dikurangi kursi (${d} × ${e}), lalu ditambahkan cashback voucer (${f} × ${g}).`;
          hintEn = `Starting funds (${a}) minus desks (${b} × ${c}), minus chairs (${d} × ${e}), then plus cashback vouchers (${f} × ${g}).`;
        } else if (mode === 1) {
          // A * B / C + D - E (Cascading Ratio)
          const c = 6;
          const b = 11;
          const a = 240; // 240 * 11 / 6 = 440
          const d = randInt(75, 90);
          const e = randInt(50, 70);
          const ans = 440 + d - e;
          textId = `Rasio bibit ikan nila dan gurame di sebuah tambak percontohan adalah ${c} : ${b}. Pengelola memasukkan ${a} bibit nila. Seminggu kemudian pengelola menambah lagi ${d} bibit gurame dan memindahkan ${e} bibit gurame ke kolam pemijahan. Berapa bibit gurame yang berada di tambak percontohan sekarang?`;
          textEn = `The ratio of tilapia fingerlings to gourami fingerlings in a pilot fishpond is ${c} : ${b}. The operator introduces ${a} tilapia fingerlings. A week later, ${d} more gourami fingerlings are added and ${e} gourami fingerlings are relocated to a breeding pool. How many gourami fingerlings are in the pilot fishpond now?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "+" },
            { type: "number", target: String(d) },
            { type: "operator", target: "−" },
            { type: "number", target: String(e) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung bibit gurame mula-mula dengan rasio (${a} × ${b} ÷ ${c}), tambahkan bibit baru (${d}), lalu kurangkan bibit yang dipindahkan (${e}).`;
          hintEn = `Calculate initial gourami with ratio (${a} × ${b} ÷ ${c}), add newly introduced ones (${d}), then subtract relocated ones (${e}).`;
        } else if (mode === 2) {
          // A * B + C * D - E * F (Multi-Warehouse Logistics)
          const a = randInt(25, 28);
          const b = 50; // 1250 - 1400
          const c = randInt(20, 24);
          const d = 40; // 800 - 960
          const e = randInt(22, 25);
          const f = 60; // 1320 - 1500
          const ans = a * b + c * d - e * f;
          textId = `Pabrik pengalengan makanan memproduksi ${a} palet sarden berisi ${b} kaleng per palet dan ${c} palet kornet berisi ${d} kaleng per palet. Distributor nasional lalu mengangkut ${e} kontainer borongan yang masing-masing memuat ${f} kaleng. Berapa kaleng makanan yang masih tersisa di gudang pabrik?`;
          textEn = `A cannery produces ${a} pallets of sardines with ${b} cans per pallet and ${c} pallets of corned beef with ${d} cans per pallet. A national distributor loads ${e} bulk cargo containers carrying ${f} cans each. How many cans of food remain in the cannery warehouse?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "+" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
            { type: "operator", target: "−" },
            { type: "number", target: String(e) },
            { type: "operator", target: "×" },
            { type: "number", target: String(f) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung total kaleng sarden (${a} × ${b}) ditambah kornet (${c} × ${d}), lalu kurangkan seluruh kaleng yang diangkut (${e} × ${f}).`;
          hintEn = `Calculate total sardine cans (${a} × ${b}) plus corned beef (${c} × ${d}), then subtract dispatched cans (${e} × ${f}).`;
        } else if (mode === 3) {
          // A - B * C - D * E - F * G (Construction Multi-Material)
          const a = 1500;
          const b = randInt(20, 22);
          const c = randInt(42, 45); // 840 - 990
          const d = randInt(12, 15);
          const e = randInt(24, 28); // 288 - 420
          const f = randInt(4, 5);
          const g = randInt(30, 35); // 120 - 175
          const ans = a - b * c - d * e - f * g;
          textId = `Kontraktor pembangunan memiliki kas operasional ${a} ribu rupiah. Beliau membeli ${b} sak semen seharga ${c} ribu per sak, ${d} batang besi beton seharga ${e} ribu per batang, dan ${f} kaleng cat pelapis seharga ${g} ribu per kaleng. Berapa ribu rupiah sisa kas operasional kontraktor?`;
          textEn = `A building contractor holds operational funds of ${a} thousand rupiahs. He purchases ${b} sacks of cement at ${c} thousand per sack, ${d} rebar steel bars at ${e} thousand per bar, and ${f} sealant paint cans at ${g} thousand per can. How many thousand rupiahs remain in operational funds?`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "−" },
            { type: "number", target: String(b) },
            { type: "operator", target: "×" },
            { type: "number", target: String(c) },
            { type: "operator", target: "−" },
            { type: "number", target: String(d) },
            { type: "operator", target: "×" },
            { type: "number", target: String(e) },
            { type: "operator", target: "−" },
            { type: "number", target: String(f) },
            { type: "operator", target: "×" },
            { type: "number", target: String(g) },
          ];
          expectedAnswer = String(ans);
          hintId = `Kas awal (${a}) dikurangi semen (${b} × ${c}), dikurangi besi (${d} × ${e}), lalu dikurangi cat (${f} × ${g}).`;
          hintEn = `Initial cash (${a}) minus cement (${b} × ${c}), minus steel bars (${d} × ${e}), then minus paint (${f} × ${g}).`;
        } else {
          // A * B / C * D (Industrial Distribution)
          const c = 15;
          const a = 25;
          const b = 36; // 25 * 36 = 900. 900 / 15 = 60 kg per box
          const d = randInt(9, 13);
          const ans = 60 * d;
          textId = `Sebuah perkebunan apel memetik ${a} keranjang buah berbobot ${b} kg per keranjang. Seluruh apel disortir dan dikemas rata ke dalam ${c} kotak kayu pengiriman. Jika supermarket memborong ${d} kotak kayu tersebut, susun kalimat matematika dan hitung berapa kg total apel yang diborong supermarket!`;
          textEn = `An apple plantation harvests ${a} fruit crates weighing ${b} kg per crate. All apples are sorted and packed equally into ${c} wooden shipping crates. If a supermarket buys ${d} of those crates in bulk, formulate the math sentence and solve for total kg of apples purchased!`;
          slots = [
            { type: "number", target: String(a) },
            { type: "operator", target: "×" },
            { type: "number", target: String(b) },
            { type: "operator", target: "÷" },
            { type: "number", target: String(c) },
            { type: "operator", target: "×" },
            { type: "number", target: String(d) },
          ];
          expectedAnswer = String(ans);
          hintId = `Hitung panen total (${a} × ${b}), bagi jumlah kotak (${c}) untuk mengetahui berat per kotak, lalu kalikan kotak yang diborong (${d}).`;
          hintEn = `Calculate total harvest (${a} × ${b}), divide by crate count (${c}) to find weight per crate, then multiply by purchased crates (${d}).`;
        }
      }
    }

    const qId = `dyn-wp-${grade}-${Date.now()}-${i}-${randInt(100, 999)}`;
    list.push({
      id: qId,
      grade,
      difficultyTier: tier,
      topic: "soal-cerita",
      question: { id: textId, en: textEn },
      simulator: {
        type: "word-problem-builder",
        storyText: textId,
        storyTextEn: textEn,
        slots,
        expectedAnswer,
      },
      options: [
        { value: expectedAnswer, isCorrect: true },
        { value: String(Math.max(1, parseInt(expectedAnswer, 10) + randInt(3, 8))), isCorrect: false, misconceptionTag: "word-problem-model-error" },
        { value: String(Math.max(1, parseInt(expectedAnswer, 10) - randInt(3, 8))), isCorrect: false, misconceptionTag: "word-problem-model-error" },
      ],
      smartHint: {
        id: hintId,
        en: hintEn,
      },
    });
  }

  return list;
}

// ─── 3. Penjumlahan & Pengurangan Dasar (Kelas 1) ──────────────────────────────
export function generateBasicArithmeticQuestions(
  grade: number,
  topic: "penjumlahan-dasar" | "pengurangan-dasar",
  tier: number,
  count: number
): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const fruitItem = pickRandom(FRUITS_BILINGUAL);
    const fruitId = fruitItem.id;
    const fruitEn = fruitItem.en;
    const isAdd = topic === "penjumlahan-dasar";

    let a: number, b: number, ans: number;
    if (isAdd) {
      if (tier === 1) {
        // Within 10
        a = randInt(2, 6);
        b = randInt(1, 9 - a);
      } else if (tier === 2) {
        // Crossing 10 (carry-over concept)
        a = randInt(6, 9);
        b = randInt(4, 9);
      } else {
        // Tier 3: Teens + single digit bridge (11..15 + 4..9)
        a = randInt(11, 15);
        b = randInt(4, 9);
      }
      ans = a + b;
    } else {
      if (tier === 1) {
        // Within 10
        a = randInt(4, 9);
        b = randInt(1, a - 1);
      } else if (tier === 2) {
        // Crossing 10 (borrowing concept)
        a = randInt(11, 15);
        b = randInt(a - 9, Math.min(9, a - 1));
      } else {
        // Tier 3: 2-digit borrow crossing 10 (14..19 - 6..9)
        a = randInt(14, 19);
        b = randInt(6, 9);
      }
      ans = a - b;
    }

    const qTextId = isAdd
      ? `Ada ${a} ${fruitId}, lalu ditambah ${b} ${fruitId} lagi. Berapa jumlahnya?`
      : `Ada ${a} ${fruitId}, diambil ${b} ${fruitId}. Berapa sisa ${fruitId}?`;
    const qTextEn = isAdd
      ? `There are ${a} ${fruitEn}, then ${b} more ${fruitEn} are added. What is the total?`
      : `There are ${a} ${fruitEn}, and ${b} ${fruitEn} are taken away. How many ${fruitEn} remain?`;

    const hintId = isAdd
      ? "Hitung maju mulai dari angka pertama sebanyak angka kedua."
      : "Hitung mundur dari jumlah mula-mula sebanyak buah yang diambil.";
    const hintEn = isAdd
      ? "Count forward from the first number by the second number."
      : "Count backwards from the initial amount by the removed amount.";

    const qId = `dyn-basic-${topic}-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;
    list.push({
      id: qId,
      grade,
      difficultyTier: tier,
      topic,
      question: { id: qTextId, en: qTextEn },
      simulator: {
        type: "fruit-basket",
        fruits: [fruitId],
        initialCount: a,
        addCount: isAdd ? b : 0,
        removeCount: !isAdd ? b : 0,
      },
      options: [
        { value: String(ans), isCorrect: true },
        { value: String(ans + 1), isCorrect: false, misconceptionTag: "off-by-one-count" },
        { value: String(ans - 1), isCorrect: false, misconceptionTag: "off-by-one-count" },
      ],
      smartHint: {
        id: hintId,
        en: hintEn,
      },
    });
  }

  return list;
}

// ─── 4. Penjumlahan & Pengurangan Dua Digit Bersusun (Kelas 1 & 2) ─────────────
export function generateColumnArithmeticQuestions(
  grade: number,
  topic: "penjumlahan-dua-digit" | "pengurangan-dua-digit",
  tier: number,
  count: number
): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const isAdd = topic === "penjumlahan-dua-digit";
    let a: number, b: number, ans: number;

    if (grade === 1) {
      // Grade 1: Foundational 2-digit introduction
      if (isAdd) {
        if (tier === 1) {
          // 2-digit + 1-digit without carry
          const tensA = randInt(1, 3);
          const unitsA = randInt(1, 4);
          const unitsB = randInt(1, 9 - unitsA);
          a = tensA * 10 + unitsA;
          b = unitsB;
        } else if (tier === 2) {
          // 2-digit + 1-digit crossing 10 (with carry)
          const tensA = randInt(1, 3);
          const unitsA = randInt(5, 9);
          const unitsB = randInt(10 - unitsA, 9);
          a = tensA * 10 + unitsA;
          b = unitsB;
        } else {
          // Tier 3: 2-digit + 2-digit (clean, sum up to 60)
          const tensA = randInt(1, 3);
          const unitsA = randInt(2, 6);
          const tensB = randInt(1, 2);
          const unitsB = randInt(1, 8 - unitsA);
          a = tensA * 10 + unitsA;
          b = tensB * 10 + unitsB;
        }
        ans = a + b;
      } else {
        if (tier === 1) {
          const tensA = randInt(2, 4);
          const unitsA = randInt(5, 9);
          const unitsB = randInt(1, unitsA - 1);
          a = tensA * 10 + unitsA;
          b = unitsB;
        } else if (tier === 2) {
          // With borrow from tens
          const tensA = randInt(2, 4);
          const unitsA = randInt(1, 4);
          const unitsB = randInt(unitsA + 2, 9);
          a = tensA * 10 + unitsA;
          b = unitsB;
        } else {
          // 2-digit minus 2-digit without borrow
          const tensA = randInt(3, 5);
          const unitsA = randInt(4, 8);
          const tensB = randInt(1, tensA - 1);
          const unitsB = randInt(1, unitsA);
          a = tensA * 10 + unitsA;
          b = tensB * 10 + unitsB;
        }
        ans = a - b;
      }
    } else {
      // Grade 2: Full 2-digit curriculum
      if (isAdd) {
        if (tier === 1) {
          // Without carry
          const tensA = randInt(2, 5);
          const unitsA = randInt(1, 5);
          const tensB = randInt(1, 4);
          const unitsB = randInt(1, 9 - unitsA);
          a = tensA * 10 + unitsA;
          b = tensB * 10 + unitsB;
        } else if (tier === 2) {
          // With carry (menyimpan puluhan)
          const tensA = randInt(2, 5);
          const unitsA = randInt(5, 9);
          const tensB = randInt(1, 4);
          const unitsB = randInt(10 - unitsA, 9);
          a = tensA * 10 + unitsA;
          b = tensB * 10 + unitsB;
        } else {
          // Tier 3: Double carry / sum crossing 100 (>100)
          const tensA = randInt(6, 9);
          const unitsA = randInt(6, 9);
          const tensB = randInt(4, 8);
          const unitsB = randInt(10 - unitsA, 9);
          a = tensA * 10 + unitsA;
          b = tensB * 10 + unitsB;
        }
        ans = a + b;
      } else {
        if (tier === 1) {
          // Without regrouping
          const tensA = randInt(4, 9);
          const unitsA = randInt(4, 9);
          const tensB = randInt(1, tensA - 1);
          const unitsB = randInt(1, unitsA);
          a = tensA * 10 + unitsA;
          b = tensB * 10 + unitsB;
        } else if (tier === 2) {
          // With regrouping (meminjam puluhan)
          const tensA = randInt(5, 9);
          const unitsA = randInt(1, 5);
          const tensB = randInt(1, tensA - 2);
          const unitsB = randInt(unitsA + 2, 9);
          a = tensA * 10 + unitsA;
          b = tensB * 10 + unitsB;
        } else {
          // Tier 3: 3-digit borrow crossing 100
          const hundreds = randInt(1, 1);
          const tensA = randInt(2, 5);
          const unitsA = randInt(1, 5);
          a = hundreds * 100 + tensA * 10 + unitsA;
          const tensB = randInt(4, 8);
          const unitsB = randInt(unitsA + 2, 9);
          b = tensB * 10 + unitsB;
        }
        ans = a - b;
      }
    }

    const qTextId = isAdd ? `Berapa hasil ${a} + ${b}?` : `Berapa hasil ${a} dikurangi ${b}?`;
    const qTextEn = isAdd ? `What is ${a} + ${b}?` : `What is ${a} minus ${b}?`;

    const hintId = isAdd
      ? "Hitung kolom satuan di sebelah kanan terlebih dahulu, lalu lanjutkan dengan kolom puluhan."
      : "Kurangkan kolom satuan di kanan terlebih dahulu. Jika angka atas lebih kecil, pinjam 1 puluhan dari sebelahnya.";
    const hintEn = isAdd
      ? "Calculate the ones column on the right first, then move to the tens column."
      : "Subtract the ones column on the right first. If the top digit is smaller, regroup (borrow) 1 ten from the left.";

    const colCount = Math.max(2, String(a).length, String(b).length, String(ans).length);
    const qId = `dyn-col-${topic}-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;
    list.push({
      id: qId,
      grade,
      difficultyTier: tier,
      topic,
      question: { id: qTextId, en: qTextEn },
      simulator: {
        type: "column-arithmetic",
        operation: isAdd ? "add" : "subtract",
        operands: [a, b],
        digitCount: colCount,
      },
      options: [
        { value: String(ans), isCorrect: true },
        { value: String(ans + 10), isCorrect: false, misconceptionTag: "column-carry-error" },
        { value: String(ans - 1), isCorrect: false, misconceptionTag: "off-by-one-count" },
      ],
      smartHint: {
        id: hintId,
        en: hintEn,
      },
    });
  }

  return list;
}

// ─── 5. Perkalian & Pembagian (Kelas 3) ────────────────────────────────────────
export function generateMultDivQuestions(
  grade: number,
  topic: "perkalian" | "pembagian",
  tier: number,
  count: number
): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const isMult = topic === "perkalian";
    let a: number, b: number, ans: number;

    if (isMult) {
      if (tier === 1) {
        // Foundational times tables: 2..5 × 2..6
        a = randInt(2, 5);
        b = randInt(2, 6);
      } else if (tier === 2) {
        // Standard tables (6..9 × 6..9) or basic tens (12..16 × 3..5)
        const isTens = i % 2 === 0;
        if (isTens) {
          a = pickRandom([12, 14, 15, 16, 20]);
          b = randInt(3, 5);
        } else {
          a = randInt(6, 9);
          b = randInt(6, 9);
        }
      } else {
        // Tier 3: Intermediate 2-digit × 1-digit with heavy carry (25..85 × 4..7)
        a = pickRandom([24, 28, 35, 42, 45, 54, 65, 75]);
        b = randInt(4, 7);
      }
      ans = a * b;
      const qId = `dyn-mult-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;
      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "perkalian",
        question: {
          id: `Berapa hasil ${a} dikali ${b}?`,
          en: `What is ${a} times ${b}?`,
        },
        simulator: {
          type: "column-arithmetic",
          operation: "multiply",
          operands: [a, b],
          digitCount: String(ans).length,
        },
        options: shuffle([
          { value: String(ans), isCorrect: true },
          { value: String(ans + a), isCorrect: false, misconceptionTag: "multiplication-table-error" },
          { value: String(Math.max(1, ans - a)), isCorrect: false, misconceptionTag: "multiplication-table-error" },
        ]),
        smartHint: {
          id: `Gunakan perkalian bersusun: kalikan satuan terlebih dahulu (${b} × satuan), lalu kalikan puluhan dan tambahkan simpanan.`,
          en: `Use column multiplication: multiply the ones digit first, then multiply the tens digit and add any carry.`,
        },
      });
    } else {
      if (tier === 1) {
        // Small divisions within times tables (quotient 2..5, divisor 2..5)
        const quotient = randInt(2, 5);
        b = randInt(2, 5);
        a = quotient * b;
        ans = quotient;
      } else if (tier === 2) {
        // Standard divisions (divisor 6..9, quotient 6..9)
        const quotient = randInt(6, 9);
        b = randInt(6, 9);
        a = quotient * b;
        ans = quotient;
      } else {
        // Tier 3: 2-digit quotients (84 ÷ 4 = 21, 96 ÷ 6 = 16, 108 ÷ 9 = 12, 135 ÷ 5 = 27)
        const quotient = randInt(12, 28);
        b = pickRandom([4, 5, 6, 7, 8, 9]);
        a = quotient * b;
        ans = quotient;
      }
      const qId = `dyn-div-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;
      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "pembagian",
        question: {
          id: `Berapa hasil ${a} dibagi ${b}?`,
          en: `What is ${a} divided by ${b}?`,
        },
        simulator: {
          type: "column-arithmetic",
          operation: "divide",
          operands: [a, b],
          digitCount: String(ans).length,
        },
        options: shuffle([
          { value: String(ans), isCorrect: true },
          { value: String(ans + 2), isCorrect: false, misconceptionTag: "division-table-error" },
          { value: String(Math.max(1, ans - 2)), isCorrect: false, misconceptionTag: "division-table-error" },
        ]),
        smartHint: {
          id: `Pikirkan kebalikan dari perkalian: bilangan berapa yang jika dikalikan ${b} menghasilkan tepat ${a}?`,
          en: `Think of reverse multiplication: what number multiplied by ${b} equals exactly ${a}?`,
        },
      });
    }
  }

  return list;
}

// ─── 6. Pecahan Dasar (Kelas 3) ──────────────────────────────────────────────
export function generateBasicFractionQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-frac-basic-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Unit & simple proper fractions with small denominators (2, 3, 4, 6)
      const den = pickRandom([2, 3, 4, 6]);
      const num = randInt(1, den - 1);
      const correctVal = `${num}/${den}`;

      const distractors = new Set<string>();
      if (den - num !== num) distractors.add(`${den - num}/${den}`);
      distractors.add(`${den}/${num}`);
      if (num + 1 < den) distractors.add(`${num + 1}/${den}`);
      if (num > 1) distractors.add(`${num - 1}/${den}`);
      distractors.add(`1/${den}`);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...Array.from(distractors).filter(v => v !== correctVal).slice(0, 3).map(v => ({ value: v, isCorrect: false })),
      ];

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "pecahan-dasar",
        question: {
          id: "Berapa nilai pecahan untuk bagian yang diwarnai?",
          en: "What fraction represents the shaded portion?",
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: den,
          filledSegments: num,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle(rawOptions),
        smartHint: {
          id: `Angka atas (pembilang) menunjukkan ${num} bagian yang diwarnai. Angka bawah (penyebut) menunjukkan total ${den} bagian potongan.`,
          en: `The numerator shows ${num} shaded parts. The denominator shows total ${den} equal parts.`,
        },
      });
    } else if (tier === 2) {
      // Tier 2: Denominators 5, 6, 8, 10. Shaded vs unshaded questions
      const den = pickRandom([5, 6, 8, 10]);
      const num = randInt(1, den - 1);
      const askUnshaded = i % 2 === 1;
      const targetNum = askUnshaded ? den - num : num;
      const correctVal = `${targetNum}/${den}`;

      const distractors = new Set<string>();
      distractors.add(`${askUnshaded ? num : den - num}/${den}`); // Common confusion: picking shaded instead of unshaded
      distractors.add(`${Math.min(den, targetNum + 1)}/${den}`);
      distractors.add(`${Math.max(1, targetNum - 1)}/${den}`);
      distractors.add(`${targetNum}/${den + 1}`);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...Array.from(distractors).filter(v => v !== correctVal).slice(0, 3).map(v => ({ value: v, isCorrect: false })),
      ];

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "pecahan-dasar",
        question: askUnshaded
          ? {
              id: "Berapa nilai pecahan untuk bagian yang TIDAK diwarnai (putih)?",
              en: "What fraction represents the UNSHADED (white) portion?",
            }
          : {
              id: "Berapa nilai pecahan untuk bagian yang diwarnai?",
              en: "What fraction represents the shaded portion?",
            },
        simulator: {
          type: "circle-fraction",
          totalSegments: den,
          filledSegments: num,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle(rawOptions),
        smartHint: {
          id: askUnshaded
            ? `Hitung bagian putih (tidak diwarnai): ada ${targetNum} bagian dari total ${den} bagian, jadi pecahannya adalah ${targetNum}/${den}.`
            : `Bagian yang diwarnai ada ${num} dari total ${den} bagian, jadi pecahannya adalah ${num}/${den}.`,
          en: askUnshaded
            ? `Count unshaded pieces: ${targetNum} out of ${den} total parts, so the fraction is ${targetNum}/${den}.`
            : `Shaded pieces: ${num} out of ${den} total parts, so the fraction is ${num}/${den}.`,
        },
      });
    } else {
      // Tier 3: Challenge — Complement to 1 whole ($1 - a/b = (b-a)/b$) or denominators up to 12
      const den = pickRandom([6, 8, 10, 12]);
      const num = randInt(2, den - 2);
      const complement = den - num;
      const correctVal = `${complement}/${den}`;

      const distractors = new Set<string>();
      distractors.add(`${num}/${den}`);
      distractors.add(`${complement}/${den + 2}`);
      distractors.add(`${Math.min(den, complement + 1)}/${den}`);
      distractors.add(`${Math.max(1, complement - 1)}/${den}`);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...Array.from(distractors).filter(v => v !== correctVal).slice(0, 3).map(v => ({ value: v, isCorrect: false })),
      ];

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "pecahan-dasar",
        question: {
          id: `Sebuah lingkaran memiliki ${num}/${den} bagian yang telah terisi. Berapa bagian pecahan lagi yang dibutuhkan agar lingkaran tersebut menjadi 1 utuh?`,
          en: `A circle has ${num}/${den} of its parts filled. How much more fraction is needed to make 1 whole circle?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: den,
          filledSegments: num,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle(rawOptions),
        smartHint: {
          id: `Satu lingkaran utuh sama dengan ${den}/${den}. Bagian yang belum terisi adalah ${den}/${den} − ${num}/${den} = ${complement}/${den}.`,
          en: `One whole circle is ${den}/${den}. The missing part is ${den}/${den} − ${num}/${den} = ${complement}/${den}.`,
        },
      });
    }
  }

  return list;
}

// ─── 7. Pecahan Senilai (Kelas 4) ─────────────────────────────────────────────
export function generateEquivalentFractionQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const baseFractions = [
    { num: 1, den: 2 },
    { num: 1, den: 3 },
    { num: 2, den: 3 },
    { num: 1, den: 4 },
    { num: 3, den: 4 },
    { num: 2, den: 5 },
    { num: 3, den: 5 },
    { num: 4, den: 5 },
  ];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-frac-eq-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Direct equivalent fraction recognition with multipliers ×2, ×3
      const base = pickRandom(baseFractions);
      const mult = pickRandom([2, 3]);
      const eqNum = base.num * mult;
      const eqDen = base.den * mult;
      const correctVal = `${eqNum}/${eqDen}`;

      const distractors = new Set<string>();
      distractors.add(`${Math.max(1, eqNum - 1)}/${eqDen}`);
      distractors.add(`${eqNum + 1}/${eqDen}`);
      distractors.add(`${base.num}/${eqDen}`);
      distractors.add(`${eqDen}/${eqNum}`);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...Array.from(distractors).filter((v) => v !== correctVal).slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "pecahan-senilai",
        question: {
          id: `Pecahan manakah di bawah ini yang senilai dengan ${base.num}/${base.den}?`,
          en: `Which fraction below is equivalent to ${base.num}/${base.den}?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: eqDen <= 12 ? eqDen : base.den,
          filledSegments: eqDen <= 12 ? eqNum : base.num,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle(rawOptions),
        smartHint: {
          id: `Kalikan pembilang dan penyebut dengan angka yang sama: (${base.num} × ${mult})/(${base.den} × ${mult}) = ${eqNum}/${eqDen}.`,
          en: `Multiply numerator and denominator by the same number: (${base.num} × ${mult})/(${base.den} × ${mult}) = ${eqNum}/${eqDen}.`,
        },
      });
    } else if (tier === 2) {
      // Tier 2: Simplification (Penyederhanaan pecahan) from larger to simplest form
      const base = pickRandom(baseFractions);
      const mult = pickRandom([3, 4, 5]);
      const eqNum = base.num * mult;
      const eqDen = base.den * mult;
      const correctVal = `${base.num}/${base.den}`;

      const distractors = new Set<string>();
      distractors.add(`${Math.max(1, base.num - 1)}/${base.den}`);
      distractors.add(`${base.num + 1}/${base.den}`);
      distractors.add(`${base.num}/${base.den + 1}`);
      distractors.add(`${base.den}/${base.num}`);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...Array.from(distractors).filter((v) => v !== correctVal).slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "pecahan-senilai",
        question: {
          id: `Bentuk paling sederhana dari pecahan ${eqNum}/${eqDen} adalah:`,
          en: `What is the simplest form of the fraction ${eqNum}/${eqDen}?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: base.den,
          filledSegments: base.num,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle(rawOptions),
        smartHint: {
          id: `Bagi pembilang dan penyebut dengan FPB keduanya (${mult}): ${eqNum} ÷ ${mult} = ${base.num}, dan ${eqDen} ÷ ${mult} = ${base.den}.`,
          en: `Divide numerator and denominator by their common factor (${mult}): ${eqNum} ÷ ${mult} = ${base.num}, and ${eqDen} ÷ ${mult} = ${base.den}.`,
        },
      });
    } else {
      // Tier 3: Missing term in equivalent fraction equation (a/b = Box/d or a/b = c/Box)
      const base = pickRandom(baseFractions);
      const mult = randInt(4, 8);
      const eqNum = base.num * mult;
      const eqDen = base.den * mult;
      const findNumerator = i % 2 === 0;

      const correctVal = String(findNumerator ? eqNum : eqDen);
      const ansNum = Number(correctVal);
      const distractors = [
        String(ansNum + mult),
        String(Math.max(1, ansNum - mult)),
        String(ansNum + 2),
      ].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

      const questionText = findNumerator
        ? {
            id: `Tentukan nilai [ ? ] pada persamaan pecahan senilai: ${base.num}/${base.den} = [ ? ]/${eqDen}`,
            en: `Find the value of [ ? ] in the equivalent fraction: ${base.num}/${base.den} = [ ? ]/${eqDen}`,
          }
        : {
            id: `Tentukan nilai [ ? ] pada persamaan pecahan senilai: ${base.num}/${base.den} = ${eqNum}/[ ? ]`,
            en: `Find the value of [ ? ] in the equivalent fraction: ${base.num}/${base.den} = ${eqNum}/[ ? ]`,
          };

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "pecahan-senilai",
        question: questionText,
        simulator: {
          type: "circle-fraction",
          totalSegments: base.den,
          filledSegments: base.num,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle(rawOptions),
        smartHint: {
          id: `Penyebut dikalikan dengan ${mult} (${base.den} × ${mult} = ${eqDen}). Maka pembilang juga harus dikalikan ${mult}: ${base.num} × ${mult} = ${eqNum}.`,
          en: `The denominator is multiplied by ${mult} (${base.den} × ${mult} = ${eqDen}). So multiply the numerator by ${mult} as well: ${base.num} × ${mult} = ${eqNum}.`,
        },
      });
    }
  }

  return list;
}

// ─── 8. Desimal Dasar (Kelas 4) ───────────────────────────────────────────────
export function generateDecimalQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-dec-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Tenths conversions (n/10 -> 0,n) and simple decimal additions with sum < 1
      if (i % 2 === 0) {
        const num = randInt(1, 9);
        const correctVal = `0,${num}`;
        const distractors = [`0,0${num}`, `${num},0`, `0,${num > 5 ? num - 2 : num + 2}`].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "desimal-dasar",
          question: {
            id: `Berapakah bentuk desimal dari pecahan ${num}/10?`,
            en: `What is the decimal equivalent of the fraction ${num}/10?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: num,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map(v => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: "Pecahan persepuluhan ditulis dengan 1 angka di belakang koma (misalnya 1/10 = 0,1).",
            en: "Tenth fractions have 1 decimal digit (for example 1/10 = 0.1).",
          },
        });
      } else {
        const a = randInt(1, 4);
        const b = randInt(1, 5);
        const sum = a + b;
        const correctVal = `0,${sum}`;
        const distractors = [`0,0${sum}`, `${sum},0`, `0,${sum + 1}`].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "desimal-dasar",
          question: {
            id: `Berapakah hasil dari 0,${a} + 0,${b}?`,
            en: `What is 0.${a} + 0.${b}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: Math.min(10, sum),
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map(v => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Jumlahkan angka persepuluhan: ${a} + ${b} = ${sum}, sehingga hasilnya 0,${sum}.`,
            en: `Add the tenths digits: ${a} + ${b} = ${sum}, making the result 0.${sum}.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: Hundredths conversions (n/100 -> 0,mn) and additions/subtractions without crossing 1
      if (i % 2 === 0) {
        const val = randInt(15, 85);
        const correctVal = `0,${val}`;
        const distractors = [`0,0${val}`, `${val / 10}`.replace(".", ","), `0,${val + 10}`].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "desimal-dasar",
          question: {
            id: `Berapakah bentuk desimal dari pecahan ${val}/100?`,
            en: `What is the decimal equivalent of the fraction ${val}/100?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: Math.round(val / 10),
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map(v => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: "Pecahan perseratusan memiliki 2 angka di belakang koma (misalnya 25/100 = 0,25).",
            en: "Hundredths fractions have 2 decimal digits (for example 25/100 = 0.25).",
          },
        });
      } else {
        const a = randInt(15, 45);
        const b = randInt(12, 40);
        const sum = a + b;
        const correctVal = `0,${sum < 10 ? "0" + sum : sum}`;
        const distractors = [
          `0,${sum + 5}`,
          `0,${Math.max(10, sum - 10)}`,
          `1,${sum % 10}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "desimal-dasar",
          question: {
            id: `Berapakah hasil dari 0,${a} + 0,${b}?`,
            en: `What is 0.${a} + 0.${b}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: Math.min(10, Math.round(sum / 10)),
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map(v => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Jumlahkan perseratusannya: 0,${a} + 0,${b} = 0,${sum}.`,
            en: `Add the hundredths: 0.${a} + 0.${b} = 0.${sum}.`,
          },
        });
      }
    } else {
      // Tier 3: Crossing 1 whole (regrouping e.g. 0,7 + 0,6 = 1,3 or 1,4 - 0,8 = 0,6) & benchmark conversions
      if (i % 2 === 0) {
        const aTenth = randInt(6, 9);
        const bTenth = randInt(5, 8);
        const totalTenth = aTenth + bTenth;
        const whole = Math.floor(totalTenth / 10);
        const frac = totalTenth % 10;
        const correctVal = `${whole},${frac}`;
        const distractors = [
          `0,${totalTenth}`, // Common misconception: writing 0.15 instead of 1.5
          `${whole + 1},${frac}`,
          `${whole},${frac + 2}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "desimal-dasar",
          question: {
            id: `Berapakah hasil dari 0,${aTenth} + 0,${bTenth}?`,
            en: `What is 0.${aTenth} + 0.${bTenth}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: frac || 10,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map(v => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `${aTenth} persepuluh + ${bTenth} persepuluh = ${totalTenth} persepuluh = 1 satuan dan ${frac} persepuluh (${whole},${frac}).`,
            en: `${aTenth} tenths + ${bTenth} tenths = ${totalTenth} tenths = 1 whole and ${frac} tenths (${whole}.${frac}).`,
          },
        });
      } else {
        const benchmarks = [
          { num: 1, den: 4, dec: "0,25" },
          { num: 3, den: 4, dec: "0,75" },
          { num: 1, den: 2, dec: "0,5" },
          { num: 2, den: 5, dec: "0,4" },
          { num: 3, den: 5, dec: "0,6" },
          { num: 4, den: 5, dec: "0,8" },
        ];
        const bm = pickRandom(benchmarks);
        const correctVal = bm.dec;
        const distractors = [
          `0,${bm.num}${bm.den}`,
          `0,${bm.num * 2}`,
          `1,${bm.num}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "desimal-dasar",
          question: {
            id: `Berapakah bentuk desimal dari pecahan biasa ${bm.num}/${bm.den}?`,
            en: `What is the decimal equivalent of the fraction ${bm.num}/${bm.den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: bm.den,
            filledSegments: bm.num,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map(v => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Ubah penyebut menjadi persepuluhan atau perseratusan: ${bm.num}/${bm.den} = ${Math.round(parseFloat(bm.dec.replace(",", ".")) * 100)}/100 = ${bm.dec}.`,
            en: `Convert denominator to 10 or 100: ${bm.num}/${bm.den} = ${bm.dec}.`,
          },
        });
      }
    }
  }

  return list;
}

// ─── 9. Pecahan Campuran (Kelas 5) ────────────────────────────────────────────
export function generateMixedFractionQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-mix-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Small mixed numbers (whole 1..3, den 2..4), improper <-> mixed conversions
      const den = pickRandom([2, 3, 4]);
      const whole = randInt(1, 3);
      const rem = randInt(1, den - 1);
      const improperNum = whole * den + rem;

      if (i % 2 === 0) {
        const correctVal = `${whole} ${rem}/${den}`;
        const distractors = [
          `${whole + 1} ${rem}/${den}`,
          `${whole} ${den - rem}/${den}`,
          `${rem} ${whole}/${den}`,
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-campuran",
          question: {
            id: `Ubahlah pecahan biasa ${improperNum}/${den} menjadi bentuk pecahan campuran:`,
            en: `Convert the improper fraction ${improperNum}/${den} into a mixed number:`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: rem,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Bagi pembilang dengan penyebut: ${improperNum} ÷ ${den} = ${whole} bersisa ${rem}. Maka bentuk campurannya adalah ${whole} ${rem}/${den}.`,
            en: `Divide numerator by denominator: ${improperNum} ÷ ${den} = ${whole} remainder ${rem}. The mixed number is ${whole} ${rem}/${den}.`,
          },
        });
      } else {
        const correctVal = `${improperNum}/${den}`;
        const distractors = [
          `${whole * den}/${den}`,
          `${whole + rem}/${den}`,
          `${improperNum + 1}/${den}`,
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-campuran",
          question: {
            id: `Ubahlah pecahan campuran ${whole} ${rem}/${den} menjadi bentuk pecahan biasa:`,
            en: `Convert the mixed fraction ${whole} ${rem}/${den} into an improper fraction:`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: rem,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kalikan bilangan bulat dengan penyebut lalu tambahkan pembilang: (${whole} × ${den}) + ${rem} = ${improperNum}/${den}.`,
            en: `Multiply whole by denominator and add numerator: (${whole} × ${den}) + ${rem} = ${improperNum}/${den}.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: Larger denominators (5, 6, 8, 10), wholes 3..7, and basic mixed addition with same denominator
      const den = pickRandom([5, 6, 8, 10]);
      if (i % 2 === 0) {
        const whole = randInt(3, 7);
        const rem = randInt(1, den - 1);
        const improperNum = whole * den + rem;
        const correctVal = `${whole} ${rem}/${den}`;
        const distractors = [
          `${whole + 1} ${rem}/${den}`,
          `${whole} ${den - rem}/${den}`,
          `${Math.max(1, whole - 1)} ${rem}/${den}`,
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-campuran",
          question: {
            id: `Ubahlah pecahan biasa ${improperNum}/${den} menjadi pecahan campuran:`,
            en: `Convert the improper fraction ${improperNum}/${den} into a mixed number:`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: rem,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `${improperNum} ÷ ${den} = ${whole} sisa ${rem}, sehingga pecahannya ${whole} ${rem}/${den}.`,
            en: `${improperNum} ÷ ${den} = ${whole} with remainder ${rem}, so it is ${whole} ${rem}/${den}.`,
          },
        });
      } else {
        // Mixed + fraction with same denominator (no regrouping)
        const whole = randInt(2, 5);
        const rem1 = randInt(1, Math.floor(den / 2));
        const rem2 = randInt(1, den - 1 - rem1);
        const sumRem = rem1 + rem2;
        const correctVal = `${whole} ${sumRem}/${den}`;
        const distractors = [
          `${whole + 1} ${sumRem}/${den}`,
          `${whole} ${Math.max(1, sumRem - 1)}/${den}`,
          `${whole} ${sumRem}/${den * 2}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-campuran",
          question: {
            id: `Berapakah hasil dari ${whole} ${rem1}/${den} + ${rem2}/${den}?`,
            en: `What is ${whole} ${rem1}/${den} + ${rem2}/${den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: sumRem,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Jumlahkan bagian pecahannya: ${rem1}/${den} + ${rem2}/${den} = ${sumRem}/${den}. Bilangan bulatnya tetap ${whole}.`,
            en: `Add the fraction parts: ${rem1}/${den} + ${rem2}/${den} = ${sumRem}/${den}. Whole number stays ${whole}.`,
          },
        });
      }
    } else {
      // Tier 3: Challenge — Mixed addition with regrouping (> 1 whole) or subtraction with borrowing
      const den = pickRandom([4, 5, 6, 8]);
      const isAddition = i % 2 === 0;

      if (isAddition) {
        // e.g. 1 3/5 + 2 4/5 = 3 7/5 = 4 2/5
        const w1 = randInt(1, 3);
        const w2 = randInt(1, 3);
        const r1 = randInt(Math.ceil(den / 2), den - 1);
        const r2 = randInt(Math.ceil(den / 2), den - 1);
        const totalR = r1 + r2;
        const extraWhole = Math.floor(totalR / den);
        const finalR = totalR % den;
        const finalW = w1 + w2 + extraWhole;
        const correctVal = finalR === 0 ? `${finalW}` : `${finalW} ${finalR}/${den}`;

        const distractors = [
          `${w1 + w2} ${totalR}/${den}`, // Common misconception: forgetting to regroup
          `${finalW - 1} ${finalR}/${den}`,
          `${finalW} ${Math.min(den - 1, finalR + 1)}/${den}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-campuran",
          question: {
            id: `Hitunglah hasil penjumlahan pecahan campuran: ${w1} ${r1}/${den} + ${w2} ${r2}/${den}`,
            en: `Calculate the sum of mixed fractions: ${w1} ${r1}/${den} + ${w2} ${r2}/${den}`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: finalR || den,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Jumlahkan bilangan bulat: ${w1} + ${w2} = ${w1 + w2}. Jumlahkan pecahan: ${r1}/${den} + ${r2}/${den} = ${totalR}/${den} = ${extraWhole} ${finalR}/${den}. Gabungkan: ${finalW} ${finalR}/${den}.`,
            en: `Add wholes: ${w1} + ${w2} = ${w1 + w2}. Add fractions: ${r1}/${den} + ${r2}/${den} = ${totalR}/${den} = ${extraWhole} ${finalR}/${den}. Combine: ${finalW} ${finalR}/${den}.`,
          },
        });
      } else {
        // e.g. 4 1/5 - 1 3/5 = 3 6/5 - 1 3/5 = 2 3/5 (borrowing)
        const w1 = randInt(3, 5);
        const w2 = randInt(1, w1 - 1);
        const r1 = randInt(1, Math.floor(den / 2));
        const r2 = randInt(r1 + 1, den - 1); // r2 > r1 requires borrowing
        // Borrow 1 from w1: (w1 - 1) and (r1 + den)
        const borrowedR = r1 + den;
        const finalW = (w1 - 1) - w2;
        const finalR = borrowedR - r2;
        const correctVal = `${finalW} ${finalR}/${den}`;

        const distractors = [
          `${w1 - w2} ${r2 - r1}/${den}`, // Common mistake: subtracting smaller from larger without borrowing
          `${finalW + 1} ${finalR}/${den}`,
          `${finalW} ${Math.max(1, finalR - 1)}/${den}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-campuran",
          question: {
            id: `Hitunglah hasil pengurangan pecahan campuran: ${w1} ${r1}/${den} − ${w2} ${r2}/${den}`,
            en: `Calculate the difference of mixed fractions: ${w1} ${r1}/${den} − ${w2} ${r2}/${den}`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: finalR,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Karena ${r1}/${den} < ${r2}/${den}, pinjam 1 dari ${w1} menjadi ${w1 - 1} ${borrowedR}/${den}. Kurangkan: ${finalW} ${finalR}/${den}.`,
            en: `Since ${r1}/${den} < ${r2}/${den}, regroup 1 from ${w1} into ${w1 - 1} ${borrowedR}/${den}. Subtract to get: ${finalW} ${finalR}/${den}.`,
          },
        });
      }
    }
  }

  return list;
}

// ─── 10. Persen (Kelas 5) ─────────────────────────────────────────────────────
export function generatePercentageQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-pct-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Benchmark conversions (10%, 20%, 25%, 50%, 75%)
      const pairsTier1 = [
        { num: 1, den: 2, pct: 50 },
        { num: 1, den: 4, pct: 25 },
        { num: 3, den: 4, pct: 75 },
        { num: 1, den: 5, pct: 20 },
        { num: 1, den: 10, pct: 10 },
      ];
      const pair = pickRandom(pairsTier1);

      if (i % 2 === 0) {
        const correctVal = `${pair.pct}%`;
        const distractors = [
          `${pair.pct + 10}%`,
          `${Math.max(5, pair.pct - 10)}%`,
          `${pair.num * 10}%`,
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "persen",
          question: {
            id: `Berapakah bentuk persen (%) dari pecahan ${pair.num}/${pair.den}?`,
            en: `What is the percentage (%) equivalent of the fraction ${pair.num}/${pair.den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: pair.den,
            filledSegments: pair.num,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Persen artinya per seratus. Kalikan pecahan dengan 100%: (${pair.num}/${pair.den}) × 100% = ${pair.pct}%.`,
            en: `Percent means per hundred. Multiply fraction by 100%: (${pair.num}/${pair.den}) × 100% = ${pair.pct}%.`,
          },
        });
      } else {
        const correctVal = `${pair.num}/${pair.den}`;
        const distractors = [
          `${pair.den}/${pair.num}`,
          `${pair.num + 1}/${pair.den}`,
          `1/${pair.den}`,
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "persen",
          question: {
            id: `Bentuk pecahan biasa yang paling sederhana dari ${pair.pct}% adalah:`,
            en: `What is the simplest fraction form of ${pair.pct}%?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: pair.den,
            filledSegments: pair.num,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Tuliskan ${pair.pct}% sebagai ${pair.pct}/100, lalu sederhanakan hingga menjadi ${pair.num}/${pair.den}.`,
            en: `Write ${pair.pct}% as ${pair.pct}/100, then simplify to ${pair.num}/${pair.den}.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: Non-standard percentages (15%, 35%, 40%, 60%, 80%) & % of an amount
      if (i % 2 === 0) {
        const pairsTier2 = [
          { num: 2, den: 5, pct: 40 },
          { num: 3, den: 5, pct: 60 },
          { num: 4, den: 5, pct: 80 },
          { num: 7, den: 10, pct: 70 },
          { num: 9, den: 10, pct: 90 },
        ];
        const pair = pickRandom(pairsTier2);
        const correctVal = `${pair.pct}%`;
        const distractors = [
          `${pair.pct + 10}%`,
          `${Math.max(5, pair.pct - 10)}%`,
          `${pair.num * 10}%`,
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "persen",
          question: {
            id: `Berapakah bentuk persen (%) dari pecahan ${pair.num}/${pair.den}?`,
            en: `What is the percentage (%) equivalent of the fraction ${pair.num}/${pair.den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: pair.den,
            filledSegments: pair.num,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kalikan pecahan dengan 100%: (${pair.num}/${pair.den}) × 100% = ${pair.pct}%.`,
            en: `Multiply fraction by 100%: (${pair.num}/${pair.den}) × 100% = ${pair.pct}%.`,
          },
        });
      } else {
        // Percentage of an amount: e.g. 20% of 60 = 12
        const pcts = [10, 20, 25, 30, 40, 50];
        const pct = pickRandom(pcts);
        const total = pickRandom([40, 50, 60, 80, 100, 120, 150]);
        const ans = (pct * total) / 100;
        const correctVal = String(ans);
        const distractors = [
          String(ans + 5),
          String(Math.max(1, ans - 5)),
          String(ans + 10),
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "persen",
          question: {
            id: `Berapakah ${pct}% dari ${total}?`,
            en: `What is ${pct}% of ${total}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: Math.round(pct / 10) || 1,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Hitung dengan cara: (${pct} ÷ 100) × ${total} = ${ans}.`,
            en: `Calculate: (${pct} ÷ 100) × ${total} = ${ans}.`,
          },
        });
      }
    } else {
      // Tier 3: Challenge — Part-to-whole percentage & reverse percentage
      if (i % 2 === 0) {
        // Part to whole percentage: e.g. 18 out of 60 = 30%
        const mults = [
          { part: 18, total: 60, pct: 30 },
          { part: 12, total: 40, pct: 30 },
          { part: 24, total: 80, pct: 30 },
          { part: 35, total: 50, pct: 70 },
          { part: 21, total: 70, pct: 30 },
          { part: 45, total: 60, pct: 75 },
          { part: 28, total: 40, pct: 70 },
        ];
        const item = pickRandom(mults);
        const correctVal = `${item.pct}%`;
        const distractors = [
          `${item.pct + 10}%`,
          `${item.pct - 10}%`,
          `${item.part}%`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "persen",
          question: {
            id: `Sebanyak ${item.part} dari ${item.total} siswa mengikuti ekstrakurikuler renang. Berapa persen siswa yang mengikuti renang?`,
            en: `${item.part} out of ${item.total} students participate in swimming. What percentage is that?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: Math.round(item.pct / 10),
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Rumus: (bagian ÷ total) × 100% = (${item.part} ÷ ${item.total}) × 100% = ${item.pct}%.`,
            en: `Formula: (part ÷ total) × 100% = (${item.part} ÷ ${item.total}) × 100% = ${item.pct}%.`,
          },
        });
      } else {
        // Reverse percentage: e.g. 20% of X is 16 -> X = 80
        const revItems = [
          { pct: 20, val: 14, total: 70 },
          { pct: 25, val: 15, total: 60 },
          { pct: 30, val: 24, total: 80 },
          { pct: 50, val: 36, total: 72 },
          { pct: 40, val: 20, total: 50 },
        ];
        const rev = pickRandom(revItems);
        const correctVal = String(rev.total);
        const distractors = [
          String(rev.total + 20),
          String(Math.max(10, rev.total - 20)),
          String(rev.val * 2),
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "persen",
          question: {
            id: `Jika ${rev.pct}% dari sebuah bilangan adalah ${rev.val}, berapakah bilangan tersebut?`,
            en: `If ${rev.pct}% of a number is ${rev.val}, what is the number?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: 10,
            filledSegments: Math.round(rev.pct / 10),
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Bilangan utuh (100%) = ${rev.val} ÷ (${rev.pct} ÷ 100) = ${rev.val} × (100 ÷ ${rev.pct}) = ${rev.total}.`,
            en: `Whole number (100%) = ${rev.val} ÷ (${rev.pct} ÷ 100) = ${rev.total}.`,
          },
        });
      }
    }
  }

  return list;
}

// ─── 11. Aljabar Dasar (Kelas 6 — 1 Step, 2 Step & Both Sides Progression) ─────
export function generateBasicAlgebraQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-alg-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;
    let qTextId = "";
    let qTextEn = "";
    let leftExpr = "";
    let rightExpr = "";
    let ans = 0;
    let hintId = "";
    let hintEn = "";

    if (tier === 1) {
      // Tier 1: 1-step equations (n + a = b, n - a = b, a * n = b)
      const opType = pickRandom(["add", "sub", "mult"]);
      if (opType === "add") {
        const a = randInt(5, 25);
        ans = randInt(5, 30);
        const b = ans + a;
        leftExpr = `n + ${a}`;
        rightExpr = String(b);
        qTextId = `Tentukan nilai n dari persamaan: n + ${a} = ${b}`;
        qTextEn = `Find the value of n in the equation: n + ${a} = ${b}`;
        hintId = `Kurangkan kedua sisi dengan ${a}: n = ${b} − ${a} = ${ans}.`;
        hintEn = `Subtract ${a} from both sides: n = ${b} − ${a} = ${ans}.`;
      } else if (opType === "sub") {
        const a = randInt(5, 20);
        ans = randInt(10, 35);
        const b = ans - a;
        leftExpr = `n − ${a}`;
        rightExpr = String(b);
        qTextId = `Tentukan nilai n dari persamaan: n − ${a} = ${b}`;
        qTextEn = `Find the value of n in the equation: n − ${a} = ${b}`;
        hintId = `Tambahkan kedua sisi dengan ${a}: n = ${b} + ${a} = ${ans}.`;
        hintEn = `Add ${a} to both sides: n = ${b} + ${a} = ${ans}.`;
      } else {
        const a = randInt(3, 9);
        ans = randInt(3, 9);
        const b = a * ans;
        leftExpr = `${a} × n`;
        rightExpr = String(b);
        qTextId = `Tentukan nilai n dari persamaan: ${a} × n = ${b}`;
        qTextEn = `Find the value of n in the equation: ${a} × n = ${b}`;
        hintId = `Bagi kedua sisi dengan ${a}: n = ${b} ÷ ${a} = ${ans}.`;
        hintEn = `Divide both sides by ${a}: n = ${b} ÷ ${a} = ${ans}.`;
      }
    } else if (tier === 2) {
      // Tier 2: 2-step equations (a * n + b = c or a * n - b = c)
      const a = randInt(2, 5);
      ans = randInt(3, 9);
      const b = randInt(2, 10);
      const isPlus = i % 2 === 0;
      const c = isPlus ? a * ans + b : a * ans - b;
      leftExpr = isPlus ? `${a}n + ${b}` : `${a}n − ${b}`;
      rightExpr = String(c);
      qTextId = `Tentukan nilai n dari persamaan 2 langkah: ${leftExpr} = ${rightExpr}`;
      qTextEn = `Find the value of n in the 2-step equation: ${leftExpr} = ${rightExpr}`;
      hintId = isPlus
        ? `Langkah 1: Kurangkan ${b} dari ${c} (= ${c - b}). Langkah 2: Bagi hasilnya dengan ${a} (= ${ans}).`
        : `Langkah 1: Tambahkan ${b} ke ${c} (= ${c + b}). Langkah 2: Bagi hasilnya dengan ${a} (= ${ans}).`;
      hintEn = isPlus
        ? `Step 1: Subtract ${b} from ${c} (= ${c - b}). Step 2: Divide by ${a} (= ${ans}).`
        : `Step 1: Add ${b} to ${c} (= ${c + b}). Step 2: Divide by ${a} (= ${ans}).`;
    } else {
      // Tier 3: Challenge — Variables on both sides or distributive parenthesis: a(n + b) = c
      if (i % 2 === 0) {
        // Variables on both sides: e.g. 5n + 4 = 2n + 19 => 3n = 15 => n = 5
        const cCoeff = randInt(2, 4);
        const diffCoeff = randInt(2, 3);
        const aCoeff = cCoeff + diffCoeff; // a > c
        ans = randInt(3, 8);
        const bConst = randInt(2, 8);
        const dConst = diffCoeff * ans + bConst; // ensures positive integer
        leftExpr = `${aCoeff}n + ${bConst}`;
        rightExpr = `${cCoeff}n + ${dConst}`;
        qTextId = `Selesaikan persamaan dengan variabel di kedua sisi: ${leftExpr} = ${rightExpr}`;
        qTextEn = `Solve the equation with variables on both sides: ${leftExpr} = ${rightExpr}`;
        hintId = `Kumpulkan variabel n ke sisi kiri: (${aCoeff} − ${cCoeff})n = ${diffCoeff}n. Kumpulkan konstanta ke sisi kanan: ${dConst} − ${bConst} = ${diffCoeff * ans}. Maka n = ${ans}.`;
        hintEn = `Collect variables on the left: (${aCoeff} − ${cCoeff})n = ${diffCoeff}n. Collect constants on the right: ${dConst} − ${bConst} = ${diffCoeff * ans}. Thus n = ${ans}.`;
      } else {
        // Distributive: a(n + b) = c
        const a = randInt(3, 6);
        const b = randInt(2, 7);
        ans = randInt(3, 9);
        const c = a * (ans + b);
        leftExpr = `${a}(n + ${b})`;
        rightExpr = String(c);
        qTextId = `Tentukan nilai n dari persamaan dengan tanda kurung: ${a}(n + ${b}) = ${c}`;
        qTextEn = `Find the value of n in the equation with brackets: ${a}(n + ${b}) = ${c}`;
        hintId = `Bagi kedua sisi dengan ${a} terlebih dahulu: n + ${b} = ${c} ÷ ${a} = ${ans + b}. Kemudian kurangkan dengan ${b}: n = ${ans}.`;
        hintEn = `Divide both sides by ${a} first: n + ${b} = ${c} ÷ ${a} = ${ans + b}. Then subtract ${b}: n = ${ans}.`;
      }
    }

    const correctVal = String(ans);
    const distractors = [
      String(ans + 2),
      String(Math.max(1, ans - 2)),
      String(ans + 5),
    ].filter((v) => v !== correctVal);

    list.push({
      id: qId,
      grade,
      difficultyTier: tier,
      topic: "aljabar-dasar",
      question: { id: qTextId, en: qTextEn },
      simulator: {
        type: "algebra-balance",
        leftExpr,
        rightExpr,
        variableName: "n",
      },
      options: shuffle([
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ]),
      smartHint: {
        id: hintId,
        en: hintEn,
      },
    });
  }

  return list;
}

// ─── 12. Perbandingan (Kelas 6) ───────────────────────────────────────────────
export function generateRatioQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const baseRatios = [
    { a: 1, b: 2 },
    { a: 2, b: 3 },
    { a: 3, b: 4 },
    { a: 2, b: 5 },
    { a: 3, b: 5 },
    { a: 4, b: 5 },
  ];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-ratio-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Simplification of ratios and direct scaling
      const base = pickRandom(baseRatios);
      const mult = randInt(2, 5);

      if (i % 2 === 0) {
        const a = base.a * mult;
        const b = base.b * mult;
        const correctVal = `${base.a} : ${base.b}`;
        const distractors = [
          `${base.b} : ${base.a}`,
          `${base.a + 1} : ${base.b}`,
          `${base.a} : ${base.b + 1}`,
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "perbandingan",
          question: {
            id: `Bentuk paling sederhana dari perbandingan ${a} : ${b} adalah:`,
            en: `What is the simplest form of the ratio ${a} : ${b}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: base.a + base.b,
            filledSegments: base.a,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Bagi kedua angka perbandingan dengan faktor persekutuan ${mult}: ${a} ÷ ${mult} = ${base.a} dan ${b} ÷ ${mult} = ${base.b}.`,
            en: `Divide both ratio values by common factor ${mult}: ${a} ÷ ${mult} = ${base.a} and ${b} ÷ ${mult} = ${base.b}.`,
          },
        });
      } else {
        const name1 = pickRandom(NAMES);
        const name2 = pickRandom(NAMES.filter((n) => n !== name1));
        const objItem = pickRandom(OBJECTS_BILINGUAL);
        const count1 = base.a * mult;
        const count2 = base.b * mult;
        const correctVal = String(count2);
        const distractors = [
          String(count2 + mult),
          String(Math.max(1, count2 - mult)),
          String((base.a + base.b) * mult),
        ].filter((v) => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "perbandingan",
          question: {
            id: `Perbandingan banyak ${objItem.id} ${name1} dan ${name2} adalah ${base.a} : ${base.b}. Jika ${name1} memiliki ${count1} ${objItem.id}, berapa banyak ${objItem.id} ${name2}?`,
            en: `The ratio of ${objItem.en} between ${name1} and ${name2} is ${base.a} : ${base.b}. If ${name1} has ${count1} ${objItem.en}, how many ${objItem.en} does ${name2} have?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: base.a + base.b,
            filledSegments: base.a,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Cari faktor pengali: ${count1} ÷ ${base.a} = ${mult}. Lalu kalikan ${base.b} × ${mult} = ${count2}.`,
            en: `Find the multiplier: ${count1} ÷ ${base.a} = ${mult}. Then calculate ${base.b} × ${mult} = ${count2}.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: Ratio of a total quantity (Jumlah diketahui)
      const base = pickRandom(baseRatios);
      const mult = randInt(4, 10);
      const totalUnits = base.a + base.b;
      const totalAmount = totalUnits * mult;
      const amountA = base.a * mult;
      const amountB = base.b * mult;
      const findB = i % 2 === 1;
      const targetAns = findB ? amountB : amountA;
      const correctVal = String(targetAns);
      const name1 = pickRandom(NAMES);
      const name2 = pickRandom(NAMES.filter((n) => n !== name1));
      const targetName = findB ? name2 : name1;

      const distractors = [
        String(findB ? amountA : amountB),
        String(targetAns + mult * 2),
        String(Math.max(1, targetAns - mult)),
      ].filter(v => v !== correctVal);

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "perbandingan",
        question: {
          id: `Perbandingan kelereng ${name1} dan ${name2} adalah ${base.a} : ${base.b}. Jika jumlah total kelereng mereka berdua adalah ${totalAmount} butir, berapa banyak kelereng ${targetName}?`,
          en: `The ratio of marbles between ${name1} and ${name2} is ${base.a} : ${base.b}. If their total marbles combined is ${totalAmount}, how many marbles does ${targetName} have?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: totalUnits,
          filledSegments: findB ? base.b : base.a,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Total bagian perbandingan = ${base.a} + ${base.b} = ${totalUnits} bagian. Nilai 1 bagian = ${totalAmount} ÷ ${totalUnits} = ${mult}. Kelereng ${targetName} = ${findB ? base.b : base.a} × ${mult} = ${targetAns}.`,
          en: `Total parts = ${base.a} + ${base.b} = ${totalUnits}. Value of 1 part = ${totalAmount} ÷ ${totalUnits} = ${mult}. ${targetName}'s marbles = ${findB ? base.b : base.a} × ${mult} = ${targetAns}.`,
        },
      });
    } else {
      // Tier 3: Challenge — Ratio given difference (Selisih diketahui) or 3-way ratios
      if (i % 2 === 0) {
        // Difference given: A : B, selisih = (b - a) * mult
        const base = pickRandom(baseRatios.filter(r => r.b > r.a));
        const diffUnits = base.b - base.a;
        const mult = randInt(5, 12);
        const diffAmount = diffUnits * mult;
        const amountA = base.a * mult;
        const amountB = base.b * mult;
        const name1 = pickRandom(NAMES);
        const name2 = pickRandom(NAMES.filter((n) => n !== name1));
        const askA = i % 4 === 0;
        const targetAns = askA ? amountA : amountB;
        const targetName = askA ? name1 : name2;
        const correctVal = String(targetAns);

        const distractors = [
          String(askA ? amountB : amountA),
          String(targetAns + mult),
          String(Math.max(1, targetAns - mult)),
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "perbandingan",
          question: {
            id: `Perbandingan uang saku ${name1} dan ${name2} adalah ${base.a} : ${base.b}. Selisih uang saku mereka adalah Rp ${diffAmount.toLocaleString("id-ID")}. Berapakah uang saku ${targetName}?`,
            en: `The ratio of pocket money between ${name1} and ${name2} is ${base.a} : ${base.b}. The difference between their money is Rp ${diffAmount.toLocaleString("id-ID")}. How much money does ${targetName} have?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: base.a + base.b,
            filledSegments: askA ? base.a : base.b,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: `Rp ${targetAns.toLocaleString("id-ID")}`, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: `Rp ${Number(v).toLocaleString("id-ID")}`, isCorrect: false })),
          ]),
          smartHint: {
            id: `Selisih bagian perbandingan = ${base.b} − ${base.a} = ${diffUnits} bagian. Nilai 1 bagian = ${diffAmount} ÷ ${diffUnits} = ${mult}. Uang saku ${targetName} = ${askA ? base.a : base.b} × ${mult} = Rp ${targetAns.toLocaleString("id-ID")}.`,
            en: `Difference in parts = ${base.b} − ${base.a} = ${diffUnits}. Value of 1 part = ${diffAmount} ÷ ${diffUnits} = ${mult}. ${targetName}'s money = ${askA ? base.a : base.b} × ${mult} = Rp ${targetAns.toLocaleString("id-ID")}.`,
          },
        });
      } else {
        // 3-way ratios: A : B : C = 2 : 3 : 5, total known
        const trios = [
          { a: 2, b: 3, c: 5, totalUnits: 10 },
          { a: 1, b: 2, c: 3, totalUnits: 6 },
          { a: 3, b: 4, c: 5, totalUnits: 12 },
          { a: 2, b: 4, c: 6, totalUnits: 12 },
        ];
        const trio = pickRandom(trios);
        const mult = randInt(4, 9);
        const total = trio.totalUnits * mult;
        const valB = trio.b * mult;
        const correctVal = String(valB);

        const distractors = [
          String(trio.a * mult),
          String(trio.c * mult),
          String(valB + mult),
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "perbandingan",
          question: {
            id: `Perbandingan tiga bilangan A : B : C adalah ${trio.a} : ${trio.b} : ${trio.c}. Jika jumlah ketiga bilangan tersebut adalah ${total}, berapakah nilai B?`,
            en: `The ratio of three numbers A : B : C is ${trio.a} : ${trio.b} : ${trio.c}. If the sum of all three is ${total}, what is the value of B?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: trio.totalUnits,
            filledSegments: trio.b,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Jumlahkan semua bagian perbandingan: ${trio.a} + ${trio.b} + ${trio.c} = ${trio.totalUnits} bagian. Nilai 1 bagian = ${total} ÷ ${trio.totalUnits} = ${mult}. Nilai B = ${trio.b} × ${mult} = ${valB}.`,
            en: `Sum all parts: ${trio.a} + ${trio.b} + ${trio.c} = ${trio.totalUnits}. Value of 1 part = ${total} ÷ ${trio.totalUnits} = ${mult}. Value of B = ${trio.b} × ${mult} = ${valB}.`,
          },
        });
      }
    }
  }

  return list;
}

// ─── 13. Perkalian Awal / Intro Multiplication (Grade 2 - Cambridge Stage 2) ──
// Cambridge: 2Ni.05 - understand multiplication as repeated addition (×2, ×3, ×5, ×10)
export function generateEarlyMultiplicationQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const NAMES_LOCAL = NAMES;

  for (let i = 0; i < count; i++) {
    const qId = `dyn-earlymult-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;
    const name = pickRandom(NAMES_LOCAL);
    const objItem = pickRandom(OBJECTS_BILINGUAL);
    const objId = objItem.id;
    const objEn = objItem.en;

    if (tier === 1) {
      // Tier 1: ×2, ×5, ×10 with factors 1..6
      const multiplier = pickRandom([2, 5, 10]);
      const factor = randInt(1, 6);
      const ans = multiplier * factor;

      const textId = `${name} menyusun ${factor} baris ${objId}. Setiap baris berisi ${multiplier} ${objId}. Berapa jumlah ${objId} seluruhnya?`;
      const textEn = `${name} arranges ${factor} rows of ${objEn}. Each row has ${multiplier} ${objEn}. How many ${objEn} are there in total?`;

      const distractors = [
        String(ans + multiplier),
        String(Math.max(1, ans - multiplier)),
        String(factor + multiplier),
      ].filter((v) => v !== String(ans));

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "perkalian-awal",
        question: { id: textId, en: textEn },
        simulator: {
          type: "column-arithmetic",
          operation: "multiply",
          operands: [factor, multiplier],
          digitCount: String(ans).length,
        },
        options: shuffle([
          { value: String(ans), isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Perkalian adalah penjumlahan berulang: ${factor} × ${multiplier} = ${Array(factor).fill(multiplier).join(" + ")} = ${ans}.`,
          en: `Multiplication is repeated addition: ${factor} × ${multiplier} = ${Array(factor).fill(multiplier).join(" + ")} = ${ans}.`,
        },
      });
    } else if (tier === 2) {
      // Tier 2: ×2, ×3, ×4, ×5, ×10 with factors 1..10
      const multiplier = pickRandom([2, 3, 4, 5, 10]);
      const factor = randInt(2, 10);
      const ans = multiplier * factor;

      const textId = `${name} memiliki ${factor} kotak ${objId}. Setiap kotak berisi ${multiplier} ${objId}. Berapa banyak ${objId} yang dimiliki ${name}?`;
      const textEn = `${name} has ${factor} boxes of ${objEn}. Each box contains ${multiplier} ${objEn}. How many ${objEn} does ${name} have in total?`;

      const distractors = [
        String(ans + multiplier),
        String(Math.max(1, ans - multiplier)),
        String(ans + 2),
      ].filter((v) => v !== String(ans));

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "perkalian-awal",
        question: { id: textId, en: textEn },
        simulator: {
          type: "column-arithmetic",
          operation: "multiply",
          operands: [factor, multiplier],
          digitCount: String(ans).length,
        },
        options: shuffle([
          { value: String(ans), isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Kalikan jumlah kotak dengan isi per kotak: ${factor} × ${multiplier} = ${ans}.`,
          en: `Multiply boxes by contents: ${factor} × ${multiplier} = ${ans}.`,
        },
      });
    } else {
      // Tier 3: Challenge — Multi-step early multiplication or equal sharing (fair division)
      if (i % 2 === 0) {
        // Multi-step: a * b + c or a * b - c
        const boxes = randInt(3, 5);
        const perBox = randInt(4, 6);
        const extra = randInt(2, 5);
        const isAdd = i % 4 === 0;
        const total = isAdd ? boxes * perBox + extra : boxes * perBox - extra;

        const textId = isAdd
          ? `${name} membeli ${boxes} kantong ${objId}. Setiap kantong berisi ${perBox} ${objId}. Kemudian ia mendapatkan ${extra} ${objId} lagi. Berapa total ${objId} sekarang?`
          : `${name} membeli ${boxes} kantong ${objId}. Setiap kantong berisi ${perBox} ${objId}. Kemudian ia memberikan ${extra} ${objId} kepada temannya. Berapa sisa ${objId} sekarang?`;
        const textEn = isAdd
          ? `${name} bought ${boxes} bags of ${objEn} with ${perBox} each. Then got ${extra} more. How many ${objEn} in total?`
          : `${name} bought ${boxes} bags of ${objEn} with ${perBox} each. Then gave ${extra} to a friend. How many ${objEn} remain?`;

        const distractors = [
          String(boxes * perBox),
          String(total + 3),
          String(Math.max(1, total - 3)),
        ].filter(v => v !== String(total));

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "perkalian-awal",
          question: { id: textId, en: textEn },
          simulator: {
            type: "column-arithmetic",
            operation: "multiply",
            operands: [boxes, perBox],
            digitCount: String(total).length,
          },
          options: shuffle([
            { value: String(total), isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: isAdd
              ? `Langkah 1: Hitung perkalian (${boxes} × ${perBox} = ${boxes * perBox}). Langkah 2: Tambahkan ${extra} (${boxes * perBox} + ${extra} = ${total}).`
              : `Langkah 1: Hitung perkalian (${boxes} × ${perBox} = ${boxes * perBox}). Langkah 2: Kurangkan ${extra} (${boxes * perBox} − ${extra} = ${total}).`,
            en: isAdd
              ? `Step 1: Multiply (${boxes} × ${perBox} = ${boxes * perBox}). Step 2: Add ${extra} (${boxes * perBox} + ${extra} = ${total}).`
              : `Step 1: Multiply (${boxes} × ${perBox} = ${boxes * perBox}). Step 2: Subtract ${extra} (${boxes * perBox} − ${extra} = ${total}).`,
          },
        });
      } else {
        // Equal sharing / division as reverse of multiplication
        const groups = pickRandom([3, 4, 5]);
        const perGroup = randInt(4, 8);
        const totalItems = groups * perGroup;
        const textId = `${name} memiliki ${totalItems} ${objId} yang akan dibagikan sama rata ke dalam ${groups} kotak. Berapa banyak ${objId} di setiap kotak?`;
        const textEn = `${name} has ${totalItems} ${objEn} to distribute equally into ${groups} boxes. How many ${objEn} in each box?`;

        const distractors = [
          String(perGroup + 1),
          String(Math.max(1, perGroup - 1)),
          String(perGroup + 2),
        ].filter(v => v !== String(perGroup));

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "perkalian-awal",
          question: { id: textId, en: textEn },
          simulator: {
            type: "column-arithmetic",
            operation: "divide",
            operands: [totalItems, groups],
            digitCount: String(perGroup).length,
          },
          options: shuffle([
            { value: String(perGroup), isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Bagi total ${objId} dengan jumlah kotak: ${totalItems} ÷ ${groups} = ${perGroup}. Karena ${groups} × ${perGroup} = ${totalItems}.`,
            en: `Divide total ${objEn} by number of boxes: ${totalItems} ÷ ${groups} = ${perGroup}, because ${groups} × ${perGroup} = ${totalItems}.`,
          },
        });
      }
    }
  }
  return list;
}

// ─── 14. Pecahan Operasi — Add/Subtract Same Denominator (Grade 3) ─────────────
// Cambridge: 3Nf.07 - add/subtract fractions with same denominator within 1 whole
export function generateFractionOperationQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-fracop-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Small denominators (2, 3, 4), sum < 1
      const den = pickRandom([2, 3, 4]);
      const isAdd = i % 2 === 0;

      if (isAdd && den > 2) {
        const a = 1;
        const b = 1;
        const resultNum = a + b;
        const correctVal = `${resultNum}/${den}`;
        const distractors = [`${resultNum}/${den * 2}`, `${a}/${den + b}`, `1/${den}`].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-operasi",
          question: {
            id: `Berapa hasil dari ${a}/${den} + ${b}/${den}?`,
            en: `What is ${a}/${den} + ${b}/${den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: resultNum,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Karena penyebutnya sama (${den}), cukup jumlahkan pembilangnya: ${a} + ${b} = ${resultNum}. Penyebut tetap ${den}.`,
            en: `Denominators are equal (${den}), so add numerators: ${a} + ${b} = ${resultNum}. Denominator stays ${den}.`,
          },
        });
      } else {
        const a = den - 1;
        const b = 1;
        const resultNum = a - b;
        const correctVal = `${resultNum}/${den}`;
        const distractors = [`${a + b}/${den}`, `1/${den * 2}`, `${resultNum + 1}/${den}`].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-operasi",
          question: {
            id: `Berapa hasil dari ${a}/${den} − ${b}/${den}?`,
            en: `What is ${a}/${den} − ${b}/${den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: resultNum,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kurangkan pembilangnya: ${a} − ${b} = ${resultNum}. Penyebutnya tetap ${den}.`,
            en: `Subtract numerators: ${a} − ${b} = ${resultNum}. Denominator stays ${den}.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: Denominators 5, 6, 8, 10. Results making 1 whole or subtracting from 1 whole
      const den = pickRandom([5, 6, 8, 10]);
      const mode = i % 3;

      if (mode === 0) {
        // Result makes 1 whole: a/d + b/d = d/d = 1
        const a = randInt(1, den - 1);
        const b = den - a;
        const correctVal = "1";
        const distractors = [`${den - 1}/${den}`, `${den}/${den * 2}`, `${den + 1}/${den}`];

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-operasi",
          question: {
            id: `Berapa hasil dari ${a}/${den} + ${b}/${den}?`,
            en: `What is ${a}/${den} + ${b}/${den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: den,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `${a}/${den} + ${b}/${den} = ${den}/${den} = 1 (satu utuh).`,
            en: `${a}/${den} + ${b}/${den} = ${den}/${den} = 1 (one whole).`,
          },
        });
      } else if (mode === 1) {
        // Subtract from 1 whole: 1 - a/d = (d-a)/d
        const a = randInt(1, den - 1);
        const rem = den - a;
        const correctVal = `${rem}/${den}`;
        const distractors = [`${a}/${den}`, `${rem}/${den + 2}`, `1/${den}`].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-operasi",
          question: {
            id: `Berapa hasil dari 1 − ${a}/${den}?`,
            en: `What is 1 − ${a}/${den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: rem,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Ubah 1 menjadi ${den}/${den}. Maka: ${den}/${den} − ${a}/${den} = ${rem}/${den}.`,
            en: `Convert 1 into ${den}/${den}. Then: ${den}/${den} − ${a}/${den} = ${rem}/${den}.`,
          },
        });
      } else {
        // Standard subtraction: a/d - b/d
        const a = randInt(3, den - 1);
        const b = randInt(1, a - 1);
        const res = a - b;
        const correctVal = `${res}/${den}`;
        const distractors = [`${a + b}/${den}`, `${res}/${den * 2}`, `${res + 1}/${den}`].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-operasi",
          question: {
            id: `Berapa hasil dari ${a}/${den} − ${b}/${den}?`,
            en: `What is ${a}/${den} − ${b}/${den}?`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: res,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kurangkan pembilangnya saja: ${a} − ${b} = ${res}. Penyebut tetap ${den}.`,
            en: `Subtract only the numerators: ${a} − ${b} = ${res}. Denominator stays ${den}.`,
          },
        });
      }
    } else {
      // Tier 3: Challenge — 3-term operations or missing fraction in equation: a/d + [ ? ] = c/d
      const den = pickRandom([6, 8, 10, 12]);
      if (i % 2 === 0) {
        // 3 terms: a/d + b/d + c/d
        const a = randInt(1, 2);
        const b = randInt(1, 2);
        const c = randInt(1, den - 1 - (a + b));
        const sum = a + b + c;
        const correctVal = `${sum}/${den}`;
        const distractors = [
          `${sum}/${den * 3}`,
          `${Math.max(1, sum - 1)}/${den}`,
          `${Math.min(den, sum + 1)}/${den}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-operasi",
          question: {
            id: `Hitunglah operasi penjumlahan 3 pecahan berikut: ${a}/${den} + ${b}/${den} + ${c}/${den}`,
            en: `Calculate the sum of three fractions: ${a}/${den} + ${b}/${den} + ${c}/${den}`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: sum,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Jumlahkan semua pembilang: ${a} + ${b} + ${c} = ${sum}. Penyebut tetap ${den}, jadi hasilnya ${sum}/${den}.`,
            en: `Add all numerators: ${a} + ${b} + ${c} = ${sum}. Denominator stays ${den}, giving ${sum}/${den}.`,
          },
        });
      } else {
        // Missing fraction: a/d + [ ? ] = c/d
        const a = randInt(1, den - 3);
        const missing = randInt(1, den - 1 - a);
        const c = a + missing;
        const correctVal = `${missing}/${den}`;
        const distractors = [
          `${c}/${den}`,
          `${Math.max(1, missing - 1)}/${den}`,
          `${missing}/${den + 2}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId,
          grade,
          difficultyTier: tier,
          topic: "pecahan-operasi",
          question: {
            id: `Tentukan pecahan [ ? ] yang tepat pada persamaan: ${a}/${den} + [ ? ] = ${c}/${den}`,
            en: `Find the missing fraction [ ? ] in: ${a}/${den} + [ ? ] = ${c}/${den}`,
          },
          simulator: {
            type: "circle-fraction",
            totalSegments: den,
            filledSegments: missing,
            interactive: false,
            showFractionLabel: false,
          },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kurangkan hasil dengan pecahan pertama: [ ? ] = ${c}/${den} − ${a}/${den} = ${missing}/${den}.`,
            en: `Subtract the first fraction from the result: [ ? ] = ${c}/${den} − ${a}/${den} = ${missing}/${den}.`,
          },
        });
      }
    }
  }
  return list;
}

// ─── 15. Teori Bilangan — Factors, Multiples, Prime (Grade 4) ─────────────────
// Cambridge: 4Ni.05 - divisibility, prime numbers; 4Ni.01 - factors and multiples
export function generateNumberTheoryQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
  const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-numtheory-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Factors <= 20, primes < 15, multiples of 2, 3, 5, 10
      const mode = i % 3;
      if (mode === 0) {
        const num = pickRandom([8, 10, 12, 14, 15, 16, 18, 20]);
        const factors = [];
        for (let f = 1; f <= num; f++) if (num % f === 0) factors.push(f);
        const correctVal = `${factors.length}`;
        const distractors = [String(factors.length + 1), String(Math.max(1, factors.length - 1)), String(factors.length + 2)].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Bilangan ${num} memiliki berapa faktor (bilangan pembagi habis)?`,
            en: `How many factors does the number ${num} have?`,
          },
          simulator: { type: "pattern-sequence", sequence: factors, missingIndices: [], correctValues: [], ruleDescription: `Faktor dari ${num}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Faktor dari ${num} adalah: ${factors.join(", ")}. Totalnya ada ${factors.length} faktor.`,
            en: `Factors of ${num} are: ${factors.join(", ")}. There are ${factors.length} factors in total.`,
          },
        });
      } else if (mode === 1) {
        const isPrimeQ = i % 4 < 2;
        const num = isPrimeQ ? pickRandom(primes.filter(p => p < 15)) : pickRandom(composites.filter(c => c < 15));
        const correctVal = isPrimeQ ? "Prima" : "Komposit";

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Bilangan ${num} termasuk bilangan...`,
            en: `The number ${num} is a...`,
          },
          simulator: { type: "circle-fraction", totalSegments: isPrimeQ ? 2 : 4, filledSegments: isPrimeQ ? 2 : 3, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            { value: isPrimeQ ? "Komposit" : "Prima", isCorrect: false },
            { value: "Pecahan", isCorrect: false },
          ]),
          smartHint: {
            id: isPrimeQ ? `${num} adalah prima karena hanya habis dibagi 1 dan ${num}.` : `${num} adalah komposit karena memiliki lebih dari 2 faktor.`,
            en: isPrimeQ ? `${num} is prime because it is only divisible by 1 and ${num}.` : `${num} is composite because it has more than 2 factors.`,
          },
        });
      } else {
        const base = pickRandom([2, 3, 5, 10]);
        const nth = randInt(2, 6);
        const correctVal = String(base * nth);
        const distractors = [String(base * (nth + 1)), String(base * (nth - 1)), String(base * nth + 1)].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Berapakah kelipatan ke-${nth} dari bilangan ${base}?`,
            en: `What is the ${nth}${nth === 2 ? "nd" : nth === 3 ? "rd" : "th"} multiple of ${base}?`,
          },
          simulator: { type: "pattern-sequence", sequence: Array.from({ length: nth }, (_, k) => (k + 1) * base), missingIndices: [nth - 1], correctValues: [base * nth], ruleDescription: `Kelipatan ${base}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kelipatan ke-${nth} dari ${base} adalah ${base} × ${nth} = ${base * nth}.`,
            en: `The ${nth}th multiple of ${base} is ${base} × ${nth} = ${base * nth}.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: Factors 24..60, primes < 40, multiples of 6..12, common multiples
      const mode = i % 3;
      if (mode === 0) {
        const num = pickRandom([24, 28, 30, 36, 40, 48]);
        const factors = [];
        for (let f = 1; f <= num; f++) if (num % f === 0) factors.push(f);
        const correctVal = `${factors.length}`;
        const distractors = [String(factors.length + 1), String(Math.max(1, factors.length - 1)), String(factors.length + 2)].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Berapa banyak faktor pembagi habis dari bilangan ${num}?`,
            en: `How many factors does the number ${num} have?`,
          },
          simulator: { type: "pattern-sequence", sequence: factors, missingIndices: [], correctValues: [], ruleDescription: `Faktor ${num}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Faktor dari ${num}: ${factors.join(", ")}. Ada ${factors.length} bilangan.`,
            en: `Factors of ${num}: ${factors.join(", ")}. Total ${factors.length} numbers.`,
          },
        });
      } else if (mode === 1) {
        // Prime identification up to 45
        const num = pickRandom([29, 31, 33, 35, 37, 39, 41, 43, 45]);
        const isPrime = primes.includes(num);
        const correctVal = isPrime ? "Prima" : "Komposit";

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Apakah bilangan ${num} merupakan bilangan prima atau komposit?`,
            en: `Is the number ${num} prime or composite?`,
          },
          simulator: { type: "circle-fraction", totalSegments: isPrime ? 2 : 4, filledSegments: isPrime ? 2 : 3, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            { value: isPrime ? "Komposit" : "Prima", isCorrect: false },
            { value: "Kelipatan 10", isCorrect: false },
          ]),
          smartHint: {
            id: isPrime ? `${num} hanya habis dibagi 1 dan ${num}, maka ia bilangan prima.` : `${num} memiliki faktor lain (misal: habis dibagi 3 atau 5), maka ia komposit.`,
            en: isPrime ? `${num} is divisible only by 1 and itself, so it is prime.` : `${num} has other factors, so it is composite.`,
          },
        });
      } else {
        // Common multiple / Kelipatan persekutuan
        const a = pickRandom([3, 4, 6]);
        const b = a === 3 ? 4 : a === 4 ? 6 : 8;
        // Smallest common multiple
        const lcm = a === 3 && b === 4 ? 12 : a === 4 && b === 6 ? 12 : 24;
        const correctVal = String(lcm);
        const distractors = [String(a * b), String(lcm + a), String(Math.max(1, lcm - a))].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Kelipatan persekutuan terkecil (pertama) dari ${a} dan ${b} adalah:`,
            en: `The lowest common multiple of ${a} and ${b} is:`,
          },
          simulator: { type: "pattern-sequence", sequence: [a, b, lcm], missingIndices: [2], correctValues: [lcm], ruleDescription: `KPK ${a} & ${b}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kelipatan ${a}: ${a}, ${a*2}, ${a*3}, … dan ${b}: ${b}, ${b*2}, … Bilangan sama terkecil adalah ${lcm}.`,
            en: `Multiples of ${a}: ${a}, ${a*2}, … and ${b}: ${b}, ${b*2}, … Smallest shared is ${lcm}.`,
          },
        });
      }
    } else {
      // Tier 3: Challenge — Prime Factorization, Counting primes in range, or Divisibility challenge
      const mode = i % 3;
      if (mode === 0) {
        // Prime Factorization (Faktorisasi Prima)
        const items = [
          { num: 24, fact: "2³ × 3", fake: ["2² × 6", "2⁴ × 3", "3 × 8"] },
          { num: 36, fact: "2² × 3²", fake: ["2³ × 3", "4 × 9", "2 × 3³"] },
          { num: 40, fact: "2³ × 5", fake: ["2² × 10", "4 × 10", "2⁴ × 5"] },
          { num: 60, fact: "2² × 3 × 5", fake: ["2³ × 3 × 5", "4 × 15", "2 × 3² × 5"] },
          { num: 72, fact: "2³ × 3²", fake: ["2² × 3³", "8 × 9", "2⁴ × 3"] },
        ];
        const item = pickRandom(items);
        const correctVal = item.fact;

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Bentuk faktorisasi prima dari bilangan ${item.num} adalah:`,
            en: `The prime factorization of ${item.num} is:`,
          },
          simulator: { type: "pattern-sequence", sequence: [2, 3, 5], missingIndices: [], correctValues: [], ruleDescription: `Faktor Prima ${item.num}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...item.fake.map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Gunakan pohon faktor: bagi berulang dengan bilangan prima terkecil (2, 3, 5, …) hingga tersisa 1. ${item.num} = ${item.fact}.`,
            en: `Use a factor tree: repeatedly divide by prime numbers (2, 3, 5, …). ${item.num} = ${item.fact}.`,
          },
        });
      } else if (mode === 1) {
        // Counting primes in range
        const ranges = [
          { start: 10, end: 30, count: 6, primesStr: "11, 13, 17, 19, 23, 29" },
          { start: 20, end: 40, count: 4, primesStr: "23, 29, 31, 37" },
          { start: 1, end: 20, count: 8, primesStr: "2, 3, 5, 7, 11, 13, 17, 19" },
          { start: 30, end: 50, count: 5, primesStr: "31, 37, 41, 43, 47" },
        ];
        const rng = pickRandom(ranges);
        const correctVal = String(rng.count);
        const distractors = [String(rng.count + 1), String(Math.max(1, rng.count - 1)), String(rng.count + 2)].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Berapa banyak bilangan prima yang terletak di antara ${rng.start} dan ${rng.end}?`,
            en: `How many prime numbers lie between ${rng.start} and ${rng.end}?`,
          },
          simulator: { type: "pattern-sequence", sequence: [rng.start, rng.end], missingIndices: [], correctValues: [], ruleDescription: `Prima ${rng.start}..${rng.end}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Bilangan prima antara ${rng.start} dan ${rng.end} adalah: ${rng.primesStr}. Jumlahnya ada ${rng.count} bilangan.`,
            en: `Prime numbers between ${rng.start} and ${rng.end} are: ${rng.primesStr}. Total is ${rng.count}.`,
          },
        });
      } else {
        // Divisibility rule Olympiad challenge
        const challenges = [
          { d1: 3, d2: 4, ans: 36, fake: [28, 38, 42] },
          { d1: 3, d2: 5, ans: 45, fake: [25, 35, 55] },
          { d1: 4, d2: 6, ans: 24, fake: [16, 18, 28] },
          { d1: 3, d2: 8, ans: 48, fake: [32, 40, 52] },
        ];
        const ch = pickRandom(challenges);
        const correctVal = String(ch.ans);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "teori-bilangan",
          question: {
            id: `Bilangan manakah di bawah ini yang habis dibagi ${ch.d1} dan ${ch.d2} sekaligus?`,
            en: `Which of the following numbers is divisible by both ${ch.d1} and ${ch.d2}?`,
          },
          simulator: { type: "pattern-sequence", sequence: [ch.d1, ch.d2, ch.ans], missingIndices: [2], correctValues: [ch.ans], ruleDescription: `Kelipatan ${ch.d1} & ${ch.d2}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...ch.fake.map((v) => ({ value: String(v), isCorrect: false })),
          ]),
          smartHint: {
            id: `Bilangan yang habis dibagi ${ch.d1} dan ${ch.d2} haruslah merupakan kelipatan dari KPK(${ch.d1}, ${ch.d2}). ${ch.ans} habis dibagi ${ch.d1} dan ${ch.d2}.`,
            en: `A number divisible by both ${ch.d1} and ${ch.d2} must be a multiple of their LCM. ${ch.ans} is divisible by both.`,
          },
        });
      }
    }
  }
  return list;
}

// ─── 16. Luas Bangun Datar — Area of Rectangles & Squares (Grade 4) ───────────
// Cambridge: 4Gg.01 - find and apply area formula (L = p × l) and perimeter
export function generateAreaQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-area-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: 1-digit sides (3..9), direct area and perimeter
      const isArea = i % 2 === 0;
      const isSquare = i % 4 === 0;
      const p = randInt(3, 9);
      const l = isSquare ? p : randInt(2, p - 1);

      if (isArea) {
        const ans = p * l;
        const correctVal = `${ans} cm²`;
        const distractors = [`${(p + l) * 2} cm²`, `${ans + 4} cm²`, `${Math.max(1, ans - 4)} cm²`].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "luas-bangun-datar",
          question: {
            id: isSquare
              ? `Sebuah persegi memiliki panjang sisi ${p} cm. Berapakah luasnya?`
              : `Sebuah persegi panjang memiliki panjang ${p} cm dan lebar ${l} cm. Berapakah luasnya?`,
            en: isSquare
              ? `A square has a side length of ${p} cm. What is its area?`
              : `A rectangle has a length of ${p} cm and width of ${l} cm. What is its area?`,
          },
          simulator: { type: "column-arithmetic", operation: "multiply", operands: [p, l], digitCount: String(ans).length },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: isSquare ? `Luas persegi = sisi × sisi = ${p} × ${p} = ${ans} cm².` : `Luas persegi panjang = p × l = ${p} × ${l} = ${ans} cm².`,
            en: isSquare ? `Square area = side × side = ${p} × ${p} = ${ans} cm².` : `Rectangle area = l × w = ${p} × ${l} = ${ans} cm².`,
          },
        });
      } else {
        const ans = 2 * (p + l);
        const correctVal = `${ans} cm`;
        const distractors = [`${p * l} cm`, `${ans + 2} cm`, `${Math.max(1, ans - 2)} cm`].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "luas-bangun-datar",
          question: {
            id: `Sebuah persegi panjang memiliki panjang ${p} cm dan lebar ${l} cm. Berapakah kelilingnya?`,
            en: `A rectangle has length ${p} cm and width ${l} cm. What is its perimeter?`,
          },
          simulator: { type: "column-arithmetic", operation: "multiply", operands: [p + l, 2], digitCount: String(ans).length },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Keliling = 2 × (p + l) = 2 × (${p} + ${l}) = 2 × ${p + l} = ${ans} cm.`,
            en: `Perimeter = 2 × (l + w) = 2 × (${p} + ${l}) = ${ans} cm.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: 2-digit dimensions (12..25, 6..14) and inverse problems (area given, find length or width)
      if (i % 2 === 0) {
        // Inverse problem: Area & width given, find length
        const l = randInt(5, 9);
        const p = randInt(10, 18);
        const area = p * l;
        const correctVal = `${p} cm`;
        const distractors = [`${p + 2} cm`, `${Math.max(1, p - 2)} cm`, `${l} cm`].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "luas-bangun-datar",
          question: {
            id: `Sebuah persegi panjang memiliki luas ${area} cm² dan lebar ${l} cm. Berapakah panjang persegi panjang tersebut?`,
            en: `A rectangle has an area of ${area} cm² and width of ${l} cm. What is its length?`,
          },
          simulator: { type: "column-arithmetic", operation: "divide", operands: [area, l], digitCount: String(p).length },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Rumus: Panjang = Luas ÷ Lebar = ${area} ÷ ${l} = ${p} cm.`,
            en: `Formula: Length = Area ÷ Width = ${area} ÷ ${l} = ${p} cm.`,
          },
        });
      } else {
        // 2-digit direct area
        const p = randInt(12, 22);
        const l = randInt(6, 12);
        const ans = p * l;
        const correctVal = `${ans} cm²`;
        const distractors = [`${(p + l) * 2} cm²`, `${ans + 10} cm²`, `${ans - 10} cm²`].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "luas-bangun-datar",
          question: {
            id: `Sebuah kebun berbentuk persegi panjang berukuran panjang ${p} m dan lebar ${l} m. Hitunglah luas kebun tersebut!`,
            en: `A rectangular garden has length ${p} m and width ${l} m. Calculate its area!`,
          },
          simulator: { type: "column-arithmetic", operation: "multiply", operands: [p, l], digitCount: String(ans).length },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Luas = panjang × lebar = ${p} × ${l} = ${ans} m².`,
            en: `Area = length × width = ${p} × ${l} = ${ans} m².`,
          },
        });
      }
    } else {
      // Tier 3: Challenge — Perimeter given find Area, or Square Area given find Perimeter
      if (i % 2 === 0) {
        // Perimeter given, find area
        const l = randInt(6, 10);
        const p = randInt(l + 2, l + 8);
        const perimeter = 2 * (p + l);
        const area = p * l;
        const correctVal = `${area} cm²`;
        const distractors = [`${perimeter} cm²`, `${area + 12} cm²`, `${Math.max(1, area - 12)} cm²`].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "luas-bangun-datar",
          question: {
            id: `Keliling sebuah persegi panjang adalah ${perimeter} cm. Jika panjangnya ${p} cm, berapakah luas persegi panjang tersebut?`,
            en: `The perimeter of a rectangle is ${perimeter} cm. If its length is ${p} cm, what is its area?`,
          },
          simulator: { type: "column-arithmetic", operation: "multiply", operands: [p, l], digitCount: String(area).length },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Langkah 1: Setengah keliling = ${perimeter} ÷ 2 = ${perimeter / 2} cm. Lebar = ${perimeter / 2} − ${p} = ${l} cm. Langkah 2: Luas = ${p} × ${l} = ${area} cm².`,
            en: `Step 1: Semi-perimeter = ${perimeter} ÷ 2 = ${perimeter / 2} cm. Width = ${perimeter / 2} − ${p} = ${l} cm. Step 2: Area = ${p} × ${l} = ${area} cm².`,
          },
        });
      } else {
        // Square Area given, find Perimeter (Square roots: 64, 81, 100, 144, 196, 225)
        const squareRoots = [
          { side: 8, area: 64 },
          { side: 9, area: 81 },
          { side: 10, area: 100 },
          { side: 11, area: 121 },
          { side: 12, area: 144 },
          { side: 14, area: 196 },
          { side: 15, area: 225 },
        ];
        const sq = pickRandom(squareRoots);
        const perimeter = sq.side * 4;
        const correctVal = `${perimeter} cm`;
        const distractors = [`${sq.area / 2} cm`, `${perimeter + 4} cm`, `${Math.max(4, perimeter - 4)} cm`].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "luas-bangun-datar",
          question: {
            id: `Luas sebuah bidang tanah berbentuk persegi adalah ${sq.area} m². Berapakah keliling bidang tanah tersebut?`,
            en: `The area of a square plot of land is ${sq.area} m². What is its perimeter?`,
          },
          simulator: { type: "column-arithmetic", operation: "multiply", operands: [sq.side, 4], digitCount: String(perimeter).length },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Langkah 1: Cari panjang sisi = √${sq.area} = ${sq.side} m. Langkah 2: Keliling persegi = 4 × sisi = 4 × ${sq.side} = ${perimeter} m.`,
            en: `Step 1: Find side length = √${sq.area} = ${sq.side} m. Step 2: Perimeter = 4 × ${sq.side} = ${perimeter} m.`,
          },
        });
      }
    }
  }
  return list;
}

// ─── 17. FPB & KPK — GCF and LCM (Grade 5) ────────────────────────────────────
// Cambridge: 5Ni.01 - find common factors and LCM; aligned with Kurikulum Merdeka Fase C
export function generateGCFLCMQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-gcflcm-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Small clean pairs (6 & 9, 8 & 12, 10 & 15, 4 & 6, 6 & 8, 9 & 12)
      const pairsT1 = [
        { a: 6, b: 9, gcf: 3, lcm: 18 },
        { a: 8, b: 12, gcf: 4, lcm: 24 },
        { a: 4, b: 6, gcf: 2, lcm: 12 },
        { a: 10, b: 15, gcf: 5, lcm: 30 },
        { a: 6, b: 8, gcf: 2, lcm: 24 },
        { a: 9, b: 12, gcf: 3, lcm: 36 },
      ];
      const pair = pickRandom(pairsT1);
      const isFPB = i % 2 === 0;

      if (isFPB) {
        const correctVal = String(pair.gcf);
        const distractors = [String(pair.gcf + 1), String(pair.gcf * 2), String(Math.max(1, pair.gcf - 1))].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "fpb-kpk",
          question: {
            id: `Berapakah FPB (Faktor Persekutuan Terbesar) dari ${pair.a} dan ${pair.b}?`,
            en: `What is the GCF of ${pair.a} and ${pair.b}?`,
          },
          simulator: { type: "circle-fraction", totalSegments: pair.a, filledSegments: pair.gcf, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Faktor terbesar yang membagi habis ${pair.a} dan ${pair.b} sekaligus adalah ${pair.gcf}.`,
            en: `The greatest factor dividing both ${pair.a} and ${pair.b} is ${pair.gcf}.`,
          },
        });
      } else {
        const correctVal = String(pair.lcm);
        const distractors = [String(pair.a * pair.b), String(pair.lcm + pair.gcf), String(Math.max(pair.a, pair.b))].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "fpb-kpk",
          question: {
            id: `Berapakah KPK (Kelipatan Persekutuan Terkecil) dari ${pair.a} dan ${pair.b}?`,
            en: `What is the LCM of ${pair.a} and ${pair.b}?`,
          },
          simulator: { type: "circle-fraction", totalSegments: pair.b, filledSegments: pair.gcf, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Kelipatan terkecil yang merupakan kelipatan dari ${pair.a} dan ${pair.b} adalah ${pair.lcm}.`,
            en: `The smallest multiple shared by ${pair.a} and ${pair.b} is ${pair.lcm}.`,
          },
        });
      }
    } else if (tier === 2) {
      // Tier 2: 2-digit pairs (12 & 18, 15 & 25, 16 & 24, 20 & 30, 24 & 36)
      const pairsT2 = [
        { a: 12, b: 18, gcf: 6, lcm: 36 },
        { a: 15, b: 25, gcf: 5, lcm: 75 },
        { a: 16, b: 24, gcf: 8, lcm: 48 },
        { a: 20, b: 30, gcf: 10, lcm: 60 },
        { a: 18, b: 24, gcf: 6, lcm: 72 },
        { a: 24, b: 36, gcf: 12, lcm: 72 },
      ];
      const pair = pickRandom(pairsT2);
      const isFPB = i % 2 === 0;

      if (isFPB) {
        const correctVal = String(pair.gcf);
        const distractors = [String(pair.gcf + 2), String(pair.gcf * 2), String(Math.max(1, pair.gcf - 2))].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "fpb-kpk",
          question: {
            id: `Tentukan FPB dari bilangan ${pair.a} dan ${pair.b}:`,
            en: `Determine the GCF of ${pair.a} and ${pair.b}:`,
          },
          simulator: { type: "circle-fraction", totalSegments: pair.a, filledSegments: pair.gcf, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Faktorisasi prima: ${pair.a} dan ${pair.b}. Ambil faktor prima yang sama dengan pangkat terkecil: FPB = ${pair.gcf}.`,
            en: `Prime factors: ${pair.a} and ${pair.b}. Product of lowest powers of common prime factors: GCF = ${pair.gcf}.`,
          },
        });
      } else {
        const correctVal = String(pair.lcm);
        const distractors = [String(pair.a * pair.b), String(pair.lcm + 12), String(Math.max(pair.a, pair.b))].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "fpb-kpk",
          question: {
            id: `Tentukan KPK dari bilangan ${pair.a} dan ${pair.b}:`,
            en: `Determine the LCM of ${pair.a} and ${pair.b}:`,
          },
          simulator: { type: "circle-fraction", totalSegments: pair.b, filledSegments: pair.gcf, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `KPK didapat dari perkalian semua faktor prima dengan pangkat terbesar: KPK = ${pair.lcm}.`,
            en: `LCM is the product of highest powers of all prime factors: LCM = ${pair.lcm}.`,
          },
        });
      }
    } else {
      // Tier 3: Challenge — 3-number GCF/LCM or real-world application word problems
      if (i % 2 === 0) {
        // Real-world word problems: KPK (lampu berkedip / bus) or FPB (kantong bingkisan)
        const isWordKPK = i % 4 === 0;
        if (isWordKPK) {
          const t1 = pickRandom([6, 8, 12]);
          const t2 = t1 === 6 ? 8 : t1 === 8 ? 12 : 15;
          const lcmVal = t1 === 6 && t2 === 8 ? 24 : t1 === 8 && t2 === 12 ? 24 : 60;
          const correctVal = `${lcmVal} detik`;
          const distractors = [`${t1 * t2} detik`, `${lcmVal + 10} detik`, `${Math.max(10, lcmVal - 10)} detik`].filter(v => v !== correctVal);

          list.push({
            id: qId, grade, difficultyTier: tier, topic: "fpb-kpk",
            question: {
              id: `Lampu merah berkedip setiap ${t1} detik, dan lampu hijau berkedip setiap ${t2} detik. Jika keduanya berkedip bersamaan sekarang, berapa detik lagi kedua lampu akan berkedip bersamaan untuk pertama kalinya?`,
              en: `Red light blinks every ${t1} s, green light every ${t2} s. In how many seconds will both blink together?`,
            },
            simulator: { type: "pattern-sequence", sequence: [t1, t2, lcmVal], missingIndices: [2], correctValues: [lcmVal], ruleDescription: `KPK(${t1}, ${t2}) = ${lcmVal}` },
            options: shuffle([
              { value: correctVal, isCorrect: true },
              ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
            ]),
            smartHint: {
              id: `Masalah peristiwa berulang bersamaan diselesaikan dengan KPK: KPK(${t1}, ${t2}) = ${lcmVal} detik.`,
              en: `Repeated event synchronization is solved with LCM: LCM(${t1}, ${t2}) = ${lcmVal} seconds.`,
            },
          });
        } else {
          // Word problem FPB (pembagian kantong sama banyak)
          const a = pickRandom([24, 30, 36]);
          const b = a === 24 ? 36 : a === 30 ? 45 : 48;
          const gcfVal = a === 24 && b === 36 ? 12 : a === 30 && b === 45 ? 15 : 12;
          const correctVal = `${gcfVal} kantong`;
          const distractors = [`${gcfVal + 2} kantong`, `${Math.max(2, gcfVal - 2)} kantong`, `${gcfVal * 2} kantong`].filter(v => v !== correctVal);

          list.push({
            id: qId, grade, difficultyTier: tier, topic: "fpb-kpk",
            question: {
              id: `Siti mempunyai ${a} buah jeruk dan ${b} buah apel. Siti ingin membagikannya ke dalam kantong plastik dengan jumlah jeruk dan apel yang sama rata tanpa sisa. Berapa jumlah kantong plastik terbanyak yang dapat dibuat?`,
              en: `Siti has ${a} oranges and ${b} apples. She wants to divide them into bags with equal amounts of each fruit and none left over. What is the maximum number of bags?`,
            },
            simulator: { type: "circle-fraction", totalSegments: a, filledSegments: gcfVal, interactive: false, showFractionLabel: false },
            options: shuffle([
              { value: correctVal, isCorrect: true },
              ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
            ]),
            smartHint: {
              id: `Masalah pembagian terbanyak sama rata diselesaikan dengan FPB: FPB(${a}, ${b}) = ${gcfVal} kantong.`,
              en: `Equal fair distribution into maximum groups is solved with GCF: GCF(${a}, ${b}) = ${gcfVal} bags.`,
            },
          });
        }
      } else {
        // 3-number GCF / LCM
        const trios = [
          { a: 12, b: 18, c: 24, gcf: 6, lcm: 72 },
          { a: 8, b: 12, c: 16, gcf: 4, lcm: 48 },
          { a: 10, b: 15, c: 20, gcf: 5, lcm: 60 },
          { a: 15, b: 20, c: 30, gcf: 5, lcm: 60 },
        ];
        const trio = pickRandom(trios);
        const askGCF = i % 4 === 1;
        const correctVal = String(askGCF ? trio.gcf : trio.lcm);
        const distractors = askGCF
          ? [String(trio.gcf + 2), String(Math.max(1, trio.gcf - 1)), String(trio.gcf * 2)].filter(v => v !== correctVal)
          : [String(trio.lcm + 12), String(trio.lcm / 2), String(trio.a * trio.b)].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier, topic: "fpb-kpk",
          question: {
            id: askGCF
              ? `Tentukan FPB dari 3 bilangan: ${trio.a}, ${trio.b}, dan ${trio.c}:`
              : `Tentukan KPK dari 3 bilangan: ${trio.a}, ${trio.b}, dan ${trio.c}:`,
            en: askGCF
              ? `Find the GCF of 3 numbers: ${trio.a}, ${trio.b}, and ${trio.c}:`
              : `Find the LCM of 3 numbers: ${trio.a}, ${trio.b}, and ${trio.c}:`,
          },
          simulator: { type: "pattern-sequence", sequence: [trio.a, trio.b, trio.c], missingIndices: [], correctValues: [], ruleDescription: askGCF ? `FPB = ${trio.gcf}` : `KPK = ${trio.lcm}` },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: askGCF
              ? `Faktor prima yang dimiliki ketiga bilangan sekaligus adalah: FPB = ${trio.gcf}.`
              : `Kelipatan terkecil yang habis dibagi ${trio.a}, ${trio.b}, dan ${trio.c} adalah: KPK = ${trio.lcm}.`,
            en: askGCF
              ? `The common factor shared by all three is: GCF = ${trio.gcf}.`
              : `Smallest multiple divisible by all three is: LCM = ${trio.lcm}.`,
          },
        });
      }
    }
  }
  return list;
}

// ─── 18. Persen Komersial — Commercial Percentage (Grade 6) ───────────────────
// Cambridge: 6Nf.04 - percentage of quantities, discount, tax, profit/loss
export function generateCommercialPercentageQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  function pctToSegments(pct: number): { total: number; filled: number } {
    const payPct = 100 - pct;
    if (payPct % 25 === 0) return { total: 4, filled: payPct / 25 };
    if (payPct % 10 === 0) return { total: 10, filled: payPct / 10 };
    if (payPct % 5 === 0)  return { total: 20, filled: payPct / 5 };
    return { total: 10, filled: Math.round(payPct / 10) };
  }

  for (let i = 0; i < count; i++) {
    const qId = `dyn-pctcom-t${tier}-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (tier === 1) {
      // Tier 1: Clean round prices and standard percentages (10%, 20%, 25%, 50%)
      const prices = [50000, 80000, 100000, 120000, 150000];
      const discounts = [10, 20, 25, 50];
      const price = pickRandom(prices);
      const disc = pickRandom(discounts);
      const discAmt = (price * disc) / 100;
      const finalPrice = price - discAmt;
      const priceStr = price.toLocaleString("id-ID");
      const finalStr = finalPrice.toLocaleString("id-ID");
      const { total: segTotal, filled: segFilled } = pctToSegments(disc);

      const distractors = [
        `Rp ${priceStr}`,
        `Rp ${discAmt.toLocaleString("id-ID")}`,
        `Rp ${(finalPrice + 10000).toLocaleString("id-ID")}`,
      ].filter((v) => v !== `Rp ${finalStr}`);

      list.push({
        id: qId, grade, difficultyTier: tier,
        topic: "persen-komersial",
        question: {
          id: `Harga baju Rp ${priceStr}. Baju tersebut mendapat diskon ${disc}%. Berapa harga yang harus dibayar?`,
          en: `A shirt costs Rp ${priceStr} with a ${disc}% discount. How much to pay?`,
        },
        simulator: { type: "circle-fraction", totalSegments: segTotal, filledSegments: segFilled, interactive: false, showFractionLabel: false },
        options: shuffle([
          { value: `Rp ${finalStr}`, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Diskon = ${disc}% × Rp ${priceStr} = Rp ${discAmt.toLocaleString("id-ID")}. Harga bayar = Rp ${priceStr} − Rp ${discAmt.toLocaleString("id-ID")} = Rp ${finalStr}.`,
          en: `Discount = ${disc}% × Rp ${priceStr} = Rp ${discAmt.toLocaleString("id-ID")}. Final = Rp ${finalStr}.`,
        },
      });
    } else if (tier === 2) {
      // Tier 2: Non-standard percentages (15%, 30%, 35%, 40%) & selling price from cost + profit %
      if (i % 2 === 0) {
        // Diskon non-standard
        const prices = [160000, 200000, 250000, 300000, 400000];
        const discounts = [15, 30, 35, 40];
        const price = pickRandom(prices);
        const disc = pickRandom(discounts);
        const discAmt = (price * disc) / 100;
        const finalPrice = price - discAmt;
        const priceStr = price.toLocaleString("id-ID");
        const finalStr = finalPrice.toLocaleString("id-ID");
        const { total: segTotal, filled: segFilled } = pctToSegments(disc);

        const distractors = [
          `Rp ${(finalPrice + 15000).toLocaleString("id-ID")}`,
          `Rp ${discAmt.toLocaleString("id-ID")}`,
          `Rp ${(price - 20000).toLocaleString("id-ID")}`,
        ].filter((v) => v !== `Rp ${finalStr}`);

        list.push({
          id: qId, grade, difficultyTier: tier,
          topic: "persen-komersial",
          question: {
            id: `Sebuah tas seharga Rp ${priceStr} mendapatkan diskon sebesar ${disc}%. Berapakah harga akhir yang harus dibayar pembeli?`,
            en: `A bag costs Rp ${priceStr} with a ${disc}% discount. What is the final price?`,
          },
          simulator: { type: "circle-fraction", totalSegments: segTotal, filledSegments: segFilled, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: `Rp ${finalStr}`, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Potongan diskon = ${disc}% × Rp ${priceStr} = Rp ${discAmt.toLocaleString("id-ID")}. Harga akhir = Rp ${finalStr}.`,
            en: `Discount amount = Rp ${discAmt.toLocaleString("id-ID")}. Final price = Rp ${finalStr}.`,
          },
        });
      } else {
        // Selling price from cost + profit
        const cost = pickRandom([80000, 100000, 120000, 150000]);
        const profitPct = pickRandom([15, 20, 25, 30]);
        const profit = (cost * profitPct) / 100;
        const sellPrice = cost + profit;
        const correctVal = `Rp ${sellPrice.toLocaleString("id-ID")}`;
        const distractors = [
          `Rp ${(cost + profit * 2).toLocaleString("id-ID")}`,
          `Rp ${profit.toLocaleString("id-ID")}`,
          `Rp ${(cost + 10000).toLocaleString("id-ID")}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier,
          topic: "persen-komersial",
          question: {
            id: `Seorang pedagang membeli barang dengan modal Rp ${cost.toLocaleString("id-ID")}. Jika pedagang ingin memperoleh keuntungan ${profitPct}%, berapa harga jual barang tersebut?`,
            en: `A merchant bought goods for Rp ${cost.toLocaleString("id-ID")}. Wanting a ${profitPct}% profit, what should the selling price be?`,
          },
          simulator: { type: "circle-fraction", totalSegments: 10, filledSegments: Math.round(profitPct / 10) || 1, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Keuntungan = ${profitPct}% × Rp ${cost.toLocaleString("id-ID")} = Rp ${profit.toLocaleString("id-ID")}. Harga jual = Modal + Untung = Rp ${sellPrice.toLocaleString("id-ID")}.`,
            en: `Profit = ${profitPct}% × Rp ${cost.toLocaleString("id-ID")} = Rp ${profit.toLocaleString("id-ID")}. Selling price = Cost + Profit = Rp ${sellPrice.toLocaleString("id-ID")}.`,
          },
        });
      }
    } else {
      // Tier 3: Challenge — Reverse percentage (original price before discount), PPN Tax, or Multi-item commercial
      if (i % 2 === 0) {
        // Reverse percentage: finding original price before discount
        // e.g. after 20% discount price is 160.000 => original is 200.000
        const items = [
          { disc: 20, discounted: 160000, orig: 200000 },
          { disc: 25, discounted: 150000, orig: 200000 },
          { disc: 10, discounted: 180000, orig: 200000 },
          { disc: 30, discounted: 210000, orig: 300000 },
          { disc: 50, discounted: 125000, orig: 250000 },
          { disc: 20, discounted: 240000, orig: 300000 },
        ];
        const item = pickRandom(items);
        const correctVal = `Rp ${item.orig.toLocaleString("id-ID")}`;
        const distractors = [
          `Rp ${(item.discounted + item.discounted * (item.disc / 100)).toLocaleString("id-ID")}`,
          `Rp ${(item.orig + 50000).toLocaleString("id-ID")}`,
          `Rp ${(item.orig - 20000).toLocaleString("id-ID")}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier,
          topic: "persen-komersial",
          question: {
            id: `Setelah mendapatkan diskon sebesar ${item.disc}%, harga sepasang sepatu menjadi Rp ${item.discounted.toLocaleString("id-ID")}. Berapakah harga asli sepatu tersebut sebelum diskon?`,
            en: `After a ${item.disc}% discount, shoes cost Rp ${item.discounted.toLocaleString("id-ID")}. What was the original price before discount?`,
          },
          simulator: { type: "circle-fraction", totalSegments: 10, filledSegments: 10 - item.disc / 10, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Harga setelah diskon adalah ${100 - item.disc}% dari harga asli. Harga asli = Rp ${item.discounted.toLocaleString("id-ID")} ÷ (${100 - item.disc} ÷ 100) = Rp ${item.orig.toLocaleString("id-ID")}.`,
            en: `Discounted price is ${100 - item.disc}% of original. Original = Rp ${item.discounted.toLocaleString("id-ID")} ÷ ${1 - item.disc / 100} = Rp ${item.orig.toLocaleString("id-ID")}.`,
          },
        });
      } else {
        // Discount then Tax (PPN 10%)
        // e.g. Price 100.000 - 10% disc = 90.000 + 10% PPN = 99.000
        const basePrice = pickRandom([100000, 200000, 300000]);
        const disc = 10;
        const tax = 10;
        const afterDisc = basePrice * 0.9;
        const finalTotal = afterDisc * 1.1; // 99% of original
        const correctVal = `Rp ${finalTotal.toLocaleString("id-ID")}`;
        const distractors = [
          `Rp ${basePrice.toLocaleString("id-ID")}`, // misconception: thinking 10% disc and 10% tax cancel out
          `Rp ${(basePrice * 0.9).toLocaleString("id-ID")}`,
          `Rp ${(finalTotal + 10000).toLocaleString("id-ID")}`,
        ].filter(v => v !== correctVal);

        list.push({
          id: qId, grade, difficultyTier: tier,
          topic: "persen-komersial",
          question: {
            id: `Sebuah barang seharga Rp ${basePrice.toLocaleString("id-ID")} mendapat diskon ${disc}%, namun kemudian dikenakan pajak PPN sebesar ${tax}%. Berapakah total harga yang harus dibayar?`,
            en: `An item costing Rp ${basePrice.toLocaleString("id-ID")} gets a ${disc}% discount, then is charged ${tax}% tax. What is the total to pay?`,
          },
          simulator: { type: "circle-fraction", totalSegments: 10, filledSegments: 9, interactive: false, showFractionLabel: false },
          options: shuffle([
            { value: correctVal, isCorrect: true },
            ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
          ]),
          smartHint: {
            id: `Langkah 1: Setelah diskon ${disc}% = Rp ${basePrice.toLocaleString("id-ID")} × 0,9 = Rp ${afterDisc.toLocaleString("id-ID")}. Langkah 2: Tambah pajak ${tax}% = Rp ${afterDisc.toLocaleString("id-ID")} × 1,1 = Rp ${finalTotal.toLocaleString("id-ID")}. (Perhatikan: diskon dan pajak tidak saling meniadakan!).`,
            en: `Step 1: After ${disc}% discount = Rp ${afterDisc.toLocaleString("id-ID")}. Step 2: Add ${tax}% tax = Rp ${afterDisc.toLocaleString("id-ID")} × 1.1 = Rp ${finalTotal.toLocaleString("id-ID")}.`,
          },
        });
      }
    }
  }
  return list;
}

// ─── 19. Master Generator ─────────────────────────────────────────────────────
export function generateSessionQuestions(grade: number, topic: string, tier: number = 1, count: number = 10): Question[] {
  if (topic === "pola-bilangan") {
    return generatePatternQuestions(grade, tier, count);
  }
  if (topic === "soal-cerita") {
    return generateWordProblemQuestions(grade, tier, count);
  }
  if (topic === "penjumlahan-dasar" || topic === "pengurangan-dasar") {
    return generateBasicArithmeticQuestions(grade, topic, tier, count);
  }
  if (topic === "penjumlahan-dua-digit" || topic === "pengurangan-dua-digit") {
    return generateColumnArithmeticQuestions(grade, topic, tier, count);
  }
  if (topic === "perkalian" || topic === "pembagian") {
    return generateMultDivQuestions(grade, topic, tier, count);
  }
  if (topic === "perkalian-awal") {
    return generateEarlyMultiplicationQuestions(grade, tier, count);
  }
  if (topic === "pecahan-dasar") {
    return generateBasicFractionQuestions(grade, tier, count);
  }
  if (topic === "pecahan-senilai") {
    return generateEquivalentFractionQuestions(grade, tier, count);
  }
  if (topic === "pecahan-operasi") {
    return generateFractionOperationQuestions(grade, tier, count);
  }
  if (topic === "desimal-dasar") {
    return generateDecimalQuestions(grade, tier, count);
  }
  if (topic === "pecahan-campuran") {
    return generateMixedFractionQuestions(grade, tier, count);
  }
  if (topic === "persen") {
    return generatePercentageQuestions(grade, tier, count);
  }
  if (topic === "persen-komersial") {
    return generateCommercialPercentageQuestions(grade, tier, count);
  }
  if (topic === "aljabar-dasar") {
    return generateBasicAlgebraQuestions(grade, tier, count);
  }
  if (topic === "perbandingan") {
    return generateRatioQuestions(grade, tier, count);
  }
  if (topic === "teori-bilangan") {
    return generateNumberTheoryQuestions(grade, tier, count);
  }
  if (topic === "luas-bangun-datar") {
    return generateAreaQuestions(grade, tier, count);
  }
  if (topic === "fpb-kpk") {
    return generateGCFLCMQuestions(grade, tier, count);
  }

  // Strictly return empty list if topic is unknown - NEVER fallback to another topic
  console.warn(`[generateSessionQuestions] Unhandled topic: ${topic} for grade ${grade}`);
  return [];
}
