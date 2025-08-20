"use client"

import { useState, useEffect } from 'react';

export default function VisionMissionSection() {
    const [activeTab, setActiveTab] = useState('vision');
    const [animatedItems, setAnimatedItems] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    dashboards[0]?.misi?.forEach((_, index) => {
                        setTimeout(() => {
                            setAnimatedItems(prev => [...prev, index]);
                        }, index * 150);
                    });
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('vision-mission-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [dashboards]);

    if (loading) {
        return (
            <section className="py-20 flex justify-center items-center h-screen bg-slate-50">
                <div className="text-center text-emerald-600">
                    <p className="text-xl font-semibold">Memuat Data Struktur Desa...</p>
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
                <section
                    key={villageInfo._id}
                    id="vision-mission-section"
                    className="py-20 bg-white relative overflow-hidden"
                >
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                    </div>

                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center space-x-3 mb-6">
                            <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-24"></div>
                            <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">
                                Visi & Misi
                            </span>
                            <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-24"></div>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold text-emerald-400 mb-4">
                            Arah <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Pembangunan</span> Desa
                        </h2>
                        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                            Komitmen kami untuk membangun masa depan yang lebih baik bagi seluruh masyarakat Desa Sinar Ogan
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setActiveTab('vision')}
                                    className={`px-8 py-3 cursor-pointer rounded-xl font-semibold transition-all duration-300 ${activeTab === 'vision'
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`}
                                >
                                    <span>Visi</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('mission')}
                                    className={`px-8 py-3 cursor-pointer rounded-xl font-semibold transition-all duration-300 ${activeTab === 'mission'
                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                                        }`}
                                >
                                    <span>Misi</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                        {/* Vision Tab */}
                        {activeTab === 'vision' && (
                            <div className="max-w-4xl mx-auto transition-all duration-500">
                                <div className="bg-gradient-to-br from-green-800/80 to-green-900/80 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-slate-700/50 shadow-2xl">
                                    <h3 className="text-2xl text-center lg:text-3xl font-bold text-white mb-6">
                                        Visi Desa {villageInfo.namaDesa}
                                    </h3>
                                    <p className="text-lg text-center lg:text-xl text-slate-200 leading-relaxed italic">
                                        "{villageInfo.visi}"
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Mission Tab */}
                        {activeTab === 'mission' && (
                            <div className="max-w-6xl mx-auto transition-all duration-500">
                                <div className="mb-8 text-center">
                                    <h3 className="text-2xl lg:text-3xl font-bold text-teal-500 mb-4">
                                        Misi Desa {villageInfo.namaDesa}
                                    </h3>
                                    <p className="text-slate-500">
                                        Langkah strategis untuk mewujudkan visi pembangunan desa
                                    </p>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {villageInfo.misi.map((misiItem, index) => (
                                        <div
                                            key={index}
                                            className={`group cursor-pointer transition-all duration-500 ${animatedItems.includes(index) && isVisible
                                                ? 'opacity-100 translate-y-0'
                                                : 'opacity-0 translate-y-12'
                                                }`}
                                            style={{ transitionDelay: `${index * 100}ms` }}
                                        >
                                            <div className="h-full bg-gradient-to-br from-green-800/80 to-green-900/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-105">
                                                <div className="top-4 right-4 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <div className="space-y-4 mt-6">
                                                    <p className="text-slate-300 leading-relaxed">
                                                        {misiItem}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
}
