"use client";
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Header = dynamic(() => import('@/components/Header'), { ssr: false });

import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "../globals.css";
import dynamic from 'next/dynamic'

import ToasterContext from "../context/ToastContext";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
//@ts-ignore
import { config } from './config'
const inter = Inter({ subsets: ["latin"] });


// 2. Set up a React Query client.
const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
          <Header />
          <ToasterContext />
          {children}
          <Footer />
          </QueryClientProvider>
          </WagmiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
