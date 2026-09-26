# My Math Journey 🌟
### Petualangan Belajar Matematika SD Interaktif Berbasis Kurikulum Merdeka (Fase A, B, C) & Cambridge Primary Mathematics

**My Math Journey** adalah aplikasi web edukasi matematika interaktif yang dirancang khusus untuk mendampingi siswa Sekolah Dasar (Kelas 1 s/d 6) memahami konsep matematika secara intuitif, visual, mendalam, dan bebas stres. 

Aplikasi ini menyelaraskan capaian **Kurikulum Merdeka (Fase A, B, dan C)** dengan standar internasional **Cambridge Primary Mathematics (Stage 1 – 6)** melalui pendekatan **CPA (*Concrete — Pictorial — Abstract*)**. Anak tidak sekadar menghafal rumus atau menebak pilihan ganda, melainkan bereksplorasi secara aktif melalui simulator interaktif dan manipulatif visual.

---

## 🌟 Fitur Unggulan Terbaru

1. **Tingkat Kesulitan Berjenjang (*3-Tier Difficulty Selector*)**
   - Bebas memilih level tantangan belajar sebelum memulai sesi latihan:
     - 🟢 **Level 1 — Mudah (*Foundational*):** Fondasi konsep awal, representasi visual konkret, dan angka terpandu bersih tanpa teknik simpan/pinjam rumit.
     - 🟡 **Level 2 — Sedang (*Curriculum Standard*):** Hitung bersusun dengan teknik **simpan (*carry-over*)** dan **pinjam (*regrouping*)**, serta soal cerita **3x penambahan / pengurangan berturut-turut** ($A + B + C$ atau $A - B - C$).
     - 🔴 **Level 3 — Tantangan (*Enrichment & Olympiad Prep*):** Perhitungan melampaui ratusan ($>100$), pengurangan meminjam 3 digit, soal cerita multi-langkah 4 komponen ($A + B + C - D$), dan pola barisan bilangan kuadrat.
   - **Rekomendasi Cerdas:** Sistem otomatis menyarankan *"Naik Level"* di halaman laporan saat akurasi anak mencapai $\ge 85\%$.

2. **Bank Soal Prosedural Acak (*Fresh Endless Questions*)**
   - Setiap sesi menghasilkan variasi kombinasi soal baru secara tak terbatas (*dynamic procedural generator*).
   - Menghilangkan kejenuhan pengulangan soal yang sama dan mendorong pemahaman logika yang sesungguhnya.

3. **Akumulasi Bintang & Tracking Kemajuan Nyata**
   - Bintang yang diraih (1 hingga 3 $\star$ per sesi) kini tersimpan permanen di profil anak.
   - **Total Bintang Profil:** Ditampilkan pada pill avatar di header atas.
   - **Bintang per Jenjang Kelas:** Akumulasi capaian bintang tercatat langsung di setiap kartu jenjang kelas (Kelas 1 s/d 6) untuk merayakan konsistensi belajar anak.

4. **Penyelarasan Modul Baru Cambridge Primary Curriculum**
   - **Persen Komersial (*Commercial Percentages*):** Menghitung harga diskon dan persentase laba/rugi dengan konsep rumus papan tulis tanpa membocorkan angka jawaban.
   - **FPB & KPK (*GCF & LCM*):** Penentuan faktor persekutuan terbesar dan kelipatan persekutuan terkecil berbasis visual.
   - **Teori Bilangan (*Number Theory*):** Faktor, kelipatan, dan identifikasi bilangan prima.
   - **Luas & Keliling Bangun Datar (*Area & Perimeter*):** Pemahaman spasial persegi dan persegi panjang.
   - **Operasi Pecahan (*Fraction Operations*):** Penjumlahan dan pengurangan pecahan berpenyebut sama.
   - **Penjumlahan Dua Digit Awal:** Sudah tersedia sejak jenjang Kelas 1 untuk mengakomodasi siswa yang memiliki kesiapan berhitung lebih awal.

5. **Simulator & Manipulatif Visual Presisi**
   - **Hitungan Bersusun Simetris (*True-Center Column Arithmetic*):** Blok angka kalkulasi tersusun presisi di tengah horizontal kartu, dengan tanda operasi hitung ($+$, $-$, $\times$, $\div$) menempel sejajar di ujung garis pembagi tanpa menggeser simetri angka.
   - **Pecahan Lingkaran Bersih (*Circle Fraction*):** Potongan fraksi lingkaran dengan jumlah irisan yang proporsional dan mudah dihitung.
   - **Keranjang Buah (*Fruit Basket*):** Memvisualisasikan kuantitas penjumlahan dan pengurangan konkret untuk siswa Fase A.
   - **Penyusun Soal Cerita (*Word Problem Builder*):** Anak menyusun sendiri kalimat matematikanya ($A \times B - C = \text{jawaban}$) sebelum menentukan hasil akhir.
   - **Timbangan Aljabar (*Algebra Balance*):** Menyeimbangkan kedua sisi timbangan untuk memecahkan nilai variabel $n$.
   - **Pola Bilangan (*Pattern Sequence*):** Simulator deret lompatan angka dan barisan bilangan kuadrat.

