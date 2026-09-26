# Rencana Implementasi: My Math Journey (Simulator Matematika SD)
**Platform Deployment:** Vercel Free Tier (Hobby Plan)  
**Target Pengguna:** Siswa Sekolah Dasar Kelas 1–6 di Indonesia  
**Prinsip Desain:** Fun, Interactive, Low-Cognitive Load, Zero-Cloud Cost ($0)

---

## 0. Hasil Asesmen Dokumen & Kesiapan Proyek

Berdasarkan peninjauan mendalam terhadap implementasi rencana sebelumnya, berikut adalah evaluasi status dan penyesuaian yang diterapkan:

1. **Integrasi Aset Visual Landing Page:**
   - Telah disediakan dua aset gambar ilustrasi resmi dengan branding "My Math Journey".
   - Format Vertikal (Rasio 9:16): `Gemini_Generated_Image_fxnyxjfxnyxjfxny.jpeg` dialokasikan khusus untuk tampilan mobile view (smartphone). Area padang rumput di bagian bawah memberikan ruang lega alami untuk container tombol navigasi dan profil tanpa menutupi karakter.
   - Format Horizontal (Rasio 16:9): `Gemini_Generated_Image_ouogunouogunouog.jpeg` dialokasikan untuk web / desktop view. Banner membentang proporsional dengan komposisi karakter seimbang di kanan-kiri.
   - Mekanisme render menggunakan elemen semantik HTML5 `<picture>` dengan breakpoint responsif pada lebar layar 768px.

2. **Pembersihan Emoticon:**
   - Seluruh teks panduan, label UI, notasi status, dan rekomendasi dibersihkan dari penggunaan icon emoticon / emoji agar tampilan dokumen dan sistem teks profesional, rapi, dan konsisten. Simbol visual UI digantikan oleh deskripsi komponen atau icon SVG berbasis Lucide Icons.

3. **Kesesuaian Arsitektur Client-Side ($0 Cloud Cost):**
   - Rencana arsitektur Next.js Static Export (`output: 'export'`) tetap dipertahankan penuh. Tidak ada ketergantungan database cloud berbayar; semua state progres belajar, sesi, dan profil tersimpan di browser localStorage.

---

## 1. Ringkasan Eksekutif dan Sasaran Produk

Aplikasi ini adalah simulator matematika interaktif berbasis web untuk siswa SD kelas 1 sampai 6 di Indonesia, memadukan Kurikulum Merdeka dengan metode Concrete-Pictorial-Abstract (CPA).

### Sasaran Utama:
1. **Sesi Belajar Terstruktur:** Pembelajaran berbasis sesi dengan jumlah soal terukur per kelas, diakhiri laporan progres, analisis miskonsepsi, dan rekomendasi adaptif.
2. **Desain Kids-First Sesuai Fase Usia:** Pembagian diferensiasi UI untuk Kelas 1–2 (Fase A), Kelas 3–4 (Fase B), dan Kelas 5–6 (Fase C).
3. **Nol Biaya Server:** Komputasi evaluasi, penentuan tingkat kesulitan, dan penyimpanan data profil berjalan 100% di browser pengguna.
4. **Pencegahan Math Anxiety:** Umpan balik positif tanpa sistem hukuman (no-punitive feedback), tidak ada batas waktu ketat yang memicu kepanikan, serta sistem pendampingan bertingkat (Smart Steps).
5. **Menu Utama Responsif Berbasis Aset Grafis Resmi:** Integrasi gambar vertikal (mobile) dan horizontal (web) langsung pada komponen hero.

---

## 2. Arsitektur Teknis dan Optimasi Biaya

| Layer | Pilihan Teknologi | Strategi Efisiensi dan Performa |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) + TypeScript | Static Export murni (`output: 'export'`), bebas cold-start serverless. |
| **Styling** | Vanilla CSS / Tailwind CSS + Lucide Icons | Desain responsif berbasis token warna ramah anak tanpa runtime berat. |
| **Animasi & Efek** | Framer Motion + Canvas-Confetti | Komputasi grafis lokal yang halus untuk interaksi manipulatif dan reward. |
| **Audio FX & TTS** | Howler.js + Web Speech API | SFX ukuran kecil (<30 KB) dari direktori lokal; narasi suara kelas 1-2 memanfaatkan speech engine bawaan browser. |
| **Penyimpanan Lokal** | Zustand + LocalStorage Engine | Struktur data JSON bervariasi dengan dukungan migrasi skema otomatis. |

