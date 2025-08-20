"use client"

import { AnimatePresence, motion } from 'framer-motion';
import { buttonVariants } from '../../components/ui/button';
import React, { useState } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import { LoginLink, RegisterLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from 'next/navigation';
import DashboardBtn from './DashboardButton';
import UmkmDashboardBtn from './UMKMDashboardButton';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const route = useRouter();

  const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

  const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'data wilayah', label: 'Data Wilayah' },
    { id: 'data penduduk', label: 'Data Penduduk' },
    { id: 'UMKM', label: 'UMKM' },
  ];

  // Komponen untuk Menu Mobile
  const MobileMenu = () => {
    const renderAuthSection = () => {
      if (isLoading) {
        return (
          <>
            <div className="h-10 w-full animate-pulse bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-full animate-pulse bg-gray-200 rounded-lg"></div>
          </>
        );
      }

      if (!isAuthenticated) {
        return (
          <>
            <LoginLink
              className={buttonVariants({
                variant: "outline",
              }) + " w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300"}
            >
              Sign In
            </LoginLink>
            <RegisterLink
              className={buttonVariants({
                variant: "default",
              }) + " w-full bg-slate-800 hover:bg-slate-900 transition-all duration-300"}
            >
              Sign Up
            </RegisterLink>
          </>
        );
      }

      return (
        <>
          {/* Info Pengguna */}
          <div className="flex items-center gap-3 rounded-lg bg-slate-100 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600">
              <User size={20} />
            </div>
            <div>
              <p className="font-semibold text-slate-800">
                Halo, {isAdmin ? 'Admin' : ''} {user?.given_name}
              </p>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => route.push('/admin')}
            className="select-none bg-white hover:bg-orange-400 px-3 py-1 rounded-lg hover:text-white text-orange-400 cursor-pointer font-semibold transition"
          >
            Draft
          </button>
          {/* Tombol Dashboard (jika sudah login) */}
          <DashboardBtn />

          {/* Tombol Logout */}
          <LogoutLink className="w-full">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100">
              <LogOut size={16} />
              Sign Out
            </button>
          </LogoutLink>
        </>
      );
    };

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden fixed top-16 left-0 w-full bg-white/95 backdrop-blur-sm border-t shadow-2xl"
        >
          <div className='flex flex-col space-y-2 p-4'>
            {/* --- Bagian Navigasi Utama --- */}
            <button
              onClick={() => route.push('/')}
              className="text-left font-medium text-slate-700 hover:bg-slate-100 rounded-lg p-3 transition-colors"
            >
              Beranda
            </button>
            <button
              onClick={() => route.push('/layanan')}
              className="text-left font-medium text-slate-700 hover:bg-slate-100 rounded-lg p-3 transition-colors"
            >
              Layanan
            </button>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left font-medium text-slate-700 hover:bg-slate-100 rounded-lg p-3 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <hr className="my-3 border-slate-200" />

            {/* --- Bagian Autentikasi yang Sudah Dirapikan --- */}
            <div className='flex flex-col space-y-3'>
              {renderAuthSection()}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm'>
      <div className='poppins mx-auto max-w-screen-2xl px-4 sm:px-8 lg:px-10'>
        <div className='flex items-center justify-between h-16'>
          <a href="#home" className="flex gap-1 items-center">
            <img src="assets/image/Lambang_Kabupaten_Lampung_Selatan.png" className='w-10 mr-3 h-12' alt="logo" />
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
            <button
              onClick={() => route.push('/layanan')}
              className="select-none hover:text-orange-400 cursor-pointer font-semibold text-black transition"
            >
              Layanan
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
                // Belum login → Sign In & Sign Up
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
                // Sudah login → cek apakah admin atau bukan
                <div className="flex items-center gap-4">
                  {isAdmin ? (
                    // Menu untuk admin
                    <>
                      <button
                        onClick={() => route.push('/admin')}
                        className="select-none bg-white hover:bg-orange-400 px-3 py-1 rounded-lg hover:text-white text-orange-400 cursor-pointer font-semibold transition"
                      >
                        Draft
                      </button>
                      <DashboardBtn /> {/* Admin Dashboard */}
                      <span className="text-sm text-slate-600 hidden xl:block">
                        Halo Admin, {user?.given_name}
                      </span>
                    </>
                  ) : (
                    // Menu untuk non-admin
                    <>
                      <span className="text-sm text-slate-600 hidden xl:block">
                        Halo, {user?.given_name}
                      </span>
                    </>
                  )}

                  {/* Tombol Sign Out untuk semua yang sudah login */}
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