6. **Dukungan Dwibahasa Penuh (*100% Bilingual ID & EN*)**
   - Tombol toggle instan (ID / EN) di header.
   - Seluruh konten narasi soal cerita, petunjuk pintar, instruksi simulator, topik kurikulum, laporan evaluasi, hingga diagnosa miskonsepsi orang tua terjemahkan secara kontekstual.

7. **Voice Over / Audio Reader Cerdas (Text-to-Speech)**
   - Pembacaan soal ramah anak dengan aksen natural bahasa Indonesia (`id-ID`) dan bahasa Inggris (`en-US`).
   - **Interupsi Mulus:** Menekan tombol voice saat audio masih berputar akan seketika menghentikan suara lama dan memulai suara baru secara rapi (*no audio overlap*).
   - **Hard Stop Otomatis:** Suara otomatis berhenti saat anak berpindah soal, memilih jawaban, membuka modal konfirmasi keluar, atau berpindah halaman.

8. **Petunjuk Pintar (*Smart Hints*) Konseptual**
   - Memberikan bimbingan strategi logika dan rumus langkah-demi-langkah tanpa membocorkan angka jawaban akhir, melatih kemandirian bernalar.

---

## 🧭 Alur Penggunaan Aplikasi (*Application Flow*)

```mermaid
graph TD
    A[Menu Utama & Panduan Orang Tua] -->|Toggle Bahasa ID / EN| A
    A -->|Mulai Petualangan| B[Pilih Profil Anak]
    B -->|Pilih Akun / Buat Profil Baru| C[Pilih Jenjang Kelas 1 - 6]
    C -->|Fase A, B, atau C + Bintang Terakumulasi| D[Pilih Topik Materi]
    D -->|Pilih Tingkat Kesulitan: Level 1, 2, atau 3| E[Mulai Sesi Belajar Interaktif]
    E -->|10 Soal Acak Prosedural + Simulator| E
    E -->|Bantuan Voice Audio / Smart Hint| E
    E -->|Selesai 10 Soal| F[Laporan Hasil Sesi]
    F -->|Bintang Masuk Profil & Catatan Miskonsepsi| F
    F -->|Latihan Lagi / Naik Level| D
    F -->|Kembali ke Beranda| A
```

1. **Halaman Beranda:** Memilih preferensi bahasa (ID/EN) dan membaca panduan orang tua.
2. **Profil Belajar:** Mendukung multi-profil anak dalam satu gawai tanpa registrasi email/password. Menampilkan akumulasi total bintang yang diraih.
3. **Pilih Kelas (1–6):** Bebas memilih kelas sesuai fase kesiapan anak, lengkap dengan informasi akumulasi bintang per kelas.
4. **Pilih Topik & Tingkat Kesulitan:** Memilih materi yang ingin dilatih serta menentukan level tantangan (**Level 1: Mudah**, **Level 2: Sedang**, atau **Level 3: Tantangan**).
5. **Sesi Latihan (10 Soal):** Mengerjakan soal interaktif dengan bantuan simulator manipulatif visual, mini numberpad, dan audio pembaca soal.
6. **Laporan Sesi & Deteksi Miskonsepsi:** Merayakan keberhasilan dengan animasi confetti, menyimpan perolehan bintang ke profil anak, serta membaca telaah miskonsepsi untuk orang tua/pendidik.

---

## 👨‍👩‍👧‍👦 Panduan untuk Orang Tua & Pendidik (*Parent's Companion Guide*)

Matematika adalah cara berpikir logis dan pemecahan masalah, bukan sekadar kecepatan berhitung atau menghafal rumus. Berikut panduan mendampingi buah hati Anda:

### 1. Pendampingan Sesuai Fase Perkembangan Anak

