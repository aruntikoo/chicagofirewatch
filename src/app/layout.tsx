import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chicago Fire Watch | Live Stadium Construction at The 78",
  description:
    "Independent live view of the Chicago Fire FC stadium construction at The 78. Watch the future of Chicago soccer rise in real time.",
  keywords: [
    "Chicago Fire",
    "stadium construction",
    "The 78",
    "live cam",
    "MLS",
    "Chicago",
  ],
  openGraph: {
    title: "Chicago Fire Watch | Live Stadium Construction",
    description:
      "Watch the Chicago Fire stadium rise live from a unique vantage point at The 78.",
    url: "https://chicagofirewatch.com",
    siteName: "Chicago Fire Watch",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
