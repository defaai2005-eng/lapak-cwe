'use client';

export default function ProductCard({ product, isLiked, onToggleLike, onSelectProduct }) {
  return (
    <div
      onClick={() => onSelectProduct(product)}
      className="bg-white flex flex-col cursor-pointer group"
    >
      {/* Kotak Gambar Persegi */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-2.5">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Gradasi tipis di atas untuk tulisan waktu unggah */}
        <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/45 to-transparent px-2.5 py-2 flex items-center justify-between text-white text-xs">
          <span className="drop-shadow-sm">{product.timeAgo}</span>
          <span className="font-bold tracking-widest">⋮</span>
        </div>
      </div>

      {/* Baris 1: Nama Barang & Tombol Suka (Hati) */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-gray-900 text-sm font-medium line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLike(product.id);
          }}
          className="text-gray-500 hover:text-red-500 shrink-0 pt-0.5 cursor-pointer"
          aria-label="Sukai produk"
        >
          {isLiked ? (
            <svg className="w-5 h-5 text-red-500 fill-red-500" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Baris 2: Harga & Kondisi Barang */}
      <p className="text-sm mt-1 truncate">
        <span className="font-bold text-gray-900">
          Rp {product.price.toLocaleString('id-ID')}
        </span>
        <span className="text-gray-400 mx-1">·</span>
        <span className="text-gray-500 text-xs">{product.condition}</span>
      </p>

      {/* Baris 3: Avatar & Nama Penjual */}
      <div className="flex items-center gap-1.5 mt-1.5">
        <div className="w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
          {product.store.charAt(0).toUpperCase()}
        </div>
        <span className="text-xs text-gray-600 truncate">{product.store}</span>
      </div>
    </div>
  );
}