#### 🐥 Fase A: Kelas 1 & 2 (Tahap Konkret — Sensori Motorik)
* **Karakteristik:** Anak membutuhkan representasi visual konkret untuk mengaitkan angka dengan objek nyata.
* **Saran Praktis:**
  * Pada **Penjumlahan & Pengurangan Dasar**, ajak anak mengamati animasi buah di keranjang (*Fruit Basket*). Tanyakan: *"Mula-mula ada berapa buah? Ketika diambil 2, berapa sisanya?"*
  * Pada **Penjumlahan & Pengurangan Dua Digit Bersusun**, bimbing anak untuk selalu mengerjakan kolom **satuan** (kanan) terlebih dahulu, baru kolom **puluhan** (kiri).
  * Pada **Level 2 (Sedang)**, perkenalkan konsep **simpan puluhan (*carry-over*)** jika satuan $\ge 10$, dan konsep **pinjam (*regrouping*)** saat angka atas lebih kecil daripada angka bawah.
  * Pada **Soal Cerita Level 2**, ajak anak memahami penambahan/pengurangan berturut-turut 3 langkah ($A + B + C$ atau $A - B - C$).

#### 🐰 Fase B: Kelas 3 & 4 (Tahap Representasional & Konseptual)
* **Karakteristik:** Anak mulai beralih ke perkalian tabel, pembagian rata, pecahan senilai, dan pemahaman faktor bilangan.
* **Saran Praktis:**
  * Pada materi **Pecahan Dasar & Pecahan Senilai**, gunakan analogi potongan kue pizza (*Circle Fraction*). Tekankan bahwa pembilang (atas) adalah bagian yang diwarnai/dimakan, sedangkan penyebut (bawah) adalah total seluruh irisan yang sama besar.
  * Pada **Teori Bilangan**, ajak anak mencari pasangan faktor bilangan dan mengenali bilangan prima sebagai bilangan yang hanya bisa dibagi 1 dan dirinya sendiri.
  * Pada **Luas & Keliling**, diskusikan perbedaan luas (jumlah petak di dalam) dan keliling (jarak mengelilingi tepi bangun).

#### 🦅 Fase C: Kelas 5 & 6 (Tahap Abstraksi & Pemodelan Masalah)
* **Karakteristik:** Anak dipersiapkan untuk berpikir aljabar, perbandingan proporsional, dan matematika terapan komersial.
* **Saran Praktis:**
  * Pada materi **Persen Komersial**, diskusikan kasus sehari-hari saat berbelanja: *"Jika ada diskon 20%, artinya harga yang kita bayar adalah $(100\% - 20\%) = 80\%$ dari harga aslinya."*
  * Pada materi **Aljabar Dasar**, gunakan analogi timbangan seimbang: *"Jika sisi kiri ditambah 5, maka sisi kanan juga harus ditambah 5 agar timbangan tetap seimbang."*
  * Pada **FPB & KPK**, latih anak membedakan kapan menggunakan FPB (membagi sama banyak ke dalam bingkisan) dan KPK (menentukan jadwal berulang secara bersamaan).

---

### 2. Membaca & Memanfaatkan Deteksi Miskonsepsi
Pada halaman akhir sesi latihan (*Session Report*), buka menu **Detail untuk Orang Tua / Guru** untuk melihat diagnosa kesalahan belajar anak:
* **"Lupa Menyimpan / Lupa Meminjam" (*carry-omitted / borrow-not-applied*):** Ingatkan anak mengenai nilai tempat puluhan saat hitung bersusun.
* **"Tertukar Pembilang & Penyebut" (*numerator-denominator-swap*):** Ingatkan kembali bahwa bagian yang diwarnai selalu di atas.
* **"Tertukar FPB dan KPK" (*lcm-gcd-inverted*):** FPB mencari pembagi terbesar, KPK mencari kelipatan persekutuan terkecil.
* **"Lupa Mengurangkan Diskon" (*discount-subtraction-omitted*):** Nilai diskon adalah potongan harga, bukan harga akhir yang harus dibayar.

> **Prinsip Parenting Positif:** Jangan pernah memarahi anak saat jawabannya salah. Di My Math Journey, kesalahan adalah peta petunjuk yang menunjukkan konsep mana yang perlu diperkuat kembali.

---

### 3. Rutinitas 10–15 Menit & Apresiasi Bintang
* **Cukup 1 Sesi per Hari:** 10 soal sehari (10–15 menit) secara rutin jauh lebih efektif menumbuhkan kepercayaan diri anak daripada belajar berjam-jam sekali seminggu.
* **Rayakan Bintang:** Setiap kali anak menyelesaikan sesi dengan akurasi tinggi, rayakan bintang yang bertambah di kartu kelasnya!

---

## 📚 Matriks Kurikulum & Cakupan Topik Belajar

