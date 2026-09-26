import { Language } from "@/store/languageStore";

export const translations = {
  id: {
    // Brand & Navigation
    appTitle: "My Math Journey",
    appSubtitle: "Belajar Matematika SD Menjadi Menyenangkan",
    back: "Kembali",
    mainMenu: "Menu Utama",
    selectLesson: "Pilih Pelajaran",
    startAdventure: "Mulai Petualangan",
    parentGuide: "Panduan Orang Tua",
    version: "My Math Journey v2.0",

    // Profile Page
    profileTitle: "Pilih atau Buat Profil",
    whoIsPlaying: "Siapa yang belajar hari ini?",
    whoIsPlayingSub: "Pilih profil atau buat profil baru untuk memulai petualangan matematika!",
    createProfile: "Buat Profil Baru",
    nicknameLabel: "Nama Panggilan",
    nicknamePlaceholder: "Contoh: Budi, Siti...",
    chooseAvatar: "Pilih Avatar",
    cancel: "Batal",
    saveProfile: "Simpan Profil",
    totalStars: "Total Bintang",
    switchProfile: "Ganti Profil",
    emptyProfiles: "Belum ada profil. Buat profil pertamamu!",

    // Grade Page
    greeting: "Halo, {name}! Pilih kelasmu untuk memulai:",
    chooseGradeTitle: "Pilih Kelas",
    gradePrefix: "Kelas",
    topicsCount: "{count} materi belajar",
    phaseA: "Fase A — Kelas 1 dan 2",
    phaseB: "Fase B — Kelas 3 dan 4",
    phaseC: "Fase C — Kelas 5 dan 6",

    // Topic Page
    topicPageTitle: "Kelas {grade} — Pilih Materi",
    topicPageSub: "Pilih materi yang ingin kamu latih hari ini.",
    available: "Tersedia",
    comingSoon: "Segera Hadir",
    difficultyLabel: "Tingkat Kesulitan",
    difficultyTier1: "Level 1 — Mudah",
    difficultyTier1Desc: "Dasar konsep & angka terpandu",
    difficultyTier2: "Level 2 — Sedang",
    difficultyTier2Desc: "Standar simpan/pinjam & variasi",
    difficultyTier3: "Level 3 — Tantangan",
    difficultyTier3Desc: "Soal cerita multi-langkah & angka besar",

    // Topic Names
    topic_penjumlahan_dasar: "Penjumlahan Dasar",
    topic_pengurangan_dasar: "Pengurangan Dasar",
    topic_pola_bilangan: "Pola Bilangan",
    topic_soal_cerita: "Soal Cerita Matematika",
    topic_penjumlahan_dua_digit: "Penjumlahan Dua Digit",
    topic_pengurangan_dua_digit: "Pengurangan Dua Digit",
    topic_perkalian: "Perkalian",
    topic_pembagian: "Pembagian",
    topic_pecahan_dasar: "Pecahan Dasar",
    topic_pecahan_senilai: "Pecahan Senilai",
    topic_desimal_dasar: "Desimal Dasar",
    topic_pecahan_campuran: "Pecahan Campuran",
    topic_persen: "Persen",
    topic_aljabar_dasar: "Aljabar Dasar",
    topic_perbandingan: "Perbandingan",
    topic_perkalian_awal: "Perkalian Awal (×2, ×5, ×10)",
    topic_pecahan_operasi: "Operasi Pecahan (+ dan −)",
    topic_teori_bilangan: "Teori Bilangan (Faktor & Kelipatan)",
    topic_luas_bangun_datar: "Luas & Keliling Bangun Datar",
    topic_fpb_kpk: "FPB & KPK",
    topic_persen_komersial: "Persen Komersial (Diskon & Untung/Rugi)",

    // Session Player
    questionProgress: "Soal {current} dari {total}",
    smartHint: "Trik Pintar",
    smartHintTitle: "Trik Pintar:",
    gotIt: "Mengerti",
    correctFeedback: "Benar! Bagus sekali.",
    wrongFeedback: "Hampir benar, coba lagi ya.",
    listenQuestion: "Dengarkan Soal",
    exitModalTitle: "Keluar dari Sesi Belajar?",
    exitModalDesc: "Kemajuan sesi saat ini tidak akan disimpan jika keluar sebelum selesai. Apakah kamu yakin?",
    keepLearning: "Lanjut Belajar",
    yesExit: "Ya, Keluar",

    // Simulators
    circleInteractivePrompt: "Klik bagian untuk memilih",
    circleStaticPrompt: "Perhatikan gambar di bawah",
    partsSelected: "bagian dipilih",
    circleDividedInto: "Lingkaran dibagi menjadi {total} bagian sama besar",
    clearKeypad: "Hapus",
    patternPrompt: "Ketuk kotak tanda tanya (?) untuk mengisi angka",
    checkAnswer: "Periksa Jawaban",
    increaseRule: "Bertambah {step} setiap langkah",
    decreaseRule: "Berkurang {step} setiap langkah",
    buildEquationPrompt: "Susun kalimat matematika dari cerita di atas:",
    finalResult: "Hasil akhir =",
    balanceTitle: "Prinsip Keseimbangan Timbangan",
    balanceDesc: "Kedua sisi timbangan seimbang. Carilah nilai {var} agar kedua sisi tetap sama nilainya.",

    // Report Page
    reportAwesome: "Luar Biasa!",
    reportGreat: "Hebat!",
    reportKeepPracticing: "Terus Berlatih!",
    reportCompleted: "Kamu telah menyelesaikan sesi latihan",
    starsEarned: "Bintang Diperoleh",
    accuracy: "Akurasi Jawaban",
    averageTime: "Waktu Rata-rata",
    reportSummary: "Ringkasan Laporan",
    playAgain: "Latihan Lagi",

    // Parent Guide Modal
    parentGuideTitle: "Panduan untuk Orang Tua & Pendidik",
    parentGuideSubtitle: "Mendampingi Anak Belajar Matematika dengan Pendekatan Positif & Menyenangkan",
    closeGuide: "Tutup Panduan",
    sec1Title: "1. Mengapa Matematika Sering Dianggap Sulit?",
    sec1Content: "Sebagian besar anak yang merasa kesulitan matematika bukan karena kurang cerdas, melainkan karena lompatan yang terlalu cepat dari benda nyata ke simbol angka abstrak. Di My Math Journey, kami menggunakan visual interaktif (keranjang buah, lingkaran pizza, timbangan, deret beranimasi) agar konsep matematis dapat dipahami secara intuitif sebelum menghafal rumus.",
    sec2Title: "2. Cara Mendampingi Anak Saat Berlatih",
    sec2Content: "• Beri Waktu Berpikir: Jangan langsung memberikan jawaban. Biarkan anak mencoba tombol angka atau visual yang tersedia.\n• Manfaatkan Fitur 'Trik Pintar': Ajak anak membaca trik pintar jika bingung, tanpa rasa takut salah.\n• Rayakan Proses, Bukan Hanya Nilai: Apresiasi usaha mereka saat memecahkan soal yang menantang.\n• Durasi Ideal: 10–15 menit per hari jauh lebih efektif daripada belajar berjam-jam sekali seminggu.",
    sec3Title: "3. Kurikulum Merdeka & Pendekatan Fase",
    sec3Content: "Materi dikelompokkan sesuai fase perkembangan anak:\n• Fase A (Kelas 1-2): Konsep dasar penjumlahan & pengurangan, pemahaman bilangan konkret.\n• Fase B (Kelas 3-4): Perkalian, pembagian, dan visualisasi pecahan dasar & senilai.\n• Fase C (Kelas 5-6): Pemahaman pecahan campuran, persen, rasio, serta aljabar pengantar.",
    sec4Title: "4. Mengubah Kesalahan Menjadi Kesempatan Belajar",
    sec4Content: "Sistem kami tidak memberikan hukuman saat jawaban salah. Sebaliknya, anak diberi umpan balik ramah dan kesempatan memperbaiki pemahamannya. Matematika adalah tentang cara berpikir logis, bukan sekadar kecepatan berhitung.",
  },

  en: {
    // Brand & Navigation
    appTitle: "My Math Journey",
    appSubtitle: "Making Elementary Math Fun & Engaging",
    back: "Back",
    mainMenu: "Main Menu",
    selectLesson: "Select Lesson",
    startAdventure: "Start Adventure",
    parentGuide: "Parent Guide",
    version: "My Math Journey v2.0",

    // Profile Page
    profileTitle: "Select or Create Profile",
    whoIsPlaying: "Who is learning today?",
    whoIsPlayingSub: "Pick a profile or create a new one to begin your math adventure!",
    createProfile: "Create New Profile",
    nicknameLabel: "Nickname",
    nicknamePlaceholder: "e.g. Alex, Sarah...",
    chooseAvatar: "Choose Avatar",
    cancel: "Cancel",
    saveProfile: "Save Profile",
    totalStars: "Total Stars",
    switchProfile: "Switch Profile",
    emptyProfiles: "No profile yet. Create your first profile!",

    // Grade Page
    greeting: "Hello, {name}! Choose your grade to start:",
    chooseGradeTitle: "Select Grade",
    gradePrefix: "Grade",
    topicsCount: "{count} learning topics",
    phaseA: "Phase A — Grades 1 and 2",
    phaseB: "Phase B — Grades 3 and 4",
    phaseC: "Phase C — Grades 5 and 6",

    // Topic Page
    topicPageTitle: "Grade {grade} — Select Topic",
    topicPageSub: "Choose the topic you want to practice today.",
    available: "Available",
    comingSoon: "Coming Soon",
    difficultyLabel: "Difficulty Level",
    difficultyTier1: "Level 1 — Easy",
    difficultyTier1Desc: "Core concepts & guided numbers",
    difficultyTier2: "Level 2 — Medium",
    difficultyTier2Desc: "Standard carry/borrow & variations",
    difficultyTier3: "Level 3 — Challenge",
    difficultyTier3Desc: "Multi-step word problems & larger values",

    // Topic Names
    topic_penjumlahan_dasar: "Basic Addition",
    topic_pengurangan_dasar: "Basic Subtraction",
    topic_pola_bilangan: "Number Patterns",
    topic_soal_cerita: "Math Word Problems",
    topic_penjumlahan_dua_digit: "2-Digit Addition",
    topic_pengurangan_dua_digit: "2-Digit Subtraction",
    topic_perkalian: "Multiplication",
    topic_pembagian: "Division",
    topic_pecahan_dasar: "Basic Fractions",
    topic_pecahan_senilai: "Equivalent Fractions",
    topic_desimal_dasar: "Basic Decimals",
    topic_pecahan_campuran: "Mixed Fractions",
    topic_persen: "Percentages",
    topic_aljabar_dasar: "Basic Algebra",
    topic_perbandingan: "Ratios & Proportions",
    topic_perkalian_awal: "Early Multiplication (×2, ×5, ×10)",
    topic_pecahan_operasi: "Fraction Operations (+ and −)",
    topic_teori_bilangan: "Number Theory (Factors & Multiples)",
    topic_luas_bangun_datar: "Area & Perimeter of Shapes",
    topic_fpb_kpk: "GCF & LCM",
    topic_persen_komersial: "Commercial Percentages (Discount & Profit/Loss)",

    // Session Player
    questionProgress: "Question {current} of {total}",
    smartHint: "Smart Hint",
    smartHintTitle: "Smart Hint:",
    gotIt: "Got it",
    correctFeedback: "Correct! Great job.",
    wrongFeedback: "Almost right, try again.",
    listenQuestion: "Listen to Question",
    exitModalTitle: "Exit Learning Session?",
    exitModalDesc: "Progress in this session will not be saved if you leave before completing. Are you sure?",
    keepLearning: "Keep Learning",
    yesExit: "Yes, Exit",

    // Simulators
    circleInteractivePrompt: "Click parts to select",
    circleStaticPrompt: "Look at the image below",
    partsSelected: "parts selected",
    circleDividedInto: "Circle is divided into {total} equal parts",
    clearKeypad: "Clear",
    patternPrompt: "Tap the question mark box (?) to enter a number",
    checkAnswer: "Check Answer",
    increaseRule: "Increases by {step} each step",
    decreaseRule: "Decreases by {step} each step",
    buildEquationPrompt: "Build the math equation from the story above:",
    finalResult: "Final result =",
    balanceTitle: "Balance Scale Principle",
    balanceDesc: "Both sides of the scale are balanced. Find the value of {var} so both sides stay equal.",

    // Report Page
    reportAwesome: "Awesome!",
    reportGreat: "Great Job!",
    reportKeepPracticing: "Keep Practicing!",
    reportCompleted: "You have completed the practice session",
    starsEarned: "Stars Earned",
    accuracy: "Accuracy",
    averageTime: "Average Time",
    reportSummary: "Report Summary",
    playAgain: "Practice Again",

    // Parent Guide Modal
    parentGuideTitle: "Guide for Parents & Educators",
    parentGuideSubtitle: "Accompanying Children in Learning Math with a Positive & Engaging Approach",
    closeGuide: "Close Guide",
    sec1Title: "1. Why Does Math Often Feel Challenging?",
    sec1Content: "Most children who struggle with math do not lack intelligence; rather, the leap from concrete real-world objects to abstract numbers happens too quickly. In My Math Journey, we use interactive visuals (fruit baskets, pizza circles, balance scales, animated sequences) so mathematical concepts can be understood intuitively before memorizing formulas.",
    sec2Title: "2. How to Support Your Child While Practicing",
    sec2Content: "• Give Thinking Time: Avoid immediately giving away the answer. Encourage your child to experiment with the buttons and interactive visuals.\n• Leverage 'Smart Hints': Encourage them to read hints when confused without feeling ashamed of making mistakes.\n• Celebrate the Effort: Praise their perseverance when solving challenging problems rather than just high scores.\n• Ideal Duration: 10–15 minutes daily is far more effective than hours of study once a week.",
    sec3Title: "3. Curriculum & Phase Approach",
    sec3Content: "Topics are structured according to developmental learning phases:\n• Phase A (Grades 1-2): Foundational addition & subtraction, concrete number understanding.\n• Phase B (Grades 3-4): Multiplication, division, and visualization of basic & equivalent fractions.\n• Phase C (Grades 5-6): Mixed fractions, percentages, ratios, and introductory algebra.",
    sec4Title: "4. Turning Mistakes into Learning Moments",
    sec4Content: "Our system never penalizes children for mistakes. Instead, they receive friendly feedback and opportunities to refine their understanding. Math is about logical thinking, not just speed.",
  },
};

