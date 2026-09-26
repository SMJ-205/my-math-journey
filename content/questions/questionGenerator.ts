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
        a = randInt(2, 6);
        b = randInt(1, 9 - a);
      } else if (tier === 2) {
        // Crossing 10 (carry-over concept)
        a = randInt(5, 9);
        b = randInt(4, 9);
      } else {
        // Tier 3: 2-digit bridge
        a = randInt(11, 18);
        b = randInt(4, 9);
      }
      ans = a + b;
    } else {
      if (tier === 1) {
        a = randInt(4, 9);
        b = randInt(1, a - 1);
      } else if (tier === 2) {
        // Crossing 10 (borrowing concept)
        a = randInt(11, 18);
        b = randInt(4, 9);
      } else {
        // Tier 3: 2-digit borrow
        a = randInt(21, 35);
        b = randInt(5, 9);
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

    const qId = `dyn-basic-${topic}-${Date.now()}-${i}-${randInt(100, 999)}`;
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

// ─── 4. Penjumlahan & Pengurangan Dua Digit Bersusun (Kelas 2) ─────────────────
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

    if (isAdd) {
      if (tier === 1) {
        // Without carry
        const tensA = randInt(1, 5);
        const unitsA = randInt(1, 5);
        const tensB = randInt(1, 4);
        const unitsB = randInt(1, 9 - unitsA);
        a = tensA * 10 + unitsA;
        b = tensB * 10 + unitsB;
      } else if (tier === 2) {
        // With carry (menyimpan puluhan)
        const tensA = randInt(2, 6);
        const unitsA = randInt(5, 9);
        const tensB = randInt(1, 3);
        const unitsB = randInt(10 - unitsA, 9);
        a = tensA * 10 + unitsA;
        b = tensB * 10 + unitsB;
      } else {
        // Tier 3: Double carry / higher sum
        const tensA = randInt(4, 8);
        const unitsA = randInt(6, 9);
        const tensB = randInt(4, 7);
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
        // Tier 3: 3-digit borrow
        const tensA = randInt(11, 15);
        const unitsA = randInt(1, 5);
        a = tensA * 10 + unitsA;
        const tensB = randInt(4, 8);
        const unitsB = randInt(unitsA + 2, 9);
        b = tensB * 10 + unitsB;
      }
      ans = a - b;
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
    const qId = `dyn-col-${topic}-${Date.now()}-${i}-${randInt(100, 999)}`;
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
        { value: String(ans + 1), isCorrect: false },
        { value: String(ans - 1), isCorrect: false },
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
      a = tier === 1 ? randInt(2, 6) : randInt(6, 9);
      b = tier === 1 ? randInt(3, 7) : randInt(6, 9);
      ans = a * b;
      const qId = `dyn-mult-${Date.now()}-${i}-${randInt(100, 999)}`;
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
        options: [
          { value: String(ans), isCorrect: true },
          { value: String(ans + a), isCorrect: false },
          { value: String(ans - 1), isCorrect: false },
        ],
        smartHint: {
          id: `Perkalian adalah penjumlahan berulang: hitung penjumlahan angka ${a} sebanyak ${b} kali.`,
          en: `Multiplication is repeated addition: add the number ${a} a total of ${b} times.`,
        },
      });
    } else {
      const quotient = tier === 1 ? randInt(2, 6) : randInt(5, 9);
      b = tier === 1 ? randInt(2, 5) : randInt(6, 9);
      a = quotient * b;
      ans = quotient;
      const qId = `dyn-div-${Date.now()}-${i}-${randInt(100, 999)}`;
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
          digitCount: 1,
        },
        options: [
          { value: String(ans), isCorrect: true },
          { value: String(ans + 1), isCorrect: false },
          { value: String(ans - 1), isCorrect: false },
        ],
        smartHint: {
          id: `Pikirkan kebalikan dari pembagian: angka berapa yang jika dikalikan ${b} hasilnya sama dengan ${a}?`,
          en: `Think of division as reverse multiplication: what number times ${b} equals ${a}?`,
        },
      });
    }
  }

  return list;
}