| Jenjang | Fase | Topik Materi Utama | Penyelarasan Cambridge | Simulator Interaktif |
| :---: | :---: | :--- | :--- | :--- |
| **Kelas 1** | Fase A | • Penjumlahan Dasar<br>• Pengurangan Dasar<br>• Penjumlahan Dua Digit Awal<br>• Pola Bilangan (+1, +2, +5)<br>• Soal Cerita Konkret ($A \pm B$) | Stage 1: Numbers up to 20, concrete addition/subtraction, repeating patterns | Fruit Basket, Mini Numberpad, Pattern Sequence, Word Problem Builder |
| **Kelas 2** | Fase A | • Penjumlahan 2-Digit (Tanpa/Dengan Simpan)<br>• Pengurangan 2-Digit (Tanpa/Dengan Pinjam)<br>• Perkalian Awal ($\times 2, \times 5, \times 10$)<br>• Pola Bilangan ($\pm 2, \pm 3, \pm 5, \pm 10$)<br>• Soal Cerita 3 Langkah ($A + B + C$, $A - B - C$) | Stage 2: 2-digit column arithmetic, regrouping, 3-step word problems | Centered Column Arithmetic, Mini Numberpad, Pattern Sequence, Word Problem Builder |
| **Kelas 3** | Fase B | • Perkalian Tabel Dasar ($2..9$)<br>• Pembagian Tabel Dasar<br>• Pecahan Dasar Visual ($1/2 - 7/8$)<br>• Operasi Pecahan (+ dan − berpenyebut sama)<br>• Pola Bilangan Perkalian Berulang<br>• Soal Cerita Wadah & Kelompok ($A \times B \pm C$) | Stage 3: Times tables, sharing division, fraction equivalence, unit shapes | Column Arithmetic, Circle Fraction Pizza, Pattern Sequence, Word Problem Builder |
| **Kelas 4** | Fase B | • Pecahan Senilai ($\times 2..\times 5$)<br>• Teori Bilangan (Faktor & Kelipatan Prima)<br>• Luas & Keliling Bangun Datar<br>• Desimal Dasar (Persepuluhan $0,1 - 0,9$)<br>• Pola Bilangan Dua Digit (+12, +15, +20)<br>• Soal Cerita Anggaran & Pembagian | Stage 4: Equivalent fractions, decimals, prime factors, geometric perimeter/area | Circle Fraction Pizza, Mini Numberpad, Pattern Sequence, Word Problem Builder |
| **Kelas 5** | Fase C | • Pecahan Campuran ($A\ b/c \leftrightarrow improper$)<br>• Persen Dasar ($20\%, 25\%, 50\%, 75\%$)<br>• FPB & KPK (Faktor & Kelipatan Persekutuan)<br>• Pola Bilangan Geometri ($\times 2$) & Ratusan<br>• Soal Cerita Logistik & Pergudangan ($A \times B + C \times D$) | Stage 5: GCF/LCM, mixed fractions, percentages, multi-step word problems | Circle Fraction Pizza, Pattern Sequence, Word Problem Builder |
| **Kelas 6** | Fase C | • Aljabar Dasar Timbangan ($n \pm a = b$, $an \pm b = c$)<br>• Perbandingan & Rasio Proporsional ($a : b$)<br>• Persen Komersial (Diskon & Untung/Rugi)<br>• Pola Deret Kuadrat & Geometri ($\times 3$)<br>• Soal Cerita Pemodelan Rasio & Transaksi Grosir | Stage 6: Algebraic equations, commercial percentages, square numbers, ratios | Algebra Balance Scale, Circle Fraction Pizza, Pattern Sequence, Word Problem Builder |

---

## 💻 Panduan Instalasi & Menjalankan Aplikasi

Aplikasi dibangun menggunakan stack web modern:
* **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, Static Export)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** CSS Modern & Tailwind CSS dengan palet warna ramah anak (*Warm Amber, Sky Blue, Soft Cream, Emerald*)
* **Animasi:** [Framer Motion](https://www.framer.com/motion/) & Canvas Confetti
* **Icon:** [Lucide React](https://lucide.dev/)
* **Audio:** Web Speech API (*Native Browser Text-to-Speech*)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand) dengan persistent local storage

### Langkah Menjalankan Secara Lokal:

1. **Clone repository:**
   ```bash
   git clone https://github.com/SMJ-205/my-math-journey.git
   cd my-math-journey
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

4. Buka peramban di [http://localhost:3000](http://localhost:3000).

5. **Build bundle statis:**
   ```bash
   npm run build
   ```

---

## 🔒 Privasi & Keamanan Data Anak
* **100% Bebas Iklan & Tanpa Pelacak Pihak Ketiga:** Tidak ada iklan komersial maupun tracker eksternal yang mengalihkan perhatian anak.
* **Penyimpanan Lokal Mandiri (*100% Client-Side LocalStorage*):** Seluruh data profil, bintang yang diraih, dan riwayat belajar tersimpan di perangkat pengguna secara privat tanpa memerlukan akun atau server eksternal.

---
*My Math Journey — Mengubah ketakutan matematika menjadi petualangan logika yang menyenangkan!*
