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
  title: "Refine - AI-Powered Prompt Optimizer",
  description:
    "Learn to write better prompts with AI-powered feedback. Perfect for beginners learning to communicate with AI tools like ChatGPT and Claude.",
  keywords: [
    "AI",
    "prompts",
    "optimization",
    "ChatGPT",
    "Claude",
    "machine learning",
    "beginner",
  ],
  authors: [{ name: "Refine Team" }],
  creator: "Refine",
  publisher: "Refine",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Refine - AI-Powered Prompt Optimizer",
    description: "Learn to write better prompts with AI-powered feedback",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Refine - AI-Powered Prompt Optimizer",
    description: "Learn to write better prompts with AI-powered feedback",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
