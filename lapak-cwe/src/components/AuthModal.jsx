'use client';

import { useState } from 'react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  // Mengatur perpindahan tampilan sesuai sketsa: 'login' | 'register' | 'verify'
  const [step, setStep] = useState('login');
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Data akun terdaftar (menyimpan hasil pendaftaran sementara di frontend)
  const [registeredUser, setRegisteredUser] = useState({
    name: 'fidia_mahasiswa',
    email: 'fidia@poltekcwe.ac.id',
    password: '123456',
    phone: '085213835168',
    city: 'Bekasi',
    gender: 'Perempuan',
    birthDate: '2005-05-14',
  });

  // State Form Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State Form Daftar Akun (sesuai urutan sketsa)
  const [regForm, setRegForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    gender: 'Laki-laki',
    birthDate: '',
  });

  // State Verifikasi Email & OTP
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('482910');
  const [otpSent, setOtpSent] = useState(false);

  if (!isOpen) return null;

  // 1. Proses Login Biasa
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    // Cocokkan dengan akun yang baru didaftarkan atau izinkan login demo
    const userData =
      loginEmail.toLowerCase() === registeredUser.email.toLowerCase()
        ? registeredUser
        : {
            ...registeredUser,
            name: loginEmail.split('@')[0],
            email: loginEmail,
          };

    setStatusMessage({ type: '', text: '' });
    onLoginSuccess(userData);
    onClose();
  };

  // 2. Proses Sign in with Google
  const handleGoogleLogin = () => {
    const googleUser = {
      name: 'Fidia Neysiamesi',
      email: 'fidia.cwe@gmail.com',
      phone: '081234567890',
      city: 'Bekasi (Kampus CWE)',
      gender: 'Perempuan',
      birthDate: '2005-05-14',
      loginMethod: 'Google',
    };
    setStatusMessage({ type: '', text: '' });
    onLoginSuccess(googleUser);
    onClose();
  };

  // 3. Proses Buat Akun -> Lanjut ke Verifikasi Email
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisteredUser(regForm);
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newCode);
    setOtpSent(true);
    setOtpInput('');
    setStatusMessage({
      type: 'info',
      text: `Kode OTP telah dikirim ke ${regForm.email}. (Simulasi kode OTP: ${newCode})`,
    });
    setStep('verify');
  };

  // 4. Kirim Ulang Kode OTP
  const handleSendOtp = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newCode);
    setOtpSent(true);
    setStatusMessage({
      type: 'info',
      text: `Kode OTP baru berhasil dikirim ke ${registeredUser.email}. (Kode: ${newCode})`,
    });
  };

  // 5. Verifikasi OTP -> Kembali ke Halaman Login (Login Ulang)
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput.trim() !== generatedOtp) {
      setStatusMessage({
        type: 'error',
        text: 'Kode OTP tidak sesuai. Silakan periksa kembali kode yang dikirim.',
      });
      return;
    }

    setLoginEmail(registeredUser.email);
    setLoginPassword('');
    setOtpSent(false);
    setStatusMessage({
      type: 'success',
      text: 'Email berhasil diverifikasi! Silakan login ulang menggunakan akun Anda.',
    });
    setStep('login');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 my-auto"
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-sm">
              CWE
            </span>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {step === 'login' && 'Login'}
                {step === 'register' && 'Daftar Akun'}
                {step === 'verify' && 'Verifikasi Email'}
              </h2>
              <p className="text-[11px] text-gray-500">Lapak CWE · Marketplace Mahasiswa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 font-bold text-lg px-2 cursor-pointer"
            aria-label="Tutup"
          >
            ✕
          </button>
        </div>

        {/* Notifikasi Status / OTP */}
        {statusMessage.text && (
          <div
            className={`mb-4 p-3 rounded-xl text-xs leading-relaxed border ${
              statusMessage.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : statusMessage.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-700'
                : 'bg-teal-50 border-teal-200 text-teal-800'
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* ==================== TAMPILAN 1: LOGIN ==================== */}
        {step === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="nama@poltekcwe.ac.id"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Masukkan password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-teal-600"
              />
            </div>

            {/* Tautan Daftar Akun sesuai sketsa */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <span className="text-gray-500">Belum punya akun mahasiswa?</span>
              <button
                type="button"
                onClick={() => {
                  setStatusMessage({ type: '', text: '' });
                  setStep('register');
                }}
                className="text-teal-700 font-bold hover:underline cursor-pointer"
              >
                Daftar akun →
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm transition cursor-pointer"
            >
              Masuk ke Beranda
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-[11px] text-gray-400">atau</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Tombol Sign in with Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2.5 rounded-xl text-sm flex items-center justify-center gap-2.5 transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.9C3.5 21.1 7.4 24 12 24z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </form>
        )}

        {/* ==================== TAMPILAN 2: DAFTAR AKUN ==================== */}
        {step === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-2.5">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                placeholder="Contoh: Fidia Neysiamesi"
                value={regForm.name}
                onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">No. HP / WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="08xxxxxxxxxx"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Lokasi / Kota</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bekasi / Tambun"
                  value={regForm.city}
                  onChange={(e) => setRegForm({ ...regForm, city: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Jenis Kelamin</label>
                <select
                  value={regForm.gender}
                  onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs bg-white focus:outline-none focus:border-teal-600"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Tanggal Ultah</label>
                <input
                  type="date"
                  required
                  value={regForm.birthDate}
                  onChange={(e) => setRegForm({ ...regForm, birthDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-sm mt-2 transition cursor-pointer"
            >
              Buat Akun
            </button>

            <p className="text-center text-xs text-gray-500 pt-1">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  setStatusMessage({ type: '', text: '' });
                  setStep('login');
                }}
                className="text-teal-700 font-bold hover:underline cursor-pointer"
              >
                Kembali ke Login
              </button>
            </p>
          </form>
        )}

        {/* ==================== TAMPILAN 3: VERIFIKASI EMAIL ==================== */}
        {step === 'verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-xs text-gray-600">
              Masukkan 6 digit kode verifikasi yang dikirimkan ke email{' '}
              <span className="font-bold text-gray-900">{registeredUser.email}</span>.
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-gray-700">Kode OTP</label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-xs text-teal-700 font-bold hover:underline cursor-pointer"
                >
                  {otpSent ? 'Kirim ulang kode OTP' : 'Kirim kode OTP'}
                </button>
              </div>
              <input
                type="text"
                maxLength={6}
                required
                placeholder="Contoh: 482910"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-center tracking-[0.4em] font-bold text-base focus:outline-none focus:border-teal-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-sm transition cursor-pointer"
            >
              Verifikasi & Login Ulang
            </button>
          </form>
        )}
      </div>
    </div>
  );
}