// ─── 6. Pecahan Dasar (Kelas 3) ──────────────────────────────────────────────
export function generateBasicFractionQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const denominators = tier === 1 ? [2, 3, 4, 6] : [3, 4, 5, 6, 8];

  for (let i = 0; i < count; i++) {
    const den = pickRandom(denominators);
    const num = randInt(1, den - 1);
    const qId = `dyn-frac-basic-${Date.now()}-${i}-${randInt(100, 999)}`;
    const correctVal = `${num}/${den}`;

    const distractors = new Set<string>();
    if (den - num !== num) {
      distractors.add(`${den - num}/${den}`);
    }
    if (den - num > 0) {
      distractors.add(`${num}/${den - num}`);
    }
    distractors.add(`${den}/${num}`);
    if (distractors.size < 3) distractors.add(`${Math.min(den, num + 1)}/${den}`);
    if (distractors.size < 3) distractors.add(`${Math.max(1, num - 1)}/${den}`);
    if (distractors.size < 3) distractors.add(`1/${den}`);

    const rawOptions = [
      { value: correctVal, isCorrect: true },
      ...Array.from(distractors)
        .filter((v) => v !== correctVal)
        .slice(0, 3)
        .map((v) => ({
          value: v,
          isCorrect: false,
        })),
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
        id: "Angka atas (pembilang) menunjukkan bagian yang diwarnai. Angka bawah (penyebut) menunjukkan total semua bagian potongan.",
        en: "The top number (numerator) represents shaded parts. The bottom number (denominator) represents total sliced parts.",
      },
    });
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
  ];

  for (let i = 0; i < count; i++) {
    const base = pickRandom(baseFractions);
    const mult = tier === 1 ? pickRandom([2, 3]) : pickRandom([3, 4, 5]);
    const eqNum = base.num * mult;
    const eqDen = base.den * mult;
    const correctVal = `${eqNum}/${eqDen}`;
    const qId = `dyn-frac-eq-${Date.now()}-${i}-${randInt(100, 999)}`;

    const distractors = new Set<string>();
    distractors.add(`${Math.max(1, eqNum - 1)}/${eqDen}`);
    distractors.add(`${eqNum + 1}/${eqDen}`);
    distractors.add(`${base.num}/${eqDen}`);
    distractors.add(`${eqDen}/${eqNum}`);

    const rawOptions = [
      { value: correctVal, isCorrect: true },
      ...Array.from(distractors)
        .filter((v) => v !== correctVal)
        .slice(0, 3)
        .map((v) => ({
          value: v,
          isCorrect: false,
        })),
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
        id: `Kalikan pembilang (angka atas) dan penyebut (angka bawah) dengan bilangan yang sama untuk menemukan pecahan senilai.`,
        en: `Multiply both numerator (top) and denominator (bottom) by the same non-zero number to get an equivalent fraction.`,
      },
    });
  }

  return list;
}

// ─── 8. Desimal Dasar (Kelas 4) ───────────────────────────────────────────────
export function generateDecimalQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-dec-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (i % 2 === 0) {
      const num = randInt(1, 9);
      const correctVal = `0,${num}`;
      const distractors = [`0,0${num}`, `${num},0`, `0,${num > 5 ? num - 2 : num + 2}`].filter(
        (v) => v !== correctVal
      );

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

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
        options: shuffle(rawOptions),
        smartHint: {
          id: "Pecahan persepuluhan ditulis dengan 1 angka di belakang koma (misalnya 1/10 = 0,1).",
          en: "Tenth fractions are written with 1 decimal digit (for example 1/10 = 0.1).",
        },
      });
    } else {
      const a = randInt(1, 4);
      const b = randInt(1, 5);
      const sum = a + b;
      const correctVal = `0,${sum}`;
      const distractors = [`0,0${sum}`, `${sum},0`, `0,${sum + 1}`].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

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
        options: shuffle(rawOptions),
        smartHint: {
          id: `Jumlahkan angka di belakang koma: ${a} + ${b} = ${sum}, sehingga hasilnya adalah 0,${sum}.`,
          en: `Add the digits after the decimal point: ${a} + ${b} = ${sum}, making the result 0.${sum}.`,
        },
      });
    }
  }

  return list;
}

