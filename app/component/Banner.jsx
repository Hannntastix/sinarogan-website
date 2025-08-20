"use client"

import { useEffect, useState } from 'react';

// Komponen Skeleton bisa dipisah agar lebih rapi
const BannerSkeleton = () => (
    <div className="relative h-[600px] overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <div className="animate-pulse text-center space-y-4">
                <div className="h-6 bg-white/20 rounded-lg w-48 mx-auto"></div>
                <div className="h-12 bg-white/20 rounded-lg w-96 mx-auto"></div>
                <div className="h-8 bg-white/20 rounded-lg w-64 mx-auto"></div>
            </div>
        </div>
        {/* Menambahkan bentuk wave agar konsisten dengan desain akhir */}
        <div className="absolute bottom-0 w-full h-[100px] bg-white"
            style={{ clipPath: 'polygon(0 60%, 25% 40%, 50% 50%, 75% 30%, 100% 40%, 100% 100%, 0% 100%)' }}>
        </div>
    </div>
);

export default function Banner({ imageUrl }) {
    const [offsetY, setOffsetY] = useState(0);
    // State 'mounted' tidak lagi diperlukan untuk loading, karena state 'loading' lebih akurat
    const [dashboards, setDashboards] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/dashboard', {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error("Gagal mengambil informasi desa");
                }

                const data = await res.json();
                setDashboards(data.dashboards);
            } catch (error) {
                console.log("Error loading informations: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboards();
    }, []);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.scrollY);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- LOGIKA RENDER BARU ---
    // 1. Cek jika sedang loading
    if (loading) {
        return <BannerSkeleton />;
    }

    // 2. Cek jika ada error setelah loading selesai
    if (error) {
        return (
            <div className="relative h-[600px] flex flex-col justify-center items-center bg-red-50 text-red-800">
                <h2 className='text-2xl font-bold mb-2'>Terjadi Kesalahan</h2>
                <p>{error}</p>
            </div>
        );
    }

    // 3. Jika tidak ada data setelah loading selesai
    if (!dashboards || dashboards.length === 0) {
        return (
            <div className="relative h-[600px] flex flex-col justify-center items-center bg-gray-100 text-gray-700">
                <h2 className='text-2xl font-bold mb-2'>Informasi Tidak Ditemukan</h2>
                <p>Belum ada data informasi desa yang bisa ditampilkan.</p>
            </div>
        );
    }

    // 4. Jika semua baik-baik saja, tampilkan banner
    return (
        <div>
            {dashboards.map((villageInfo) => (
                <div key={villageInfo._id} className="relative h-[600px] overflow-hidden">
                    {/* Background Image with Enhanced Parallax */}
                    <div
                        className="absolute inset-0 w-full h-[120%] -top-[10%]"
                        style={{
                            transform: `translateY(${offsetY * 0.5}px) scale(1.1)`,
                            transformOrigin: 'center center'
                        }}
                    >
                        <img
                            src={imageUrl || ""}
                            alt="Banner"
                            className="w-full h-full object-cover filter brightness-90 contrast-110"
                            referrerPolicy="no-referrer"
                            loading="eager"
                        />
                    </div>

                    {/* Animated Gradient Overlays */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `
                radial-gradient(circle at 30% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)
              `,
                            transform: `translateY(${offsetY * 0.3}px)`
                        }}
                    />

                    {/* Floating Particles Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
                                style={{
                                    left: `${20 + (i * 15)}%`,
                                    top: `${30 + (i * 8)}%`,
                                    animationDelay: `${i * 0.5}s`,
                                    animationDuration: `${3 + (i * 0.5)}s`
                                }}
                            />
                        ))}
                    </div>

                    {/* Main Content */}
                    <div
                        className="absolute inset-0 flex flex-col justify-center items-center text-white z-10 px-4"
                        style={{ transform: `translateY(${offsetY * 0.15}px)` }}
                    >
                        <div className="text-center space-y-6 max-w-4xl">
                            <div className="animate-fadeInUp">
                                <p className="text-lg md:text-xl font-light tracking-[0.3em] text-emerald-200 mb-2 uppercase">
                                    Selamat Datang di
                                </p>
                            </div>

                            <div className="animate-fadeInUp animation-delay-200">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-wide select-none relative">
                                    <span className="bg-gradient-to-r from-emerald-200 via-white to-teal-200 bg-clip-text text-transparent drop-shadow-2xl">
                                        Desa {villageInfo.namaDesa}
                                    </span>
                                </h1>
                            </div>

                            <div className="animate-fadeInUp animation-delay-400">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent w-24"></div>
                                    <div className="mx-4 w-2 h-2 bg-white rounded-full"></div>
                                    <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent w-24"></div>
                                </div>

                                <p className="text-xl md:text-2xl font-medium tracking-wider text-emerald-100 drop-shadow-lg">
                                    {villageInfo.motto}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Bottom Design & Scroll Indicator */}
                    <div className="absolute bottom-0 w-full">
                        <div
                            className="relative w-full h-[100px] bg-white"
                            style={{
                                clipPath: 'polygon(0 60%, 25% 40%, 50% 50%, 75% 30%, 100% 40%, 100% 100%, 0% 100%)'
                            }}
                        />
                        <div
                            className="absolute bottom-0 w-full h-[60px] bg-gradient-to-r from-emerald-50 to-teal-50 origin-bottom-left"
                            style={{
                                transform: 'skewY(-2deg)',
                                transformOrigin: 'bottom left',
                                clipPath: 'polygon(0 0%, 100% 20%, 100% 100%, 0% 100%)'
                            }}
                        />
                        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400"></div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                        <div className="animate-bounce">
                            <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                                <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            
            @keyframes fadeInUp {
              0% { opacity: 0; transform: translateY(30px); }
              100% { opacity: 1; transform: translateY(0); }
            }

            .animate-float {
              animation: float 4s ease-in-out infinite;
            }

            .animate-fadeInUp {
              animation: fadeInUp 1s ease-out forwards;
            }

            .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
            .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
          `}</style>
                </div>
            ))}
        </div>
    );
}