### 2.1 Struktur Folder dan Ekstensibilitas

Struktur kode memisahkan konten (soal dan kurikulum), mesin (logika sesi dan penilaian), serta antarmuka (komponen visual):

```
/config
  curriculum.config.ts       <- Definisi grade, materi, dan sub-tier
  simulatorRegistry.ts       <- Registri komponen simulator interaktif
  misconceptionTaxonomy.ts   <- Daftar kategori miskonsepsi terstandarisasi
  recommendationRules.ts     <- Logika deterministik penentuan rekomendasi belajar
  featureFlags.ts            <- Pengaturan fitur aktif (audio, bilingual, profil)
  designTokens.ts            <- Token warna, tipografi, dan dimensi sentuh

/content
  /questions
    /grade-1/addition.json
    /grade-3/fractions.json
    ...
  /i18n
    id.json
    en.json

/lib
  sessionEngine.ts           <- Lifecycle soal dan penentuan penyelesaian sesi
  mistakeClassifier.ts       <- Analisis kesalahan berdasarkan tag miskonsepsi
  reportEngine.ts            <- Agregasi statistik dan metrik sesi
  recommendationEngine.ts    <- Generator saran tindak lanjut belajar
  storage/
    schema.ts                <- Validasi skema penyimpanan lokal
    migrations.ts            <- Script migrasi data saat versi skema bertambah

/components
  /landing                   <- Komponen landing page dan hero banner responsif
  /simulators                <- Komponen manipulatif interaktif per topik
  /session                   <- Kontainer dan pengendali sesi soal
  /report                    <- Tampilan hasil belajar anak dan evaluasi orang tua
```

---

## 3. Pemetaan Kurikulum dan Model Simulator

```
[Fase A: Kelas 1-2] -> Benda konkret (apel, blok angka, kelereng, garis bilangan katak)
[Fase B: Kelas 3-4] -> Representasi visual pecahan, jam, timbangan, uang koin/kertas
[Fase C: Kelas 5-6] -> Manipulasi aljabar pemula, jaring-jaring geometri 3D, koordinat
```

### 3.1 Spesifikasi Simulator Hitung Bersusun (Column Arithmetic)
Untuk operasi penjumlahan, pengurangan dengan teknik meminjam, perkalian, dan pembagian bersusun:
- **Grid Kolom Interaktif:** Sel input berbasis nilai tempat (ratusan, puluhan, satuan).
- **Notasi Bantuan:** Kotak kecil di atas kolom untuk angka simpanan (carry) dan coretan angka pinjaman (borrow).
- **Visualisasi Persamaan:** Menampilkan strip persamaan di bawah kolom agar anak memahami korelasi angka per langkah.
- **Deteksi Miskonsepsi:** Input diverifikasi per tahap perhitungan sehingga kesalahan terdeteksi secara terperinci (misal: lupa memotong digit pinjaman, salah pergeseran perkalian puluhan).

---

## 4. Model Sesi Pembelajaran

Setiap modul dikerjakan dalam bentuk sesi terukur agar anak memiliki titik istirahat yang jelas dan tidak kelelahan kognitif.

| Kelompok | Target Jumlah Soal | Estimasi Durasi | Karakteristik Khusus |
| :--- | :--- | :--- | :--- |
| **Kelas 1–2** | 6–8 Soal | 5–7 Menit | Tidak menampilkan pengukur waktu, teks ringkas, tombol besar. |
| **Kelas 3–4** | 8–10 Soal | 7–10 Menit | Progres batang visual jalan setapak, tanpa tekanan skor instan. |
| **Kelas 5–6** | 10–12 Soal | 10–15 Menit | Tantangan bertingkat dengan evaluasi langkah kerja. |

