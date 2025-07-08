import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/style/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookit | Book a Room",
  description: "Book any kinds of rooms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en'>
    <body className={inter.className}>
      <Header />
      <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        {children}
      </main>
      <Footer />
      <ToastContainer/>
    </body>
  </html>
  );
}
