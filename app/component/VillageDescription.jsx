"use client"

import { useEffect, useState } from 'react';

export default function VillageDescription() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hoveredStat, setHoveredStat] = useState(null);
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
                    throw new Error("Failed to fetch village information");
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

    if (loading) {
        return (
            <section className="py-20 flex justify-center items-center h-screen bg-slate-50">
                <div className="text-center text-emerald-600">
                    <p className="text-xl font-semibold">Memuat Data Desa...</p>
                </div>
            </section>
        );
    }
    if (error) {
        return (
            <section className="py-20 flex justify-center items-center h-screen bg-red-50">
                <div className="text-center text-red-600">
                    <p className="text-xl font-semibold">Terjadi Kesalahan</p>
                    <p>{error}</p>
                </div>
            </section>
        );
    }

    return (
        <div>
            {dashboards.map((villageInfo) => {
                const stats = [
                    { label: 'Jumlah Penduduk', value: villageInfo.jumlahPenduduk, suffix: 'Orang' },
                    { label: 'Luas Wilayah', value: villageInfo.luasWilayah, suffix: 'Ha' },
                    { label: 'Dusun', value: villageInfo.dusun, suffix: 'Wilayah Dusun' },
                    { label: 'Jumlah RT', value: villageInfo.jumlahRTRW.rt, suffix: 'RT' },
                    { label: 'Jumlah RW', value: villageInfo.jumlahRTRW.rw, suffix: 'RW' },
                ];

                return (
                    <section id='data penduduk' key={villageInfo._id} className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
                        {/* Background Elements */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-300 rounded-full blur-2xl"></div>
                        </div>

                        <div className="container mx-auto px-4 relative z-10">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                {/* Left Side - Image */}
                                <div className="order-2 lg:order-1">
                                    <div className="relative group">
                                        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-emerald-100 to-teal-100">
                                            <img
                                                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                                alt={villageInfo.namaDesa}
                                                className={`w-full aspect-[4/3] object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                                    } group-hover:scale-105`}
                                                onLoad={() => setImageLoaded(true)}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Content */}
                                <div className="order-1 lg:order-2 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                                            <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Profil Desa</span>
                                        </div>

                                        <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                                            Deskripsi{" "}
                                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600'>
                                                Desa {villageInfo.namaDesa}
                                            </span>
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-lg text-slate-600 leading-relaxed">
                                            {villageInfo.deskripsi}
                                        </p>
                                    </div>

                                    {/* Statistics */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {stats.map((stat, index) => (
                                            <div
                                                key={index}
                                                className="relative p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                                onMouseEnter={() => setHoveredStat(index)}
                                                onMouseLeave={() => setHoveredStat(null)}
                                            >
                                                <div className="relative z-10">
                                                    <div className="text-2xl lg:text-3xl font-bold text-slate-800 mb-1">
                                                        {stat.value}
                                                        <span className="text-sm font-medium text-emerald-600 ml-1">
                                                            {stat.suffix}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-slate-500 font-medium">
                                                        {stat.label}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0">
                            <svg
                                viewBox="0 0 1200 120"
                                preserveAspectRatio="none"
                                className="relative block w-full h-20"
                            >
                                <path
                                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                    className="fill-white"
                                ></path>
                            </svg>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
