import { Inter } from 'next/font/google';
import '../styles/globals.css';

// components
import NavbarWrapper from '@/components/wrappers/NavbarWrapper.jsx';
import AuthCheckWrapper from '@/components/wrappers/AuthCheckWrapper.jsx';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} w-screen h-screen bg-primary`}>
        <AuthCheckWrapper>
          {<NavbarWrapper />}
          {children}
        </AuthCheckWrapper>
      </body>
    </html>
  );
}