// ─── 9. Pecahan Campuran (Kelas 5) ────────────────────────────────────────────
export function generateMixedFractionQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const den = tier === 1 ? pickRandom([2, 3, 4]) : pickRandom([3, 4, 5, 6, 8]);
    const whole = tier === 1 ? randInt(1, 3) : randInt(2, 5);
    const rem = randInt(1, den - 1);
    const improperNum = whole * den + rem;
    const qId = `dyn-mix-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (i % 2 === 0) {
      const correctVal = `${whole} ${rem}/${den}`;
      const distractors = [
        `${whole + 1} ${rem}/${den}`,
        `${whole} ${den - rem}/${den}`,
        `${rem} ${whole}/${den}`,
      ].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

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
        options: shuffle(rawOptions),
        smartHint: {
          id: `Bagi pembilang dengan penyebut: ${improperNum} dibagi ${den} menghasilkan ${whole} bersisa ${rem}. Maka bentuk campurannya adalah ${whole} ${rem}/${den}.`,
          en: `Divide numerator by denominator: ${improperNum} divided by ${den} is ${whole} with remainder ${rem}. The mixed fraction is ${whole} ${rem}/${den}.`,
        },
      });
    } else {
      const correctVal = `${improperNum}/${den}`;
      const distractors = [
        `${whole * den}/${den}`,
        `${whole + rem}/${den}`,
        `${improperNum + 1}/${den}`,
      ].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

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
        options: shuffle(rawOptions),
        smartHint: {
          id: `Kalikan bilangan bulat di depan dengan penyebut, lalu tambahkan sisa pembilang: (${whole} × ${den}) + ${rem} = ${improperNum}.`,
          en: `Multiply the whole number by denominator, then add the numerator: (${whole} × ${den}) + ${rem} = ${improperNum}.`,
        },
      });
    }
  }

  return list;
}

// ─── 10. Persen (Kelas 5) ─────────────────────────────────────────────────────
export function generatePercentageQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const pairsTier1 = [
    { num: 1, den: 2, pct: 50 },
    { num: 1, den: 4, pct: 25 },
    { num: 3, den: 4, pct: 75 },
    { num: 1, den: 5, pct: 20 },
    { num: 1, den: 10, pct: 10 },
  ];
  const pairsTier2 = [
    { num: 2, den: 5, pct: 40 },
    { num: 3, den: 5, pct: 60 },
    { num: 4, den: 5, pct: 80 },
    { num: 7, den: 10, pct: 70 },
    { num: 9, den: 10, pct: 90 },
  ];
  const pairs = tier === 1 ? pairsTier1 : pairsTier2;

  for (let i = 0; i < count; i++) {
    const pair = pickRandom(pairs);
    const qId = `dyn-pct-${Date.now()}-${i}-${randInt(100, 999)}`;

    if (i % 2 === 0) {
      const correctVal = `${pair.pct}%`;
      const distractors = [
        `${pair.pct + 10}%`,
        `${Math.max(5, pair.pct - 10)}%`,
        `${pair.num * 10}%`,
      ].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

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
        options: shuffle(rawOptions),
        smartHint: {
          id: `Persen artinya per seratus. Kalikan pecahan dengan 100%: (${pair.num}/${pair.den}) × 100%.`,
          en: `Percent means per hundred. Multiply fraction by 100%: (${pair.num}/${pair.den}) × 100%.`,
        },
      });
    } else {
      const correctVal = `${pair.num}/${pair.den}`;
      const distractors = [
        `${pair.den}/${pair.num}`,
        `${pair.num + 1}/${pair.den}`,
        `1/${pair.den}`,
      ].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

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
        options: shuffle(rawOptions),
        smartHint: {
          id: `Tuliskan ${pair.pct}% sebagai ${pair.pct}/100, lalu sederhanakan dengan membagi pembilang dan penyebut dengan angka yang sama.`,
          en: `Write ${pair.pct}% as ${pair.pct}/100, then simplify by dividing numerator and denominator by common factors.`,
        },
      });
    }
  }

  return list;
}

// ─── 11. Aljabar Dasar (Kelas 6 — 1 Step & 2 Step Progression) ────────────────
export function generateBasicAlgebraQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-alg-${Date.now()}-${i}-${randInt(100, 999)}`;
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
        hintId = `Kurangkan kedua sisi dengan ${a}: n = ${b} − ${a}.`;
        hintEn = `Subtract ${a} from both sides: n = ${b} − ${a}.`;
      } else if (opType === "sub") {
        const a = randInt(5, 20);
        ans = randInt(10, 35);
        const b = ans - a;
        leftExpr = `n − ${a}`;
        rightExpr = String(b);
        qTextId = `Tentukan nilai n dari persamaan: n − ${a} = ${b}`;
        qTextEn = `Find the value of n in the equation: n − ${a} = ${b}`;
        hintId = `Tambahkan kedua sisi dengan ${a}: n = ${b} + ${a}.`;
        hintEn = `Add ${a} to both sides: n = ${b} + ${a}.`;
      } else {
        const a = randInt(3, 9);
        ans = randInt(3, 9);
        const b = a * ans;
        leftExpr = `${a} × n`;
        rightExpr = String(b);
        qTextId = `Tentukan nilai n dari persamaan: ${a} × n = ${b}`;
        qTextEn = `Find the value of n in the equation: ${a} × n = ${b}`;
        hintId = `Bagi kedua sisi dengan ${a}: n = ${b} ÷ ${a}.`;
        hintEn = `Divide both sides by ${a}: n = ${b} ÷ ${a}.`;
      }
    } else {
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
        ? `Langkah 1: Kurangkan ${b} dari ${c} (= ${c - b}). Langkah 2: Bagi hasilnya dengan ${a}.`
        : `Langkah 1: Tambahkan ${b} ke ${c} (= ${c + b}). Langkah 2: Bagi hasilnya dengan ${a}.`;
      hintEn = isPlus
        ? `Step 1: Subtract ${b} from ${c} (= ${c - b}). Step 2: Divide by ${a}.`
        : `Step 1: Add ${b} to ${c} (= ${c + b}). Step 2: Divide by ${a}.`;
    }

    const correctVal = String(ans);
    const distractors = [
      String(ans + 2),
      String(Math.max(1, ans - 2)),
      String(ans + 5),
    ].filter((v) => v !== correctVal);

    const rawOptions = [
      { value: correctVal, isCorrect: true },
      ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
    ];

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
      options: shuffle(rawOptions),
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
    const qId = `dyn-ratio-${Date.now()}-${i}-${randInt(100, 999)}`;
    const base = pickRandom(baseRatios);
    const mult = tier === 1 ? randInt(2, 5) : randInt(5, 12);

    if (i % 2 === 0) {
      const a = base.a * mult;
      const b = base.b * mult;
      const correctVal = `${base.a} : ${base.b}`;
      const distractors = [
        `${base.b} : ${base.a}`,
        `${base.a + 1} : ${base.b}`,
        `${base.a} : ${base.b + 1}`,
      ].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

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
        options: shuffle(rawOptions),
        smartHint: {
          id: `Bagi kedua angka perbandingan dengan faktor pembagi yang sama sampai tidak bisa dibagi lagi.`,
          en: `Divide both ratio values by their common divisor until they cannot be reduced further.`,
        },
      });
    } else {
      const name1 = pickRandom(NAMES);
      const name2 = pickRandom(NAMES.filter((n) => n !== name1));
      const objItem = pickRandom(OBJECTS_BILINGUAL);
      const objId = objItem.id;
      const objEn = objItem.en;
      const count1 = base.a * mult;
      const count2 = base.b * mult;
      const correctVal = String(count2);
      const distractors = [
        String(count2 + mult),
        String(Math.max(1, count2 - mult)),
        String((base.a + base.b) * mult),
      ].filter((v) => v !== correctVal);

      const rawOptions = [
        { value: correctVal, isCorrect: true },
        ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
      ];

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "perbandingan",
        question: {
          id: `Perbandingan banyak ${objId} ${name1} dan ${name2} adalah ${base.a} : ${base.b}. Jika ${name1} memiliki ${count1} ${objId}, berapa banyak ${objId} ${name2}?`,
          en: `The ratio of ${objEn} between ${name1} and ${name2} is ${base.a} : ${base.b}. If ${name1} has ${count1} ${objEn}, how many ${objEn} does ${name2} have?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: base.a + base.b,
          filledSegments: base.a,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle(rawOptions),
        smartHint: {
          id: `Cari faktor pengali: ${count1} dibagi ${base.a} = ${mult}. Lalu kalikan ${base.b} dengan ${mult}.`,
          en: `Find the multiplier: ${count1} divided by ${base.a} = ${mult}. Then multiply ${base.b} by ${mult}.`,
        },
      });
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
    const qId = `dyn-earlymult-${Date.now()}-${i}-${randInt(100, 999)}`;
    // Tier 1: ×2, ×5, ×10. Tier 2: ×2, ×3, ×4, ×5, ×10
    const tables = tier === 1 ? [2, 5, 10] : [2, 3, 4, 5, 10];
    const multiplier = pickRandom(tables);
    const factor = tier === 1 ? randInt(1, 6) : randInt(1, 10);
    const ans = multiplier * factor;
    const name = pickRandom(NAMES_LOCAL);
    const objItem = pickRandom(OBJECTS_BILINGUAL);
    const objId = objItem.id;
    const objEn = objItem.en;

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
        id: `Perkalian adalah penjumlahan berulang: tambahkan ${multiplier} sebanyak ${factor} kali.`,
        en: `Multiplication is repeated addition: add ${multiplier} a total of ${factor} times.`,
      },
    });
  }
  return list;
}

// ─── 14. Pecahan Operasi — Add/Subtract Same Denominator (Grade 3) ─────────────
// Cambridge: 3Nf.07 - add/subtract fractions with same denominator within 1 whole
export function generateFractionOperationQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-fracop-${Date.now()}-${i}-${randInt(100, 999)}`;
    const denominators = tier === 1 ? [2, 3, 4] : [4, 5, 6, 8];
    const den = pickRandom(denominators);

    const isAdd = i % 2 === 0;
    if (isAdd) {
      // a/d + b/d where a+b < d (result stays within 1)
      const maxNum = den - 1;
      const a = randInt(1, Math.max(1, Math.floor(maxNum / 2)));
      const b = randInt(1, maxNum - a);
      const resultNum = a + b;
      const correctVal = resultNum === den ? `1` : `${resultNum}/${den}`;
      const distractors = [
        `${resultNum}/${den * 2}`,
        `${a}/${den + b}`,
        `${Math.max(1, resultNum - 1)}/${den}`,
      ].filter((v) => v !== correctVal);

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
          filledSegments: a,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Jika penyebutnya sama, cukup jumlahkan pembilangnya: ${a} + ${b} = ${resultNum}. Penyebutnya tetap ${den}.`,
          en: `When denominators are the same, just add the numerators: ${a} + ${b} = ${resultNum}. The denominator stays ${den}.`,
        },
      });
    } else {
      // a/d - b/d where a > b
      const a = randInt(2, den - 1);
      const b = randInt(1, a - 1);
      const resultNum = a - b;
      const correctVal = `${resultNum}/${den}`;
      const distractors = [
        `${a + b}/${den}`,
        `${resultNum}/${den + 1}`,
        `${Math.min(den - 1, resultNum + 1)}/${den}`,
      ].filter((v) => v !== correctVal);

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
          filledSegments: a,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Jika penyebutnya sama, kurangkan pembilangnya saja: ${a} − ${b} = ${resultNum}. Penyebutnya tetap ${den}.`,
          en: `When denominators are the same, subtract only the numerators: ${a} − ${b} = ${resultNum}. The denominator stays ${den}.`,
        },
      });
    }
  }
  return list;
}

