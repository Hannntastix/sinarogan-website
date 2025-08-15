"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
    Calendar,
    MapPin,
    Phone,
    Package,
    Clock,
    Settings,
    ArrowLeft,
    ExternalLink
} from "lucide-react";

export default function UMKMDetailPage() {
    const { id } = useParams();
    const [umkm, setUmkm] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const fetchUMKM = async () => {
            try {
                const res = await fetch(`/api/umkm/${id}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch UMKM information");
                }

                const data = await res.json();
                setUmkm(data);
            } catch (error) {
                console.log("Error loading UMKM: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUMKM();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-green-600 font-medium">Memuat data UMKM...</p>
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

    if (!umkm) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                UMKM tidak ditemukan
            </div>
        );
    }

    const formatPhoneNumber = (phone) => {
        const phoneStr = phone.toString();
        return `+${phoneStr.slice(0, 2)} ${phoneStr.slice(2, 5)}-${phoneStr.slice(5, 9)}-${phoneStr.slice(9)}`;
    };

    const calculateAge = (year) => {
        return new Date().getFullYear() - year;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-green-100">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 hover:bg-green-50 cursor-pointer rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-green-600" />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Detail UMKM</h1>
                            <p className="text-green-600 text-sm">Informasi lengkap usaha mikro, kecil, dan menengah</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Main Info Card */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-3xl lg:text-4xl font-bold mb-2">{umkm.namaUmkm}</h2>
                                    <div className="flex items-center space-x-4 text-green-100">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Berdiri {umkm.tahunBerdiri}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{calculateAge(umkm.tahunBerdiri)} tahun beroperasi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Description */}
                                <div className="lg:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Deskripsi Usaha</h3>
                                        <p className="text-gray-600 leading-relaxed">{umkm.deskripsi}</p>
                                    </div>

                                    {/* Products */}
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Produk Unggulan</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {umkm.produk?.map((produk, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300 cursor-pointer"
                                                    onClick={() => setSelectedProduct(selectedProduct === index ? null : index)}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className="p-2 bg-green-500 rounded-lg">
                                                            <Package className="w-4 h-4 text-white" />
                                                        </div>
                                                        <span className="font-medium text-gray-800">{produk}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="space-y-6">
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Kontak</h3>
                                        <div className="space-y-3">
                                            <a
                                                href={`https://wa.me/${umkm.kontak}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:shadow-md transition-all duration-300 group"
                                            >
                                                <div className="p-2 bg-green-500 rounded-lg">
                                                    <Phone className="w-4 h-4 text-white" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{formatPhoneNumber(umkm.kontak)}</p>
                                                    <p className="text-sm text-green-600">WhatsApp</p>
                                                </div>
                                                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors ml-auto" />
                                            </a>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Lokasi Usaha</h3>
                                        <div className="flex items-start space-x-3">
                                            <div className="p-2 bg-green-500 rounded-lg mt-1">
                                                <MapPin className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-gray-700 leading-relaxed">{umkm.alamatLengkap}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Production Mechanism */}
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Settings className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Mekanisme Produksi</h3>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed text-justify">{umkm.mekansime}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Button */}
                    <div className="bg-gradient-to-br justify-center from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Hubungi Langsung</h4>
                        <p className="text-gray-600 mb-4 text-sm">
                            Tertarik dengan produk ini? Hubungi langsung pemilik usaha untuk informasi lebih lanjut.
                        </p>
                        <a
                            href={`https://wa.me/${umkm.kontak}?text=Halo%20${umkm.namaUmkm},%20saya%20tertarik%20dengan%20produk%20Anda`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
                        >
                            <Phone className="w-4 h-4" />
                            <span>Hubungi via WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
