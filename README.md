# Manajemen Mahasiswa - Universitas Pamulang

Aplikasi Manajemen Mahasiswa yang dibangun menggunakan **Next.js**, **Prisma**, dan **MongoDB**. Aplikasi ini dirancang untuk mengelola data mahasiswa, fakultas, dan jurusan dengan menerapkan prinsip **Object-Oriented Programming (OOP)** dan demonstrasi algoritma pengurutan (Sorting) dan pencarian (Searching).

![Logo Unpam](/public/images/logos/logo.png)

## 🚀 Fitur Utama

### 1. Manajemen Data (CRUD)
-   **Mahasiswa**: Tambah, Edit, Hapus, dan Lihat data mahasiswa.
-   **Fakultas**: Kelola data fakultas.
-   **Jurusan**: Kelola data jurusan yang terhubung dengan fakultas.

### 2. Implementasi Algoritma & OOP
Aplikasi ini mendemonstrasikan penggunaan struktur data dan algoritma secara eksplisit:
-   **Sorting Algorithms**:
    -   Bubble Sort
    -   Selection Sort
    -   Insertion Sort
    -   Merge Sort
    -   Shell Sort
-   **Searching Algorithms**:
    -   Linear Search
    -   Binary Search
-   **OOP**: Penggunaan Class `Student` dan `StudentManager` untuk enkapsulasi logika bisnis.

### 3. Dashboard Interaktif
-   Statistik total mahasiswa.
-   Grafik distribusi mahasiswa per Jurusan.
-   Grafik distribusi mahasiswa per Semester.

### 4. UI/UX Modern
-   Dibangun dengan **Tailwind CSS** dan **Shadcn/UI**.
-   Mendukung **Dark Mode**.
-   Notifikasi interaktif menggunakan **SweetAlert2**.

## 🛠️ Teknologi yang Digunakan

-   **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
-   **Database**: [MongoDB](https://www.mongodb.com/)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Flowbite](https://flowbite.com/), [Shadcn/UI](https://ui.shadcn.com/)
-   **Bahasa**: [TypeScript](https://www.typescriptlang.org/)

## 📦 Instalasi & Menjalankan Project

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username/manajemen-mahasiswa.git
    cd manajemen-mahasiswa
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env` dan tambahkan koneksi MongoDB Anda:
    ```env
    DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/nextkit-db"
    ```

4.  **Generate Prisma Client**
    ```bash
    npx prisma generate
    ```

5.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```

    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🧪 Testing

Project ini dilengkapi dengan unit testing menggunakan **Jest**.

```bash
npm test
```

## 📂 Struktur Project

-   `src/app`: Halaman dan API Routes (Next.js App Router).
-   `src/lib/oop`: Logika bisnis utama (Class `Student`, `StudentManager`).
-   `src/components`: Komponen UI reusable.
-   `prisma/schema.prisma`: Definisi skema database.

---
**Universitas Pamulang** - Manajemen Mahasiswa Project