// ─── 15. Teori Bilangan — Factors, Multiples, Prime (Grade 4) ─────────────────
// Cambridge: 4Ni.05 - divisibility, prime numbers; 4Ni.01 - factors and multiples
export function generateNumberTheoryQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const primes = [2, 3, 5, 7, 11, 13, 17, 19];
  const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25];

  for (let i = 0; i < count; i++) {
    const qId = `dyn-numtheory-${Date.now()}-${i}-${randInt(100, 999)}`;
    const mode = i % 3;

    if (mode === 0) {
      // Find all factors of a number
      const num = tier === 1 ? pickRandom([12, 16, 18, 20, 24]) : pickRandom([36, 48, 60, 72, 100]);
      const factors = [];
      for (let f = 1; f <= num; f++) if (num % f === 0) factors.push(f);
      const correctVal = `${factors.length}`;
      const distractors = [
        String(factors.length + 1),
        String(Math.max(1, factors.length - 1)),
        String(factors.length + 2),
      ].filter((v) => v !== correctVal);

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "teori-bilangan",
        question: {
          id: `Bilangan ${num} memiliki berapa faktor (bilangan pembagi habis)?`,
          en: `How many factors (exact divisors) does the number ${num} have?`,
        },
        simulator: { type: "pattern-sequence", sequence: factors.map(Number), missingIndices: [], correctValues: [], ruleDescription: `Faktor dari ${num}` },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Faktor adalah bilangan yang membagi habis ${num}. Coba periksa satu per satu: 1, 2, 3, ... sampai ${num}.`,
          en: `A factor divides ${num} exactly. Check each number 1, 2, 3, ... up to ${num}.`,
        },
      });
    } else if (mode === 1) {
      // Identify prime or composite
      const isPrimeQ = i % 4 < 2;
      const num = isPrimeQ ? pickRandom(primes.filter(p => p < (tier === 1 ? 13 : 20))) : pickRandom(composites.filter(c => c < (tier === 1 ? 21 : 31)));
      const correctVal = isPrimeQ ? "Prima" : "Komposit";
      const correctValEn = isPrimeQ ? "Prime" : "Composite";

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "teori-bilangan",
        question: {
          id: `Bilangan ${num} adalah bilangan...`,
          en: `The number ${num} is a...`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: isPrimeQ ? 2 : 4,
          filledSegments: isPrimeQ ? 2 : 3,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          { value: isPrimeQ ? "Komposit" : "Prima", isCorrect: false },
          { value: "Genap Sempurna", isCorrect: false },
        ]),
        smartHint: {
          id: isPrimeQ
            ? `Bilangan prima hanya memiliki tepat 2 faktor: 1 dan dirinya sendiri. ${num} hanya bisa dibagi 1 dan ${num}.`
            : `Bilangan komposit memiliki lebih dari 2 faktor. ${num} bisa dibagi oleh bilangan lain selain 1 dan ${num}.`,
          en: isPrimeQ
            ? `A prime number has exactly 2 factors: 1 and itself. ${num} can only be divided by 1 and ${num}.`
            : `A composite number has more than 2 factors. ${num} has divisors other than 1 and ${num}.`,
        },
      });
    } else {
      // Kelipatan (Multiples)
      const base = tier === 1 ? pickRandom([2, 3, 4, 5, 10]) : pickRandom([6, 7, 8, 9, 11, 12]);
      const nth = randInt(2, tier === 1 ? 8 : 12);
      const correctVal = String(base * nth);
      const distractors = [
        String(base * (nth + 1)),
        String(base * (nth - 1)),
        String(base * nth + 1),
      ].filter((v) => v !== correctVal);

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "teori-bilangan",
        question: {
          id: `Berapakah kelipatan ke-${nth} dari bilangan ${base}?`,
          en: `What is the ${nth}${nth === 1 ? "st" : nth === 2 ? "nd" : nth === 3 ? "rd" : "th"} multiple of ${base}?`,
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
  }
  return list;
}

// ─── 16. Luas Bangun Datar — Area of Rectangles & Squares (Grade 4) ───────────
// Cambridge: 4Gg.01 - find and apply area formula (L = p × l) and perimeter
export function generateAreaQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];
  const NAMES_LOCAL = NAMES;

  for (let i = 0; i < count; i++) {
    const qId = `dyn-area-${Date.now()}-${i}-${randInt(100, 999)}`;
    const isArea = i % 3 !== 2; // 2/3 are area, 1/3 is perimeter

    if (isArea) {
      // Area of rectangle or square
      const isSquare = i % 5 === 0;
      let p: number, l: number, ans: number;
      if (isSquare) {
        p = tier === 1 ? randInt(3, 9) : randInt(8, 20);
        l = p;
        ans = p * l;
      } else {
        p = tier === 1 ? randInt(4, 12) : randInt(8, 25);
        l = tier === 1 ? randInt(2, 8) : randInt(5, 18);
        ans = p * l;
      }

      const shapeId = isSquare ? "persegi" : "persegi panjang";
      const shapeEn = isSquare ? "square" : "rectangle";
      const descId = isSquare
        ? `Sebuah ${shapeId} memiliki panjang sisi ${p} cm. Hitung luasnya!`
        : `Sebuah ${shapeId} memiliki panjang ${p} cm dan lebar ${l} cm. Hitung luasnya!`;
      const descEn = isSquare
        ? `A ${shapeEn} has a side length of ${p} cm. Find its area!`
        : `A ${shapeEn} has a length of ${p} cm and width of ${l} cm. Find its area!`;
      const correctVal = `${ans} cm²`;

      const distractors = [
        `${(p + l) * 2} cm²`,
        `${ans + p} cm²`,
        `${Math.max(1, ans - l)} cm²`,
      ].filter((v) => v !== correctVal);

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "luas-bangun-datar",
        question: { id: descId, en: descEn },
        simulator: {
          type: "column-arithmetic",
          operation: "multiply",
          operands: [p, l],
          digitCount: String(ans).length,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: isSquare
            ? `Luas persegi = sisi × sisi = ${p} × ${p} = ${ans} cm².`
            : `Luas persegi panjang = panjang × lebar = ${p} × ${l} = ${ans} cm².`,
          en: isSquare
            ? `Area of square = side × side = ${p} × ${p} = ${ans} cm².`
            : `Area of rectangle = length × width = ${p} × ${l} = ${ans} cm².`,
        },
      });
    } else {
      // Perimeter
      const p = tier === 1 ? randInt(4, 12) : randInt(8, 20);
      const l = tier === 1 ? randInt(2, 8) : randInt(5, 15);
      const ans = 2 * (p + l);
      const correctVal = `${ans} cm`;
      const distractors = [
        `${p * l} cm`,
        `${ans + 2} cm`,
        `${ans - 2} cm`,
      ].filter((v) => v !== correctVal);

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "luas-bangun-datar",
        question: {
          id: `Sebuah persegi panjang memiliki panjang ${p} cm dan lebar ${l} cm. Berapa keliling (perimeter)-nya?`,
          en: `A rectangle has a length of ${p} cm and width of ${l} cm. What is its perimeter?`,
        },
        simulator: {
          type: "column-arithmetic",
          operation: "multiply",
          operands: [p + l, 2],
          digitCount: String(ans).length,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Keliling persegi panjang = 2 × (panjang + lebar) = 2 × (${p} + ${l}) = 2 × ${p + l} = ${ans} cm.`,
          en: `Perimeter of rectangle = 2 × (length + width) = 2 × (${p} + ${l}) = 2 × ${p + l} = ${ans} cm.`,
        },
      });
    }
  }
  return list;
}