### 4.1 Aturan Progresi Tingkat Kesulitan
- **Akurasi 85% ke atas:** Naik ke sub-tier berikutnya.
- **Akurasi 50% sampai 84%:** Bertahan di tier yang sama dengan bank soal variasi baru.
- **Akurasi di bawah 50%:** Rekomendasi latihan penguatan konsep dasar pada tier sebelumnya tanpa pelabelan kegagalan.

---

## 5. Halaman Laporan Hasil Sesi

Laporan disajikan secara dua sisi untuk menjaga motivasi anak sekaligus memberi data komprehensif bagi pendamping:

### 5.1 Tampilan Anak (Utama)
- Maskot karakter ceria dengan pesan apresiasi konstruktif.
- Perolehan bintang sesi (1 hingga 3 bintang) dan animasi konfeti.
- Ringkasan positif: jumlah soal berhasil dijawab, waktu terbaik, dan lencana usaha.
- Tombol aksi jelas: Lanjut Belajar, Ulangi Materi, atau Kembali ke Menu.

### 5.2 Tampilan Orang Tua / Guru (Detail)
- Persentase akurasi total dan rincian durasi pengerjaan.
- Frekuensi penggunaan petunjuk bantuan (Smart Steps).
- Klasifikasi pola kesalahan berdasarkan tag miskonsepsi.
- Rekomendasi langkah belajar spesifik berbasis data sesi.

---

## 6. Spesifikasi Data dan Klasifikasi Kesalahan

### 6.1 Skema Soal dengan Tag Miskonsepsi
```json
{
  "id": "g3-frac-01",
  "grade": 3,
  "difficultyTier": 1,
  "topic": "fractions",
  "question": {
    "id": "Siti membagi sebuah pizza menjadi 4 bagian sama besar. Siti memakan 1 potong. Berapa bagian pizza yang dimakan Siti?",
    "en": "Siti cuts a pizza into 4 equal slices. She eats 1 slice. What fraction of the pizza did Siti eat?"
  },
  "simulator": {
    "type": "circle-fraction",
    "totalSegments": 4,
    "interactive": true
  },
  "options": [
    { "value": "1/4", "isCorrect": true },
    { "value": "4/1", "isCorrect": false, "misconceptionTag": "numerator-denominator-swap" },
    { "value": "1/2", "isCorrect": false, "misconceptionTag": "wrong-segment-count" },
    { "value": "3/4", "isCorrect": false, "misconceptionTag": "counted-remaining-not-eaten" }
  ],
  "smartHint": {
    "id": "Hitung jumlah potongan yang dimakan sebagai angka atas, dan total seluruh potongan sebagai angka bawah.",
    "en": "Count the eaten slices as the top number, and total slices as the bottom number."
  }
}
```

### 6.2 Manajemen Profil dan Riwayat Lokal
Data multi-profil memungkinkan penggunaan satu perangkat secara bergantian oleh beberapa anak. Setiap profil menyimpan identitas, riwayat 20 sesi terakhir secara detail, dan rekapitulasi penguasaan materi untuk menghemat kapasitas localStorage.

---

## 7. Landing Page dan Integrasi Hero Banner Responsif

Landing page dirancang untuk langsung menggunakan aset gambar resmi "My Math Journey" yang telah tersedia di repositori.

### 7.1 Spesifikasi Aset Gambar
1. **Mobile View (Vertikal / Rasio 9:16):**
   - Path File: `./Gemini_Generated_Image_fxnyxjfxnyxjfxny.jpeg`
   - Target Resolusi / Viewport: Smartphone layar tegak (lebar < 768px).
   - Karakteristik: Logo awan "My Math Journey" berada di bagian atas, dua karakter anak berada di bagian tengah, dan padang rumput hijau yang luas di bagian bawah.
   - Pemanfaatan Tata Letak: Area rumput bawah digunakan sebagai dudukan elemen interaktif (tombol Mulai Petualangan, pemilihan profil, dan pilihan kelas) tanpa menutupi ilustrasi karakter.

