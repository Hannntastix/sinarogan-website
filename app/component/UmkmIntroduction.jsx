"use client"

import { useEffect, useState } from 'react';
import { ArrowRight, Store, Users, TrendingUp, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UMKMIntroduction() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hoveredStat, setHoveredStat] = useState(null);
    const [umkmData, setUmkmData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dashboards, setDashboards] = useState([]);

    const route = useRouter();


    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/umkm', {
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


    // Data dummy jika API belum ready
    const dummyData = {
        _id: "1",
        title: "UMKM Desa",
        description: "Desa Sinar Ogan memiliki berbagai macam Usaha Mikro, Kecil, dan Menengah yang dikelola oleh masyarakat setempat. Dari kerajinan tangan tradisional, produk makanan khas, hingga jasa layanan, UMKM desa berkontribusi besar dalam perekonomian lokal dan melestarikan budaya setempat.",
        totalUmkm: 2,
        totalPekerja: 180,
        kategoriUtama: 2,
        omzetBulanan: "150",
        highlights: [
            "Kerajinan bambu dan rotan",
            "Makanan tradisional khas desa",
            "Produk pertanian organik",
            "Jasa layanan masyarakat"
        ]
    };

    const currentData = umkmData.length > 0 ? umkmData[0] : dummyData;

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

    const stats = [
        {
            label: 'Total UMKM',
            value: currentData.totalUmkm,
            suffix: 'Unit',
            icon: Store,
            color: 'from-blue-500 to-cyan-500'
        },
        {
            label: 'Kategori UMKM',
            value: currentData.kategoriUtama,
            suffix: 'Jenis',
            icon: MapPin,
            color: 'from-purple-500 to-indigo-500'
        },
    ];

    return (
        <section id='UMKM' className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-300 rounded-full blur-2xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Side - Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                                <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Ekonomi Desa</span>
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 leading-tight">
                                UMKM{" "}
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'>
                                    Desa Kami
                                </span>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-lg text-slate-600 leading-relaxed">
                                {currentData.description}
                            </p>

                            {/* Highlights */}
                            <div>
                                <h4 className="font-semibold text-slate-700 text-lg">Produk Unggulan:</h4>
                                {dashboards.map((umkmInfo) => {
                                    return (
                                        <div className="space-y-3" key={umkmInfo._id}>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                                                    <span className="text-slate-600">{umkmInfo.namaUmkm}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <button
                                    className="group cursor-pointer inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                    onClick={() => route.push('/umkm')}
                                >
                                    <span>Lihat Detail UMKM</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Image */}
                    <div className="">
                        <div className="relative group">
                            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 to-indigo-100">
                                <img
                                    src="assets/image/UMKM1.jpg"
                                    alt="UMKM Desa"
                                    className={`w-full aspect-[4/3] object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                        } group-hover:scale-105`}
                                    onLoad={() => setImageLoaded(true)}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-6 mt-16">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <div
                                key={index}
                                className="relative p-6 bg-white rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                                onMouseEnter={() => setHoveredStat(index)}
                                onMouseLeave={() => setHoveredStat(null)}
                            >
                                {/* Background gradient on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10`}>
                                            <IconComponent className={`w-5 h-5 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                                        </div>
                                        <div className={`w-8 h-1 bg-gradient-to-r ${stat.color} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                                    </div>

                                    <div className="text-2xl lg:text-3xl font-bold text-slate-800 mb-1">
                                        {stat.value}
                                        <span className={`text-sm font-medium ml-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                            {stat.suffix}
                                        </span>
                                    </div>

                                    <div className="text-sm text-slate-500 font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Wave separator */}
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
}