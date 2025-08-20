"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Store, ShoppingBag, Phone, MapPin, Plus, Save, Info, Trash2, Calendar, Settings, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreateUmkm = ({ setPage }) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        namaUmkm: "",
        deskripsi: "",
        tahunBerdiri: "",
        mekanisme: "",
        kontak: "",
        produk: [""],
        alamatLengkap: "",
    });


    // Handler untuk input standar
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler khusus untuk mengubah data produk dalam array
    const handleProdukChange = (index, value) => {
        setFormData(prev => {
            const newProduk = [...prev.produk];
            newProduk[index] = value;
            return {
                ...prev,
                produk: newProduk
            };
        });
    };

    // Fungsi untuk menambah input produk baru
    const addProduk = () => {
        setFormData(prev => ({
            ...prev,
            produk: [...prev.produk, ""]
        }));
    };

    // Fungsi untuk menghapus input produk
    const removeProduk = (index) => {
        if (formData.produk.length <= 1) return; // Mencegah penghapusan semua input
        setFormData(prev => ({
            ...prev,
            produk: prev.produk.filter((_, i) => i !== index)
        }));
    };

    // Validasi form menggunakan useMemo agar lebih efisien
    const isFormValid = useMemo(() => {
        const isUmkmDetailsValid =
            formData.namaUmkm.trim() !== "" &&
            formData.deskripsi.trim() !== "" &&
            formData.tahunBerdiri.trim() !== "" &&
            formData.kontak.trim() !== "" &&
            formData.alamatLengkap.trim() !== "";

        // Pastikan setiap produk yang diinput tidak kosong
        const areProdukValid = formData.produk.length > 0 && formData.produk.every(p => p.trim() !== "");

        return isUmkmDetailsValid && areProdukValid;
    }, [formData]);

    // Pesan validasi dinamis untuk ditampilkan di UI
    const getValidationMessage = () => {
        if (!formData.namaUmkm.trim()) return "Silahkan isi Nama UMKM terlebih dahulu";
        if (!formData.deskripsi.trim()) return "Silahkan isi Deskripsi UMKM terlebih dahulu";
        if (!formData.tahunBerdiri.trim()) return "Silahkan isi Tahun Berdiri UMKM";
        if (!formData.kontak.trim()) return "Silahkan isi Kontak yang dapat dihubungi";
        if (!formData.alamatLengkap.trim()) return "Silahkan isi Alamat Lengkap UMKM";
        if (formData.produk.some(p => !p.trim())) return "Pastikan semua nama produk telah diisi";

        return "";
    };

    // Fungsi untuk submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            alert("Harap lengkapi semua field yang wajib diisi.");
            return;
        }
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/umkm", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    tahunBerdiri: Number(formData.tahunBerdiri),
                    kontak: Number(formData.kontak),
                }),
            });

            if (res.ok) {
                alert("Data UMKM berhasil ditambahkan!");
                router.push('/umkm') // Kembali ke halaman daftar
                // Jika tidak menggunakan setPage, bisa gunakan router.push()
                // router.push('/admin/umkm');
                // window.location.reload(); // Hindari reload jika tidak perlu
            } else {
                throw new Error("Gagal menambahkan data UMKM");
            }
        } catch (error) {
            console.error("Error saat menambahkan data UMKM:", error);
            alert("Gagal menambahkan data UMKM. Cek konsol untuk detail.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="flex md:flex-row flex-col justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-slate-600">Manajemen Data UMKM</h1>
                <Button onClick={() => router.push('/umkm')} className="my-5 bg-blue-500 text-white cursor-pointer hover:bg-blue-700">
                    Kembali ke Daftar UMKM
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Detail UMKM Card */}
                <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
                    <div className="flex items-center justify-between border-b pb-4">
                        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                            <Store className="w-5 h-5 text-blue-500" />
                            Informasi Dasar UMKM
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nama UMKM</label>
                            <input
                                type="text"
                                name="namaUmkm"
                                value={formData.namaUmkm}
                                onChange={handleInputChange}
                                placeholder="Contoh: Warung Bakso Pak Budi"
                                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tahun Berdiri</label>
                            <input
                                type="number"
                                name="tahunBerdiri"
                                value={formData.tahunBerdiri}
                                onChange={handleInputChange}
                                placeholder="Contoh: 2015"
                                min="1900"
                                max={new Date().getFullYear()}
                                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                        <textarea
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleInputChange}
                            placeholder="Jelaskan secara singkat tentang UMKM Anda..."
                            rows="3"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                {/* Detail Kontak & Alamat Card */}
                <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-4">
                        <Phone className="w-5 h-5 text-blue-500" />
                        Kontak & Lokasi
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Nomor Kontak (WhatsApp)</label>
                            <input
                                type="number"
                                name="kontak"
                                value={formData.kontak}
                                onChange={handleInputChange}
                                placeholder="Contoh: 081234567890"
                                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Mekanisme Penjualan</label>
                            <input
                                type="text"
                                name="mekanisme"
                                value={formData.mekanisme}
                                onChange={handleInputChange}
                                placeholder="Contoh: Online, Toko Fisik, Keduanya"
                                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Alamat Lengkap</label>
                        <textarea
                            name="alamatLengkap"
                            value={formData.alamatLengkap}
                            onChange={handleInputChange}
                            placeholder="Jl. Mawar No. 10, RT 01/RW 02, Kelurahan, Kecamatan, Kota"
                            rows="3"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>


                {/* Produk Section */}
                <div className="bg-white p-8 rounded-xl shadow-md space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2 border-b pb-4">
                        <ShoppingBag className="w-5 h-5 text-blue-500" />
                        Daftar Produk Unggulan
                    </h2>

                    <div className="space-y-4">
                        {formData.produk.map((produk, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <input
                                    type="text"
                                    value={produk}
                                    onChange={(e) => handleProdukChange(index, e.target.value)}
                                    placeholder={`Produk #${index + 1}`}
                                    className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                {formData.produk.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeProduk(index)}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={addProduk}
                        className="bg-white cursor-pointer border-2 border-dashed border-blue-300 text-blue-600 px-4 py-3 rounded-lg hover:bg-blue-50 w-full flex items-center justify-center gap-2 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Tambah Produk
                    </button>
                </div>

                {/* Tombol Submit */}
                <div className="space-y-4 pt-4">
                    <button
                        type="submit"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all text-white ${isFormValid && !isSubmitting
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        <Save className="w-5 h-5" />
                        {isSubmitting ? "Menyimpan..." : (isFormValid ? "Simpan Data UMKM" : "Lengkapi Semua Data")}
                    </button>

                    {!isFormValid && (
                        <div className="text-center">
                            <p className="text-orange-500 text-sm">
                                <Info className="w-4 h-4 inline mr-1" />
                                {getValidationMessage()}
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateUmkm;