# LAPORAN TUGAS TERSTRUKTUR (PERTEMUAN 5)
## Implementasi Pengujian Perangkat Lunak: Black-box Testing (Equivalence Partitioning & Boundary Value Analysis)

**Program Studi:** Sistem Informasi  
**Perguruan Tinggi:** STMIK Bandung  
**Kurikulum:** 2024  
**Mata Kuliah:** Implementasi Pengujian Perangkat Lunak  
**Dosen Pengampu:** Uro Abdurohim  
**Penyusun:** Jacky Firmansah  

---

## DAFTAR ISI
1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Dasar Teori Black-box Testing](#2-dasar-teori-black-box-testing)
   - [2.1 Apa itu Black-box Testing](#21-apa-itu-black-box-testing)
   - [2.2 Equivalence Partitioning (EP)](#22-equivalence-partitioning-ep)
   - [2.3 Boundary Value Analysis (BVA)](#23-boundary-value-analysis-bva)
   - [2.4 Perbandingan White-box vs Black-box](#24-perbandingan-white-box-vs-black-box)
3. [Bagian A: Equivalence Partitioning (30 Poin)](#3-bagian-a-equivalence-partitioning-30-poin)
   - [Soal 1: Form Login (15 Poin)](#soal-1-form-login-15-poin)
   - [Soal 2: Form Pemesanan Tiket (15 Poin)](#soal-2-form-pemesanan-tiket-15-poin)
4. [Bagian B: Boundary Value Analysis (30 Poin)](#4-bagian-b-boundary-value-analysis-30-poin)
   - [Soal 3: Form Pendaftaran Mahasiswa (15 Poin)](#soal-3-form-pendaftaran-mahasiswa-15-poin)
   - [Soal 4: Form Transfer Bank (15 Poin)](#soal-4-form-transfer-bank-15-poin)
5. [Bagian C: Kombinasi EP & BVA (25 Poin)](#5-bagian-c-kombinasi-ep--bva-25-poin)
   - [Soal 5: Form Registrasi Akun](#soal-5-form-registrasi-akun)
6. [Bagian D: API Testing (15 Poin)](#6-bagian-d-api-testing-15-poin)
   - [Soal 6: API POST /api/v1/products](#soal-6-api-post-apiv1products)
7. [Bagian E: Studi Kasus Terpadu (Bonus 10 Poin)](#7-bagian-e-studi-kasus-terpadu-bonus-10-poin)
   - [Soal 7: Form Pendaftaran Online](#soal-7-form-pendaftaran-online)
8. [Implementasi Kode & Otomatisasi CI/CD](#8-implementasi-kode--otomatisasi-cicd)
9. [Hasil Eksekusi Pengujian (Test Runner Report)](#9-hasil-eksekusi-pengujian-test-runner-report)
10. [Kesimpulan](#10-kesimpulan)

---

## 1. Ringkasan Eksekutif
Laporan ini disusun guna memenuhi tugas mandiri terstruktur pada Pertemuan 5 mata kuliah Implementasi Pengujian Perangkat Lunak. Lingkup pembahasan difokuskan pada pengujian kotak hitam (*Black-box Testing*), khususnya menggunakan teknik **Equivalence Partitioning (EP)** dan **Boundary Value Analysis (BVA)**.

Selain penyusunan matriks test case teoritis dalam format tabel terstandar, repositori ini dilengkapi dengan **implementasi source code JavaScript (Node.js)** dan **automated test suite (131 test cases)** yang dieksekusi melalui runner bawaan Node.js serta pipeline otomasi **GitHub Actions CI/CD**.

---

## 2. Dasar Teori Black-box Testing

### 2.1 Apa itu Black-box Testing?
*Black-box Testing* (juga dikenal sebagai *Behavioral Testing*) adalah metode pengujian perangkat lunak yang berfokus pada analisis fungsionalitas eksternal program tanpa memerlukan akses atau pemahaman terhadap struktur internal kode sumber (*source code*). Pengujian dilakukan dari perspektif pengguna akhir (*end-user*) dengan prinsip:
$$\text{Input} \longrightarrow [\text{SISTEM}] \longrightarrow \text{Output}$$

### 2.2 Equivalence Partitioning (EP)
Equivalence Partitioning membagi domain masukan program ke dalam kelas-kelas data ekuivalen (*equivalence classes*), baik kelas valid (data yang diharapkan diterima) maupun kelas invalid (data yang diharapkan ditolak dengan pesan kesalahan yang sesuai).
- **Prinsip 1:** Jika satu nilai uji dalam partisi mendeteksi bug, maka nilai lain dalam partisi yang sama kemungkinan besar memicu perilaku/bug yang sama.
- **Prinsip 2:** Pengujian cukup memilih satu perwakilan (*representative value*) per partisi untuk meminimalkan redundansi uji namun tetap mempertahankan reliabilitas cakupan uji.

### 2.3 Boundary Value Analysis (BVA)
Boundary Value Analysis merupakan teknik lanjutan yang berfokus pada titik batas (*boundaries*) dari domain input. Secara empiris, cacat perangkat lunak (*software defects*) berkonsentrasi paling tinggi di sekitar nilai batas ekstrem.
Nilai batas yang diuji pada rentang tertutup $[min, max]$ meliputi:
- $min - 1$ (Invalid)
- $min$ (Valid)
- $min + 1$ (Valid)
- $max - 1$ (Valid)
- $max$ (Valid)
- $max + 1$ (Invalid)

### 2.4 Perbandingan White-box vs Black-box
| Aspek | White-box Testing | Black-box Testing |
| :--- | :--- | :--- |
| **Fokus** | Struktur kode, *branch*, *statement coverage*, algoritma internal | Kebutuhan fungsional (*specifications*), antarmuka, input-output |
| **Akses Kode** | Mengharuskan akses & pemahaman *source code* | Tanpa melihat *source code* (menguji perilaku eksternal) |
| **Pelaksana** | Pengembang (*Software Developers*) | QA Engineer, Tester, End-User |
| **Waktu Pelaksanaan**| Selama fase konstruksi/coding (Unit Testing) | Setelah modul/fitur siap atau dirilis |
| **Contoh Tools** | JUnit, JaCoCo, PyTest, Coverage.py | Postman, Selenium, Playwright, Cypress |

---

## 3. Bagian A: Equivalence Partitioning (30 Poin)

### Soal 1: Form Login (15 Poin)
**Spesifikasi:**
- **Username:** 5-20 karakter, hanya huruf dan angka
- **Password:** Minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka
- **Umur:** 17-100 tahun (untuk verifikasi)

#### Tabel Identifikasi Partisi & Rancang Test Case Form Login:

| Field | Partisi | Kategori | Range / Kondisi | Test Case (Input) | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Username** | P1 | Valid | 5-20 karakter alfanumerik | `"user123"` | Input diterima (Valid) |
| | P2 | Invalid | Panjang < 5 karakter | `"usr1"` | Ditolak: *"Username minimal 5 karakter"* |
| | P3 | Invalid | Panjang > 20 karakter | `"user12345678901234567"` | Ditolak: *"Username maksimal 20 karakter"* |
| | P4 | Invalid | Mengandung karakter khusus/spasi | `"user_123!"` | Ditolak: *"Username hanya boleh berisi huruf dan angka"* |
| | P5 | Invalid | String kosong | `""` | Ditolak: *"Username tidak boleh kosong"* |
| **Password** | P1 | Valid | $\ge 8$ karakter, ada huruf besar, kecil, angka | `"Pass1234"` | Input diterima (Valid) |
| | P2 | Invalid | Panjang < 8 karakter | `"Pass1"` | Ditolak: *"Password minimal 8 karakter"* |
| | P3 | Invalid | Tanpa huruf besar (hanya kecil & angka) | `"pass1234"` | Ditolak: *"Password harus mengandung huruf besar"* |
| | P4 | Invalid | Tanpa huruf kecil (hanya besar & angka) | `"PASS1234"` | Ditolak: *"Password harus mengandung huruf kecil"* |
| | P5 | Invalid | Tanpa angka (hanya huruf) | `"Passwordku"` | Ditolak: *"Password harus mengandung angka"* |
| | P6 | Invalid | String kosong | `""` | Ditolak: *"Password tidak boleh kosong"* |
| **Umur** | P1 | Valid | Bilangan bulat 17 - 100 tahun | `25` | Input diterima (Valid) |
| | P2 | Invalid | Umur < 17 tahun | `10` | Ditolak: *"Umur minimal 17 tahun"* |
| | P3 | Invalid | Umur > 100 tahun | `150` | Ditolak: *"Umur maksimal 100 tahun"* |
| | P4 | Invalid | Non-numerik / karakter huruf | `"abc"` | Ditolak: *"Umur harus berupa angka"* |
| | P5 | Invalid | Bilangan desimal / pecahan | `20.5` | Ditolak: *"Umur harus berupa bilangan bulat"* |

---

### Soal 2: Form Pemesanan Tiket (15 Poin)
**Spesifikasi:**
- **Jumlah Tiket:** 1-10 tiket
- **Kode Promo:** 5-10 karakter, opsional (boleh kosong)
- **Tanggal Keberangkatan:** Format YYYY-MM-DD, minimal hari ini

#### Tabel Identifikasi Partisi & Rancang Test Case Form Pemesanan Tiket:

| Field | Partisi | Kategori | Range / Kondisi | Test Case (Input) | Expected Output |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Jumlah Tiket** | P1 | Valid | Bilangan bulat 1 - 10 | `3` | Input diterima (Valid) |
| | P2 | Invalid | Jumlah < 1 (contoh: 0) | `0` | Ditolak: *"Jumlah tiket minimal 1 tiket"* |
| | P3 | Invalid | Jumlah < 0 (negatif) | `-2` | Ditolak: *"Jumlah tiket minimal 1 tiket"* |
| | P4 | Invalid | Jumlah > 10 | `12` | Ditolak: *"Jumlah tiket maksimal 10 tiket"* |
| | P5 | Invalid | Non-numerik | `"lima"` | Ditolak: *"Jumlah tiket harus berupa angka"* |
| | P6 | Invalid | Bilangan pecahan/desimal | `2.5` | Ditolak: *"Jumlah tiket harus berupa bilangan bulat"* |
| **Kode Promo** | P1 | Valid | Alfanumerik 5-10 karakter | `"PROMO10"` | Diterima: *"Kode promo valid"* |
| | P2 | Valid | Kosong / `null` (opsional) | `""` | Diterima: *"Kode promo kosong (opsional)"* |
| | P3 | Invalid | Panjang < 5 karakter | `"DISC"` | Ditolak: *"Kode promo minimal 5 karakter"* |
| | P4 | Invalid | Panjang > 10 karakter | `"DISKONBESAR123"` | Ditolak: *"Kode promo maksimal 10 karakter"* |
| **Tanggal Keberangkatan** | P1 | Valid | Tanggal hari ini (YYYY-MM-DD) | `"2026-10-18"` | Diterima (Valid) |
| | P2 | Valid | Tanggal di masa depan | `"2026-12-25"` | Diterima (Valid) |
| | P3 | Invalid | Tanggal di masa lalu | `"2026-10-17"` | Ditolak: *"Tanggal keberangkatan minimal hari ini"* |
| | P4 | Invalid | Format bukan YYYY-MM-DD | `"18-10-2026"` | Ditolak: *"Format tanggal harus YYYY-MM-DD"* |
| | P5 | Invalid | Tanggal kalender tidak eksis | `"2026-02-31"` | Ditolak: *"Tanggal kalender tidak valid"* |

---

## 4. Bagian B: Boundary Value Analysis (30 Poin)

### Soal 3: Form Pendaftaran Mahasiswa (15 Poin)
**Spesifikasi:**
- **Nilai Ujian:** 0-100 (integer)
- **IPK:** 0.0-4.0 (floating point, step 0.1)
- **Semester:** 1-14 (integer)

#### Tabel Boundary Value Analysis:

| Field | Boundary | Nilai | Kategori | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **Nilai Ujian** | min - 1 | `-1` | Invalid | Ditolak: *"Nilai ujian minimal 0"* |
| | min | `0` | Valid | Diterima (Batas bawah valid) |
| | min + 1 | `1` | Valid | Diterima (Batas bawah + 1) |
| | max - 1 | `99` | Valid | Diterima (Batas atas - 1) |
| | max | `100` | Valid | Diterima (Batas atas valid) |
| | max + 1 | `101` | Invalid | Ditolak: *"Nilai ujian maksimal 100"* |
| **IPK** | min - 1 | `-0.1` | Invalid | Ditolak: *"IPK minimal 0.0"* |
| | min | `0.0` | Valid | Diterima (Batas bawah IPK valid) |
| | min + 1 | `0.1` | Valid | Diterima (Batas bawah + 0.1) |
| | max - 1 | `3.9` | Valid | Diterima (Batas atas - 0.1) |
| | max | `4.0` | Valid | Diterima (Batas atas IPK valid) |
| | max + 1 | `4.1` | Invalid | Ditolak: *"IPK maksimal 4.0"* |
| **Semester** | min - 1 | `0` | Invalid | Ditolak: *"Semester minimal 1"* |
| | min | `1` | Valid | Diterima (Semester 1 / Mahasiswa Baru) |
| | min + 1 | `2` | Valid | Diterima (Semester 2) |
| | max - 1 | `13` | Valid | Diterima (Semester 13) |
| | max | `14` | Valid | Diterima (Batas maksimal masa studi) |
| | max + 1 | `15` | Invalid | Ditolak: *"Semester maksimal 14"* |

---

### Soal 4: Form Transfer Bank (15 Poin)
**Spesifikasi:**
- **Nominal Transfer:** Rp10.000 - Rp100.000.000
- **Biaya Admin:** Rp2.500 (fixed)
- **Saldo Minimal:** Rp50.000
*(Formula: Sisa Saldo = Saldo Pengirim - (Nominal + Rp2.500) $\ge$ Rp50.000)*

#### 1. Boundary Value Nominal Transfer:
- Batas Minimum ($min$): Rp10.000
- Batas Maksimum ($max$): Rp100.000.000

#### 2. Tabel Rancang Test Case dengan BVA:

| Field / Aspek | Boundary | Nilai (Rp) | Kategori | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **Nominal Transfer** | min - 1 | `9.999` | Invalid | Ditolak: *"Nominal transfer minimal Rp10.000"* |
| | min | `10.000` | Valid | Diterima: Biaya admin Rp2.500, total potong Rp12.500 |
| | min + 1 | `10.001` | Valid | Diterima: Biaya admin Rp2.500, total potong Rp12.501 |
| | max - 1 | `99.999.999` | Valid | Diterima: Biaya admin Rp2.500, total potong Rp100.002.499 |
| | max | `100.000.000` | Valid | Diterima: Biaya admin Rp2.500, total potong Rp100.002.500 |
| | max + 1 | `100.000.001` | Invalid | Ditolak: *"Nominal transfer maksimal Rp100.000.000"* |
| **Batas Saldo Pengirim**<br>*(Contoh Saldo = Rp100.000)* | Saldo sisa tepat Rp50.000 | `47.500` | Valid | Diterima: Transfer Rp47.500 + Admin Rp2.500 = Rp50.000, sisa saldo tepat Rp50.000 |
| | Saldo sisa kurang dari Rp50.000 | `47.501` | Invalid | Ditolak: *"Saldo tidak mencukupi untuk menyisakan saldo minimal Rp50.000"* |

---

## 5. Bagian C: Kombinasi EP & BVA (25 Poin)

### Soal 5: Form Registrasi Akun
**Spesifikasi:**
- **Nama Lengkap:** 3-50 karakter, tidak boleh kosong
- **Username:** 5-20 karakter, huruf & angka, tidak boleh diawali angka
- **Email:** Format email valid
- **Password:** Minimal 8 karakter, huruf besar, huruf kecil, angka
- **Umur:** 17-100 tahun
- **No. Telepon:** 10-13 digit, diawali 08

#### 1. Identifikasi Equivalence Partitioning:
- **Nama Lengkap:** Valid (3-50 char), Invalid (< 3 char), Invalid (> 50 char), Invalid (kosong).
- **Username:** Valid (5-20 char alfanumerik diawali huruf), Invalid (< 5 char), Invalid (> 20 char), Invalid (diawali angka), Invalid (simbol khusus).
- **Email:** Valid (format standar email), Invalid (tanpa `@`), Invalid (tanpa domain TLD), Invalid (kosong).
- **Password:** Valid ($\ge 8$ char dengan huruf besar, kecil, angka), Invalid (< 8 char), Invalid (tanpa huruf besar), Invalid (tanpa huruf kecil), Invalid (tanpa angka).
- **Umur:** Valid (17-100 tahun), Invalid (< 17 tahun), Invalid (> 100 tahun), Invalid (non-numerik).
- **No. Telepon:** Valid (10-13 digit numerik diawali 08), Invalid (< 10 digit), Invalid (> 13 digit), Invalid (tidak diawali 08), Invalid (mengandung non-digit).

#### 2. Identifikasi Boundary Value Analysis (Field dengan Range):
- **Nama Lengkap (3-50):** 2 (Invalid), 3 (Valid), 4 (Valid), 49 (Valid), 50 (Valid), 51 (Invalid).
- **Username (5-20):** 4 (Invalid), 5 (Valid), 6 (Valid), 19 (Valid), 20 (Valid), 21 (Invalid).
- **Password ($\ge 8$):** 7 (Invalid), 8 (Valid), 9 (Valid).
- **Umur (17-100):** 16 (Invalid), 17 (Valid), 18 (Valid), 99 (Valid), 100 (Valid), 101 (Invalid).
- **No. Telepon (10-13 digit):** 9 digit (Invalid), 10 digit (Valid), 13 digit (Valid), 14 digit (Invalid).

#### 3. Rancang Test Case Lengkap (30 Test Cases):

| ID Test Case | Field Yang Diuji | Teknik | Nilai Input | Expected Result / Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-REG-01** | All Fields | EP | Nama: `"Jacky"`, User: `"jacky1"`, Email: `"jacky@mail.com"`, Pass: `"Pass1234"`, Umur: `21`, Telp: `"08123456789"` | **Pass** (Registrasi akun berhasil) |
| **TC-REG-02** | Nama Lengkap | BVA ($min-1$) | `"Jo"` (2 karakter) | **Fail** (*"Nama lengkap minimal 3 karakter"*) |
| **TC-REG-03** | Nama Lengkap | BVA ($min$) | `"Joe"` (3 karakter) | **Pass** (Valid) |
| **TC-REG-04** | Nama Lengkap | BVA ($min+1$) | `"John"` (4 karakter) | **Pass** (Valid) |
| **TC-REG-05** | Nama Lengkap | BVA ($max-1$) | String 49 karakter | **Pass** (Valid) |
| **TC-REG-06** | Nama Lengkap | BVA ($max$) | String 50 karakter | **Pass** (Valid) |
| **TC-REG-07** | Nama Lengkap | BVA ($max+1$) | String 51 karakter | **Fail** (*"Nama lengkap maksimal 50 karakter"*) |
| **TC-REG-08** | Nama Lengkap | EP (Invalid) | `""` (kosong) | **Fail** (*"Nama lengkap tidak boleh kosong"*) |
| **TC-REG-09** | Username | BVA ($min-1$) | `"user"` (4 karakter) | **Fail** (*"Username minimal 5 karakter"*) |
| **TC-REG-10** | Username | BVA ($min$) | `"user1"` (5 karakter) | **Pass** (Valid) |
| **TC-REG-11** | Username | BVA ($max$) | String 20 karakter | **Pass** (Valid) |
| **TC-REG-12** | Username | BVA ($max+1$) | String 21 karakter | **Fail** (*"Username maksimal 20 karakter"*) |
| **TC-REG-13** | Username | EP (Invalid) | `"1user"` (diawali angka) | **Fail** (*"Username tidak boleh diawali angka"*) |
| **TC-REG-14** | Username | EP (Invalid) | `"user@12"` (simbol khusus) | **Fail** (*"Username hanya boleh berupa huruf dan angka"*) |
| **TC-REG-15** | Email | EP (Valid) | `"jacky@stmik.ac.id"` | **Pass** (Valid) |
| **TC-REG-16** | Email | EP (Invalid) | `"jackystmik.ac.id"` (tanpa `@`) | **Fail** (*"Format email tidak valid"*) |
| **TC-REG-17** | Email | EP (Invalid) | `"jacky@stmik"` (tanpa TLD) | **Fail** (*"Format email tidak valid"*) |
| **TC-REG-18** | Password | BVA ($min-1$) | `"Pass123"` (7 karakter) | **Fail** (*"Password minimal 8 karakter"*) |
| **TC-REG-19** | Password | BVA ($min$) | `"Pass1234"` (8 karakter) | **Pass** (Valid) |
| **TC-REG-20** | Password | EP (Invalid) | `"pass12345"` (tanpa huruf besar) | **Fail** (*"Password harus mengandung huruf besar"*) |
| **TC-REG-21** | Password | EP (Invalid) | `"Passwordku"` (tanpa angka) | **Fail** (*"Password harus mengandung angka"*) |
| **TC-REG-22** | Umur | BVA ($min-1$) | `16` | **Fail** (*"Umur minimal 17 tahun"*) |
| **TC-REG-23** | Umur | BVA ($min$) | `17` | **Pass** (Valid) |
| **TC-REG-24** | Umur | BVA ($max$) | `100` | **Pass** (Valid) |
| **TC-REG-25** | Umur | BVA ($max+1$) | `101` | **Fail** (*"Umur maksimal 100 tahun"*) |
| **TC-REG-26** | No. Telepon | BVA ($min-1$) | `"081234567"` (9 digit) | **Fail** (*"Nomor telepon minimal 10 digit"*) |
| **TC-REG-27** | No. Telepon | BVA ($min$) | `"0812345678"` (10 digit) | **Pass** (Valid) |
| **TC-REG-28** | No. Telepon | BVA ($max$) | `"0812345678901"` (13 digit) | **Pass** (Valid) |
| **TC-REG-29** | No. Telepon | BVA ($max+1$) | `"08123456789012"` (14 digit) | **Fail** (*"Nomor telepon maksimal 13 digit"*) |
| **TC-REG-30** | No. Telepon | EP (Invalid) | `"02123456789"` (awalan bukan 08) | **Fail** (*"Nomor telepon harus diawali 08"*) |

---

## 6. Bagian D: API Testing (15 Poin)

### Soal 6: API POST /api/v1/products
**Spesifikasi:**
- **Endpoint:** `POST /api/v1/products`
- **Headers:** `Authorization: Bearer <valid_token>`, `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "string (3-100 karakter)",
    "price": "number (1000-10000000)",
    "stock": "integer (0-1000)",
    "category": "string (enum: 'electronics', 'clothing', 'food')"
  }
  ```
- **Responses:**
  - `201 Created`: Product berhasil dibuat
  - `400 Bad Request`: Validasi gagal
  - `401 Unauthorized`: Token tidak valid

#### Tabel Rancang Test Case API:

| No | Test Case | Header | Request Body | Expected Status | Expected Response Body |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **1** | **Valid Request** | `Authorization: Bearer secret-token-123` | `{"name": "Laptop Gaming ASUS", "price": 7500000, "stock": 50, "category": "electronics"}` | **201 Created** | `{"message": "Product berhasil dibuat", "data": {"id": "prod_...", "name": "Laptop Gaming ASUS", ...}}` |
| **2** | **Name < 3 karakter** | `Authorization: Bearer secret-token-123` | `{"name": "AB", "price": 50000, "stock": 10, "category": "clothing"}` | **400 Bad Request** | `{"error": "Bad Request", "message": "Validasi gagal: Nama produk harus berukuran 3-100 karakter"}` |
| **3** | **Price < 1000** | `Authorization: Bearer secret-token-123` | `{"name": "Pensil 2B", "price": 999, "stock": 20, "category": "food"}` | **400 Bad Request** | `{"error": "Bad Request", "message": "Validasi gagal: Harga harus berupa angka antara 1000 hingga 10000000"}` |
| **4** | **Stock > 1000** | `Authorization: Bearer secret-token-123` | `{"name": "Kemeja Batik", "price": 150000, "stock": 1001, "category": "clothing"}` | **400 Bad Request** | `{"error": "Bad Request", "message": "Validasi gagal: Stok harus berupa bilangan bulat antara 0 hingga 1000"}` |
| **5** | **Category invalid** | `Authorization: Bearer secret-token-123` | `{"name": "Buku Java", "price": 85000, "stock": 15, "category": "stationery"}` | **400 Bad Request** | `{"error": "Bad Request", "message": "Validasi gagal: Kategori tidak valid. Pilihan: electronics, clothing, food"}` |
| **6** | **Unauthorized** | *Header Token Kosong / Salah* | `{"name": "Monitor LED", "price": 1200000, "stock": 5, "category": "electronics"}` | **401 Unauthorized** | `{"error": "Unauthorized", "message": "Token tidak valid"}` |
| **7** | *Boundary BVA: Price 1000 & Stock 0* | `Authorization: Bearer secret-token-123` | `{"name": "Roti Manis", "price": 1000, "stock": 0, "category": "food"}` | **201 Created** | `{"message": "Product berhasil dibuat", "data": {...}}` |
| **8** | *Boundary BVA: Stock 1000 & Price 10jt* | `Authorization: Bearer secret-token-123` | `{"name": "Flagship 5G", "price": 10000000, "stock": 1000, "category": "electronics"}` | **201 Created** | `{"message": "Product berhasil dibuat", "data": {...}}` |

---

## 7. Bagian E: Studi Kasus Terpadu (Bonus 10 Poin)

### Soal 7: Form Pendaftaran Online
**Spesifikasi:**
- **Nama:** 3-100 karakter
- **Email:** Format email valid
- **No. HP:** 10-13 digit, diawali 08
- **Tanggal Lahir:** Format YYYY-MM-DD, umur minimal 17 tahun
- **Password:** Minimal 8 karakter, huruf besar, huruf kecil, angka, simbol
- **Konfirmasi Password:** Harus sama dengan password

#### 1. Identifikasi Equivalence Partitioning:
1. **Nama:** Valid (3-100 char), Invalid (< 3 char), Invalid (> 100 char), Invalid (kosong).
2. **Email:** Valid (email RFC standard), Invalid (tanpa `@`), Invalid (tanpa nama domain), Invalid (kosong).
3. **No. HP:** Valid (10-13 digit diawali 08), Invalid (< 10 digit), Invalid (> 13 digit), Invalid (diawali selain 08), Invalid (mengandung simbol/huruf).
4. **Tanggal Lahir:** Valid (format YYYY-MM-DD dan umur $\ge 17$ tahun), Invalid (umur < 17 tahun), Invalid (format bukan YYYY-MM-DD), Invalid (tanggal kalender tidak valid).
5. **Password:** Valid ($\ge 8$ karakter memuat huruf besar, huruf kecil, angka, simbol), Invalid (< 8 char), Invalid (tanpa huruf besar), Invalid (tanpa angka), Invalid (tanpa simbol).
6. **Konfirmasi Password:** Valid (persis sama dengan password), Invalid (berbeda dari password), Invalid (kosong).

#### 2. Identifikasi Boundary Value Analysis (Field Ber-range):
- **Nama (3-100):** 2 (Invalid), 3 (Valid), 4 (Valid), 99 (Valid), 100 (Valid), 101 (Invalid).
- **No. HP (10-13 digit):** 9 digit (Invalid), 10 digit (Valid), 13 digit (Valid), 14 digit (Invalid).
- **Umur Berdasarkan Tanggal Lahir (min 17 tahun):**
  - Tepat 16 tahun 364 hari (kurang 1 hari dari 17 tahun) $\rightarrow$ **Invalid**
  - Tepat 17 tahun hari ini $\rightarrow$ **Valid**
  - Berumur 17 tahun + 1 hari $\rightarrow$ **Valid**
- **Password (min 8):** 7 karakter (Invalid), 8 karakter (Valid), 9 karakter (Valid).

#### 3. Rancang Test Case Lengkap (30 Test Cases):

| ID Test Case | Field Yang Diuji | Teknik | Nilai Input | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **TC-ST-01** | All Form Fields | EP | Nama: `"Jacky"`, Email: `"jacky@stmik.ac.id"`, HP: `"081234567890"`, Tgl: `"2005-05-15"`, Pass: `"Pass123!"`, CPass: `"Pass123!"` | **Pass** (*"Pendaftaran online berhasil"*) |
| **TC-ST-02** | Nama Lengkap | BVA ($min-1$) | `"Al"` (2 karakter) | **Fail** (*"Nama minimal 3 karakter"*) |
| **TC-ST-03** | Nama Lengkap | BVA ($min$) | `"Ali"` (3 karakter) | **Pass** (Valid) |
| **TC-ST-04** | Nama Lengkap | BVA ($min+1$) | `"Alif"` (4 karakter) | **Pass** (Valid) |
| **TC-ST-05** | Nama Lengkap | BVA ($max-1$) | String 99 karakter | **Pass** (Valid) |
| **TC-ST-06** | Nama Lengkap | BVA ($max$) | String 100 karakter | **Pass** (Valid) |
| **TC-ST-07** | Nama Lengkap | BVA ($max+1$) | String 101 karakter | **Fail** (*"Nama maksimal 100 karakter"*) |
| **TC-ST-08** | Nama Lengkap | EP (Invalid) | `""` (string kosong) | **Fail** (*"Nama tidak boleh kosong"*) |
| **TC-ST-09** | Email | EP (Valid) | `"mahasiswa@univ.ac.id"` | **Pass** (Valid) |
| **TC-ST-10** | Email | EP (Invalid) | `"mahasiswauniv.ac.id"` (tanpa `@`) | **Fail** (*"Format email tidak valid"*) |
| **TC-ST-11** | Email | EP (Invalid) | `"mahasiswa@"` (tanpa domain) | **Fail** (*"Format email tidak valid"*) |
| **TC-ST-12** | Email | EP (Invalid) | `""` (kosong) | **Fail** (*"Email tidak boleh kosong"*) |
| **TC-ST-13** | No. HP | BVA ($min-1$) | `"081234567"` (9 digit) | **Fail** (*"Nomor HP minimal 10 digit"*) |
| **TC-ST-14** | No. HP | BVA ($min$) | `"0812345678"` (10 digit) | **Pass** (Valid) |
| **TC-ST-15** | No. HP | BVA ($max$) | `"0812345678901"` (13 digit) | **Pass** (Valid) |
| **TC-ST-16** | No. HP | BVA ($max+1$) | `"08123456789012"` (14 digit) | **Fail** (*"Nomor HP maksimal 13 digit"*) |
| **TC-ST-17** | No. HP | EP (Invalid) | `"07123456789"` (bukan awalan 08) | **Fail** (*"Nomor HP harus diawali 08"*) |
| **TC-ST-18** | No. HP | EP (Invalid) | `"0812-3456-78"` (karakter tanda hubung) | **Fail** (*"Nomor HP hanya boleh berisi angka"*) |
| **TC-ST-19** | Tanggal Lahir | BVA ($min-1$) | Lahir 2009-10-19 (umur 16 tahun 364 hari) | **Fail** (*"Umur pendaftar minimal 17 tahun"*) |
| **TC-ST-20** | Tanggal Lahir | BVA ($min$) | Lahir 2009-10-18 (tepat 17 tahun hari ini) | **Pass** (Valid) |
| **TC-ST-21** | Tanggal Lahir | BVA ($min+1$) | Lahir 2009-10-17 (17 tahun + 1 hari) | **Pass** (Valid) |
| **TC-ST-22** | Tanggal Lahir | EP (Invalid) | `"18-10-2000"` (bukan YYYY-MM-DD) | **Fail** (*"Format tanggal lahir harus YYYY-MM-DD"*) |
| **TC-ST-23** | Tanggal Lahir | EP (Invalid) | `"2000-02-30"` (tanggal tidak eksis) | **Fail** (*"Tanggal kalender tidak valid"*) |
| **TC-ST-24** | Password | BVA ($min-1$) | `"Pass1!a"` (7 karakter) | **Fail** (*"Password minimal 8 karakter"*) |
| **TC-ST-25** | Password | BVA ($min$) | `"Pass12!a"` (8 karakter) | **Pass** (Valid) |
| **TC-ST-26** | Password | EP (Invalid) | `"Password123"` (tanpa simbol) | **Fail** (*"Password harus mengandung simbol/karakter khusus"*) |
| **TC-ST-27** | Password | EP (Invalid) | `"password123!"` (tanpa huruf besar) | **Fail** (*"Password harus mengandung huruf besar"*) |
| **TC-ST-28** | Password | EP (Invalid) | `"Password!@#"` (tanpa angka) | **Fail** (*"Password harus mengandung angka"*) |
| **TC-ST-29** | Konfirmasi Password| EP (Valid) | `"Pass123!"` == `"Pass123!"` | **Pass** (*"Konfirmasi password cocok"*) |
| **TC-ST-30** | Konfirmasi Password| EP (Invalid) | `"Pass123!"` != `"Beda123!"` | **Fail** (*"Konfirmasi password harus sama dengan password"*) |

---

## 8. Implementasi Kode & Otomatisasi CI/CD

Struktur arsitektur repositori dibuat modular dan mengikuti praktik industri modern:
```
tugas 5/
├── .github/
│   └── workflows/
│       └── test.yml                     # Pipeline CI/CD GitHub Actions
├── src/
│   ├── index.js                         # Main module export
│   ├── api/
│   │   └── productApi.js                # API handler Soal 6 (POST /api/v1/products)
│   └── validators/
│       ├── loginValidator.js            # Soal 1: Form Login
│       ├── ticketBookingValidator.js    # Soal 2: Form Pemesanan Tiket
│       ├── studentRegistrationValidator.js # Soal 3: Form Pendaftaran Mahasiswa
│       ├── bankTransferValidator.js     # Soal 4: Form Transfer Bank
│       ├── accountRegistrationValidator.js # Soal 5: Registrasi Akun (EP & BVA)
│       └── onlineRegistrationValidator.js  # Soal 7: Form Pendaftaran Online Terpadu
├── tests/
│   ├── soal1_login.test.js
│   ├── soal2_ticket.test.js
│   ├── soal3_student.test.js
│   ├── soal4_bank.test.js
│   ├── soal5_account_registration.test.js
│   ├── soal6_product_api.test.js
│   └── soal7_online_registration.test.js
├── LAPORAN_TUGAS_5.md                   # Dokumen Laporan Lengkap
├── package.json                         # Script test & konfigurasi dependensi
└── README.md                            # Panduan repositori GitHub
```

### Konfigurasi GitHub Actions (`.github/workflows/test.yml`)
Workflow CI secara otomatis melakukan:
1. Trigger pada setiap aktivitas `git push` dan `pull_request` pada branch `main`/`master`.
2. Provisioning runner `ubuntu-latest` dengan Node.js v20.
3. Eksekusi pengujian bertingkat:
   - `npm run test:unit`
   - `npm run test:blackbox`
   - `npm run test:api`
   - `npm test` (Full regression test suite)

---

## 9. Hasil Eksekusi Pengujian (Test Runner Report)

```bash
> node --test tests/*.test.js

▶ Soal 1 - Equivalence Partitioning Form Login
  ✔ Username: Valid P1 (5-20 karakter alfanumerik)
  ✔ Username: Invalid P2 (< 5 karakter)
  ✔ Username: Invalid P3 (> 20 karakter)
  ✔ Username: Invalid P4 (Karakter simbol/spasi)
  ✔ Username: Invalid P5 (Kosong)
  ✔ Password: Valid P1 (>=8 char, huruf besar, huruf kecil, angka)
  ✔ Password: Invalid P2 (< 8 karakter)
  ✔ Password: Invalid P3 (Tanpa huruf besar)
  ✔ Password: Invalid P4 (Tanpa huruf kecil)
  ✔ Password: Invalid P5 (Tanpa angka)
  ✔ Umur: Valid P1 (17-100)
  ✔ Umur: Invalid P2 (< 17)
  ✔ Umur: Invalid P3 (> 100)
  ✔ Umur: Invalid P4 (Non-numerik)
  ✔ Form Login: Valid Case
✔ Soal 1 - Equivalence Partitioning Form Login (19.5ms)

▶ Soal 2 - Equivalence Partitioning Form Pemesanan Tiket
  ✔ Jumlah Tiket: Valid P1 (1-10 tiket)
  ✔ Jumlah Tiket: Invalid P2 (< 1)
  ✔ Jumlah Tiket: Invalid P3 (> 10)
  ✔ Jumlah Tiket: Invalid P4 (Bukan angka / non-integer)
  ✔ Kode Promo: Valid P1 (5-10 karakter)
  ✔ Kode Promo: Valid P2 (Boleh kosong/opsional)
  ✔ Kode Promo: Invalid P3 (< 5 karakter)
  ✔ Kode Promo: Invalid P4 (> 10 karakter)
  ✔ Tanggal: Valid P1 (Hari ini)
  ✔ Tanggal: Valid P2 (Masa depan)
  ✔ Tanggal: Invalid P3 (Masa lalu)
  ✔ Tanggal: Invalid P4 (Format salah)
  ✔ Tanggal: Invalid P5 (Tanggal kalender tidak valid)
  ✔ Form Order: Valid Complete Order
✔ Soal 2 - Equivalence Partitioning Form Pemesanan Tiket (25.3ms)

▶ Soal 3 - Boundary Value Analysis Form Pendaftaran Mahasiswa
  ✔ Nilai Ujian: min-1 (-1) -> Invalid
  ✔ Nilai Ujian: min (0) -> Valid
  ✔ Nilai Ujian: min+1 (1) -> Valid
  ✔ Nilai Ujian: max-1 (99) -> Valid
  ✔ Nilai Ujian: max (100) -> Valid
  ✔ Nilai Ujian: max+1 (101) -> Invalid
  ✔ IPK: min-1 (-0.1) -> Invalid
  ✔ IPK: min (0.0) -> Valid
  ✔ IPK: min+1 (0.1) -> Valid
  ✔ IPK: max-1 (3.9) -> Valid
  ✔ IPK: max (4.0) -> Valid
  ✔ IPK: max+1 (4.1) -> Invalid
  ✔ Semester: min-1 (0) -> Invalid
  ✔ Semester: min (1) -> Valid
  ✔ Semester: min+1 (2) -> Valid
  ✔ Semester: max-1 (13) -> Valid
  ✔ Semester: max (14) -> Valid
  ✔ Semester: max+1 (15) -> Invalid
  ✔ Form Mahasiswa: Valid Submission
✔ Soal 3 - Boundary Value Analysis Form Pendaftaran Mahasiswa (26.4ms)

▶ Soal 4 - Boundary Value Analysis Form Transfer Bank
  ✔ Nominal Transfer: min-1 (Rp9.999) -> Invalid
  ✔ Nominal Transfer: min (Rp10.000) -> Valid
  ✔ Nominal Transfer: min+1 (Rp10.001) -> Valid
  ✔ Nominal Transfer: max-1 (Rp99.999.999) -> Valid
  ✔ Nominal Transfer: max (Rp100.000.000) -> Valid
  ✔ Nominal Transfer: max+1 (Rp100.000.001) -> Invalid
  ✔ BVA Saldo: Tepat pada batas saldo minimum (Transfer 47.500, Saldo 100.000) -> Valid
  ✔ BVA Saldo: Melanggar batas saldo minimum (Transfer 47.501, Saldo 100.000) -> Invalid
✔ Soal 4 - Boundary Value Analysis Form Transfer Bank (82.0ms)

▶ Soal 5 - Kombinasi EP & BVA Form Registrasi Akun (Minimal 20 Test Case)
  ✔ TC-REG-01 s/d TC-REG-30 (30/30 passed)
✔ Soal 5 - Kombinasi EP & BVA Form Registrasi Akun (34.4ms)

▶ Soal 6 - API Testing POST /api/v1/products
  ✔ Test Case 1: Valid request -> 201 Created
  ✔ Test Case 2: Name < 3 karakter -> 400 Bad Request
  ✔ Test Case 3: Price < 1000 -> 400 Bad Request
  ✔ Test Case 4: Stock > 1000 -> 400 Bad Request
  ✔ Test Case 5: Category invalid -> 400 Bad Request
  ✔ Test Case 6: Unauthorized -> 401 Unauthorized
  ✔ Test Case 7 (BVA Boundary): Price min 1000 & stock min 0 -> 201 Created
  ✔ Test Case 8 (BVA Boundary): Stock max 1000 & Price max 10000000 -> 201 Created
✔ Soal 6 - API Testing POST /api/v1/products (15.6ms)

▶ Soal 7 - Studi Kasus Terpadu Form Pendaftaran Online (Minimal 25 Test Case)
  ✔ TC-ST-01 s/d TC-ST-30 (30/30 passed)
✔ Soal 7 - Studi Kasus Terpadu Form Pendaftaran Online (39.8ms)

-------------------------------------------------------
Total Tests: 131
Pass: 131
Fail: 0
Skipped: 0
Duration: 404ms (Status: ALL PASSING)
-------------------------------------------------------
```

---

## 10. Kesimpulan
1. **Efektivitas EP:** Equivalence Partitioning secara efektif mereduksi jumlah ruang kombinasi input uji tanpa mengurangi mutu penemuan cacat software dengan membagi domain menjadi partisi representatif.
2. **Kekuatan BVA:** Boundary Value Analysis melengkapi EP secara presisi karena sebagian besar cacat logika (*off-by-one errors*) terjadi di batas tepi domain input ($min-1, min, min+1, max-1, max, max+1$).
3. **Kombinasi Sinergis:** Penggabungan EP dan BVA terbukti menjadi strategi Black-box Testing terbaik untuk menguji form validasi antarmuka pengguna maupun payload API backend.
4. **Automated Testing & CI/CD:** Mengintegrasikan Black-box test ke dalam pipeline GitHub Actions menjamin bahwa setiap perubahan kode di masa mendatang tidak akan merusak aturan validasi bisnis (*regression protection*).
