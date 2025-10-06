import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NoteHub - Your Personal Notes Manager',
  description: 'A simple and efficient application for managing personal notes',
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanStackProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
              {children}
            </main>
            <Footer />
          </div>
          {modal}
        </TanStackProvider>
      </body>
    </html>
  );
}

