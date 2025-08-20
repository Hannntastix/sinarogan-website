"use client"

import React, { useState, useEffect } from 'react';
import {
    Calendar,
    MapPin,
    Phone,
    Package,
    ArrowRight,
    Search,
    Filter,
    Grid3X3,
    List
} from 'lucide-react';
import RemoveBtn from '../component/RemoveBtn';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useRouter } from 'next/navigation';

export default function UMKMListPage() {
    const [dashboards, setDashboards] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const route = useRouter();

    const { isAuthenticated, isLoading, user } = useKindeBrowserClient();

    const isAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    useEffect(() => {
        const fetchDashboards = async () => {
            try {
                const res = await fetch('https://sinarogan-website.vercel.app/api/umkm', {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch UMKM information");
                }

                const data = await res.json();
                setDashboards(data.dashboards);
                setFilteredData(data.dashboards);
            } catch (error) {
                console.log("Error loading informations: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboards();
    }, []);

    // Search functionality
    useEffect(() => {
        const filtered = dashboards.filter(umkm =>
            umkm.namaUmkm.toLowerCase().includes(searchTerm.toLowerCase()) ||
            umkm.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
            umkm.produk.some(produk => produk.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredData(filtered);
    }, [searchTerm, dashboards]);

    const calculateAge = (year) => {
        return new Date().getFullYear() - year;
    };

    const getUMKMImage = (umkmName) => {
        // Mapping gambar berdasarkan nama atau jenis UMKM
        const imageMap = {
            'tahu': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'makanan': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'kerajinan': '/assets/image/KerajinanLidi.jpg',
            'pertanian': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        };

        const name = umkmName.toLowerCase();
        if (name.includes('tahu')) return imageMap.tahu;
        if (name.includes('makanan') || name.includes('kuliner')) return imageMap.makanan;
        if (name.includes('kerajinan') || name.includes('craft')) return imageMap.kerajinan;
        if (name.includes('pertanian') || name.includes('organik')) return imageMap.pertanian;

        // Default image
        return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    };

    const truncateText = (text, maxLength = 120) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-green-600 font-medium">Memuat daftar UMKM...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
                    <p className="text-red-600 font-medium mb-4">Error: {error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b border-green-100">
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                            UMKM <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Desa Kami</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Jelajahi berbagai usaha mikro, kecil, dan menengah yang dikembangkan oleh masyarakat desa
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Cari UMKM, produk, atau deskripsi..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                {isAuthenticated ? (
                                    <>
                                        {isAdmin ? (
                                            <button
                                                onClick={() => route.push('/formUmkm')}
                                                className={`p-2 cursor-pointer mx-4 hover:bg-green-700 rounded-md transition-colors bg-green-500 text-white`}
                                            >
                                                Tambah Umkm
                                            </button>
                                        ) : null}
                                    </>
                                ) : null}
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 cursor-pointer rounded-md transition-colors ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    <Grid3X3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                                {filteredData.length} UMKM ditemukan
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-8">
                {filteredData.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-gray-400 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Tidak ada UMKM yang ditemukan</h3>
                        <p className="text-gray-500">Coba gunakan kata kunci yang berbeda</p>
                    </div>
                ) : (
                    <div className={viewMode === 'grid'
                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        : "space-y-6"
                    }>
                        {filteredData.map((umkm) => (
                            viewMode === 'grid' ? (
                                // Grid View Card
                                <div key={umkm._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={getUMKMImage(umkm.namaUmkm)}
                                            alt={umkm.namaUmkm}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                            {calculateAge(umkm.tahunBerdiri)} tahun
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                                            {umkm.namaUmkm}
                                        </h3>

                                        <p className="text-gray-600 mb-4 leading-relaxed">
                                            {truncateText(umkm.deskripsi)}
                                        </p>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                <span>Berdiri sejak {umkm.tahunBerdiri}</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-500">
                                                <Package className="w-4 h-4 mr-2" />
                                                <span>{umkm.produk.length} produk</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {umkm.produk.slice(0, 2).map((produk, index) => (
                                                <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                                                    {produk}
                                                </span>
                                            ))}
                                            {umkm.produk.length > 2 && (
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                                    +{umkm.produk.length - 2} lainnya
                                                </span>
                                            )}
                                        </div>

                                        <div className='flex flex-row'>
                                            <button
                                                onClick={() => window.location.href = `/umkmDetail/${umkm._id}`}
                                                className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                                            >
                                                <span>Lihat Detail</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            {isAuthenticated ? (
                                                <>
                                                    {isAdmin ? (
                                                        <RemoveBtn id={umkm._id} />
                                                    ) : null}
                                                </>
                                            ) : null}
                                        </div>
                                        {isAuthenticated ? (
                                            <>
                                                {isAdmin ? (
                                                    <button
                                                        onClick={() => window.location.href = `/editUmkm/${umkm._id}`}
                                                        className="w-full cursor-pointer mt-5 bg-white text-blue-500 border-2 border-blue-500 font-medium py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 group"
                                                    >
                                                        <span>Edit Data Umkm</span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                ) : null}
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            ) : (
                                // List View Card
                                <div key={umkm._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                                            <img
                                                src={getUMKMImage(umkm.namaUmkm)}
                                                alt={umkm.namaUmkm}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                {calculateAge(umkm.tahunBerdiri)} tahun
                                            </div>
                                        </div>

                                        <div className="flex-1 p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-bold text-gray-800 hover:text-green-600 transition-colors">
                                                    {umkm.namaUmkm}
                                                </h3>
                                                <button
                                                    onClick={() => window.location.href = `/umkmDetail/${umkm._id}`}
                                                    className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                                                >
                                                    <span>Detail</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className='flex items-end'>
                                                {isAuthenticated ? (
                                                    <>
                                                        {isAdmin ? (
                                                            <RemoveBtn id={umkm._id} />
                                                        ) : null}
                                                    </>
                                                ) : null}
                                            </div>

                                            <p className="text-gray-600 mb-4 leading-relaxed">
                                                {truncateText(umkm.deskripsi, 200)}
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    <span>Berdiri {umkm.tahunBerdiri}</span>
                                                </div>

                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Package className="w-4 h-4 mr-2" />
                                                    <span>{umkm.produk.length} produk</span>
                                                </div>

                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    <span>Kontak tersedia</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {umkm.produk.map((produk, index) => (
                                                    <span key={index} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                                                        {produk}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}