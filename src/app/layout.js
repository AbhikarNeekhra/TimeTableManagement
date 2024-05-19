import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./(Components)/Footer/Footer";
import NextAuthSesssionProvider from "./nextauth/NextAuthSesssionProvider";
// import Header from '@/app/(Components)/Header/Header';

const inter = Inter({ subsets: ["latin"] });
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Table Management",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Header/> */}
        <NextAuthSesssionProvider>
          {/* Navbar Common to All Pages */}

          {/* All the other pages gets displayed here */}
          {children}

          <Footer />
        </NextAuthSesssionProvider>
      </body>
    </html>
  );
}