export function getTopicLabel(topicKey: string, lang: Language): string {
  const normalized = topicKey.replace(/-/g, "_") as keyof typeof translations.id;
  const key = `topic_${normalized}` as keyof typeof translations.id;
  return translations[lang][key] ?? topicKey.replace(/-/g, " ");
}

export function getQuestionText(q: { question: { id: string; en?: string } }, lang: Language): string {
  if (lang === "en" && q.question.en) {
    return q.question.en;
  }
  if (lang === "en") {
    const text = q.question.id;
    if (text.includes("Berapa hasil") && text.includes("ditambah")) {
      return text.replace(/Berapa hasil (\d+) ditambah (\d+)\??/i, "What is $1 plus $2?");
    }
    if (text.includes("Berapa hasil") && text.includes("dikurangi")) {
      return text.replace(/Berapa hasil (\d+) dikurangi (\d+)\??/i, "What is $1 minus $2?");
    }
    if (text.includes("Berapa hasil") && text.includes("dikali")) {
      return text.replace(/Berapa hasil (\d+) dikali (\d+)\??/i, "What is $1 times $2?");
    }
    if (text.includes("Berapa hasil") && text.includes("dibagi")) {
      return text.replace(/Berapa hasil (\d+) dibagi (\d+)\??/i, "What is $1 divided by $2?");
    }
    if (text.includes("nilai pecahan untuk bagian yang diwarnai")) {
      return "What fraction of the shape is shaded?";
    }
    if (text.includes("senilai dengan")) {
      return text.replace(/Pecahan mana(?:kah)? (?:di bawah ini )?yang senilai dengan ([^?]+)\??/i, "Which fraction is equivalent to $1?");
    }
    if (text.includes("bentuk desimal dari pecahan")) {
      return text.replace(/Berapakah bentuk desimal dari pecahan ([^?]+)\??/i, "What is the decimal value of $1?");
    }
    if (text.includes("persen (%) dari pecahan")) {
      return text.replace(/Berapakah bentuk persen \(%\) dari pecahan ([^?]+)\??/i, "What is the percentage (%) equivalent to $1?");
    }
    if (text.includes("pecahan campuran dari pecahan biasa")) {
      return text.replace(/Ubahlah pecahan biasa ([^ ]+) menjadi bentuk pecahan campuran:?/i, "Convert the improper fraction $1 into a mixed fraction:");
    }
    if (text.includes("pecahan biasa dari")) {
      return text.replace(/Ubahlah pecahan campuran ([^ ]+ [^ ]+) menjadi bentuk pecahan biasa:?/i, "Convert the mixed fraction $1 into an improper fraction:");
    }
    if (text.includes("Tentukan nilai") && text.includes("dari persamaan")) {
      return text.replace(/Tentukan nilai ([a-z]) dari persamaan: ([^.]+)/i, "Find the value of $1 in the equation: $2");
    }
    if (text.includes("Bentuk paling sederhana dari perbandingan")) {
      return text.replace(/Bentuk paling sederhana dari perbandingan ([^ ]+ : [^ ]+) adalah:?/i, "What is the simplest form of the ratio $1?");
    }
    if (text.includes("deret bilangan berikut")) {
      return "Observe the number pattern below. What number correctly fills the blank box?";
    }
    // Word problems fallback regex
    if (text.includes("Di keranjang pertama ada")) {
      return text
        .replace(/Di keranjang pertama ada (\d+) ([^,]+), di keranjang kedua ada (\d+) \2, dan di keranjang ketiga ada (\d+) \2\. Berapa total seluruh \2\?/i,
          "In the first basket there are $1 $2, in the second basket there are $3 $2, and in the third basket there are $4 $2. What is the grand total of $2?")
        .replace(/kelereng/g, "marbles")
        .replace(/apel/g, "apples")
        .replace(/jeruk/g, "oranges");
    }
    if (text.includes("Ibu memiliki") && text.includes("diberikan kepada adik")) {
      return text
        .replace(/Ibu memiliki (\d+) ([^.]+)\. Sebanyak (\d+) \2 diberikan kepada adik, lalu Kakak memberikan (\d+) \2 lagi kepada Ibu\. Berapa jumlah \2 Ibu sekarang\?/i,
          "Mother has $1 $2. $3 $2 were given to younger brother, then older brother gave $4 more $2 to Mother. How many $2 does Mother have now?")
        .replace(/kelereng/g, "marbles")
        .replace(/apel/g, "apples");
    }
    if (text.includes("Ayah membelikan lagi")) {
      return text
        .replace(/([A-Za-z]+) memiliki (\d+) ([^.]+)\. Ayah membelikan lagi (\d+) \3\. Kemudian (\d+) \3 dibagikan kepada teman\. Berapa sisa \3 \1 sekarang\?/i,
          "$1 has $2 $3. Father bought $4 more $3. Then $5 $3 were shared with friends. How many $3 does $1 have left now?")
        .replace(/kelereng/g, "marbles")
        .replace(/permen/g, "candies");
    }
    if (text.includes("diberikan kepada saudaranya")) {
      return text
        .replace(/([A-Za-z]+) mempunyai (\d+) ([^.]+)\. Sebanyak (\d+) \3 diberikan kepada saudaranya\. Berapa sisa \3 \1 sekarang\?/i,
          "$1 has $2 $3. $4 $3 were given to their sibling. How many $3 does $1 have left now?")
        .replace(/kelereng/g, "marbles")
        .replace(/pensil/g, "pencils");
    }
    if (text.includes("lalu ditambah") && text.includes("lagi. Berapa jumlahnya?")) {
      return text
        .replace(/Ada (\d+) ([^,]+), lalu ditambah (\d+) \2 lagi\. Berapa jumlahnya\?/i,
          "There are $1 $2, then $3 more $2 are added. What is the total count?")
        .replace(/apel/g, "apples")
        .replace(/jeruk/g, "oranges");
    }
    if (text.includes("diambil") && text.includes("Berapa sisa")) {
      return text
        .replace(/Ada (\d+) ([^,]+), diambil (\d+) \2\. Berapa sisa \2\?/i,
          "There are $1 $2, and $3 $2 are taken away. How many $2 remain?")
        .replace(/apel/g, "apples")
        .replace(/jeruk/g, "oranges");
    }
  }
  return q.question.id;
}

