"use client"

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const MyMap = dynamic(() => import('./MyMap'), {
    ssr: false,
    loading: () => (
        <div className="h-[500px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center animate-pulse">
            <div className="text-emerald-600 text-center">
                <svg className="w-12 h-12 mx-auto mb-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="font-semibold">Memuat Peta...</p>
            </div>
        </div>
    )
});

export default function VillageLocationSection({
    title = "Lokasi Desa Sinar Ogan",
    description = "Desa Sinar Ogan terletak di lokasi yang strategis dengan akses yang mudah dijangkau. Berikut adalah peta lokasi dan wilayah administrasi desa kami.",
    address = {
        village: "Desa Sinar Ogan",
        district: "Kecamatan Tanjung Bintang",
        regency: "Kabupaten Lampung Selatan",
        province: "Lampung",
        postalCode: "35361"
    },
    coordinates = {
        latitude: "-5.4415379",
        longitude: "105.4090736"
    },
    mapImage1,
    mapImage2
}) {
    const [activeTab, setActiveTab] = useState('interactive');
    const [imageLoaded, setImageLoaded] = useState({ map1: false, map2: false });
    const [hoveredFeature, setHoveredFeature] = useState(null);
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const locationFeatures = [
        {
            icon: "🏛️",
            title: "Kantor Desa",
            description: "Pusat administrasi dan pelayanan masyarakat",
            color: "from-blue-500 to-indigo-500"
        },
        {
            icon: "🏥",
            title: "Puskesmas",
            description: "Fasilitas kesehatan masyarakat",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: "🏫",
            title: "Sekolah",
            description: "Institusi pendidikan formal",
            color: "from-purple-500 to-violet-500"
        },
        {
            icon: "🕌",
            title: "Tempat Ibadah",
            description: "Masjid dan musholla",
            color: "from-emerald-500 to-teal-500"
        },
        {
            icon: "🏪",
            title: "Pasar Tradisional",
            description: "Pusat perdagangan lokal",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: "🌾",
            title: "Area Pertanian",
            description: "Lahan sawah dan perkebunan",
            color: "from-lime-500 to-green-500"
        }
    ];

    const tabs = [
        { id: 'interactive', label: 'Peta Interaktif', icon: '🗺️' },
        { id: 'regional', label: 'Peta Tematik', icon: '📍' },
        { id: 'administrative', label: 'Peta Citra', icon: '🏛️' }
    ];

    return (
        <section
            id='data wilayah'
            ref={sectionRef}
            className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-teal-200 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-24"></div>
                        <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm flex items-center space-x-2">
                            <span>📍</span>
                            <span>Lokasi & Peta</span>
                        </span>
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-24"></div>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                        {title.split(' ').map((word, index) => (
                            <span
                                key={index}
                                className={index >= 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600' : ''}
                            >
                                {word}{' '}
                            </span>
                        ))}
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">
                    {/* Left Column - Address Info */}
                    <div className={`lg:col-span-1 space-y-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                        }`}>
                        {/* Address Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl text-white">📍</span>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800">Alamat Lengkap</h3>
                            </div>

                            <div className="space-y-3 text-slate-600">
                                <div className="flex items-start space-x-3">
                                    <span className="text-blue-500 mt-1"></span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-green-500 mt-1"></span>
                                    <span>{address.village}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-purple-500 mt-1"></span>
                                    <span>{address.district}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-orange-500 mt-1"></span>
                                    <span>{address.regency}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-red-500 mt-1"></span>
                                    <span>{address.province}</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="text-teal-500 mt-1"></span>
                                    <span>{address.postalCode}</span>
                                </div>
                            </div>
                        </div>

                        {/* Coordinates Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl shadow-lg p-6 border border-blue-100">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center space-x-2">
                                <span></span>
                                <span>Koordinat GPS</span>
                            </h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Latitude:</span>
                                    <span className="font-mono bg-white px-2 py-1 rounded">{coordinates.latitude}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Longitude:</span>
                                    <span className="font-mono bg-white px-2 py-1 rounded">{coordinates.longitude}</span>
                                </div>
                            </div>
                            <button className="w-full mt-4 px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 cursor-pointer">
                                <a href="https://www.google.com/maps/place/Sinar+Ogan,+Tanjung+Bintang,+South+Lampung+Regency,+Lampung/@-5.4415379,105.4090736,16.03z/data=!4m6!3m5!1s0x2e40e74c41e555e9:0x2a1162a11025a5cc!8m2!3d-5.4412311!4d105.4214515!16s%2Fg%2F1229bzx4?entry=ttu&g_ep=EgoyMDI1MDgwNC4wIKXMDSoASAFQAw%3D%3D" target='_blank'>
                                    Buka di Google Maps
                                </a>
                            </button>
                        </div>

                        {/* Location Features */}
                        <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
                            <h4 className="font-bold text-slate-800 mb-4 flex items-center space-x-2">
                                <span>🏢</span>
                                <span>Fasilitas Sekitar</span>
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {locationFeatures.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="group p-3 rounded-xl hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                                        onMouseEnter={() => setHoveredFeature(index)}
                                        onMouseLeave={() => setHoveredFeature(null)}
                                    >
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                            <span className="text-white text-sm">{feature.icon}</span>
                                        </div>
                                        <h5 className="font-semibold text-xs text-slate-800 mb-1">{feature.title}</h5>
                                        <p className="text-xs text-slate-500 leading-tight">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Maps */}
                    <div className={`lg:col-span-2 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                        }`}>
                        {/* Tab Navigation */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-white rounded-2xl p-2 shadow-lg border border-slate-200">
                                <div className="flex space-x-2">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`px-6 py-3 cursor-pointer rounded-xl font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${activeTab === tab.id
                                                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-105'
                                                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                                                }`}
                                        >
                                            <span>{tab.icon}</span>
                                            <span className="hidden sm:inline">{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Map Content */}
                        <div className="relative">
                            {/* Interactive Map */}
                            <div className={`transition-all duration-500 ${activeTab === 'interactive'
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
                                }`}>
                                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                                            <span>🗺️</span>
                                            <span>Peta Interaktif</span>
                                        </h3>
                                        <div className="flex space-x-2">
                                            <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                                </svg>
                                            </button>
                                            <button className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-lg">
                                        <MyMap />
                                    </div>
                                </div>
                            </div>

                            {/* Regional Map */}
                            <div className={`transition-all duration-500 ${activeTab === 'regional'
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
                                }`}>
                                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                                        <span>📍</span>
                                        <span>Peta Tematik Sinar Ogan</span>
                                    </h3>
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-emerald-100 to-teal-100 h-[500px]">
                                        {!imageLoaded.map1 && (
                                            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                                <div className="text-emerald-600 text-center">
                                                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <p className="font-semibold">Memuat Peta Regional...</p>
                                                </div>
                                            </div>
                                        )}
                                        <img
                                            src="/assets/image/Peta_Tematik_Sinar_Ogan[1].jpg"
                                            alt="Peta Regional Desa Sinar Ogan"
                                            className={`w-full h-full object-fill transition-all duration-700 ${imageLoaded.map1 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                                }`}
                                            onLoad={() => setImageLoaded(prev => ({ ...prev, map1: true }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Administrative Map */}
                            <div className={`transition-all duration-500 ${activeTab === 'administrative'
                                ? 'opacity-100 translate-y-0 pointer-events-auto'
                                : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
                                }`}>
                                <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center space-x-2">
                                        <span>🏛️</span>
                                        <span>Peta Administrasi Desa</span>
                                    </h3>
                                    <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100 h-[500px]">
                                        {!imageLoaded.map2 && (
                                            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                                <div className="text-blue-600 text-center">
                                                    <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                                    </svg>
                                                    <p className="font-semibold">Memuat Peta Administrasi...</p>
                                                </div>
                                            </div>
                                        )}
                                        <img
                                            src="assets/image/Peta_Citra_Sinar_Ogan[1].jpg"
                                            alt="Peta Administrasi Desa Sinar Ogan"
                                            className={`w-full h-full object-fill transition-all duration-700 ${imageLoaded.map2 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                                                }`}
                                            onLoad={() => setImageLoaded(prev => ({ ...prev, map2: true }))}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}