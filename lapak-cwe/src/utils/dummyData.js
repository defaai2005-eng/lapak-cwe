export const categories = [
  { name: 'Mengikuti', icon: '⭐', bg: 'bg-amber-100' },
  { name: 'Buku & Modul', icon: '📚', bg: 'bg-teal-100' },
  { name: 'Elektronik', icon: '💻', bg: 'bg-blue-100' },
  { name: 'Fashion', icon: '👕', bg: 'bg-rose-100' },
  { name: 'Helm & Kendaraan', icon: '🪖', bg: 'bg-orange-100' },
  { name: 'Kos & Perabot', icon: '🛋️', bg: 'bg-emerald-100' },
  { name: 'Kecantikan', icon: '💄', bg: 'bg-pink-100' },
  { name: 'Jasa & Print', icon: '🖨️', bg: 'bg-purple-100' },
];

export const products = [
  {
    id: 1,
    name: 'Helm Half Face KYT Bekas Mulus',
    price: 165000,
    condition: 'Tidak terlalu sering dipakai',
    timeAgo: '2 hari lalu',
    category: 'Helm & Kendaraan',
    store: 'garasi_mahasiswa',
    likes: 4,
    payment: ['COD Kampus', 'Transfer Bank'],
    description:
      'Helm KYT Kyoto Half Face ukuran L warna hitam.\n- Kondisi body 92% mulus, lecet pemakaian wajar\n- Kaca visor bening tidak buram\n- Busa dalam sudah dicuci bersih & wangi\n\nAlasan dijual karena sudah ganti helm full face. Bisa cek barang langsung COD di parkiran kampus.',
    image:
      'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80',
  },
  {
    id: 2,
    name: 'Lampu Meja Belajar LED Lipat',
    price: 38000,
    condition: 'Seperti baru',
    timeAgo: '5 jam lalu',
    category: 'Kos & Perabot',
    store: 'Anak Kost CWE',
    likes: 7,
    payment: ['COD Kampus', 'QRIS'],
    description:
      'Lampu meja belajar LED portable model lipat, cocok untuk nugas di kost.\n- 3 tingkat kecerahan cahaya (putih, warm white, natural)\n- Baterai rechargeable tahan hingga 5 jam\n- Kelengkapan: unit lampu + kabel charger USB\n\nSiap COD area kantin atau gerbang utama kampus.',
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80',
  },
  {
    id: 3,
    name: 'Kalkulator Scientific Casio fx-991EX',
    price: 120000,
    condition: 'Seperti baru',
    timeAgo: '1 minggu lalu',
    category: 'Elektronik',
    store: 'Toko Alat Tulis',
    likes: 11,
    payment: ['COD Kampus', 'QRIS', 'Transfer Bank'],
    description:
      'Kalkulator ilmiah Casio ClassWiz original, sangat membantu untuk mata kuliah Kalkulus, Statistika, dan Rangkaian Listrik.\n- Layar jernih resolusi tinggi\n- Semua tombol empuk & berfungsi normal\n- Sudah termasuk tutup geser pelindung',
    image:
      'https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=600&q=80',
  },
  {
    id: 4,
    name: 'Buku Tulis & Tote Bag Kampus',
    price: 15000,
    condition: 'Barang baru',
    timeAgo: '1 hari lalu',
    category: 'Buku & Modul',
    store: 'Koperasi Mahasiswa',
    likes: 9,
    payment: ['COD Kampus', 'QRIS', 'Tunai'],
    description:
      'Paket hemat perlengkapan kuliah baru:\n- 1 Tote bag kanvas tebal warna cokelat (muat laptop 14 inch & binder)\n- 2 Buku tulis kampus isi 58 lembar\n\nStok terbatas, bisa langsung ambil di stand Koperasi Mahasiswa atau COD.',
    image:
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80',
  },
  {
    id: 5,
    name: 'Wardah Moist Dew Tint 04 & Emina Lip Serum 01',
    price: 50500,
    condition: 'Barang baru',
    timeAgo: '3 hari lalu',
    category: 'Kecantikan',
    store: 'shinewithme_',
    likes: 1,
    payment: ['COD Kampus', 'QRIS'],
    description:
      'Bundle 2 produk bibir masih baru segel:\n- Wardah Moist Dew Tint 04 Caramel Brulee (exp 11/27)\n- Emina Water Color Lip Serum 01 Dawn (exp 2027)\n\nDijual sepaket lebih hemat, belum pernah dibuka sama sekali.',
    image:
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&q=80',
  },
  {
    id: 6,
    name: 'Modul Praktikum Basis Data & SQL',
    price: 25000,
    condition: 'Seperti baru',
    timeAgo: '4 hari lalu',
    category: 'Buku & Modul',
    store: 'Thrift Anak Teknik',
    likes: 6,
    payment: ['COD Kampus', 'QRIS'],
    description:
      'Buku panduan praktikum Basis Data lengkap dengan studi kasus ERD, normalisasi, dan query MySQL.\n- Kondisi halaman bersih, jilid spiral kuat\n- Bonus catatan ringkasan materi UTS & UAS',
    image:
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=80',
  },
];

