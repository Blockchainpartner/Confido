import React from 'react'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
function Core({
    children,
  }: {
    children: React.ReactNode;
  }) {
  return (
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
  )
}

export default Core