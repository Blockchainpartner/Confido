
"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { WagmiProvider, useAccount } from 'wagmi'
//@ts-ignore
import ThemeToggler from "./ThemeToggler";
import { Account } from './account'
import { WalletOptions } from './wallet-options'

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <div><Account /></div>
  return <WalletOptions />
}
const Header = () => {

  const [stickyMenu, setStickyMenu] = useState(false);
  const [account, setAccount] = useState("");
  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
  });
  console.log(account)
  return (
    <div>
      <header
        className={`fixed left-0 top-0 z-99999 w-full py-7 ${stickyMenu
          ? "bg-white !py-4 shadow transition duration-100 dark:bg-black"
          : ""
          }`}
      >
        <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
          <div className="flex w-full items-center justify-between xl:w-1/4">
            <a href="/">
              <Image
                src="/images/logo/logo_full_confido.png"
                alt="logo"
                width={250}
                height={100}
                className="hidden w-full dark:block"
              />
              <Image
                src="/images/logo/logo_full_confido.png"
                alt="logo"
                width={250}
                height={100}
                className="w-full dark:hidden"
              />
            </a>
          </div>

          {/* Nav Menu Start   */}

          <div className="mt-7 flex items-center gap-6 xl:mt-0">
            <ThemeToggler />
            <ConnectWallet /></div>


        </div>
      </header>
    </div>
  );
};

// w-full delay-300

export default Header;
