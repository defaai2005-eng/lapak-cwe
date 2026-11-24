'use client';

export default function Navbar({
  searchQuery,
  setSearchQuery,
  wishlistCount,
  cartCount,
  unreadChatCount,
  currentUser,
  onOpenAuth,
  onOpenMenu,
  onOpenWishlist,
  onOpenCart,
  onOpenChat,
  onOpenSell,
}) {
  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-2 sm:gap-2.5">
        {/* Tombol Menu Garis Tiga */}
        <button
          onClick={onOpenMenu}
          className="p-1.5 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
          aria-label="Buka menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Kolom Pencarian Kapsul Abu-abu */}
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <svg className="w-5 h-5 text-gray-400 mr-2 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari di Lapak CWE..."
            className="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-gray-400 hover:text-gray-700 text-xs font-bold px-1.5 cursor-pointer"
            >
              ✕
            </button>
          )}
          <button
            onClick={onOpenSell}
            title="Pasang foto barang jualan"
            className="text-gray-500 hover:text-teal-600 ml-1 shrink-0 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </button>
        </div>

        {/* Ikon Wishlist (Hati) */}
        <button
          onClick={onOpenWishlist}
          className="relative p-1.5 text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer"
          aria-label="Barang disukai"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* Ikon Keranjang */}
        <button
          onClick={onOpenCart}
          className="relative p-1.5 text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer"
          aria-label="Keranjang belanja"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-teal-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>

        {/* Ikon Chat */}
        <button
          onClick={onOpenChat}
          className="relative p-1.5 text-gray-700 hover:bg-gray-100 rounded-full cursor-pointer"
          aria-label="Pesan chat"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {unreadChatCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>

        {/* Tombol Masuk / Profil Akun */}
        {currentUser ? (
          <button
            onClick={onOpenAuth}
            title={`Masuk sebagai ${currentUser.name}`}
            className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 cursor-pointer"
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </button>
        ) : (
          <button
            onClick={onOpenAuth}
            className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-3 py-2 rounded-lg shrink-0 cursor-pointer"
          >
            Masuk
          </button>
        )}
      </div>
    </header>
  );
}