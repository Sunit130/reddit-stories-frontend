"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReditRotProvider } from "@/context/ReditRotContext";
import { useState } from "react";
import { LeftSidebar } from "./components/LeftSidebar";
import { RightSidebar } from "./components/RightSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReditRotProvider>
          <LeftSidebar isOpen={leftOpen} onToggle={() => setLeftOpen(!leftOpen)} />
          {children}
          <RightSidebar isOpen={rightOpen} onToggle={() => setRightOpen(!rightOpen)} />
        </ReditRotProvider>
      </body>
    </html>
  );
}
