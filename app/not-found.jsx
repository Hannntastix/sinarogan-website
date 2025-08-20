"use client"

import { Home, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const route = useRouter();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* Error Code */}
                <div className="mb-8">
                    <h1 className="text-8xl font-light text-gray-400 mb-2">404</h1>
                    <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                </div>

                {/* Error Message */}
                <div className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Maaf, halaman yang Anda cari tidak dapat ditemukan.
                        Mungkin halaman tersebut telah dipindahkan atau tidak pernah ada.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <button
                        onClick={() => route.push('/')}
                        className="w-full cursor-pointer bg-gray-800 text-white px-6 py-3 rounded-sm hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                    >
                        <Home size={18} />
                        Kembali ke Beranda
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full border cursor-pointer border-gray-300 text-gray-700 px-6 py-3 rounded-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2 font-medium"
                    >
                        <ArrowLeft size={18} />
                        Halaman Sebelumnya
                    </button>
                </div>

                {/* Footer Text */}
                <p className="mt-12 text-sm text-gray-500">
                    Jika masalah berlanjut, silakan hubungi administrator.
                </p>
            </div>
        </div>
    );
}