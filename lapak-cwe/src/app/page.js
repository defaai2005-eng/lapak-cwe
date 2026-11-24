'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';
import RulesModal from '../components/RulesModal';
import {
  categories,
  products as initialProducts,
  updates as initialUpdates,
} from '../utils/dummyData';

// Data Profil Penjual Bawaan
const defaultSellerProfiles = {
  'shinewithme_': {
    responseStatus: 'Sangat Responsif',
    joinedText: 'Bergabung pada 1 tahun lalu',
    verified: true,
    campusInfo: 'Mahasiswa Aktif · Kampus CWE',
    bio: 'Jual perlengkapan kuliah, skincare baru segel, dan barang preloved terawat. Bisa COD di Kantin atau Gedung Utama.',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  },
  'garasi_mahasiswa': {
    responseStatus: 'Sangat Responsif',
    joinedText: 'Bergabung pada 2 tahun lalu',
    verified: true,
    campusInfo: 'Teknik · Kampus CWE',
    bio: 'Lapak barang kebutuhan anak kost & mahasiswa teknik. Barang dicek normal sebelum COD di parkiran kampus.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  'Anak Kost CWE': {
    responseStatus: 'Responsif (< 10 mnt)',
    joinedText: 'Bergabung pada 8 bulan lalu',
    verified: true,
    campusInfo: 'Asrama & Kost CWE',
    bio: 'Menjual perlengkapan kost, lampu belajar, dan alat tulis hemat untuk mahasiswa.',
    avatar: '',
  },
  'Toko Alat Tulis': {
    responseStatus: 'Sangat Responsif',
    joinedText: 'Bergabung pada 1 tahun lalu',
    verified: true,
    campusInfo: 'Mitra Mahasiswa · Kampus CWE',
    bio: 'Sedia kalkulator ilmiah, buku catatan, dan kebutuhan praktikum mahasiswa.',
    avatar: '',
  },
  'Koperasi Mahasiswa': {
    responseStatus: 'Aktif Setiap Hari',
    joinedText: 'Bergabung pada 3 tahun lalu',
    verified: true,
    campusInfo: 'Unit Usaha Resmi Kampus',
    bio: 'Unit usaha resmi mahasiswa Kampus CWE. Melayani pembelian satuan maupun kebutuhan acara kampus.',
    avatar: '',
  },
  'Thrift Anak Teknik': {
    responseStatus: 'Responsif',
    joinedText: 'Bergabung pada 1 tahun lalu',
    verified: true,
    campusInfo: 'Fakultas Teknik · Kampus CWE',
    bio: 'Koleksi pakaian, tas kuliah, dan perlengkapan kampus kondisi layak pakai & terawat.',
    avatar: '',
  },
};

// Jumlah Pengikut Awal per Penjual
const initialSellerFollowers = {
  'shinewithme_': 48,
  'garasi_mahasiswa': 124,
  'Anak Kost CWE': 35,
  'Toko Alat Tulis': 62,
  'Koperasi Mahasiswa': 215,
  'Thrift Anak Teknik': 89,
};

// Data Ulasan & Review Bintang Bawaan per Produk
const initialReviewsByProduct = {
  1: [
    {
      id: 101,
      user: 'dimas.pratama',
      rating: 5,
      comment: 'Helm masih mulus banget sesuai foto, busa wangi dan kaca bening. COD lancar di parkiran kampus!',
      time: '2 hari lalu',
    },
    {
      id: 102,
      user: 'arief_kurniawan',
      rating: 5,
      comment: 'Penjual ramah dan tepat waktu pas ketemuan di kantin.',
      time: '1 minggu lalu',
    },
  ],
  2: [
    {
      id: 201,
      user: 'salsabila.putri',
      rating: 5,
      comment: 'Lampunya terang banget buat nugas malam di kost, baterai juga awet.',
      time: '3 hari lalu',
    },
  ],
  3: [
    {
      id: 301,
      user: 'rafli_sipil',
      rating: 5,
      comment: 'Kalkulator original Casio, semua tombol normal. Sangat membantu buat ujian kalkulus.',
      time: '5 hari lalu',
    },
  ],
  4: [
    {
      id: 401,
      user: 'nabila.azzahra',
      rating: 5,
      comment: 'Tote bag kanvasnya tebal, muat laptop 14 inch. Harga mahasiswa banget!',
      time: '4 hari lalu',
    },
  ],
  5: [
    {
      id: 501,
      user: 'prelovedddyuu',
      rating: 5,
      comment: 'Barang masih segel baru dan exp masih lama sesuai deskripsi. Seller ramah banget!',
      time: '2 hari lalu',
    },
    {
      id: 502,
      user: 'clarissa.m',
      rating: 5,
      comment: 'Fast respon, COD di lobi gedung utama langsung beres. Makasih kak!',
      time: '5 hari lalu',
    },
  ],
  6: [
    {
      id: 601,
      user: 'fajar.informatika',
      rating: 5,
      comment: 'Modulnya bersih dan bonus ringkasan materinya lengkap banget buat persiapan UTS.',
      time: '6 hari lalu',
    },
  ],
};