export function getHintText(q: { smartHint?: { id: string; en?: string } }, lang: Language): string {
  if (!q.smartHint) return "";
  if (lang === "en" && q.smartHint.en) {
    return q.smartHint.en;
  }
  if (lang === "en") {
    const hint = q.smartHint.id;
    if (hint.includes("Hitung maju")) return "Count forward from the first number by the second number.";
    if (hint.includes("Hitung mundur")) return "Count backwards from the initial number.";
    if (hint.includes("kolom satuan")) return "Calculate the ones column on the right first, then move to the tens column.";
    if (hint.includes("kebalikan dari pembagian")) return "Think of division as reverse multiplication: what number times the divisor equals the dividend?";
    if (hint.includes("penjumlahan berulang")) return "Multiplication is repeated addition.";
    if (hint.includes("pembilang") && hint.includes("penyebut")) return "The top number (numerator) represents shaded parts; the bottom number (denominator) represents total parts.";
    if (hint.includes("Persen artinya")) return "Percent means per hundred. Multiply the fraction by 100% to calculate the percentage.";
    if (hint.includes("operasi kebalikan")) return "Use inverse operations: addition becomes subtraction, and multiplication becomes division.";
  }
  return q.smartHint?.id ?? "";
}

export function useTranslation(lang: Language) {
  const t = translations[lang] || translations.id;
  return {
    t,
    getTopicLabel: (key: string) => getTopicLabel(key, lang),
    getQuestionText: (q: { question: { id: string; en?: string } }) => getQuestionText(q, lang),
    getHintText: (q: { smartHint?: { id: string; en?: string } }) => getHintText(q, lang),
  };
}
