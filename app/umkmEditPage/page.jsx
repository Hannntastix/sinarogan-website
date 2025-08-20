"use client";

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, MapPin, Store, ShoppingBag, Phone, Calendar, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function UmkmEditDashboard({
    id,
    namaUmkm,
    deskripsi,
    tahunBerdiri,
    mekanisme,
    kontak,
    produk,
    alamatLengkap,
}) {
    // State diinisialisasi langsung dari props yang diterima
    const [newNamaUmkm, setNewNamaUmkm] = useState(namaUmkm || '');
    const [newDeskripsi, setNewDeskripsi] = useState(deskripsi || '');
    const [newTahunBerdiri, setNewTahunBerdiri] = useState(tahunBerdiri || '');
    const [newMekanisme, setNewMekanisme] = useState(mekanisme || '');
    const [newKontak, setNewKontak] = useState(kontak || '');
    const [newProduk, setNewProduk] = useState(produk || []);
    const [newAlamatLengkap, setNewAlamatLengkap] = useState(alamatLengkap || '');

    // State untuk mengelola UI
    const [activeTab, setActiveTab] = useState('info');
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const router = useRouter();

    // useEffect untuk mengambil data lain jika diperlukan (mengikuti pola contoh)
    // Dalam kasus ini, mungkin tidak ada data tambahan yang perlu diambil,
    // tapi strukturnya tetap dipertahankan untuk konsistensi.
    useEffect(() => {
        const fetchDashboards = async () => {
            // JANGAN LAKUKAN APA-APA JIKA ID BELUM ADA
            if (!id) {
                return;
            }

            try {
                const res = await fetch(`https://sinarogan-website.vercel.app/api/umkm/${id}`, {
                    cache: 'no-store',
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch information");
                }

                const data = await res.json();
                setDashboards(data.dashboards);
            } catch (error) {
                console.error("Error loading information: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboards();
    }, [id]);

    // Fungsi untuk menampilkan notifikasi sementara
    const showNotification = (type, message) => {
        setNotification({ show: true, type, message });
        setTimeout(() => {
            setNotification({ show: false, type: '', message: '' });
        }, 3000);
    };

    // --- Kumpulan Fungsi Helper untuk Mengelola State Form ---
    const handleUpdateProduk = (index, value) => {
        const updatedProduk = [...newProduk];
        updatedProduk[index] = value;
        setNewProduk(updatedProduk);
    };
    const handleAddProduk = () => setNewProduk([...newProduk, '']);
    const handleRemoveProduk = (index) => setNewProduk(newProduk.filter((_, i) => i !== index));

    // Fungsi untuk mengirim data yang sudah diubah ke server
    const handleSave = async () => {
        if (!id) {
            showNotification('error', 'ID UMKM tidak valid.');
            return;
        }
        setSaving(true);
        try {
            const response = await fetch(`/api/umkm/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newNamaUmkm,
                    newDeskripsi,
                    newTahunBerdiri,
                    newMekanisme,
                    newKontak,
                    newProduk,
                    newAlamatLengkap,
                }),
            });

            if (!response.ok) {
                throw new Error('Gagal menyimpan perubahan data UMKM.');
            }

            showNotification('success', 'Data UMKM berhasil diperbarui!');
            router.push('/umkm'); // Arahkan kembali ke halaman utama atau daftar UMKM
            router.refresh();

        } catch (error) {
            console.error('Error:', error);
            showNotification('error', 'Terjadi kesalahan saat menyimpan data.');
        } finally {
            setSaving(false);
        }
    };

    const tabs = [
        { id: 'info', name: 'Info Utama', icon: Store },
        { id: 'contact', name: 'Kontak & Lokasi', icon: Phone },
        { id: 'products', name: 'Produk', icon: ShoppingBag },
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <header className="bg-white shadow-sm py-3 md:py-0 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Edit Data UMKM</h1>
                            <p className="text-gray-600 mt-1">Mengelola informasi untuk: <span className="font-semibold text-blue-600">{newNamaUmkm}</span></p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="hidden md:flex items-center space-x-2 bg-green-500 cursor-pointer hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                        </button>
                    </div>
                </div>
                <div className='flex md:hidden justify-center'>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center space-x-2 bg-green-500 cursor-pointer hover:bg-green-700 text-white px-6 py-3 mb-5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                        <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                    </button>
                </div>
            </header>

            {notification.show && (
                <div className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-xl border-l-4 ${notification.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'} flex items-center space-x-3`}>
                    {notification.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                    <span className="font-medium">{notification.message}</span>
                    <button onClick={() => setNotification({ show: false, type: '', message: '' })} className="ml-auto text-gray-500 hover:text-gray-800"><X className="w-5 h-5" /></button>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white rounded-lg shadow-sm border p-4 sticky top-28">
                            <h3 className="font-semibold text-gray-900 mb-4 px-2">Navigasi Menu</h3>
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full cursor-pointer flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 mb-1 ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-50 to-green-50 text-blue-800 border-l-4 border-blue-500 font-bold' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
                                        <Icon className="w-5 h-5" />
                                        <span>{tab.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <section className="flex-1">
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            {activeTab === 'info' && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">Informasi Utama</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="namaUmkm">Nama UMKM</Label>
                                            <Input id="namaUmkm" value={newNamaUmkm} onChange={(e) => setNewNamaUmkm(e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tahunBerdiri">Tahun Berdiri</Label>
                                            <Input id="tahunBerdiri" value={newTahunBerdiri} onChange={(e) => setNewTahunBerdiri(e.target.value)} type="number" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="deskripsi">Deskripsi Singkat UMKM</Label>
                                        <Textarea id="deskripsi" value={newDeskripsi} onChange={(e) => setNewDeskripsi(e.target.value)} rows={4} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'contact' && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">Kontak & Lokasi</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="kontak">Nomor Kontak (WhatsApp)</Label>
                                            <Input id="kontak" value={newKontak} onChange={(e) => setNewKontak(e.target.value)} type="number" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="mekanisme">Mekanisme Penjualan</Label>
                                            <Input id="mekanisme" value={newMekanisme} onChange={(e) => setNewMekanisme(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="alamatLengkap">Alamat Lengkap Usaha</Label>
                                        <Textarea id="alamatLengkap" value={newAlamatLengkap} onChange={(e) => setNewAlamatLengkap(e.target.value)} rows={3} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'products' && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">Produk Unggulan</h2>
                                        <button onClick={handleAddProduk} className="flex items-center space-x-2 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm font-semibold transition-colors"><Plus className="w-4 h-4" /><span>Tambah Produk</span></button>
                                    </div>
                                    <div className="space-y-3">
                                        {newProduk.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <Input value={item} onChange={(e) => handleUpdateProduk(index, e.target.value)} className="flex-1" placeholder={`Nama produk ke-${index + 1}`} />
                                                <button onClick={() => handleRemoveProduk(index)} className="p-2 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}