"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { buttonVariants } from '../../components/ui/button';
import React, { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';

// Impor hooks dan komponen yang benar dari Kinde
import { LoginLink, RegisterLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation';
import DashboardBtn from './DashboardButton';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const route = useRouter();

  // 1. Gunakan hook ini untuk mendapatkan semua info di sisi client
  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'layanan', label: 'Layanan' },
    { id: 'data wilayah', label: 'Data Wilayah' },
    { id: 'data penduduk', label: 'Data Penduduk' },
    { id: 'UMKM', label: 'UMKM' },
  ];

  // Komponen untuk Menu Mobile
  const MobileMenu = () => {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-sm border-t shadow-2xl"
        >
          <div className='flex flex-col space-y-2 p-4'>
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-slate-700 hover:bg-slate-100 rounded-lg p-3 transition"
              >
                <span className='text-md font-medium'>{item.label}</span>
              </motion.button>
            ))}
            <hr className="my-4 border-slate-200" />

            {/* 3. Logika yang benar untuk mobile menu */}
            <div className='flex flex-col space-y-3 pt-2'>
              {isLoading ? (
                <div className="h-10 w-full animate-pulse bg-gray-200 rounded-lg"></div>
              ) : !isAuthenticated ? (
                <>
                  <LoginLink
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }) + " rounded-full px-5 border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-lg transition-all duration-300"}
                  >
                    Sign in
                  </LoginLink>
                  <RegisterLink
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }) + " rounded-full px-5 border border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white hover:shadow-lg transition-all duration-300"}
                  >
                    Sign Up
                  </RegisterLink>
                </>
              ) : (
                <LogoutLink className={buttonVariants({ variant: "outline", size: "lg" })}>
                  Sign Out
                </LogoutLink>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm'>
      <div className='poppins mx-auto max-w-screen-xl px-4 sm:px-8 lg:px-10'>
        <div className='flex items-center justify-between h-16'>
          <a href="#home" className="flex gap-1 items-center">
            <h2 className="text-2xl font-bold flex gap-2 text-slate-700">
              Desa <span className="text-yellow-700">Sinar Ogan</span>
            </h2>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => route.push('/')}
              className="select-none hover:text-orange-400 cursor-pointer font-semibold text-black transition"
            >
              Beranda
            </button>
            <div className="flex space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="select-none hover:text-orange-400 cursor-pointer font-semibold text-black transition"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* 2. Gunakan logika kondisional yang benar untuk desktop */}
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="h-8 w-24 animate-pulse bg-gray-200 rounded-md"></div>
              ) : !isAuthenticated ? (
                <>
                  <LoginLink
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }) + " rounded-full px-5 border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white hover:shadow-lg transition-all duration-300"}
                  >
                    Sign in
                  </LoginLink>
                  <RegisterLink
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }) + " rounded-full px-5 border border-teal-500 text-teal-600 hover:bg-teal-500 hover:text-white hover:shadow-lg transition-all duration-300"}
                  >
                    Sign Up
                  </RegisterLink>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <DashboardBtn />
                  <span className="text-sm text-slate-600 hidden xl:block">
                    Halo, {user?.given_name}
                  </span>
                  <LogoutLink>
                    <button className="flex items-center gap-2 text-sm font-semibold cursor-pointer text-red-600 hover:text-red-800 transition-colors">
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </LogoutLink>
                </div>
              )}
            </div>
          </div>

          <div className="lg:hidden cursor-pointer">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-800"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
        {isMobileMenuOpen && <MobileMenu />}
      </div>
    </nav>
  );
}