export const updates = [
  {
    id: 1,
    user: 'Lapak CWE',
    text: 'Saat toko lain tidur, lapak kamu mulai beraksi. Yuk pajang barang jualanmu sekarang!',
    time: 'Baru saja',
    isPromo: true,
  },
  {
    id: 2,
    user: 'saputra888',
    text: 'sedang menunggu Anda membalas pesan tentang Kalkulator Scientific.',
    time: '3 hari yang lalu',
    isPromo: false,
  },
  {
    id: 3,
    user: 'james.bp dan 5 lainnya',
    text: 'menyukai Helm Half Face KYT Bekas Mulus milikmu.',
    time: '5 hari yang lalu',
    isPromo: false,
  },
];

export const safetyRules = [
  {
    title: 'COD di Area Kampus yang Ramai',
    desc: 'Lakukan transaksi tatap muka di tempat umum yang terang dan ramai seperti Kantin Utama, Perpustakaan, atau Lobi Gedung.',
  },
  {
    title: 'Cek Barang Sebelum Bayar',
    desc: 'Periksa kondisi fisik, kelengkapan, dan fungsi barang secara langsung sebelum menyerahkan uang atau melakukan transfer.',
  },
  {
    title: 'Jaga Kerahasiaan Data Pribadi',
    desc: 'Jangan pernah membagikan kode OTP, PIN, kata sandi, atau foto identitas/rekening ke siapa pun.',
  },
  {
    title: 'Gunakan Fitur Chat Aplikasi',
    desc: 'Simpan seluruh bukti negosiasi dan kesepakatan harga di dalam ruang chat Lapak CWE untuk keamanan bersama.',
  },
];

export const prohibitedItems = [
  {
    title: 'Senjata & Benda Berbahaya',
    desc: 'Dilarang menjual senjata tajam, senjata api, bahan peledak, petasan, atau alat berbahaya lainnya di lingkungan kampus.',
  },
  {
    title: 'Narkotika, Miras & Rokok/Vape',
    desc: 'Segala jenis narkotika, psikotropika, minuman beralkohol, rokok konvensional, rokok elektrik (vape), dan obat terlarang.',
  },
  {
    title: 'Joki Tugas & Kecurangan Akademik',
    desc: 'Jasa pembuatan tugas kuliah, skripsi, joki ujian, pemalsuan tanda tangan/absensi, maupun kecurangan akademik lainnya.',
  },
  {
    title: 'Barang Curian & Produk Ilegal',
    desc: 'Barang hasil tindak kejahatan, barang bajakan/ilegal, serta produk tanpa izin edar resmi.',
  },
  {
    title: 'Konten Dewasa & Dokumen Palsu',
    desc: 'Materi pornografi, konten dewasa, serta pemalsuan kartu mahasiswa (KTM), KTP, atau dokumen resmi lainnya.',
  },
];