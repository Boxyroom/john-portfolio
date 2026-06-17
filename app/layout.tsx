import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { ScrollReset } from "@/components/ScrollReset";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern Portfolio",
  description: "A modern portfolio built with Next.js, TypeScript, and Tailwind CSS.",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const scrollResetScript = `
  try {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (!location.hash) {
      scrollTo(0, 0);
    }
  } catch {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          dangerouslySetInnerHTML={{ __html: scrollResetScript }}
          id="scroll-restoration-reset"
          strategy="beforeInteractive"
        />
        <ScrollReset />
        {children}
      </body>
    </html>
  );
}
