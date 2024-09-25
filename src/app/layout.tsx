import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Header from "./components/header";

export const metadata: Metadata = {
  title: "Memi73",
  description: "Gerador de Memes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/src/app/Memi73.png" />
      </Head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