// Komponen Tampilan Barcode QRIS Penjual saat Pembeli Checkout
function QrisBarcodeCard({ product, amount }) {
  return (
    <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3.5 space-y-2.5 text-center">
      <div className="flex items-center justify-between text-xs border-b border-teal-200/80 pb-2">
        <span className="font-extrabold tracking-wide text-teal-900">
          QRIS PEMBAYARAN
        </span>
        <span className="text-[11px] font-semibold text-teal-700">
          Penjual: {product.store}
        </span>
      </div>

      {product.qrisLabel && (
        <p className="text-xs font-semibold text-gray-800">
          {product.qrisLabel}
        </p>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-3 inline-flex flex-col items-center justify-center shadow-2xs mx-auto">
        {product.qrisImage ? (
          <img
            src={product.qrisImage}
            alt={`QRIS ${product.store}`}
            className="w-44 h-44 object-contain rounded-lg"
          />
        ) : (
          <svg
            viewBox="0 0 120 120"
            className="w-40 h-40 text-gray-900"
            aria-label="Barcode QRIS Penjual"
          >
            <rect width="120" height="120" fill="#ffffff" />
            <rect x="10" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="18" y="18" width="14" height="14" fill="currentColor" />
            <rect x="80" y="10" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="88" y="18" width="14" height="14" fill="currentColor" />
            <rect x="10" y="80" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="6" />
            <rect x="18" y="88" width="14" height="14" fill="currentColor" />
            <rect x="50" y="12" width="8" height="8" fill="currentColor" />
            <rect x="64" y="12" width="8" height="16" fill="currentColor" />
            <rect x="50" y="28" width="10" height="10" fill="currentColor" />
            <rect x="12" y="50" width="14" height="8" fill="currentColor" />
            <rect x="34" y="48" width="10" height="14" fill="currentColor" />
            <rect x="52" y="52" width="16" height="16" fill="currentColor" />
            <rect x="76" y="48" width="12" height="8" fill="currentColor" />
            <rect x="96" y="50" width="14" height="14" fill="currentColor" />
            <rect x="50" y="76" width="8" height="14" fill="currentColor" />
            <rect x="66" y="80" width="14" height="8" fill="currentColor" />
            <rect x="88" y="76" width="10" height="10" fill="currentColor" />
            <rect x="50" y="98" width="18" height="10" fill="currentColor" />
            <rect x="76" y="96" width="12" height="12" fill="currentColor" />
            <rect x="96" y="94" width="14" height="14" fill="currentColor" />
          </svg>
        )}
        <span className="text-[10px] font-bold text-gray-500 mt-1.5 tracking-wider uppercase">
          Scan QRIS · Gopay / OVO / DANA / ShopeePay / M-Banking
        </span>
      </div>

      <p className="text-xs text-gray-700">
        Nominal Transfer:{' '}
        <span className="font-bold text-red-600">
          Rp {amount.toLocaleString('id-ID')}
        </span>
      </p>
    </div>
  );
}

export default function Home() {
  // Status Login Pengguna
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Pop-up Pemberitahuan Barang Terlarang & Aturan
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [pendingSellAfterRules, setPendingSellAfterRules] = useState(false);

  // Data Dinamis
  const [productList, setProductList] = useState(initialProducts);
  const [updateList, setUpdateList] = useState(initialUpdates);
  const [orders, setOrders] = useState([]);

  // State Follow Penjual, Jumlah Pengikut, Halaman Profil Penjual & Ulasan Produk
  const [followedSellers, setFollowedSellers] = useState(['shinewithme_']);
  const [sellerFollowers, setSellerFollowers] = useState(initialSellerFollowers);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [sellerPageTab, setSellerPageTab] = useState('produk');
  const [productReviews, setProductReviews] = useState(initialReviewsByProduct);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  // State Draft Upload Produk & Konfirmasi Batal
  const [draftList, setDraftList] = useState([]);
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  // State Keranjang Belanja (Halaman Penuh)
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartOrderSuccess, setCartOrderSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Navigasi & Filter Beranda ('Jelajahi' | 'Untuk Anda' | 'Jual' | 'Pembaruan' | 'Saya')
  const [activeNav, setActiveNav] = useState('Jelajahi');
  const [activeTab, setActiveTab] = useState('Pilihan teratas');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [notifFilter, setNotifFilter] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [likedIds, setLikedIds] = useState([1]);

  // State Khusus Tab Profil
  const [profileSearch, setProfileSearch] = useState('');
  const [profileConditionFilter, setProfileConditionFilter] = useState('Semua');
  const [profileCategoryFilter, setProfileCategoryFilter] = useState('Semua');
  const [profilePriceSort, setProfilePriceSort] = useState('Default');
  const [isAccountDetailOpen, setIsAccountDetailOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settingsSubView, setSettingsSubView] = useState('menu');
  const [editProfileForm, setEditProfileForm] = useState({
    name: '',
    phone: '',
    city: '',
    avatar: '',
  });

  // Modal / Page States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  // State Checkout
  const [selectedPayment, setSelectedPayment] = useState('COD Kampus');
  const [codLocation, setCodLocation] = useState('Kantin Utama Kampus');
  const [orderSuccess, setOrderSuccess] = useState(null);

  // State Live Chat
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatSeller, setActiveChatSeller] = useState('Thrift Anak Teknik');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState({
    'Thrift Anak Teknik': [
      { sender: 'seller', text: 'Halo kak! Barang masih ready ya, bisa COD di kampus hari ini.' },
    ],
    'Koperasi Mahasiswa': [
      { sender: 'seller', text: 'Selamat datang di Koperasi Mahasiswa, silakan tanya stok.' },
    ],
  });

  // State Form Jual / Upload Barang (Halaman Penuh)
  const paymentOptions = [
    { id: 'COD Kampus', label: 'COD Kampus', desc: 'Bayar tunai saat ketemuan di area kampus' },
    { id: 'QRIS', label: 'QRIS', desc: 'Scan QRIS semua e-wallet & mobile banking' },
    { id: 'Transfer Bank', label: 'Transfer Bank', desc: 'Transfer antar rekening bank' },
    { id: 'Tunai', label: 'Tunai / Cash', desc: 'Pembayaran tunai langsung di tempat' },
  ];

  const defaultNewItem = {
    name: '',
    price: '',
    condition: 'Seperti baru',
    category: 'Buku & Modul',
    description: '',
    payment: ['COD Kampus', 'QRIS'],
    qrisImage: '',
    qrisLabel: '',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
  };

  const [newItem, setNewItem] = useState(defaultNewItem);

  const requireLogin = (actionCallback) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    actionCallback();
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  // Pilih produk dan gulir layar ke atas
  const handleSelectProductDetail = (prod) => {
    setSelectedSeller(null);
    setSelectedProduct(prod);
    setIsReviewFormOpen(false);
    setNewReviewRating(5);
    setNewReviewComment('');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Buka Halaman Profil Penjual saat nama/foto/kartu penjual diklik
  const handleOpenSellerProfile = (sellerName) => {
    if (!sellerName) return;
    setSelectedSeller(sellerName);
    setSellerPageTab('produk');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toggle Ikuti Penjual & Perbarui Jumlah Pengikut
  const toggleFollowSeller = (sellerName) => {
    const isAlreadyFollowing = followedSellers.includes(sellerName);
    setFollowedSellers((prev) =>
      isAlreadyFollowing
        ? prev.filter((s) => s !== sellerName)
        : [...prev, sellerName]
    );
    setSellerFollowers((prev) => {
      const currentCount = prev[sellerName] ?? 0;
      return {
        ...prev,
        [sellerName]: isAlreadyFollowing
          ? Math.max(0, currentCount - 1)
          : currentCount + 1,
      };
    });

    if (isAlreadyFollowing) {
      showToast(`Berhenti mengikuti ${sellerName}`);
    } else {
      showToast(`✓ Mengikuti lapak ${sellerName}`);
    }
  };

  // Tambah Ulasan & Review Bintang pada Produk
  const handleSubmitProductReview = (e) => {
    e.preventDefault();
    if (!selectedProduct || !newReviewComment.trim()) return;

    const reviewerName = currentUser ? currentUser.name : 'mahasiswa_cwe';
    const createdReview = {
      id: Date.now(),
      user: reviewerName,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      time: 'Baru saja',
    };

    setProductReviews((prev) => ({
      ...prev,
      [selectedProduct.id]: [createdReview, ...(prev[selectedProduct.id] || [])],
    }));

    setNewReviewComment('');
    setNewReviewRating(5);
    setIsReviewFormOpen(false);
    showToast('★ Ulasan & rating berhasil dikirim!');
  };

  // Toggle pilihan metode pembayaran saat upload produk
  const toggleNewItemPayment = (method) => {
    setNewItem((prev) => {
      const exists = prev.payment.includes(method);
      if (exists && prev.payment.length === 1) return prev;
      return {
        ...prev,
        payment: exists
          ? prev.payment.filter((m) => m !== method)
          : [...prev.payment, method],
      };
    });
  };

  // Handler Upload Foto Produk & Barcode QRIS Penjual
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewItem((prev) => ({ ...prev, image: previewUrl }));
    }
  };

  const handleQrisFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setNewItem((prev) => ({ ...prev, qrisImage: previewUrl }));
      showToast('✓ Barcode QRIS berhasil diunggah');
    }
  };

  // Handler Konfirmasi Batal: Simpan Draft atau Jangan Simpan
  const handleSaveDraft = () => {
    const draftEntry = {
      ...newItem,
      id: Date.now(),
      name: newItem.name.trim() || 'Draft Produk Tanpa Nama',
      savedAt: 'Baru saja',
    };
    setDraftList((prev) => [draftEntry, ...prev]);
    setNewItem(defaultNewItem);
    setIsCancelConfirmOpen(false);
    setActiveNav('Jelajahi');
    showToast('📝 Draft produk berhasil disimpan');
  };

  const handleDiscardDraft = () => {
    setNewItem(defaultNewItem);
    setIsCancelConfirmOpen(false);
    setActiveNav('Jelajahi');
    showToast('Perubahan dibatalkan & tidak disimpan');
  };

  const handleLoadDraft = (draft) => {
    setNewItem({
      name: draft.name === 'Draft Produk Tanpa Nama' ? '' : draft.name,
      price: draft.price || '',
      condition: draft.condition || 'Seperti baru',
      category: draft.category || 'Buku & Modul',
      description: draft.description || '',
      payment: draft.payment?.length ? draft.payment : ['COD Kampus', 'QRIS'],
      qrisImage: draft.qrisImage || '',
      qrisLabel: draft.qrisLabel || '',
      image: draft.image || defaultNewItem.image,
    });
    setDraftList((prev) => prev.filter((d) => d.id !== draft.id));
    setIsDraftModalOpen(false);
    setActiveNav('Jual');
    showToast('📄 Draft dimuat ke formulir');
  };

  const handleDeleteDraft = (draftId) => {
    setDraftList((prev) => prev.filter((d) => d.id !== draftId));
    showToast('🗑️ Draft dihapus');
  };

  // Handler Profil
  const openEditProfile = () => {
    if (!currentUser) return;
    setEditProfileForm({
      name: currentUser.name || '',
      phone: currentUser.phone || '',
      city: currentUser.city || '',
      avatar: currentUser.avatar || '',
    });
    setIsEditProfileOpen(true);
  };

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setEditProfileForm((prev) => ({ ...prev, avatar: previewUrl }));
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editProfileForm.name.trim()) return;
    setCurrentUser((prev) => ({
      ...prev,
      name: editProfileForm.name.trim(),
      phone: editProfileForm.phone.trim(),
      city: editProfileForm.city.trim(),
      avatar: editProfileForm.avatar,
    }));
    setIsEditProfileOpen(false);
    showToast('✓ Profil berhasil diperbarui');
  };

  const handleShareProfile = () => {
    const slug = (currentUser?.name || 'mahasiswa')
      .toLowerCase()
      .replace(/\s+/g, '_');
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://lapakcwe.ac.id'}/profil/${slug}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    showToast(`🔗 Link profil disalin: /profil/${slug}`);
  };

  const handleShareSeller = (sellerName) => {
    const slug = sellerName.toLowerCase().replace(/\s+/g, '_');
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://lapakcwe.ac.id'}/penjual/${slug}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    showToast(`🔗 Link lapak "${sellerName}" disalin`);
  };

  const handleShareProduct = (product) => {
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://lapakcwe.ac.id'}/produk/${product.id}`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).catch(() => {});
    }
    showToast(`🔗 Link "${product.name}" disalin`);
  };

  // Buka Halaman Detail Produk dari Menu Keranjang
  const handleOpenProductFromCart = (product) => {
    const targetProduct =
      productList.find((item) => item.id === product.id) || product;
    setIsCartOpen(false);
    handleSelectProductDetail(targetProduct);
  };

  // Fungsi Keranjang Belanja
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`✓ "${product.name}" masuk ke keranjang`);
  };

  const handleUpdateCartQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckoutCart = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }

    const newOrders = cart.map((item, idx) => ({
      id: Date.now() + idx,
      product: {
        ...item.product,
        name: item.quantity > 1 ? `${item.product.name} (${item.quantity}x)` : item.product.name,
        price: item.product.price * item.quantity,
      },
      payment: selectedPayment,
      location: codLocation,
      date: 'Baru saja',
    }));

    setOrders((prev) => [...newOrders, ...prev]);
    setUpdateList((prev) => [
      {
        id: Date.now(),
        user: 'Checkout Keranjang Berhasil',
        text: `Kamu memesan ${cart.length} jenis barang (${selectedPayment} - ${codLocation}).`,
        time: 'Baru saja',
        isPromo: false,
      },
      ...prev,
    ]);
    setCart([]);
    setCartOrderSuccess(true);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Alur Jual Produk -> Konfirmasi Aturan -> Halaman Penuh Upload Produk
  const triggerSellFlow = () => {
    setSelectedSeller(null);
    setSelectedProduct(null);
    setIsCartOpen(false);
    requireLogin(() => {
      setPendingSellAfterRules(true);
      setIsRulesOpen(true);
    });
  };

  const openRulesInfoOnly = () => {
    setPendingSellAfterRules(false);
    setIsRulesOpen(true);
  };

  const handleRulesConfirmed = () => {
    setIsRulesOpen(false);
    if (pendingSellAfterRules) {
      setPendingSellAfterRules(false);
      setActiveNav('Jual');
    }
  };

  const handleRulesClosed = () => {
    setIsRulesOpen(false);
    setPendingSellAfterRules(false);
  };

  const toggleLike = (id) => {
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const openChatWithSeller = (sellerName, productName = '') => {
    setActiveChatSeller(sellerName);
    setChatHistory((prev) => {
      const existing = prev[sellerName] || [
        { sender: 'seller', text: `Halo! Ada yang bisa dibantu dari ${sellerName}?` },
      ];
      if (productName) {
        return {
          ...prev,
          [sellerName]: [
            ...existing,
            { sender: 'me', text: `Halo kak, apakah "${productName}" masih tersedia?` },
          ],
        };
      }
      return { ...prev, [sellerName]: existing };
    });
    setIsChatOpen(true);
  };

  const handleSendMessage = (customText) => {
    const textToSend = (customText || chatInput).trim();
    if (!textToSend) return;

    setChatHistory((prev) => ({
      ...prev,
      [activeChatSeller]: [
        ...(prev[activeChatSeller] || []),
        { sender: 'me', text: textToSend },
      ],
    }));
    if (!customText) setChatInput('');

    setTimeout(() => {
      setChatHistory((prev) => ({
        ...prev,
        [activeChatSeller]: [
          ...(prev[activeChatSeller] || []),
          {
            sender: 'seller',
            text: 'Siap kak, masih tersedia! Mau ketemuan COD jam berapa di kantin atau bayar via QRIS?',
          },
        ],
      }));
    }, 600);
  };

  const startDirectCheckout = (product) => {
    requireLogin(() => {
      setCheckoutProduct(product);
      setSelectedPayment(product.payment?.[0] || 'COD Kampus');
      setOrderSuccess(null);
    });
  };

  const confirmOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      product: checkoutProduct,
      payment: selectedPayment,
      location: codLocation,
      date: 'Baru saja',
    };
    setOrders((prev) => [newOrder, ...prev]);
    setUpdateList((prev) => [
      {
        id: Date.now(),
        user: 'Pesanan Berhasil',
        text: `Kamu membeli "${checkoutProduct.name}" (${selectedPayment} - ${codLocation}).`,
        time: 'Baru saja',
        isPromo: false,
      },
      ...prev,
    ]);
    setOrderSuccess(newOrder);
  };

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    if (newItem.payment.includes('QRIS') && !newItem.qrisImage) {
      showToast('⚠️ Silahkan upload QRIS rekening / e-wallet Anda terlebih dahulu');
      return;
    }

    const created = {
      id: Date.now(),
      name: newItem.name,
      price: Number(newItem.price),
      condition: newItem.condition,
      timeAgo: 'Baru saja',
      category: newItem.category,
      description: newItem.description.trim(),
      likes: 0,
      store: currentUser ? currentUser.name : 'fidia_mahasiswa',
      payment: newItem.payment,
      qrisImage: newItem.payment.includes('QRIS') ? newItem.qrisImage : '',
      qrisLabel: newItem.payment.includes('QRIS') ? newItem.qrisLabel.trim() : '',
      image: newItem.image,
    };

    setProductList((prev) => [created, ...prev]);
    setUpdateList((prev) => [
      {
        id: Date.now(),
        user: 'Iklan Tayang',
        text: `Barang "${created.name}" berhasil dipajang di Lapak CWE!`,
        time: 'Baru saja',
        isPromo: true,
      },
      ...prev,
    ]);
    setNewItem(defaultNewItem);
    showToast(`✓ "${created.name}" berhasil ditayangkan!`);
    setActiveNav('Saya');
  };

  // Filter Produk Beranda
  const filteredProducts = productList
    .filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === 'Semua' ||
        selectedCategory === 'Mengikuti' ||
        item.category === selectedCategory;
      return matchSearch && matchCategory;
    })
    .sort((a, b) => (activeTab === 'Terbaru' ? b.id - a.id : 0));

  // Filter Katalog Barang di Tab Profil
  const profileCatalogProducts = productList
    .filter((item) => {
      const matchSearch = item.name.toLowerCase().includes(profileSearch.toLowerCase());
      const matchCondition =
        profileConditionFilter === 'Semua' || item.condition === profileConditionFilter;
      const matchCategory =
        profileCategoryFilter === 'Semua' || item.category === profileCategoryFilter;
      return matchSearch && matchCondition && matchCategory;
    })
    .sort((a, b) => {
      if (profilePriceSort === 'Termurah') return a.price - b.price;
      if (profilePriceSort === 'Termahal') return b.price - a.price;
      return 0;
    });

  const likedProducts = productList.filter((p) => likedIds.includes(p.id));
  const sellableCategories = categories.filter((c) => c.name !== 'Mengikuti');

  // Helper Ambil Info Profil Penjual
  const getSellerInfo = (sellerName) =>
    defaultSellerProfiles[sellerName] || {
      responseStatus: 'Sangat Responsif',
      joinedText: 'Bergabung baru-baru ini',
      verified: true,
      campusInfo: currentUser?.city || 'Mahasiswa Aktif · Kampus CWE',
      bio: `Lapak resmi ${sellerName} di Lapak CWE. Siap COD area kampus & pembayaran QRIS.`,
      avatar:
        currentUser && currentUser.name === sellerName ? currentUser.avatar : '',
    };

  // Data untuk Halaman Profil Penjual yang Sedang Dibuka
  const viewedSellerInfo = selectedSeller ? getSellerInfo(selectedSeller) : null;
  const viewedSellerFollowersCount = selectedSeller
    ? sellerFollowers[selectedSeller] ?? 0
    : 0;
  const viewedSellerProducts = selectedSeller
    ? productList.filter((p) => p.store === selectedSeller)
    : [];
  const viewedSellerReviews = selectedSeller
    ? viewedSellerProducts.flatMap((prod) =>
        (productReviews[prod.id] || []).map((rev) => ({
          ...rev,
          productName: prod.name,
        }))
      )
    : [];
  const viewedSellerAvgRating =
    viewedSellerReviews.length > 0
      ? (
          viewedSellerReviews.reduce((sum, r) => sum + r.rating, 0) /
          viewedSellerReviews.length
        ).toFixed(1)
      : '5.0';

  // Data Pendukung untuk Halaman Detail Produk yang Sedang Dibuka
  const currentSellerProfile = selectedProduct
    ? getSellerInfo(selectedProduct.store)
    : null;

  const currentSellerFollowersCount = selectedProduct
    ? sellerFollowers[selectedProduct.store] ?? 0
    : 0;

  const currentSellerItemsCount = selectedProduct
    ? productList.filter((p) => p.store === selectedProduct.store).length
    : 0;

  const currentProductReviews = selectedProduct
    ? productReviews[selectedProduct.id] || []
    : [];

  const averageProductRating =
    currentProductReviews.length > 0
      ? (
          currentProductReviews.reduce((sum, r) => sum + r.rating, 0) /
          currentProductReviews.length
        ).toFixed(1)
      : '5.0';

  // Rekomendasi Produk Serupa (Prioritas kategori sama, lalu produk lain)
  const similarProducts = selectedProduct
    ? [
        ...productList.filter(
          (p) =>
            p.id !== selectedProduct.id &&
            p.category === selectedProduct.category
        ),
        ...productList.filter(
          (p) =>
            p.id !== selectedProduct.id &&
            p.category !== selectedProduct.category
        ),
      ].slice(0, 4)
    : [];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NOTIFIKASI TOAST */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-center max-w-[92vw]">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================
          HALAMAN 1 (FULL PAGE): KERANJANG BELANJA
          ========================================================= */}
      {isCartOpen ? (
        <div className="min-h-screen bg-gray-50 pb-28">
          <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  setCartOrderSuccess(false);
                }}
                className="flex items-center gap-2 text-gray-800 hover:text-teal-700 font-semibold text-sm cursor-pointer"
              >
                <span className="text-xl leading-none">←</span>
                <span>Kembali</span>
              </button>

              <h1 className="font-bold text-base text-gray-900">
                🛒 Keranjang Saya ({totalCartItems})
              </h1>

              {cart.length > 0 && !cartOrderSuccess ? (
                <button
                  type="button"
                  onClick={() => {
                    setCart([]);
                    showToast('🗑️ Keranjang dikosongkan');
                  }}
                  className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                >
                  Hapus Semua
                </button>
              ) : (
                <div className="w-16" />
              )}
            </div>
          </header>

          <main className="max-w-2xl mx-auto px-4 pt-5">
            {cartOrderSuccess ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-xs mt-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Checkout Keranjang Berhasil!
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mt-1.5 mb-6">
                  Semua pesanan di keranjangmu telah diteruskan ke penjual terkait. Silakan cek statusnya di riwayat pesanan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCartOrderSuccess(false);
                      setSelectedSeller(null);
                      setSelectedProduct(null);
                      setActiveNav('Jelajahi');
                    }}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 py-3 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
                  >
                    Lanjut Belanja
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      setCartOrderSuccess(false);
                      setSelectedSeller(null);
                      setSelectedProduct(null);
                      setActiveNav('Saya');
                      setSettingsSubView('orders');
                      setIsSettingsOpen(true);
                    }}
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-xl text-xs sm:text-sm font-bold cursor-pointer"
                  >
                    Lihat Riwayat
                  </button>
                </div>
              </div>
            ) : cart.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-xs mt-4">
                <p className="text-4xl mb-3">🛒</p>
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Keranjang masih kosong
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mt-1 mb-6">
                  Buka detail produk yang kamu minati lalu tekan tombol <b>+ Keranjang</b> untuk menyimpannya di sini.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setSelectedSeller(null);
                    setSelectedProduct(null);
                    setActiveNav('Jelajahi');
                  }}
                  className="bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl cursor-pointer"
                >
                  Jelajahi Produk
                </button>
              </div>
            ) : (
              <form id="fullpage-cart-form" onSubmit={handleCheckoutCart} className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-gray-900">
                      Daftar Produk ({totalCartItems} barang)
                    </h2>
                    <span className="text-[11px] text-gray-400">
                      Klik produk untuk melihat detail
                    </span>
                  </div>

                  <div className="space-y-3">
                    {cart.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        onClick={() => handleOpenProductFromCart(product)}
                        title="Klik untuk kembali ke halaman detail produk"
                        className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/60 hover:border-teal-500 hover:bg-teal-50/30 transition cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-gray-200 bg-white"
                          />
                          <div className="min-w-0">
                            <span className="inline-block text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded mb-1">
                              {product.store}
                            </span>
                            <h3 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-teal-700 line-clamp-2 leading-snug">
                              {product.name}
                            </h3>
                            <p className="text-xs sm:text-sm font-bold text-teal-700 mt-1">
                              Rp {(product.price * quantity).toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>

                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="flex flex-col items-end gap-2 shrink-0"
                        >
                          <button
                            type="button"
                            onClick={() => handleRemoveFromCart(product.id)}
                            title="Hapus dari keranjang"
                            className="text-gray-400 hover:text-red-600 text-xs font-bold p-1 cursor-pointer"
                          >
                            🗑️
                          </button>
                          <div className="flex items-center gap-1.5 bg-white border border-gray-300 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => handleUpdateCartQty(product.id, -1)}
                              className="w-7 h-7 rounded-md text-gray-700 font-bold text-xs flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-6 text-center">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateCartQty(product.id, 1)}
                              className="w-7 h-7 rounded-md text-gray-700 font-bold text-xs flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-2">
                      Metode Pembayaran
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['COD Kampus', 'QRIS', 'Transfer Bank'].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setSelectedPayment(method)}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                            selectedPayment === method
                              ? 'border-teal-600 bg-teal-50 text-teal-800'
                              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedPayment === 'QRIS' && (
                    <div className="space-y-3 pt-1">
                      {cart.map(({ product, quantity }) => (
                        <QrisBarcodeCard
                          key={product.id}
                          product={product}
                          amount={product.price * quantity}
                        />
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
                      Titik COD / Alamat Kost
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Kantin Utama Kampus / Lobi Gedung"
                      value={codLocation}
                      onChange={(e) => setCodLocation(e.target.value)}
                      className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                    ⚠️ Demi keamanan transaksi, jangan memberikan nomor rekening, kode OTP, atau data pribadi ke sembarang orang.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Total Harga ({totalCartItems} barang)</span>
                    <span>Rp {totalCartPrice.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Biaya Layanan Kampus</span>
                    <span className="text-teal-700 font-semibold">Gratis</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-sm sm:text-base pt-2 border-t border-gray-100">
                    <span>Total Pembayaran</span>
                    <span className="text-red-600">
                      Rp {totalCartPrice.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </form>
            )}
          </main>

          {cart.length > 0 && !cartOrderSuccess && (
            <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
              <div className="max-w-2xl mx-auto px-4 h-18 py-2.5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-gray-500">Total Pembayaran</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900">
                    Rp {totalCartPrice.toLocaleString('id-ID')}
                  </p>
                </div>
                <button
                  type="submit"
                  form="fullpage-cart-form"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-8 py-3 rounded-xl text-xs sm:text-sm shadow-xs cursor-pointer"
                >
                  Checkout Sekarang ({totalCartItems})
                </button>
              </div>
            </div>
          )}
        </div>
      ) : selectedSeller ? (
        /* =========================================================
           HALAMAN 2 (FULL PAGE): PROFIL PENJUAL & ETALASE LAPAK
           ========================================================= */
        <div className="min-h-screen bg-gray-50 pb-16">
          {/* Header Navigasi Atas */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedSeller(null)}
                className="flex items-center gap-2 text-gray-800 hover:text-teal-700 font-semibold text-sm cursor-pointer"
              >
                <span className="text-xl leading-none">←</span>
                <span>Kembali</span>
              </button>

              <h1 className="font-bold text-sm sm:text-base text-gray-900 truncate max-w-[50vw]">
                Profil Penjual
              </h1>

              <button
                type="button"
                onClick={() => handleShareSeller(selectedSeller)}
                title="Bagikan profil penjual"
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
              >
                🔗
              </button>
            </div>
          </header>

          <main className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
            {/* Kartu Identitas Penjual */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5 sm:gap-4">
                {viewedSellerInfo?.avatar ? (
                  <img
                    src={viewedSellerInfo.avatar}
                    alt={selectedSeller}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gray-200 shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-teal-600 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shrink-0">
                    {selectedSeller.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                      {selectedSeller}
                    </h2>
                    {viewedSellerInfo?.verified && (
                      <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-800 border border-teal-200 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                        ✓ Terverifikasi Kampus
                      </span>
                    )}
                  </div>

                  {/* Rating & Status Responsif */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded-md">
                      ★ {viewedSellerAvgRating}
                    </span>
                    <span className="text-teal-700 font-semibold">
                      ⚡ {viewedSellerInfo?.responseStatus}
                    </span>
                  </div>

                  {/* Jumlah Pengikut (di bawah Sangat Responsif, di atas Bergabung pada...) */}
                  <div className="flex items-center gap-1 text-xs pt-0.5">
                    <span className="font-bold text-gray-900">
                      {viewedSellerFollowersCount.toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-600 font-medium">Pengikut</span>
                  </div>

                  {/* Tanggal Bergabung & Info Kampus */}
                  <p className="text-xs text-gray-500">
                    {viewedSellerInfo?.joinedText} · {viewedSellerInfo?.campusInfo}
                  </p>
                </div>
              </div>

              {viewedSellerInfo?.bio && (
                <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 rounded-xl p-3 border border-gray-100 leading-relaxed">
                  {viewedSellerInfo.bio}
                </p>
              )}

              {/* Statistik Singkat Penjual */}
              <div className="grid grid-cols-3 divide-x divide-gray-200 border border-gray-200 rounded-xl py-2.5 text-center bg-gray-50/50">
                <div>
                  <p className="text-sm sm:text-base font-bold text-gray-900">
                    {viewedSellerProducts.length}
                  </p>
                  <p className="text-[11px] text-gray-500">Barang Dijual</p>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-gray-900">
                    {viewedSellerAvgRating} ★
                  </p>
                  <p className="text-[11px] text-gray-500">Rating Toko</p>
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-gray-900">
                    {viewedSellerReviews.length}
                  </p>
                  <p className="text-[11px] text-gray-500">Ulasan Pembeli</p>
                </div>
              </div>

              {/* Tombol Ikuti & Chat Penjual */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => toggleFollowSeller(selectedSeller)}
                  className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                    followedSellers.includes(selectedSeller)
                      ? 'border-teal-600 bg-teal-50 text-teal-800'
                      : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  {followedSellers.includes(selectedSeller)
                    ? '✓ Mengikuti Penjual'
                    : '+ Ikuti Penjual'}
                </button>
                <button
                  type="button"
                  onClick={() => openChatWithSeller(selectedSeller)}
                  className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold bg-teal-600 hover:bg-teal-700 text-white transition cursor-pointer"
                >
                  💬 Chat Penjual
                </button>
              </div>
            </div>

            {/* Tab Etalase Produk vs Ulasan Penjual */}
            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex gap-6 border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setSellerPageTab('produk')}
                  className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                    sellerPageTab === 'produk'
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Etalase Barang ({viewedSellerProducts.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSellerPageTab('ulasan')}
                  className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
                    sellerPageTab === 'ulasan'
                      ? 'border-teal-600 text-teal-700'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  Ulasan Pembeli ({viewedSellerReviews.length})
                </button>
              </div>

              {sellerPageTab === 'produk' ? (
                viewedSellerProducts.length === 0 ? (
                  <p className="text-xs text-gray-500 py-8 text-center">
                    Penjual ini belum memiliki barang yang aktif dijual.
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-3.5">
                    {viewedSellerProducts.map((item) => (
                      <ProductCard
                        key={item.id}
                        product={item}
                        isLiked={likedIds.includes(item.id)}
                        onToggleLike={toggleLike}
                        onSelectProduct={handleSelectProductDetail}
                      />
                    ))}
                  </div>
                )
              ) : viewedSellerReviews.length === 0 ? (
                <p className="text-xs text-gray-500 py-8 text-center">
                  Belum ada ulasan pembeli untuk penjual ini.
                </p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {viewedSellerReviews.map((rev) => (
                    <div key={rev.id} className="py-3.5 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {rev.user.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-gray-900">
                              {rev.user}
                            </p>
                            <p className="text-[11px] text-teal-700 font-medium">
                              Produk: {rev.productName} · {rev.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <span>{'★'.repeat(rev.rating)}</span>
                          <span className="text-gray-700 ml-0.5">
                            {rev.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-10">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      ) : selectedProduct ? (
        /* =========================================================
           HALAMAN 3 (FULL PAGE): DETAIL PRODUK + PROFIL PENJUAL + ULASAN + REKOMENDASI
           ========================================================= */
        <div className="min-h-screen bg-white pb-28">
          {/* Header Navigasi Atas */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200">
            <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-2 text-gray-800 hover:text-teal-700 font-semibold text-sm cursor-pointer"
              >
                <span className="text-xl leading-none">←</span>
                <span>Kembali</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShareProduct(selectedProduct)}
                  title="Bagikan produk"
                  className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
                >
                  🔗
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCartOrderSuccess(false);
                    setIsCartOpen(true);
                  }}
                  title="Keranjang"
                  className="relative w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700 cursor-pointer"
                >
                  🛒
                  {totalCartItems > 0 && (
                    <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>

          <div className="max-w-2xl mx-auto">
            {/* Foto Produk Utama */}
            <div className="w-full bg-gray-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full max-h-[420px] object-cover"
              />
            </div>

            <div className="px-4 sm:px-5 pt-4 pb-8 space-y-6">
              {/* 1. Rincian Utama Produk */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-medium text-gray-900 leading-snug">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1.5">
                    Rp {selectedProduct.price.toLocaleString('id-ID')}
                  </p>
                </div>

                <div className="space-y-3 pt-1 text-sm text-gray-800">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-gray-500">🕒</span>
                    <p>
                      {selectedProduct.timeAgo || 'Baru saja'} oleh{' '}
                      <button
                        type="button"
                        onClick={() => handleOpenSellerProfile(selectedProduct.store)}
                        className="font-semibold text-teal-700 hover:underline cursor-pointer"
                      >
                        {selectedProduct.store}
                      </button>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleLike(selectedProduct.id)}
                    className="flex items-center gap-3 text-left cursor-pointer group"
                  >
                    <span className="w-5 text-center text-gray-600">
                      {likedIds.includes(selectedProduct.id) ? '❤️' : '🤍'}
                    </span>
                    <span className="text-teal-700 font-medium group-hover:underline">
                      {(selectedProduct.likes ?? 0) +
                        (likedIds.includes(selectedProduct.id) ? 1 : 0)}{' '}
                      suka
                    </span>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-gray-500">📦</span>
                    <p>{selectedProduct.condition}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-5 text-center text-gray-500">☰</span>
                    <p>
                      Di{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory(selectedProduct.category);
                          setSelectedProduct(null);
                          setActiveNav('Jelajahi');
                        }}
                        className="text-teal-700 font-medium hover:underline cursor-pointer"
                      >
                        {selectedProduct.category}
                      </button>
                    </p>
                  </div>

                  <div className="flex items-start gap-3 pt-1">
                    <span className="w-5 text-center text-gray-500 font-semibold text-xs mt-0.5">
                      A≡
                    </span>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                        Deskripsi Barang
                      </p>
                      <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">
                        {selectedProduct.description ||
                          `Kondisi ${selectedProduct.condition.toLowerCase()}, dijual oleh ${selectedProduct.store}. Siap transaksi aman di lingkungan kampus.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Metode Pembayaran & Area Transaksi */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1.5">Metode Pembayaran</p>
                    <div className="flex flex-wrap gap-2">
                      {(selectedProduct.payment || ['COD Kampus', 'QRIS']).map((method) => (
                        <span
                          key={method}
                          className="bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold px-3 py-1 rounded-lg"
                        >
                          ✓ {method === 'QRIS' ? 'QRIS (Barcode Tersedia)' : method}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Area Transaksi</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">
                      Kampus CWE · COD Kantin / Gedung Utama
                    </p>
                  </div>
                </div>
              </div>

              {/* =====================================================
                  2. PROFIL PENJUAL (DAPAT DIKLIK UNTUK BUKA LAPAK PENJUAL)
                  ===================================================== */}
              <section className="border-t border-gray-200 pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Profil Penjual
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleOpenSellerProfile(selectedProduct.store)}
                    className="text-xs font-semibold text-teal-700 hover:underline cursor-pointer"
                  >
                    Lihat {currentSellerItemsCount} barang di lapak ›
                  </button>
                </div>

                <div
                  onClick={() => handleOpenSellerProfile(selectedProduct.store)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpenSellerProfile(selectedProduct.store);
                    }
                  }}
                  title={`Klik untuk membuka profil penjual ${selectedProduct.store}`}
                  className="bg-gray-50/70 hover:bg-teal-50/40 border border-gray-200 hover:border-teal-400 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition cursor-pointer group"
                >
                  <div className="flex items-start gap-3.5">
                    {currentSellerProfile?.avatar ? (
                      <img
                        src={currentSellerProfile.avatar}
                        alt={selectedProduct.store}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-600 text-white font-bold text-xl flex items-center justify-center shrink-0">
                        {selectedProduct.store.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm sm:text-base font-bold text-teal-700 group-hover:underline">
                          {selectedProduct.store}
                        </h3>
                        <span className="text-xs text-teal-600 font-bold">›</span>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 bg-teal-100/80 text-teal-800 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                          ⚡ {currentSellerProfile?.responseStatus || 'Sangat Responsif'}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                          👥 {currentSellerFollowersCount.toLocaleString('id-ID')} Pengikut
                        </span>
                      </div>

                      <p className="text-xs text-gray-600">
                        {currentSellerProfile?.joinedText || 'Bergabung pada 1 tahun lalu'} ·{' '}
                        <span className="text-gray-500">
                          {currentSellerProfile?.campusInfo || 'Kampus CWE'}
                        </span>
                      </p>

                      {currentSellerProfile?.verified && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-700 pt-0.5">
                          <span>Sudah diverifikasi</span>
                          <span
                            title="Email Kampus Terverifikasi"
                            className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center"
                          >
                            ✉️
                          </span>
                          <span
                            title="Identitas Mahasiswa Terverifikasi"
                            className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] flex items-center justify-center"
                          >
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tombol Aksi pada Profil Penjual */}
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex sm:flex-col gap-2 shrink-0"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFollowSeller(selectedProduct.store)}
                      className={`flex-1 sm:w-28 py-2 px-3 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        followedSellers.includes(selectedProduct.store)
                          ? 'border-teal-600 bg-teal-50 text-teal-800'
                          : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      {followedSellers.includes(selectedProduct.store)
                        ? '✓ Mengikuti'
                        : '+ Ikuti'}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openChatWithSeller(selectedProduct.store, selectedProduct.name)
                      }
                      className="flex-1 sm:w-28 py-2 px-3 rounded-xl text-xs font-semibold border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 cursor-pointer"
                    >
                      Tanya Penjual
                    </button>
                  </div>
                </div>
              </section>

              {/* =====================================================
                  3. ULASAN BARANG & REVIEW BINTANG
                  ===================================================== */}
              <section className="border-t border-gray-200 pt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Ulasan
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsReviewFormOpen((prev) => !prev)}
                    className="text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-lg cursor-pointer"
                  >
                    {isReviewFormOpen ? 'Tutup Form' : '+ Tulis Ulasan'}
                  </button>
                </div>

                {/* Ringkasan Rating Bintang & Lencana Apresiasi */}
                <div className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div>
                      <p className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-none">
                        {averageProductRating}
                      </p>
                      <div className="flex items-center gap-0.5 text-teal-600 text-sm mt-1">
                        {'★★★★★'}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {currentProductReviews.length} Peringkat
                      </p>
                    </div>
                  </div>

                  {/* Ikon Apresiasi Pembeli */}
                  <div className="grid grid-cols-3 gap-2.5 text-center">
                    <div className="bg-teal-50/70 border border-teal-100 rounded-xl px-2.5 py-2">
                      <span className="text-lg block">💡</span>
                      <span className="text-[10px] font-semibold text-gray-700 block mt-0.5">
                        Ramah
                      </span>
                      <span className="text-xs font-bold text-teal-700">
                        {currentProductReviews.length}
                      </span>
                    </div>
                    <div className="bg-amber-50/70 border border-amber-100 rounded-xl px-2.5 py-2">
                      <span className="text-lg block">🔍</span>
                      <span className="text-[10px] font-semibold text-gray-700 block mt-0.5">
                        Sesuai Foto
                      </span>
                      <span className="text-xs font-bold text-amber-700">
                        {currentProductReviews.length}
                      </span>
                    </div>
                    <div className="bg-rose-50/70 border border-rose-100 rounded-xl px-2.5 py-2">
                      <span className="text-lg block">🤝</span>
                      <span className="text-[10px] font-semibold text-gray-700 block mt-0.5">
                        Tepat Waktu
                      </span>
                      <span className="text-xs font-bold text-rose-700">
                        {Math.max(1, currentProductReviews.length - 1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Tambah Ulasan & Rating Bintang */}
                {isReviewFormOpen && (
                  <form
                    onSubmit={handleSubmitProductReview}
                    className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Pilih Rating Bintang
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewReviewRating(star)}
                            className={`text-2xl leading-none cursor-pointer transition-transform hover:scale-110 ${
                              star <= newReviewRating
                                ? 'text-amber-400'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="text-xs font-bold text-gray-700 ml-2">
                          ({newReviewRating}.0 / 5.0)
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Komentar Ulasan Barang
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Bagikan pengalamanmu tentang kondisi barang & pelayanan penjual..."
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl px-3 py-2 text-xs sm:text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                    >
                      Kirim Ulasan
                    </button>
                  </form>
                )}

                {/* Daftar Ulasan Pembeli */}
                {currentProductReviews.length === 0 ? (
                  <p className="text-xs text-gray-500 py-4 text-center border border-dashed border-gray-200 rounded-xl">
                    Belum ada ulasan tertulis untuk produk ini. Jadilah yang pertama memberi ulasan!
                  </p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {currentProductReviews.map((rev) => (
                      <div key={rev.id} className="py-3.5 space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gray-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {rev.user.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-xs sm:text-sm font-bold text-gray-900">
                                {rev.user}
                              </p>
                              <p className="text-[11px] text-gray-400">{rev.time}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                            <span>{'★'.repeat(rev.rating)}</span>
                            <span className="text-gray-700 ml-0.5">
                              {rev.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pl-10">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* =====================================================
                  4. REKOMENDASI PRODUK YANG SAMA / SERUPA
                  ===================================================== */}
              <section className="border-t border-gray-200 pt-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Rekomendasi Produk Serupa
                    </h2>
                    <p className="text-xs text-gray-500">
                      Pilihan lain di kategori {selectedProduct.category} & sekitarnya
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(selectedProduct.category);
                      setSelectedProduct(null);
                      setActiveNav('Jelajahi');
                    }}
                    className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                  >
                    Lihat Semua ›
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5">
                  {similarProducts.map((recItem) => (
                    <ProductCard
                      key={recItem.id}
                      product={recItem}
                      isLiked={likedIds.includes(recItem.id)}
                      onToggleLike={toggleLike}
                      onSelectProduct={handleSelectProductDetail}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Bottom Action Bar Tetap (Like, Chat, + Keranjang, Beli) */}
          <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
            <div className="max-w-2xl mx-auto px-3 sm:px-4 h-16 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => toggleLike(selectedProduct.id)}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-800 shrink-0 cursor-pointer"
              >
                <span>{likedIds.includes(selectedProduct.id) ? '❤️' : '🤍'}</span>
                <span>
                  {(selectedProduct.likes ?? 0) +
                    (likedIds.includes(selectedProduct.id) ? 1 : 0)}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  openChatWithSeller(selectedProduct.store, selectedProduct.name)
                }
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-900 font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                Chat
              </button>

              <button
                type="button"
                onClick={() => handleAddToCart(selectedProduct)}
                className="flex-1 border border-teal-600 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm cursor-pointer"
              >
                + Keranjang
              </button>

              <button
                type="button"
                onClick={() => startDirectCheckout(selectedProduct)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm shadow-xs cursor-pointer"
              >
                Beli
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* =========================================================
           TAMPILAN UTAMA APLIKASI (JELAJAHI, UNTUK ANDA, JUAL, DLL.)
           ========================================================= */
        <div className="pb-24">
          <Navbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            wishlistCount={likedIds.length}
            cartCount={totalCartItems}
            unreadChatCount={Object.keys(chatHistory).length}
            currentUser={currentUser}
            onOpenAuth={() => (currentUser ? setActiveNav('Saya') : setIsAuthOpen(true))}
            onOpenMenu={() => setIsMenuOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenCart={() => {
              setCartOrderSuccess(false);
              setIsCartOpen(true);
            }}
            onOpenChat={() => requireLogin(() => setIsChatOpen(true))}
            onOpenSell={triggerSellFlow}
          />

          <main className="max-w-5xl mx-auto px-4 pt-3">
            {/* TAMPILAN 1: JELAJAHI */}
            {activeNav === 'Jelajahi' && (
              <>
                <div className="rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-rose-500 text-white p-5 mb-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="max-w-md">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="inline-block bg-white/20 text-[11px] font-semibold px-2 py-0.5 rounded">
                        Lapak CWE Campus
                      </span>
                      <button
                        onClick={openRulesInfoOnly}
                        className="inline-flex items-center gap-1 bg-amber-300 text-gray-900 hover:bg-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded cursor-pointer"
                      >
                        ⚠️ Aturan & Barang Terlarang
                      </button>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold leading-snug">
                      Saatnya lapak kamu lebih kelihatan
                    </h2>
                    <p className="text-xs sm:text-sm text-red-100 mt-1">
                      Jual barang bekas kuliah atau usaha mahasiswa langsung ke teman sekampus.
                    </p>
                  </div>
                  <button
                    onClick={triggerSellFlow}
                    className="bg-white hover:bg-gray-100 text-red-600 font-bold text-xs px-4 py-2.5 rounded-lg shadow shrink-0 self-start sm:self-center cursor-pointer"
                  >
                    + Pasang Iklan
                  </button>
                </div>

                <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-3 mb-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() =>
                        setSelectedCategory(selectedCategory === cat.name ? 'Semua' : cat.name)
                      }
                      className="flex flex-col items-center gap-1.5 min-w-[74px] shrink-0 cursor-pointer"
                    >
                      <div
                        className={`w-14 h-14 rounded-full ${cat.bg} flex items-center justify-center text-2xl transition-transform ${
                          selectedCategory === cat.name ? 'ring-2 ring-teal-600 scale-105' : ''
                        }`}
                      >
                        {cat.icon}
                      </div>
                      <span
                        className={`text-xs text-center leading-tight ${
                          selectedCategory === cat.name
                            ? 'font-bold text-teal-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {cat.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between border-b border-gray-200 mb-4 gap-4">
                  <div className="flex gap-6 overflow-x-auto">
                    {['Pilihan teratas', 'Di dekat kampus', 'Mengikuti', 'Terbaru'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition cursor-pointer ${
                          activeTab === tab
                            ? 'border-teal-600 text-teal-700'
                            : 'border-transparent text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  {selectedCategory !== 'Semua' && (
                    <button
                      onClick={() => setSelectedCategory('Semua')}
                      className="text-xs text-red-600 font-semibold whitespace-nowrap pb-2 cursor-pointer"
                    >
                      Reset ({selectedCategory}) ✕
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 text-sm">
                    Belum ada barang di kategori <b>{selectedCategory}</b>.{' '}
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('Semua');
                      }}
                      className="text-teal-600 font-semibold underline cursor-pointer"
                    >
                      Tampilkan semua
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3.5 gap-y-6">
                    {filteredProducts.map((item) => (
                      <ProductCard
                        key={item.id}
                        product={item}
                        isLiked={likedIds.includes(item.id)}
                        onToggleLike={toggleLike}
                        onSelectProduct={handleSelectProductDetail}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* TAMPILAN 2: UNTUK ANDA */}
            {activeNav === 'Untuk Anda' && (
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-3">Untuk Anda</h1>
                <div className="flex gap-2 overflow-x-auto pb-4">
                  {['Semua', ...sellableCategories.map((c) => c.name)].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setSelectedCategory(chip)}
                      className={`relative px-4 py-1.5 rounded-full text-xs font-medium border whitespace-nowrap cursor-pointer ${
                        selectedCategory === chip
                          ? 'border-teal-600 bg-teal-50 text-teal-800 font-bold'
                          : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-3.5 gap-y-6">
                  {filteredProducts.map((item) => (
                    <ProductCard
                      key={item.id}
                      product={item}
                      isLiked={likedIds.includes(item.id)}
                      onToggleLike={toggleLike}
                      onSelectProduct={handleSelectProductDetail}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* TAMPILAN FULL PAGE: JUAL / UPLOAD PRODUK JUALAN */}
            {activeNav === 'Jual' && (
              <div className="max-w-2xl mx-auto py-2">
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCancelConfirmOpen(true)}
                      className="w-9 h-9 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center justify-center text-gray-700 font-bold cursor-pointer"
                      aria-label="Kembali"
                    >
                      ←
                    </button>
                    <div>
                      <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                        + Upload Produk Jualan
                      </h1>
                      <p className="text-xs text-gray-500">
                        Lengkapi foto, deskripsi, dan metode pembayaran untuk lapakmu
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {draftList.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsDraftModalOpen(true)}
                        className="text-[11px] font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        📄 Draft ({draftList.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={openRulesInfoOnly}
                      className="text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-lg cursor-pointer"
                    >
                      ⚠️ Cek Aturan
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={handleCreateListing}
                  className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-2">
                      Foto Produk
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3.5 rounded-xl border border-dashed border-gray-300 bg-gray-50">
                      <img
                        src={newItem.image}
                        alt="Preview produk"
                        className="w-24 h-24 rounded-xl object-cover border border-gray-200 shrink-0 bg-white"
                      />
                      <div className="space-y-1.5">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageFileChange}
                          className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer"
                        />
                        <p className="text-[11px] text-gray-500">
                          Gunakan foto asli barang agar pembeli lebih yakin (JPG, PNG, WEBP).
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5">
                      Nama Barang <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Modul Praktikum Basis Data Semester 3"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Harga (Rp) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        min="0"
                        required
                        placeholder="25000"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1.5">
                        Kategori Barang
                      </label>
                      <select
                        value={newItem.category}
                        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        className="w-full bg-white text-gray-900 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-600 cursor-pointer"
                      >
                        {sellableCategories.map((cat) => (
                          <option key={cat.name} value={cat.name}>
                            {cat.icon} {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-800 mb-1.5">
                      Kondisi Barang
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {['Barang baru', 'Seperti baru', 'Tidak terlalu sering dipakai'].map((cond) => (
                        <button
                          type="button"
                          key={cond}
                          onClick={() => setNewItem({ ...newItem, condition: cond })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-semibold border text-center transition cursor-pointer ${
                            newItem.condition === cond
                              ? 'border-teal-600 bg-teal-50 text-teal-800'
                              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-gray-800">
                        Deskripsi Barang <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-gray-400">
                        {newItem.description.length}/500 karakter
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      maxLength={500}
                      required
                      placeholder="Tuliskan spesifikasi barang, kelengkapan, tanggal kadaluarsa/kondisi minus (jika ada), serta lokasi COD kampus..."
                      value={newItem.description}
                      onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                      className="w-full bg-white text-gray-900 placeholder-gray-400 border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm leading-relaxed focus:outline-none focus:border-teal-600"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-1">
                        Metode Pembayaran yang Diterima
                      </label>
                      <p className="text-[11px] text-gray-500 mb-2.5">
                        Pilih satu atau lebih metode pembayaran untuk pembeli:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {paymentOptions.map((opt) => {
                          const isSelected = newItem.payment.includes(opt.id);
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => toggleNewItemPayment(opt.id)}
                              className={`p-3 rounded-xl border text-left transition flex items-start gap-2.5 cursor-pointer ${
                                isSelected
                                  ? 'border-teal-600 bg-teal-50/70'
                                  : 'border-gray-200 bg-white hover:bg-gray-50'
                              }`}
                            >
                              <span
                                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                  isSelected
                                    ? 'bg-teal-600 text-white'
                                    : 'border border-gray-300 bg-white text-transparent'
                                }`}
                              >
                                ✓
                              </span>
                              <div>
                                <p
                                  className={`text-xs font-bold ${
                                    isSelected ? 'text-teal-900' : 'text-gray-800'
                                  }`}
                                >
                                  {opt.label}
                                </p>
                                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">
                                  {opt.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {newItem.payment.includes('QRIS') && (
                      <div className="p-4 rounded-xl border-2 border-dashed border-teal-400 bg-teal-50/60 space-y-3">
                        <div className="flex items-start gap-2.5">
                          <span className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center text-base shrink-0">
                            📱
                          </span>
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-teal-950">
                              Silahkan upload QRIS rekening / e-wallet Anda{' '}
                              <span className="text-red-600">*</span>
                            </h3>
                            <p className="text-[11px] text-teal-800 mt-0.5 leading-relaxed">
                              Unggah foto kode QR / barcode dari DANA, GoPay, OVO, ShopeePay, atau Mobile Banking Anda agar langsung muncul saat pembeli memilih pembayaran QRIS.
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 bg-white p-3 rounded-xl border border-teal-200">
                          {newItem.qrisImage ? (
                            <div className="relative shrink-0 self-center sm:self-auto">
                              <img
                                src={newItem.qrisImage}
                                alt="Preview Barcode QRIS"
                                className="w-24 h-24 rounded-lg object-contain border border-gray-200 bg-white p-1"
                              />
                              <button
                                type="button"
                                onClick={() => setNewItem({ ...newItem, qrisImage: '' })}
                                title="Hapus barcode QRIS"
                                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center text-gray-400 shrink-0 self-center sm:self-auto">
                              <span className="text-2xl">📷</span>
                              <span className="text-[10px] font-semibold mt-1">Belum ada QR</span>
                            </div>
                          )}

                          <div className="flex-1 space-y-2.5">
                            <div>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleQrisFileChange}
                                className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-600 file:text-white hover:file:bg-teal-700 cursor-pointer"
                              />
                            </div>
                            <input
                              type="text"
                              placeholder="Nama E-Wallet / Rekening (contoh: DANA / BCA a.n. Fidia)"
                              value={newItem.qrisLabel}
                              onChange={(e) =>
                                setNewItem({ ...newItem, qrisLabel: e.target.value })
                              }
                              className="w-full bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600 focus:bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row gap-3 pt-3 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsCancelConfirmOpen(true)}
                      className="sm:w-1/3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-sm cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="sm:w-2/3 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-sm shadow-sm cursor-pointer"
                    >
                      Tayangkan Produk Sekarang
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAMPILAN 3: PEMBARUAN */}
            {activeNav === 'Pembaruan' && (
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-3">Pembaruan</h1>
                <div className="flex gap-2 overflow-x-auto pb-4">
                  {['Semua', 'Untuk tindakan', 'Aktivitas', 'Promo'].map((pill) => (
                    <button
                      key={pill}
                      onClick={() => setNotifFilter(pill)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium border cursor-pointer ${
                        notifFilter === pill
                          ? 'border-teal-600 bg-teal-50 text-teal-800'
                          : 'border-gray-300 text-gray-600'
                      }`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                <div className="divide-y divide-gray-100">
                  {updateList
                    .filter((n) => (notifFilter === 'Promo' ? n.isPromo : true))
                    .map((notif) => (
                      <div key={notif.id} className="py-3.5 flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                            notif.isPromo ? 'bg-red-600' : 'bg-gray-700'
                          }`}
                        >
                          {notif.user.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm">
                          <p className="text-gray-800 leading-snug">
                            {!notif.isPromo && <span className="font-bold">{notif.user} </span>}
                            {notif.text}
                          </p>
                          <span className="text-xs text-gray-400 mt-1 block">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* TAMPILAN 4: SAYA / TAB PROFIL */}
            {activeNav === 'Saya' && (
              <div>
                {!currentUser ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center my-4">
                    <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-2xl mx-auto mb-3">
                      👤
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">Masuk ke Akun Lapak CWE</h2>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1 mb-5">
                      Silakan login atau daftar akun terlebih dahulu untuk melihat halaman profil dan katalog barang jualanmu.
                    </p>
                    <button
                      onClick={() => setIsAuthOpen(true)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl cursor-pointer"
                    >
                      Login / Daftar Akun
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 pt-1">
                    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                          {currentUser.avatar ? (
                            <img
                              src={currentUser.avatar}
                              alt={currentUser.name}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-gray-200 shrink-0"
                            />
                          ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-600 text-white font-bold text-2xl sm:text-3xl flex items-center justify-center shrink-0">
                              {currentUser.name.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <h1 className="text-base sm:text-xl font-bold text-gray-900 truncate">
                              {currentUser.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1">
                              <span className="text-amber-500 text-sm">★★★★★</span>
                              <span className="text-xs font-semibold text-gray-700">
                                5.0 (12 Review)
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1 truncate">
                              {currentUser.city || 'Kampus CWE'} · {orders.length} Pesanan
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsAccountDetailOpen(true)}
                          className="text-xs font-semibold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg border border-teal-200 shrink-0 cursor-pointer"
                        >
                          Detail akun ›
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={openEditProfile}
                          className="py-2 px-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-xs text-center transition cursor-pointer"
                        >
                          Edit Profil
                        </button>
                        <button
                          onClick={handleShareProfile}
                          className="py-2 px-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-xs text-center transition cursor-pointer"
                        >
                          Share Profil
                        </button>
                        <button
                          onClick={() => {
                            setSettingsSubView('menu');
                            setIsSettingsOpen(true);
                          }}
                          className="py-2 px-3 rounded-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold text-xs text-center truncate transition cursor-pointer"
                        >
                          Setting / Pengaturan
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 space-y-3">
                      <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2">
                        <svg
                          className="w-4 h-4 text-gray-400 mr-2 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                          />
                        </svg>
                        <input
                          type="text"
                          value={profileSearch}
                          onChange={(e) => setProfileSearch(e.target.value)}
                          placeholder="Cari barang yg pernah dijual..."
                          className="w-full bg-white text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                        />
                        {profileSearch && (
                          <button
                            onClick={() => setProfileSearch('')}
                            className="text-gray-400 hover:text-gray-700 text-xs font-bold px-1 cursor-pointer"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-3 divide-x divide-gray-300 bg-white border border-gray-200 rounded-xl py-1.5 text-xs">
                        <div className="px-2 flex items-center justify-center">
                          <select
                            aria-label="Filter kondisi"
                            value={profileConditionFilter}
                            onChange={(e) => setProfileConditionFilter(e.target.value)}
                            className="w-full bg-white text-gray-800 font-semibold text-xs text-center focus:outline-none cursor-pointer"
                          >
                            <option value="Semua">Filter: Semua</option>
                            <option value="Barang baru">Barang baru</option>
                            <option value="Seperti baru">Seperti baru</option>
                            <option value="Tidak terlalu sering dipakai">Bekas Terawat</option>
                          </select>
                        </div>

                        <div className="px-2 flex items-center justify-center">
                          <select
                            aria-label="Filter kategori"
                            value={profileCategoryFilter}
                            onChange={(e) => setProfileCategoryFilter(e.target.value)}
                            className="w-full bg-white text-gray-800 font-semibold text-xs text-center focus:outline-none cursor-pointer"
                          >
                            <option value="Semua">Kategori: Semua</option>
                            {sellableCategories.map((cat) => (
                              <option key={cat.name} value={cat.name}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="px-2 flex items-center justify-center">
                          <select
                            aria-label="Urutkan harga"
                            value={profilePriceSort}
                            onChange={(e) => setProfilePriceSort(e.target.value)}
                            className="w-full bg-white text-gray-800 font-semibold text-xs text-center focus:outline-none cursor-pointer"
                          >
                            <option value="Default">Harga: Default</option>
                            <option value="Termurah">Harga Termurah</option>
                            <option value="Termahal">Harga Termahal</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <h2 className="text-sm font-bold text-gray-900">
                          Katalog Barang ({profileCatalogProducts.length})
                        </h2>
                        <div className="flex items-center gap-3">
                          {draftList.length > 0 && (
                            <button
                              onClick={() => setIsDraftModalOpen(true)}
                              className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
                            >
                              📄 Draft ({draftList.length})
                            </button>
                          )}
                          <button
                            onClick={triggerSellFlow}
                            className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                          >
                            + Tambah ke Katalog
                          </button>
                        </div>
                      </div>

                      {profileCatalogProducts.length === 0 ? (
                        <div className="border border-dashed border-gray-300 rounded-2xl py-10 text-center text-xs text-gray-500">
                          Tidak ada barang yang cocok dengan filter pencarianmu.{' '}
                          <button
                            onClick={() => {
                              setProfileSearch('');
                              setProfileConditionFilter('Semua');
                              setProfileCategoryFilter('Semua');
                              setProfilePriceSort('Default');
                            }}
                            className="text-teal-700 font-bold underline cursor-pointer"
                          >
                            Reset Filter
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                          {profileCatalogProducts.map((item) => (
                            <ProductCard
                              key={item.id}
                              product={item}
                              isLiked={likedIds.includes(item.id)}
                              onToggleLike={toggleLike}
                              onSelectProduct={handleSelectProductDetail}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>

          {/* NAVIGASI BAWAH (BOTTOM BAR) */}
          <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
            <div className="max-w-5xl mx-auto px-2 h-16 flex items-center justify-around">
              <button
                onClick={() => setActiveNav('Jelajahi')}
                className={`flex flex-col items-center gap-0.5 text-[11px] cursor-pointer ${
                  activeNav === 'Jelajahi' ? 'text-gray-900 font-bold' : 'text-gray-500'
                }`}
              >
                <span className="text-lg">🔍</span>
                <span>Jelajahi</span>
              </button>

              <button
                onClick={() => setActiveNav('Untuk Anda')}
                className={`flex flex-col items-center gap-0.5 text-[11px] cursor-pointer ${
                  activeNav === 'Untuk Anda' ? 'text-gray-900 font-bold' : 'text-gray-500'
                }`}
              >
                <span className="text-lg">🛍️</span>
                <span>Untuk Anda</span>
              </button>

              <button
                onClick={triggerSellFlow}
                className={`flex flex-col items-center gap-0.5 text-[11px] cursor-pointer ${
                  activeNav === 'Jual' ? 'text-red-600 font-bold' : 'text-gray-700 font-medium'
                }`}
              >
                <span className="w-8 h-7 bg-red-600 text-white rounded-lg flex items-center justify-center text-lg font-bold shadow-sm">
                  +
                </span>
                <span>Jual</span>
              </button>

              <button
                onClick={() => setActiveNav('Pembaruan')}
                className={`relative flex flex-col items-center gap-0.5 text-[11px] cursor-pointer ${
                  activeNav === 'Pembaruan' ? 'text-gray-900 font-bold' : 'text-gray-500'
                }`}
              >
                <span className="text-lg">🔔</span>
                <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Pembaruan</span>
              </button>

              <button
                onClick={() => setActiveNav('Saya')}
                className={`flex flex-col items-center gap-0.5 text-[11px] cursor-pointer ${
                  activeNav === 'Saya' ? 'text-gray-900 font-bold' : 'text-gray-500'
                }`}
              >
                <span className="text-lg">👤</span>
                <span>Saya</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* =========================================================
          POP-UP & MODAL PENDUKUNG (GLOBAL)
          ========================================================= */}

      {/* POP-UP KONFIRMASI BATAL: SIMPAN DRAFT ATAU JANGAN SIMPAN */}
      {isCancelConfirmOpen && (
        <div
          onClick={() => setIsCancelConfirmOpen(false)}
          className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-gray-100 space-y-4"
          >
            <div className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0">
                📝
              </span>
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Simpan sebagai Draft?
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Produk belum ditayangkan. Pilih <b>Simpan Draft</b> untuk melanjutkannya nanti, atau <b>Jangan Simpan</b> untuk menghapus isian ini.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                📝 Simpan Draft
              </button>
              <button
                type="button"
                onClick={handleDiscardDraft}
                className="w-full border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold py-2.5 rounded-xl text-xs sm:text-sm transition cursor-pointer"
              >
                🗑️ Jangan Simpan
              </button>
              <button
                type="button"
                onClick={() => setIsCancelConfirmOpen(false)}
                className="w-full text-gray-500 hover:text-gray-800 font-semibold py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Lanjut Mengisi Form
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DAFTAR DRAFT TERSIMPAN */}
      {isDraftModalOpen && (
        <div
          onClick={() => setIsDraftModalOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-5 shadow-xl space-y-3"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base">📄 Draft Produk ({draftList.length})</h3>
              <button
                type="button"
                onClick={() => setIsDraftModalOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {draftList.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">
                Belum ada draft produk yang tersimpan.
              </p>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {draftList.map((draft) => (
                  <div
                    key={draft.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/60"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={draft.image}
                        alt={draft.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-gray-200"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">
                          {draft.name}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {draft.category} ·{' '}
                          {draft.price
                            ? `Rp ${Number(draft.price).toLocaleString('id-ID')}`
                            : 'Harga belum diisi'}
                        </p>
                        <p className="text-[10px] text-teal-700 mt-0.5">
                          Disimpan {draft.savedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleLoadDraft(draft)}
                        className="bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer"
                      >
                        Lanjutkan
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDraft(draft.id)}
                        title="Hapus draft"
                        className="text-red-500 hover:text-red-700 text-xs font-bold p-1 cursor-pointer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL DETAIL AKUN */}
      {isAccountDetailOpen && currentUser && (
        <div
          onClick={() => setIsAccountDetailOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-5 shadow-xl space-y-4"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base">🪪 Detail Akun</h3>
              <button
                onClick={() => setIsAccountDetailOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Nama Lengkap</span>
                <span className="font-bold text-gray-900">{currentUser.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-gray-900">{currentUser.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">No. HP / WhatsApp</span>
                <span className="font-semibold text-gray-900">
                  {currentUser.phone || '085213835168'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Lokasi / Kota</span>
                <span className="font-semibold text-gray-900">
                  {currentUser.city || 'Bekasi'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Jenis Kelamin</span>
                <span className="font-semibold text-gray-900">
                  {currentUser.gender || 'Perempuan'}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Tanggal Lahir</span>
                <span className="font-semibold text-gray-900">
                  {currentUser.birthDate || '2005-05-14'}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  setIsAccountDetailOpen(false);
                  openEditProfile();
                }}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Edit Profil
              </button>
              <button
                onClick={() => setIsAccountDetailOpen(false)}
                className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 rounded-xl text-xs cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT PROFIL */}
      {isEditProfileOpen && currentUser && (
        <div
          onClick={() => setIsEditProfileOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSaveProfile}
            className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-5 shadow-xl space-y-3"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-bold text-base">✏️ Edit Profil</h3>
              <button
                type="button"
                onClick={() => setIsEditProfileOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Foto Profil
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarFileChange}
                className="w-full text-xs text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nama Tampilan
              </label>
              <input
                type="text"
                required
                value={editProfileForm.name}
                onChange={(e) =>
                  setEditProfileForm({ ...editProfileForm, name: e.target.value })
                }
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                No. HP / WhatsApp
              </label>
              <input
                type="tel"
                value={editProfileForm.phone}
                onChange={(e) =>
                  setEditProfileForm({ ...editProfileForm, phone: e.target.value })
                }
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Lokasi / Kota
              </label>
              <input
                type="text"
                value={editProfileForm.city}
                onChange={(e) =>
                  setEditProfileForm({ ...editProfileForm, city: e.target.value })
                }
                className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer mt-2"
            >
              Simpan Perubahan
            </button>
          </form>
        </div>
      )}

      {/* MODAL SETTING / PENGATURAN */}
      {isSettingsOpen && currentUser && (
        <div
          onClick={() => setIsSettingsOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-5 shadow-xl space-y-3"
          >
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                {settingsSubView !== 'menu' && (
                  <button
                    onClick={() => setSettingsSubView('menu')}
                    className="text-xs font-bold text-teal-700 cursor-pointer"
                  >
                    ← Kembali
                  </button>
                )}
                <h3 className="font-bold text-base">
                  {settingsSubView === 'menu' && '⚙️ Setting / Pengaturan'}
                  {settingsSubView === 'orders' && '📦 Riwayat Pembelian'}
                  {settingsSubView === 'liked' && '❤️ Barang Disukai'}
                </h3>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {settingsSubView === 'menu' && (
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => {
                    setIsSettingsOpen(false);
                    setIsDraftModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold cursor-pointer"
                >
                  <span>📄 Draft Produk ({draftList.length})</span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => setSettingsSubView('orders')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold cursor-pointer"
                >
                  <span>📦 Riwayat Pembelian ({orders.length})</span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => setSettingsSubView('liked')}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-gray-200 hover:bg-gray-50 font-semibold cursor-pointer"
                >
                  <span>❤️ Barang Disukai ({likedProducts.length})</span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => {
                    setIsSettingsOpen(false);
                    openRulesInfoOnly();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold cursor-pointer"
                >
                  <span>⚠️ Aturan & Barang Terlarang</span>
                  <span>›</span>
                </button>
                <button
                  onClick={() => {
                    setIsSettingsOpen(false);
                    setCurrentUser(null);
                    setIsAuthOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 font-bold cursor-pointer"
                >
                  <span>🚪 Keluar dari Akun</span>
                  <span>›</span>
                </button>
              </div>
            )}

            {settingsSubView === 'orders' && (
              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {orders.length === 0 ? (
                  <p className="text-xs text-gray-500 py-6 text-center">
                    Belum ada riwayat pembelian.
                  </p>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="border border-gray-200 rounded-xl p-3 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-gray-900">{ord.product.name}</p>
                        <p className="text-[11px] text-gray-500">
                          {ord.payment} · {ord.location}
                        </p>
                        <p className="text-xs font-bold text-teal-700 mt-0.5">
                          Rp {ord.product.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                      <span className="bg-green-100 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        Diproses
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {settingsSubView === 'liked' && (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {likedProducts.length === 0 ? (
                  <p className="text-xs text-gray-500 py-6 text-center">
                    Belum ada barang yang disukai.
                  </p>
                ) : (
                  likedProducts.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setIsSettingsOpen(false);
                        handleSelectProductDetail(item);
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-teal-700 font-semibold">
                            Rp {item.price.toLocaleString('id-ID')}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-red-600 font-semibold">Lihat →</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* POP-UP PEMBERITAHUAN BARANG TERLARANG & ATURAN KEAMANAN */}
      <RulesModal
        isOpen={isRulesOpen}
        isSellFlow={pendingSellAfterRules}
        onClose={handleRulesClosed}
        onConfirm={handleRulesConfirmed}
      />

      {/* MODAL LOGIN / DAFTAR AKUN / VERIFIKASI EMAIL OTP */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(userData) => setCurrentUser(userData)}
      />

      {/* MODAL CHECKOUT BELI LANGSUNG */}
      {checkoutProduct && (
        <div
          onClick={() => setCheckoutProduct(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-5 shadow-xl my-auto max-h-[90vh] overflow-y-auto"
          >
            {orderSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pesanan Berhasil Dibuat!</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Penjual <b>{orderSuccess.product.store}</b> telah menerima pesananmu.
                  </p>
                </div>

                {orderSuccess.payment === 'QRIS' && (
                  <QrisBarcodeCard
                    product={orderSuccess.product}
                    amount={orderSuccess.product.price}
                  />
                )}

                <div className="bg-gray-50 rounded-xl p-3 text-left text-xs space-y-1.5 border border-gray-200">
                  <p><b>Barang:</b> {orderSuccess.product.name}</p>
                  <p><b>Total Bayar:</b> Rp {orderSuccess.product.price.toLocaleString('id-ID')}</p>
                  <p><b>Metode:</b> {orderSuccess.payment}</p>
                  <p><b>Lokasi / Catatan:</b> {orderSuccess.location}</p>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      const seller = orderSuccess.product.store;
                      setCheckoutProduct(null);
                      openChatWithSeller(seller);
                    }}
                    className="flex-1 border border-gray-300 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    💬 Chat Penjual
                  </button>
                  <button
                    onClick={() => {
                      setCheckoutProduct(null);
                      setSelectedSeller(null);
                      setSelectedProduct(null);
                      setActiveNav('Saya');
                      setSettingsSubView('orders');
                      setIsSettingsOpen(true);
                    }}
                    className="flex-1 bg-teal-600 text-white py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Lihat Pesanan
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={confirmOrder} className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-gray-900">⚡ Checkout Langsung</h3>
                  <button
                    type="button"
                    onClick={() => setCheckoutProduct(null)}
                    className="text-gray-400 hover:text-gray-700 font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                  <img
                    src={checkoutProduct.image}
                    alt={checkoutProduct.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{checkoutProduct.name}</h4>
                    <p className="text-xs text-gray-500">{checkoutProduct.store}</p>
                    <p className="text-sm font-bold text-red-600 mt-0.5">
                      Rp {checkoutProduct.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Pilih Metode Pembayaran
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(checkoutProduct.payment || ['COD Kampus', 'QRIS']).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setSelectedPayment(method)}
                        className={`py-2 px-3 rounded-lg text-xs font-semibold border cursor-pointer ${
                          selectedPayment === method
                            ? 'border-teal-600 bg-teal-50 text-teal-800'
                            : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedPayment === 'QRIS' && (
                  <QrisBarcodeCard
                    product={checkoutProduct}
                    amount={checkoutProduct.price}
                  />
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Titik COD / Alamat Kost
                  </label>
                  <input
                    type="text"
                    required
                    value={codLocation}
                    onChange={(e) => setCodLocation(e.target.value)}
                    className="w-full bg-white text-gray-900 border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600"
                  />
                </div>

                <p className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-2">
                  ⚠️ Jangan memberikan nomor rekening, kode OTP, atau data pribadi ke sembarang orang.
                </p>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer"
                >
                  Konfirmasi Beli · Rp {checkoutProduct.price.toLocaleString('id-ID')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL RUANG CHAT PENJUAL */}
      {isChatOpen && (
        <div
          onClick={() => setIsChatOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 rounded-2xl max-w-md w-full overflow-hidden shadow-xl flex flex-col h-[480px]"
          >
            <div className="bg-teal-700 text-white px-4 py-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">{activeChatSeller}</h3>
                <span className="text-[11px] text-teal-100">● Online di Kampus</span>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-amber-50 border-b border-amber-200 px-3 py-1.5 text-[11px] text-amber-900 flex items-center justify-between gap-2">
              <span>⚠️ Jangan berikan no. rekening / OTP ke sembarang orang.</span>
              <button
                onClick={openRulesInfoOnly}
                className="font-bold underline shrink-0 cursor-pointer"
              >
                Aturan
              </button>
            </div>

            <div className="flex gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-200 overflow-x-auto">
              {Object.keys(chatHistory).map((seller) => (
                <button
                  key={seller}
                  onClick={() => setActiveChatSeller(seller)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap cursor-pointer ${
                    activeChatSeller === seller
                      ? 'bg-teal-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600'
                  }`}
                >
                  {seller}
                </button>
              ))}
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-2.5 bg-gray-50">
              {(chatHistory[activeChatSeller] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[78%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'me'
                        ? 'bg-teal-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="px-3 py-1.5 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto">
              {['Masih ready kak?', 'Bisa COD di kantin?', 'Boleh nego dikit?'].map((quick) => (
                <button
                  key={quick}
                  onClick={() => handleSendMessage(quick)}
                  className="text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full whitespace-nowrap cursor-pointer"
                >
                  {quick}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-white border-t border-gray-200 flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Tulis pesan ke penjual..."
                className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full px-4 py-2 text-xs focus:outline-none"
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-full text-xs cursor-pointer"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL WISHLIST */}
      {isWishlistOpen && (
        <div
          onClick={() => setIsWishlistOpen(false)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 rounded-2xl max-w-md w-full p-5 shadow-xl"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-base">❤️ Barang Disukai ({likedProducts.length})</h3>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="text-gray-400 font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            {likedProducts.length === 0 ? (
              <p className="text-xs text-gray-500 py-6 text-center">Belum ada barang yang disukai.</p>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto">
                {likedProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setIsWishlistOpen(false);
                      handleSelectProductDetail(item);
                    }}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl border border-gray-100 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-teal-700 font-semibold">
                          Rp {item.price.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-red-600 font-semibold">Lihat →</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* DRAWER MENU SAMPING */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-50 flex"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-gray-900 w-72 h-full p-5 shadow-xl flex flex-col justify-between overflow-y-auto"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg text-teal-700">Lapak CWE</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 font-bold cursor-pointer">
                  ✕
                </button>
              </div>

              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
                Kategori Barang
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  <button
                    onClick={() => {
                      setSelectedCategory('Semua');
                      setActiveNav('Jelajahi');
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium cursor-pointer"
                  >
                    🏠 Semua Kategori
                  </button>
                </li>
                {sellableCategories.map((cat) => (
                  <li key={cat.name}>
                    <button
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setActiveNav('Jelajahi');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-2.5 cursor-pointer"
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  openRulesInfoOnly();
                }}
                className="w-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 p-3 rounded-xl text-left text-xs cursor-pointer"
              >
                <p className="font-bold">⚠️ Barang Terlarang & Aturan</p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Klik untuk membaca panduan keamanan transaksi & larangan jual beli.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}