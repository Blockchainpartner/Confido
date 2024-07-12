
"use client";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ethers } from 'ethers';

import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
// @ts-ignore
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        // @ts-ignore

        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // We can use ethers.js to interact with the Ethereum blockchain
        // @ts-ignore

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const account = await signer.getAddress();

        setAccount(account);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  };


  const pathUrl = usePathname();

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

  return (
    <header
      className={`fixed left-0 top-0 z-99999 w-full py-7 ${
        stickyMenu
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

            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={connectWallet}>
        {account ? `Connected: ${account}` : 'Connect to MetaMask'}
      </button>

           
          </div>
        </div>
²    </header>
  );
};

// w-full delay-300

export default Header;
