"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import useQuiz from "@/store/store";
import Quiz from "./components/Quiz";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = useQuiz((state: any) => state.config);
  let render = config.status === "start" ? <Quiz /> : children;

  return (
    <html lang="en">
      <body className={inter.className}>{render}</body>
    </html>
  );
}
