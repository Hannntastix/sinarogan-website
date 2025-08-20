"use client";

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, MapPin, Users, Building, Target, Book, Settings, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';

export default function VillageEditDashboard({
    id,
    namaDesa,
    motto,
    deskripsi,
    jumlahPenduduk,
    luasWilayah,
    jumlahRTRW,
    dusun,
    sejarah,
    visi,
    misi,
    strukturPemerintahan,
    alamatLengkap,
    fasilitas,
}) {
    // State diinisialisasi langsung dari props yang diterima
    const [newNamaDesa, setNewNamaDesa] = useState(namaDesa || '');
    const [newMotto, setNewMotto] = useState(motto || '');
    const [newDeskripsi, setNewDeskripsi] = useState(deskripsi || '');
    const [newJumlahPenduduk, setNewJumlahPenduduk] = useState(jumlahPenduduk || '');
    const [newLuasWilayah, setNewLuasWilayah] = useState(luasWilayah || 0);
    const [newJumlahRTRW, setNewJumlahRTRW] = useState(jumlahRTRW || { rt: 0, rw: 0 });
    const [newDusun, setNewDusun] = useState(dusun || 0);
    const [newSejarah, setNewSejarah] = useState(sejarah || '');
    const [newVisi, setNewVisi] = useState(visi || '');
    const [newMisi, setNewMisi] = useState(misi || []);
    const [newStrukturPemerintahan, setNewStrukturPemerintahan] = useState(strukturPemerintahan || []);
    const [newAlamatLengkap, setNewAlamatLengkap] = useState(alamatLengkap || '');
    const [newFasilitas, setNewFasilitas] = useState(fasilitas || []);

    // State untuk mengelola UI
    const [activeTab, setActiveTab] = useState('basic');
    const [saving, setSaving] = useState(false);
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });
    const [dashboards, setDashboards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const route = useRouter();

    // URL API
    useEffect(() => {
        const fetchDashboards = async () => {
            // JANGAN LAKUKAN APA-APA JIKA ID BELUM ADA
            if (!id) {
                return;
            }

            try {
                const res = await fetch(`http://localhost:3000/api/dashboard/${id}`, {
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

    // Misi
    const handleUpdateMisi = (index, value) => {
        const updatedMisi = [...newMisi];
        updatedMisi[index] = value;
        setNewMisi(updatedMisi);
    };
    const handleAddMisi = () => setNewMisi([...newMisi, '']);
    const handleRemoveMisi = (index) => setNewMisi(newMisi.filter((_, i) => i !== index));

    // Struktur Pemerintahan
    const handleUpdateStruktur = (index, field, value) => {
        const updatedStruktur = [...newStrukturPemerintahan];
        updatedStruktur[index] = { ...updatedStruktur[index], [field]: value };
        setNewStrukturPemerintahan(updatedStruktur);
    };
    const handleAddStruktur = () => setNewStrukturPemerintahan([...newStrukturPemerintahan, { jabatan: '', nama: '' }]);
    const handleRemoveStruktur = (index) => setNewStrukturPemerintahan(newStrukturPemerintahan.filter((_, i) => i !== index));

    // Fasilitas
    const handleUpdateFasilitas = (index, value) => {
        const updatedFasilitas = [...newFasilitas];
        updatedFasilitas[index] = value;
        setNewFasilitas(updatedFasilitas);
    };
    const handleAddFasilitas = () => setNewFasilitas([...newFasilitas, '']);
    const handleRemoveFasilitas = (index) => setNewFasilitas(newFasilitas.filter((_, i) => i !== index));

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch(`/api/dashboard/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    newNamaDesa, newMotto, newDeskripsi, newJumlahPenduduk,
                    newLuasWilayah, newJumlahRTRW, newDusun, newSejarah,
                    newVisi, newMisi, newStrukturPemerintahan, newAlamatLengkap,
                    newFasilitas,
                }),
            });

            if (!response.ok) {
                throw new Error('Gagal menyimpan informasi sekolah');
            }

            alert('Informasi desa berhasil diperbarui');
            route.refresh();
            route.push('/');
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menyimpan informasi');
        } finally {
            setSaving(false);
        }
    };

    // Fungsi untuk mengirim data yang sudah diubah ke server
    // const handleSave = async () => {
    //     if (!id) {
    //         showNotification('error', 'ID tidak ditemukan, tidak dapat menyimpan.');
    //         return;
    //     }
    //     setSaving(true);
    //     try {
    //         // Payload dikirim dengan prefix 'new' sesuai dengan API
    //         const payload = {
    //             newNamaDesa, newMotto, newDeskripsi, newJumlahPenduduk,
    //             newLuasWilayah, newJumlahRTRW, newDusun, newSejarah,
    //             newVisi, newMisi, newStrukturPemerintahan, newAlamatLengkap,
    //             newFasilitas,
    //         };

    //         const response = await fetch(API_URL, {
    //             method: 'PUT',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(payload),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Gagal menyimpan perubahan.');
    //         }

    //         showNotification('success', 'Informasi desa berhasil diperbarui!');
    //     } catch (err) {
    //         console.error('Error saat menyimpan:', err);
    //         showNotification('error', err.message);
    //     } finally {
    //         setSaving(false);
    //     }
    // };

    const tabs = [
        { id: 'basic', name: 'Info Dasar', icon: Building },
        { id: 'demographics', name: 'Demografi', icon: Users },
        { id: 'vision', name: 'Visi & Misi', icon: Target },
        { id: 'history', name: 'Sejarah', icon: Book },
        { id: 'structure', name: 'Struktur', icon: Settings },
        { id: 'facilities', name: 'Fasilitas', icon: MapPin }
    ];


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header Utama */}
            <header className="bg-white shadow-sm py-3 md:py-0 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard Informasi Desa</h1>
                            <p className="text-gray-600 mt-1">Mengelola informasi desa: <span className="font-semibold text-blue-600">{newNamaDesa}</span></p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="md:flex hidden items-center space-x-2 bg-green-500 cursor-pointer hover:bg-green-700 text-white px-6 py-3 mb-5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                            <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                        </button>
                    </div>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex md:hidden items-center mx-auto space-x-2 bg-green-500 cursor-pointer hover:bg-green-700 text-white px-6 py-3 mb-5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-5 h-5" />}
                    <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                </button>
            </header>

            {/* Notifikasi Pop-up */}
            {notification.show && (
                <div className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-xl border-l-4 ${notification.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'} flex items-center space-x-3`}>
                    {notification.type === 'success' ? <CheckCircle className="w-6 h-6 text-green-600" /> : <AlertCircle className="w-6 h-6 text-red-600" />}
                    <span className="font-medium">{notification.message}</span>
                    <button onClick={() => setNotification({ show: false, type: '', message: '' })} className="ml-auto text-gray-500 hover:text-gray-800"><X className="w-5 h-5" /></button>
                </div>
            )}

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigasi */}
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

                    {/* Konten Utama Form */}
                    <section className="flex-1">
                        <div className="bg-white rounded-lg shadow-sm border p-8">
                            {activeTab === 'basic' && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">Informasi Dasar</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="namaDesa">Nama Desa</Label>
                                            <Input id="namaDesa" value={newNamaDesa} onChange={(e) => setNewNamaDesa(e.target.value)} placeholder="Contoh: Desa Makmur Jaya" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="mottoDesa">Motto Desa</Label>
                                            <Input id="mottoDesa" value={newMotto} onChange={(e) => setNewMotto(e.target.value)} placeholder="Contoh: Bersatu Membangun" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="deskripsi">Deskripsi Singkat Desa</Label>
                                        <Textarea id="deskripsi" value={newDeskripsi} onChange={(e) => setNewDeskripsi(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="alamatLengkap">Alamat Lengkap Kantor Desa</Label>
                                        <Textarea id="alamatLengkap" value={newAlamatLengkap} onChange={(e) => setNewAlamatLengkap(e.target.value)} rows={3} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'demographics' && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">Data Demografi</h2>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="jumlahPenduduk">Jumlah Penduduk (Jiwa)</Label>
                                            <Input id="jumlahPenduduk" value={newJumlahPenduduk} onChange={(e) => setNewJumlahPenduduk(e.target.value)} placeholder="Contoh: 3450" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="luasWilayah">Luas Wilayah (Ha)</Label>
                                            <Input id="luasWilayah" value={newLuasWilayah} onChange={(e) => setNewLuasWilayah(parseFloat(e.target.value) || 0)} type="number" step="0.01" placeholder="Contoh: 512.5" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="jumlahRT">Jumlah RT</Label>
                                            <Input id="jumlahRT" value={newJumlahRTRW.rt} onChange={(e) => setNewJumlahRTRW({ ...newJumlahRTRW, rt: parseInt(e.target.value) || 0 })} type="number" placeholder="Contoh: 25" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="jumlahRW">Jumlah RW</Label>
                                            <Input id="jumlahRW" value={newJumlahRTRW.rw} onChange={(e) => setNewJumlahRTRW({ ...newJumlahRTRW, rw: parseInt(e.target.value) || 0 })} type="number" placeholder="Contoh: 8" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="jumlahDusun">Jumlah Dusun</Label>
                                            <Input id="jumlahDusun" value={newDusun} onChange={(e) => setNewDusun(parseInt(e.target.value) || 0)} type="number" placeholder="Contoh: 4" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'vision' && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">Visi & Misi</h2>
                                    <div className="space-y-2">
                                        <Label htmlFor="visi">Visi Desa</Label>
                                        <Textarea id="visi" value={newVisi} onChange={(e) => setNewVisi(e.target.value)} rows={3} />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label>Misi Desa</Label>
                                            <button onClick={handleAddMisi} className="flex cursor-pointer items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 font-medium"><Plus className="w-4 h-4" /><span>Tambah Misi</span></button>
                                        </div>
                                        <div className="space-y-3">
                                            {newMisi.map((misi, index) => (
                                                <div key={index} className="flex items-start space-x-3">
                                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-sm font-semibold mt-1.5">{index + 1}</span>
                                                    <Textarea value={misi} onChange={(e) => handleUpdateMisi(index, e.target.value)} className="flex-1" rows={2} placeholder={`Tuliskan misi ke-${index + 1}`} />
                                                    <button onClick={() => handleRemoveMisi(index)} className="cursor-pointer flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors mt-1"><Trash2 className="w-5 h-5" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'history' && (
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-4">Sejarah Desa</h2>
                                    <div className="space-y-2">
                                        <Label htmlFor="sejarah">Tuliskan Sejarah Desa</Label>
                                        <Textarea id="sejarah" value={newSejarah} onChange={(e) => setNewSejarah(e.target.value)} rows={15} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'structure' && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">Struktur Pemerintahan</h2>
                                        <button onClick={handleAddStruktur} className="cursor-pointer flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold transition-colors"><Plus className="w-4 h-4" /><span>Tambah Struktur</span></button>
                                    </div>
                                    <div className="space-y-4">
                                        {newStrukturPemerintahan.map((item, index) => (
                                            <div key={index} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 space-y-4">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`jabatan-${index}`}>Jabatan</Label>
                                                        <Input id={`jabatan-${index}`} value={item.jabatan} onChange={(e) => handleUpdateStruktur(index, 'jabatan', e.target.value)} placeholder="Contoh: Kepala Desa" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor={`nama-${index}`}>Nama Pejabat</Label>
                                                        <Input id={`nama-${index}`} value={item.nama} onChange={(e) => handleUpdateStruktur(index, 'nama', e.target.value)} placeholder="Contoh: Budi Santoso, S.Pd." />
                                                    </div>
                                                </div>
                                                <div className="flex justify-end">
                                                    <button onClick={() => handleRemoveStruktur(index)} className="cursor-pointer flex items-center space-x-2 text-red-600 hover:text-red-800 text-sm font-medium"><Trash2 className="w-4 h-4" /><span>Hapus</span></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'facilities' && (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                                        <h2 className="text-2xl font-bold text-gray-900">Fasilitas Desa</h2>
                                        <button onClick={handleAddFasilitas} className="flex items-center space-x-2 bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-semibold transition-colors"><Plus className="w-4 h-4" /><span>Tambah Fasilitas</span></button>
                                    </div>
                                    <div className="space-y-3">
                                        {newFasilitas.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <Input value={item} onChange={(e) => handleUpdateFasilitas(index, e.target.value)} className="flex-1" placeholder="Contoh: Balai Desa, Masjid Agung, dll." />
                                                <button onClick={() => handleRemoveFasilitas(index)} className="p-2 text-red-500 hover:text-red-700 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
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