2. **Web / Desktop View (Horizontal / Rasio 16:9):**
   - Path File: `./Gemini_Generated_Image_ouogunouogunouog.jpeg`
   - Target Resolusi / Viewport: Tablet landscape, laptop, dan monitor desktop (lebar >= 768px).
   - Karakteristik: Komposisi seimbang dengan sekolah di sebelah kiri, taman bermain di sebelah kanan, dan dua karakter ceria di tengah.
   - Pemanfaatan Tata Letak: Hero banner membentang sebagai latar panggung utama dengan kartu aksi terapung (floating action cards) di bagian bawah.

### 7.2 Implementasi Komponen Responsif (`HeroBanner.tsx`)

Implementasi kode menggunakan elemen standar web `<picture>` untuk memastikan pergantian gambar otomatis sesuai lebar layar tanpa beban transfer data ganda:

```tsx
export const HeroBanner = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-3xl shadow-lg">
      <picture className="block w-full h-auto">
        {/* Tampilan Desktop / Web (Horizontal) */}
        <source
          media="(min-width: 768px)"
          srcSet="/images/hero-web.jpeg"
        />
        {/* Tampilan Mobile (Vertikal) */}
        <img
          src="/images/hero-mobile.jpeg"
          alt="My Math Journey - Belajar Matematika Jadi Menyenangkan"
          className="w-full h-auto object-cover max-h-[85vh] md:max-h-[600px] mx-auto"
          loading="eager"
        />
      </picture>

      {/* Kontainer Aksi Interaktif */}
      <div className="absolute inset-x-0 bottom-6 flex flex-col items-center justify-end px-4 text-center">
        <button
          id="btn-start-journey"
          className="w-full max-w-xs md:max-w-md py-4 px-8 text-xl md:text-2xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-95 rounded-full shadow-xl transition-all duration-150 border-4 border-white"
        >
          Mulai Petualangan
        </button>
      </div>
    </section>
  );
};
```

### 7.3 Struktur Komponen Halaman Menu Utama
1. **Navigasi Atas:** Pengalih bahasa (ID / EN), indikator profil aktif, dan akumulator bintang.
2. **Hero Banner:** Gambar responsif vertikal/horizontal dengan tombol aksi utama.
3. **Pilihan Profil Belajar:** Carousel kartu profil anak dengan tombol tambah profil baru.
4. **Pilihan Kelas (1 sampai 6):** Kartu navigasi per jenjang kelas dengan indikator pencapaian topik.
5. **Akses Menu Pendamping:** Tombol tautan menuju panduan dan statistik orang tua di bagian footer.

---

## 8. Standar Aksesibilitas dan Desain Ramah Anak

1. **Ukuran Target Sentuh:** Minimal 48x48 piksel pada web, dan direkomendasikan minimal 64x64 piksel untuk Fase A (Kelas 1–2).
2. **Dukungan Audio Mandiri:** Tombol pemutar suara tersedia di setiap soal untuk membantu anak yang masih dalam tahap belajar membaca.
3. **Bebas Diskriminasi Warna:** Status benar atau salah selalu disertai bentuk visual dan teks penjelas (tidak hanya mengandalkan warna hijau/merah).
4. **Tipografi Terbaca Jelas:** Menggunakan jenis huruf bertipe sans-serif bulat (seperti Fredoka atau Nunito) dengan ukuran proporsional.

---

## 9. Rencana Tahapan Eksekusi (Roadmap)

- **Fase 1 (Fondasi & Desain Sistem):** Inisialisasi proyek Next.js, konfigurasi static export, setup token visual, dan pembuatan komponen Hero Banner responsif menggunakan kedua aset gambar.
- **Fase 2 (Simulator CPA Inti):** Pembuatan kanvas interaktif untuk modul hitung konkret, pecahan pizza, dan kalkulator kolom bersusun.
- **Fase 3 (Mesin Sesi & Penyimpanan):** Implementasi lifecycle sesi soal, pengelolaan profil lokal, dan skema migrasi localStorage.
- **Fase 4 (Bank Soal & Klasifikasi Miskonsepsi):** Pengisian bank soal kelas 1-6 dengan tag diagnosis kesalahan, serta pembuatan halaman laporan dua lapis.
- **Fase 5 (Uji Aksesibilitas & Rilis):** Verifikasi kinerja mobile dan desktop, pengujian kontras warna, build statis, dan deployment ke Vercel Free Tier.
