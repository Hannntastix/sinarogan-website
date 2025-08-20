"use client"

import React, { useEffect, useState } from 'react'

export default function VillageHistory() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hoveredStat, setHoveredStat] = useState(null);
    const [dashboards, setDashboards] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('https://sinarogan-website.vercel.app/api/dashboard', {
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
                    <p className="text-xl font-semibold">Memuat Data Sejarah Desa...</p>
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
            {dashboards.map((villageInfo) => (
                <section key={villageInfo._id} className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-200 rounded-full blur-3xl"></div>
                        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-300 rounded-full blur-2xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-1 gap-12 lg:gap-16 items-center">
                            {/* Left Side - Image */}
                            {/* <div className="order-2 lg:order-1">
                        <div className="relative group"> */}
                            {/* Main Image Container */}
                            {/* <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-emerald-100 to-teal-100">
                                {!imageLoaded && (
                                    <div className="aspect-[4/3] bg-gradient-to-br from-emerald-200 to-teal-200 animate-pulse flex items-center justify-center">
                                        <div className="text-emerald-600 opacity-50">
                                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}

                                <img
                                    src={imageUrl || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                                    alt="Desa Sinar Ogan"
                                    className={`w-full aspect-[4/3] object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                        } group-hover:scale-105`}
                                    onLoad={() => setImageLoaded(true)}
                                />

                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div> */}

                            {/* Floating Badge */}
                            {/* <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-emerald-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <div className="text-sm font-semibold text-slate-700">Desa Susukan</div>
                                </div>
                            </div> */}

                            {/* Decorative Elements */}
                            {/* <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full opacity-20 blur-xl"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-teal-300 to-emerald-400 rounded-full opacity-15 blur-2xl"></div>
                        </div>
                    </div> */}

                            {/* Right Side - Content */}
                            <div className="order-1 lg:order-2 space-y-8 px-8">
                                {/* Header */}
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 justify-center">
                                        <div className="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
                                        <span className="text-emerald-600 font-semibold tracking-wide uppercase text-sm">Sejarah</span>
                                    </div>

                                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight text-center">
                                        Sejarah{" "}
                                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600'>
                                            Desa {villageInfo.namaDesa}
                                        </span>
                                    </h2>
                                </div>

                                {/* Description */}
                                <div className="space-y-6">
                                    <p className="text-lg text-center text-slate-600 leading-relaxed">
                                        {villageInfo.sejarah}
                                    </p>

                                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                            <span>Devinitif sejak 1956</span>
                                        </div>
                                        <div className="w-px h-4 bg-slate-300"></div>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                            <span>Desa dengan hasil pertanian</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Statistics */}
                                {/* <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="relative p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                    onMouseEnter={() => setHoveredStat(index)}
                                    onMouseLeave={() => setHoveredStat(null)}
                                >
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

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

                                    {hoveredStat === index && (
                                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div> */}

                                {/* Call to Action */}
                                {/* <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <button className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                Pelajari Lebih Lanjut
                            </button>
                            <button className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300">
                                Hubungi Kami
                            </button>
                        </div> */}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Wave Decoration */}
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
            ))}
        </div>
    )
}
