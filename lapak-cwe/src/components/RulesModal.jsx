'use client';

import { useState } from 'react';
import { prohibitedItems, safetyRules } from '../utils/dummyData';

export default function RulesModal({ isOpen, onClose, onConfirm, isSellFlow = false }) {
  const [activeTab, setActiveTab] = useState('rules'); // 'rules' | 'prohibited'
  const [isAgreed, setIsAgreed] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAgreed(false);
    onClose();
  };

  const handleProceed = () => {
    if (!isAgreed) return;
    setIsAgreed(false);
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-gray-900 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 my-auto"
      >
        {/* Header Peringatan */}
        <div className="bg-gradient-to-r from-amber-600 to-red-600 text-white px-5 py-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl shrink-0">
              ⚠️
            </span>
            <div>
              <h2 className="text-base font-bold leading-snug">
                {isSellFlow
                  ? 'Peringatan Sebelum Upload Produk'
                  : 'Pemberitahuan & Aturan Lapak CWE'}
              </h2>
              <p className="text-xs text-amber-100 mt-0.5">
                {isSellFlow
                  ? 'Pastikan produkmu tidak melanggar aturan sebelum ditayangkan.'
                  : 'Baca panduan keamanan transaksi & daftar barang terlarang.'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white font-bold text-lg cursor-pointer"
            aria-label="Tutup pemberitahuan"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigasi */}
        <div className="flex border-b border-gray-200 bg-gray-50 px-5 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('rules')}
            className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'rules'
                ? 'border-teal-600 text-teal-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            🛡️ Aturan Transaksi Aman
          </button>
          <button
            onClick={() => setActiveTab('prohibited')}
            className={`pb-2.5 text-xs sm:text-sm font-bold border-b-2 transition cursor-pointer ${
              activeTab === 'prohibited'
                ? 'border-red-600 text-red-700'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            🚫 Barang Terlarang Dijual
          </button>
        </div>

        {/* Isi Konten */}
        <div className="p-5 max-h-[340px] overflow-y-auto space-y-3">
          {activeTab === 'rules' && (
            <>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                <b>Penting:</b> Demi mencegah penipuan di lingkungan kampus,{' '}
                <b>jangan memberikan nomor rekening, kode OTP, atau data pribadi ke sembarang orang</b>.
              </div>
              {safetyRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100"
                >
                  <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{rule.title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{rule.desc}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'prohibited' && (
            <>
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800">
                Akun yang menayangkan barang terlarang di bawah ini akan otomatis diblokir oleh pengurus Lapak CWE.
              </div>
              {prohibitedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-xl bg-red-50/40 border border-red-100"
                >
                  <span className="text-red-600 font-bold text-sm mt-0.5">✕</span>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer Persetujuan */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 space-y-3">
          <label className="flex items-start gap-2.5 text-xs text-gray-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-teal-600 rounded cursor-pointer"
            />
            <span>
              Saya menjamin barang yang diunggah bukan termasuk <b>barang terlarang</b> dan setuju mematuhi <b>aturan keamanan Lapak CWE</b>.
            </span>
          </label>

          <button
            onClick={handleProceed}
            disabled={!isAgreed}
            className={`w-full py-2.5 rounded-xl text-sm font-bold transition ${
              isAgreed
                ? 'bg-teal-600 hover:bg-teal-700 text-white cursor-pointer'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSellFlow ? 'Saya Mengerti & Lanjut Upload Produk' : 'Saya Mengerti & Lanjutkan'}
          </button>
        </div>
      </div>
    </div>
  );
}