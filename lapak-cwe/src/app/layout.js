import './globals.css';

export const metadata = {
  title: 'Lapak CWE',
  description: 'Marketplace jual beli mahasiswa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}