// ─── 17. FPB & KPK — GCF and LCM (Grade 5) ────────────────────────────────────
// Cambridge: 5Ni.01 - find common factors and LCM; aligned with Kurikulum Merdeka Fase C
export function generateGCFLCMQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  const pairsT1 = [
    { a: 6, b: 9, gcf: 3, lcm: 18 },
    { a: 8, b: 12, gcf: 4, lcm: 24 },
    { a: 4, b: 6, gcf: 2, lcm: 12 },
    { a: 10, b: 15, gcf: 5, lcm: 30 },
    { a: 6, b: 8, gcf: 2, lcm: 24 },
    { a: 9, b: 12, gcf: 3, lcm: 36 },
  ];
  const pairsT2 = [
    { a: 12, b: 18, gcf: 6, lcm: 36 },
    { a: 15, b: 25, gcf: 5, lcm: 75 },
    { a: 16, b: 24, gcf: 8, lcm: 48 },
    { a: 20, b: 30, gcf: 10, lcm: 60 },
    { a: 18, b: 24, gcf: 6, lcm: 72 },
    { a: 14, b: 21, gcf: 7, lcm: 42 },
  ];
  const pairs = tier === 1 ? pairsT1 : pairsT2;

  for (let i = 0; i < count; i++) {
    const qId = `dyn-gcflcm-${Date.now()}-${i}-${randInt(100, 999)}`;
    const pair = pickRandom(pairs);
    const isFPB = i % 2 === 0;

    if (isFPB) {
      const correctVal = String(pair.gcf);
      const distractors = [
        String(pair.gcf + 1),
        String(pair.gcf * 2),
        String(Math.max(1, pair.gcf - 1)),
      ].filter((v) => v !== correctVal);

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "fpb-kpk",
        question: {
          id: `Berapakah FPB (Faktor Persekutuan Terbesar) dari ${pair.a} dan ${pair.b}?`,
          en: `What is the GCF (Greatest Common Factor) of ${pair.a} and ${pair.b}?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: pair.a,
          filledSegments: pair.gcf,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Faktor dari ${pair.a}: cari semua bilangan yang membagi habis ${pair.a}. Kemudian cari yang sama dengan faktor ${pair.b}. Faktor persekutuan terbesar adalah ${pair.gcf}.`,
          en: `Find all factors of ${pair.a}, then find the ones shared with ${pair.b}. The greatest common factor is ${pair.gcf}.`,
        },
      });
    } else {
      const correctVal = String(pair.lcm);
      const distractors = [
        String(pair.a * pair.b),
        String(pair.lcm + pair.gcf),
        String(Math.max(pair.a, pair.b)),
      ].filter((v) => v !== correctVal);

      list.push({
        id: qId,
        grade,
        difficultyTier: tier,
        topic: "fpb-kpk",
        question: {
          id: `Berapakah KPK (Kelipatan Persekutuan Terkecil) dari ${pair.a} dan ${pair.b}?`,
          en: `What is the LCM (Lowest Common Multiple) of ${pair.a} and ${pair.b}?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: pair.b,
          filledSegments: pair.a % pair.b === 0 ? pair.a % pair.b || 1 : pair.a % pair.b,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `Daftarkan kelipatan dari ${pair.a}: ${pair.a}, ${pair.a * 2}, ${pair.a * 3}, … dan dari ${pair.b}: ${pair.b}, ${pair.b * 2}, … Kelipatan persekutuan terkecil pertama yang sama adalah ${pair.lcm}.`,
          en: `List multiples of ${pair.a}: ${pair.a}, ${pair.a * 2}, ${pair.a * 3}, … and of ${pair.b}: ${pair.b}, ${pair.b * 2}, … The smallest common multiple is ${pair.lcm}.`,
        },
      });
    }
  }
  return list;
}

// ─── 18. Persen Komersial — Commercial Percentage (Grade 6) ───────────────────
// Cambridge: 6Nf.04 - percentage of quantities, discount, tax, profit/loss
export function generateCommercialPercentageQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  // Helper: pick clean circle segments for a percentage value
  function pctToSegments(pct: number): { total: number; filled: number } {
    // Use the smallest denominator that cleanly represents (100-pct)/100
    const payPct = 100 - pct;
    if (payPct % 25 === 0) return { total: 4, filled: payPct / 25 };
    if (payPct % 10 === 0) return { total: 10, filled: payPct / 10 };
    if (payPct % 5 === 0)  return { total: 20, filled: payPct / 5 };
    return { total: 10, filled: Math.round(payPct / 10) };
  }

  for (let i = 0; i < count; i++) {
    const qId = `dyn-pctcom-${Date.now()}-${i}-${randInt(100, 999)}`;
    const mode = i % 3;

    if (mode === 0) {
      // ── Diskon ──────────────────────────────────────────────────────────
      const prices    = tier === 1 ? [50000, 80000, 100000, 120000, 160000] : [150000, 200000, 250000, 350000, 400000];
      const discounts = tier === 1 ? [10, 20, 25, 50] : [15, 20, 25, 30];
      const price       = pickRandom(prices);
      const disc        = pickRandom(discounts);
      const discAmt     = (price * disc) / 100;
      const finalPrice  = price - discAmt;
      const priceStr    = price.toLocaleString("id-ID");
      const finalStr    = finalPrice.toLocaleString("id-ID");
      const discAmtStr  = discAmt.toLocaleString("id-ID");
      const payPct      = 100 - disc;
      const { total: segTotal, filled: segFilled } = pctToSegments(disc);

      // Distractors: harga asal, hanya nilai diskon, salah hitung
      const distractors = [
        `Rp ${priceStr}`,
        `Rp ${discAmtStr}`,
        `Rp ${((finalPrice + 5000) / 1000 * 1000).toLocaleString("id-ID")}`,
      ].filter((v) => v !== `Rp ${finalStr}`);

      list.push({
        id: qId, grade, difficultyTier: tier,
        topic: "persen-komersial",
        question: {
          id: `Harga suatu barang Rp ${priceStr}. Mendapat diskon ${disc}%. Berapa harga yang harus dibayar?`,
          en: `An item costs Rp ${priceStr}. It has a ${disc}% discount. What is the price to pay?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: segTotal,
          filledSegments: segFilled,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: `Rp ${finalStr}`, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `💡 Rumus Harga Bayar:\n\nH' = (100 − % diskon) ÷ 100 × Harga Awal\n\nArtinya: jika diskon ${disc}%, maka yang dibayar adalah ${payPct}% dari harga awal. Hitung ${payPct}% × harga awal untuk mendapat jawabannya.`,
          en: `💡 Formula:\n\nH' = (100 − discount%) ÷ 100 × Original Price\n\nThis means: with a ${disc}% discount, you pay ${payPct}% of the original price. Calculate ${payPct}% of the price to find your answer.`,
        },
      });

    } else if (mode === 1) {
      // ── Untung / Rugi ────────────────────────────────────────────────────
      const buyPrices  = tier === 1 ? [40000, 60000, 80000, 100000] : [120000, 150000, 200000, 240000];
      const buy        = pickRandom(buyPrices);
      const isProfitQ  = i % 4 < 2;
      const pctChange  = tier === 1 ? pickRandom([10, 20, 25]) : pickRandom([15, 20, 25, 30]);
      const change     = (buy * pctChange) / 100;
      const sell       = isProfitQ ? buy + change : buy - change;
      const buyStr     = buy.toLocaleString("id-ID");
      const sellStr    = sell.toLocaleString("id-ID");
      const correctVal = `${pctChange}%`;
      const distractors = [
        `${pctChange + 5}%`,
        `${Math.max(5, pctChange - 5)}%`,
        `${pctChange * 2}%`,
      ].filter((v) => v !== correctVal);
      const diffAbs = Math.abs(sell - buy);

      list.push({
        id: qId, grade, difficultyTier: tier,
        topic: "persen-komersial",
        question: {
          id: `Seorang pedagang membeli barang seharga Rp ${buyStr}, kemudian dijual Rp ${sellStr}. Berapa persen ${isProfitQ ? "keuntungan" : "kerugian"}-nya?`,
          en: `A merchant buys goods for Rp ${buyStr} and sells for Rp ${sellStr}. What is the percentage ${isProfitQ ? "profit" : "loss"}?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: 10,
          filledSegments: Math.round(pctChange / 10),
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `💡 Rumus % ${isProfitQ ? "Untung" : "Rugi"}:\n\n% = Selisih Harga ÷ Harga Beli × 100\n\nLangkah:\n1. Cari selisih harga jual dan harga beli: Rp ${sellStr} − Rp ${buyStr}\n2. Bagi selisihnya dengan harga beli\n3. Kalikan dengan 100 untuk mendapat %`,
          en: `💡 Formula % ${isProfitQ ? "Profit" : "Loss"}:\n\n% = Price Difference ÷ Cost Price × 100\n\nSteps:\n1. Find the difference between selling price and cost: Rp ${sellStr} − Rp ${buyStr}\n2. Divide by the cost price\n3. Multiply by 100 to get the percentage`,
        },
      });

    } else {
      // ── Persen dari nilai ────────────────────────────────────────────────
      const totals = tier === 1 ? [100, 200, 400, 500] : [250, 400, 600, 800];
      const pct    = tier === 1 ? pickRandom([10, 20, 25, 50, 75]) : pickRandom([15, 30, 35, 40, 60]);
      const total  = pickRandom(totals);
      const ans    = (total * pct) / 100;
      const correctVal = String(ans);
      const distractors = [
        String(ans + total * 0.1),
        String(Math.max(1, ans - total * 0.1)),
        String(total - ans),
      ].map(v => String(Math.round(Number(v)))).filter((v) => v !== correctVal);

      // Clean circle: show pct/100 visually
      const pctSegTotal  = pct % 25 === 0 ? 4 : pct % 10 === 0 ? 10 : 20;
      const pctSegFilled = pct % 25 === 0 ? pct / 25 : pct % 10 === 0 ? pct / 10 : pct / 5;

      list.push({
        id: qId, grade, difficultyTier: tier,
        topic: "persen-komersial",
        question: {
          id: `Berapa ${pct}% dari ${total}?`,
          en: `What is ${pct}% of ${total}?`,
        },
        simulator: {
          type: "circle-fraction",
          totalSegments: pctSegTotal,
          filledSegments: pctSegFilled,
          interactive: false,
          showFractionLabel: false,
        },
        options: shuffle([
          { value: correctVal, isCorrect: true },
          ...distractors.slice(0, 3).map((v) => ({ value: v, isCorrect: false })),
        ]),
        smartHint: {
          id: `💡 Rumus Persen:\n\nHasil = % ÷ 100 × Bilangan\n\nLangkah:\n1. Ubah ${pct}% menjadi pecahan: ${pct}/100\n2. Kalikan pecahan tersebut dengan ${total}\n3. Sederhanakan jika perlu`,
          en: `💡 Formula:\n\nResult = % ÷ 100 × Number\n\nSteps:\n1. Convert ${pct}% to a fraction: ${pct}/100\n2. Multiply that fraction by ${total}\n3. Simplify if needed`,
        },
      });
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
