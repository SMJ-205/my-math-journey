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

// ─── 1. Pola Bilangan / Deret Matematika (Kelas 1 - 6) ────────────────────────
export function generatePatternQuestions(grade: number, tier: number, count: number): Question[] {
  const list: Question[] = [];

  for (let i = 0; i < count; i++) {
    let step = 2;
    let start = 2;
    const length = 5;
    let customSeq: number[] | null = null;
    let ruleTextId = "";
    let ruleTextEn = "";

    if (grade === 1) {
      // Grade 1: Simple steps +1, +2, +5 with numbers <= 20
      step = pickRandom([1, 2, 5]);
      start = randInt(1, 10);
      ruleTextId = `Bertambah ${step} setiap langkah`;
      ruleTextEn = `Increases by ${step} each step`;
    } else if (grade === 2) {
      // Grade 2: Steps +2, +3, +5, +10, -2, -5 with numbers up to 50
      step = pickRandom([2, 3, 5, 10, -2, -5]);
      start = step > 0 ? randInt(2, 20) : randInt(30, 50);
      ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
      ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
    } else if (grade === 3) {
      // Grade 3: Foundations of multiplication tables: +3, +4, +6, +7, +8, +9, -3, -4 up to 100
      step = pickRandom([3, 4, 6, 7, 8, 9, -3, -4]);
      start = step > 0 ? randInt(3, 30) : randInt(50, 90);
      ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
      ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
    } else if (grade === 4) {
      // Grade 4: Double-digit steps: +12, +15, +20, +25, -6, -8, -12 up to 200
      step = pickRandom([12, 15, 20, 25, -6, -8, -12]);
      start = step > 0 ? randInt(10, 50) : randInt(100, 160);
      ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
      ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
    } else if (grade === 5) {
      // Grade 5: Large steps (+25, +50, +75, -25) or geometric doubling (*2)
      if (i % 3 === 0) {
        const mult = 2;
        const s = pickRandom([2, 3, 4, 5]);
        customSeq = [s, s * 2, s * 4, s * 8, s * 16];
        ruleTextId = `Dikalikan 2 setiap langkah`;
        ruleTextEn = `Multiplied by 2 each step`;
      } else {
        step = pickRandom([25, 50, 75, -20, -25]);
        start = step > 0 ? randInt(25, 100) : randInt(200, 350);
        ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
        ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
      }
    } else {
      // Grade 6: Squares (1, 4, 9, 16, 25 or 4, 9, 16, 25, 36) or geometric (*3, *2) or large progression
      const mode = i % 3;
      if (mode === 0) {
        // Squares
        const offset = pickRandom([1, 2, 3]);
        customSeq = [
          offset * offset,
          (offset + 1) * (offset + 1),
          (offset + 2) * (offset + 2),
          (offset + 3) * (offset + 3),
          (offset + 4) * (offset + 4),
        ];
        ruleTextId = `Pola bilangan kuadrat berturut-turut`;
        ruleTextEn = `Consecutive square numbers pattern`;
      } else if (mode === 1) {
        // Geometric *3 or *2
        const factor = pickRandom([2, 3]);
        const s = factor === 3 ? pickRandom([2, 3, 4]) : pickRandom([5, 6, 7]);
        customSeq = [s, s * factor, s * factor * factor, s * Math.pow(factor, 3), s * Math.pow(factor, 4)];
        ruleTextId = `Dikalikan ${factor} setiap langkah`;
        ruleTextEn = `Multiplied by ${factor} each step`;
      } else {
        step = pickRandom([35, 45, 50, -30, -40]);
        start = step > 0 ? randInt(50, 200) : randInt(350, 500);
        ruleTextId = step > 0 ? `Bertambah ${step} setiap langkah` : `Berkurang ${Math.abs(step)} setiap langkah`;
        ruleTextEn = step > 0 ? `Increases by ${step} each step` : `Decreases by ${Math.abs(step)} each step`;
      }
    }

    const seq: number[] = customSeq ?? [];
    if (!customSeq) {
      for (let k = 0; k < length; k++) {
        seq.push(start + k * step);
      }
    }

    // Pick missing index (index 2, 3, or 4 — keeping first two visible)
    const missingIdx = randInt(2, length - 1);
    const correctVal = seq[missingIdx];
    const displaySeq: (number | null)[] = seq.map((v, idx) => (idx === missingIdx ? null : v));

    const qId = `dyn-pat-${grade}-${Date.now()}-${i}-${randInt(100, 999)}`;
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
        { value: String(correctVal + 1), isCorrect: false },
        { value: String(correctVal - 1), isCorrect: false },
      ],
      smartHint: {
        id: "Hitung selisih antara dua angka berurutan yang terlihat untuk mengetahui berapa penambahan atau pengurangannya.",
        en: "Calculate the difference between adjacent visible numbers to discover the step pattern.",
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

    // ── GRADE 3: Multiplication & Division (A × B, A ÷ B, A × B + C, A × B - C)
    else if (grade === 3) {
      const mode = i % 4;
      if (mode === 0) {
        // A * B
        const a = randInt(3, 9);
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
        const b = randInt(3, 8);
        const ans = randInt(3, 9);
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
      } else if (mode === 2) {
        // A * B + C
        const a = randInt(3, 6);
        const b = randInt(4, 8);
        const c = randInt(2, 9);
        const ans = a * b + c;
        textId = `${name} memiliki ${a} kantong berisi ${b} butir ${objId} per kantong, ditambah ${c} butir ${objId} cadangan di luar kantong. Berapa total ${objId} ${name}?`;
        textEn = `${name} has ${a} pouches with ${b} ${objEn} in each pouch, plus ${c} spare ${objEn} outside. What is the total count of ${objEn}?`;
        slots = [
          { type: "number", target: String(a) },
          { type: "operator", target: "×" },
          { type: "number", target: String(b) },
          { type: "operator", target: "+" },
          { type: "number", target: String(c) },
        ];
        expectedAnswer = String(ans);
        hintId = "Kalikan jumlah kantong dengan isinya, lalu tambahkan cadangannya.";
        hintEn = "Multiply pouches by their content, then add the spare items.";
      } else {
        // A * B - C
        const a = randInt(4, 7);
        const b = randInt(5, 9);
        const c = randInt(3, 8);
        const ans = a * b - c;
        textId = `Pak Lurah menyiapkan ${a} dus air mineral yang masing-masing berisi ${b} botol. Selama rapat berlangsung, ${c} botol telah diminum. Berapa botol air yang tersisa?`;
        textEn = `The community hall prepared ${a} packs of bottled water containing ${b} bottles each. During the meeting, ${c} bottles were consumed. How many bottles remain?`;
        slots = [
          { type: "number", target: String(a) },
          { type: "operator", target: "×" },
          { type: "number", target: String(b) },
          { type: "operator", target: "−" },
          { type: "number", target: String(c) },
        ];
        expectedAnswer = String(ans);
        hintId = "Hitung dulu total botol dengan perkalian, lalu kurangkan botol yang diminum.";
        hintEn = "Calculate the total bottles with multiplication first, then subtract the consumed bottles.";
      }
    }

    // ── GRADE 4: Multi-Step & Commercial Units (100 - B × C, A × B ÷ C, A × B + C)
    else if (grade === 4) {
      const mode = i % 3;
      if (mode === 0) {
        // 100 - B * C
        const b = randInt(2, 4);
        const c = pickRandom([15, 20, 25]);
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
        hintId = "Uang awal (100) dikurangi perkalian jumlah barang dengan harga per barang.";
        hintEn = "Start money (100) minus the product of items and unit price.";
      } else if (mode === 1) {
        // A * B / C
        const a = randInt(4, 8);
        const b = randInt(4, 9);
        const c = pickRandom([2, 3, 4, 6]);
        const total = a * b;
        const adjustedTotal = Math.floor(total / c) * c;
        const adjustedA = Math.max(2, Math.round(adjustedTotal / b));
        const finalA = adjustedA;
        const finalB = b;
        const ans = (finalA * finalB) / c;
        textId = `Sebanyak ${finalA} regu pramuka masing-masing beranggotakan ${finalB} anak berkumpul di lapangan. Mereka kemudian dibagi kembali menjadi ${c} barisan sama rata. Berapa anak pada setiap barisan?`;
        textEn = `A total of ${finalA} scout troops with ${finalB} members each assemble on the field. They are then reorganized into ${c} equal rows. How many children are in each row?`;
        slots = [
          { type: "number", target: String(finalA) },
          { type: "operator", target: "×" },
          { type: "number", target: String(finalB) },
          { type: "operator", target: "÷" },
          { type: "number", target: String(c) },
        ];
        expectedAnswer = String(ans);
        hintId = "Kalikan banyak regu dengan anggota, lalu bagi dengan jumlah barisan baru.";
        hintEn = "Multiply troops by members to find total, then divide by the new rows.";
      } else {
        // A * B + C with 2-digit numbers
        const a = randInt(12, 25);
        const b = randInt(3, 6);
        const c = randInt(15, 35);
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
    }

    // ── GRADE 5: Advanced 3-Step Operations & Batch Proportions
    else if (grade === 5) {
      const mode = i % 3;
      if (mode === 0) {
        // A * B + C * D (two batches combined)
        const a = randInt(3, 6);
        const b = randInt(6, 12);
        const c = randInt(2, 5);
        const d = randInt(5, 10);
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
        // A * B - C with hundreds
        const a = randInt(6, 12);
        const b = pickRandom([20, 25, 30]);
        const c = randInt(25, 60);
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
        const c = pickRandom([3, 4, 5]);
        const factor = randInt(4, 9);
        const total = c * factor;
        const b = pickRandom([6, 8, 10]);
        const a = Math.round(total / b) || total;
        const actualTotal = a * b;
        const quotient = Math.floor(actualTotal / c);
        const d = randInt(5, 20);
        const ans = quotient + d;
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
    }

    // ── GRADE 6: Algebraic Modeling, Advanced Financial & Proportional Logic
    else {
      const mode = i % 3;
      if (mode === 0) {
        // Budget & Bulk Purchase: 200 - A * B
        const a = randInt(3, 6);
        const b = pickRandom([20, 25, 30]);
        const ans = 200 - a * b;
        textId = `Koperasi sekolah memiliki anggaran kas 200 ribu rupiah. Koperasi memesan ${a} paket perlengkapan seharga ${b} ribu rupiah per paket. Berapa ribu rupiah sisa saldo koperasi?`;
        textEn = `A school cooperative holds a 200 thousand rupiah budget. It procures ${a} equipment bundles at ${b} thousand rupiahs per bundle. How many thousand rupiahs remain in balance?`;
        slots = [
          { type: "number", target: "200" },
          { type: "operator", target: "−" },
          { type: "number", target: String(a) },
          { type: "operator", target: "×" },
          { type: "number", target: String(b) },
        ];
        expectedAnswer = String(ans);
        hintId = "Modal awal (200) dikurangi total biaya pembelian paket perlengkapan.";
        hintEn = "Initial capital (200) minus the total expenditure on equipment bundles.";
      } else if (mode === 1) {
        // Ratio Word Expression: A * B / C
        const c = randInt(2, 4);
        const b = randInt(3, 7);
        const mult = randInt(10, 25);
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
        // Multi-Step Commercial: A * B - C * D
        const a = randInt(5, 8);
        const b = pickRandom([20, 25, 30]);
        const c = randInt(2, 4);
        const d = pickRandom([10, 15]);
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
        { value: String(parseInt(expectedAnswer, 10) + 1), isCorrect: false },
        { value: String(parseInt(expectedAnswer, 10) - 1), isCorrect: false },
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
