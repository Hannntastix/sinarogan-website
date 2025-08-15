"use client"

import { useState, useEffect, useMemo } from 'react';

export default function VillageStructureSection() {
    // State to hold data from the API
    const [villageData, setVillageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for UI interactions
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [animatedCards, setAnimatedCards] = useState([]);

    // 1. Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchVillageData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/dashboard', {
                    cache: 'no-store', // Ensures fresh data on every fetch
                });

                if (!res.ok) {
                    throw new Error("Gagal mengambil data dari server");
                }

                const data = await res.json();

                // The API returns an object { dashboards: [...] }, we'll use the first item
                if (data.dashboards && data.dashboards.length > 0) {
                    setVillageData(data.dashboards[0]);
                } else {
                    throw new Error("Data struktur pemerintahan tidak ditemukan.");
                }

            } catch (error) {
                console.error("Error loading village data: ", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVillageData();
    }, []); // The empty dependency array ensures this runs only once

    // 2. Process the structure data once it's fetched
    // useMemo will re-calculate only when villageData changes
    const { kepala, sekretaris, kaur, kasi, kadus } = useMemo(() => {
        if (!villageData) {
            return { kepala: null, sekretaris: null, kaur: [], kasi: [], kadus: [] };
        }

        const structure = villageData.strukturPemerintahan;
        return {
            kepala: structure.find(p => p.jabatan === "Kepala Desa"),
            sekretaris: structure.find(p => p.jabatan === "Sekretaris Desa"),
            kaur: structure.filter(p => p.jabatan.includes("Kaur")),
            kasi: structure.filter(p => p.jabatan.includes("Kasi")),
            kadus: structure.filter(p => p.jabatan.includes("Kadus")),
        };
    }, [villageData]);

    // Placeholder photo generator (can be replaced with real photo URLs if available in your DB)
    const getPhotoUrl = (index) => {
        const photos = [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1494790108755-2616b612b372?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        ];
        return photos[index % photos.length];
    };

    // useEffect for scroll animations (no changes needed here)
    useEffect(() => {
        if (loading) return; // Don't run observer until content is loaded

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.getAttribute('data-section');
                        const cards = entry.target.querySelectorAll('.structure-card');
                        cards.forEach((card, index) => {
                            setTimeout(() => {
                                setAnimatedCards(prev => [...prev, `${sectionId}-${index}`]);
                            }, index * 100);
                        });
                    }
                })
            },
            { threshold: 0.3 }
        );

        const sections = document.querySelectorAll('.structure-section');
        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();
    }, [loading]); // Re-run when loading is finished

    // --- SUB-COMPONENTS (No changes needed) ---
    const PersonCard = ({ person, index, sectionId, isMain = false }) => {
        const cardId = `${sectionId}-${index}`;
        const isAnimated = animatedCards.includes(cardId);
        return (
            <div
                className={`structure-card group cursor-pointer transition-all duration-500 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isMain ? 'transform scale-110' : ''}`}
                onClick={() => setSelectedPerson(person)}
            >
                <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 hover:border-emerald-500/50 ${isMain ? 'p-8 bg-gradient-to-br from-emerald-50 to-teal-50' : 'p-6'}`}>
                    <div className={`absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-bl-lg text-xs font-semibold ${isMain ? 'text-sm' : ''}`}>
                        {person.jabatan.split(' ').pop()}
                    </div>
                    <div className={`mx-auto mb-4 relative ${isMain ? 'w-24 h-24' : 'w-20 h-20'}`}>
                        <img
                            src={person.photo || getPhotoUrl(index)}
                            alt={person.nama}
                            className={`w-full h-full object-cover rounded-full border-4 ${isMain ? 'border-emerald-500' : 'border-emerald-400'} group-hover:scale-110 transition-transform duration-300`}
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-center">
                        <h3 className={`font-bold text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors ${isMain ? 'text-xl' : 'text-lg'}`}>
                            {person.nama}
                        </h3>
                        <p className={`text-slate-600 mb-2 ${isMain ? 'text-base' : 'text-sm'}`}>
                            {person.jabatan}
                        </p>
                        {person.period && (
                            <p className="text-xs text-emerald-600 font-semibold bg-emerald-100 rounded-full px-3 py-1 inline-block">
                                {person.period}
                            </p>
                        )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </div>
                </div>
            </div>
        );
    };
    const SectionTitle = ({ title, subtitle, icon }) => (
        <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4"><div className="text-4xl">{icon}</div></div>
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600">{subtitle}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4 rounded-full"></div>
        </div>
    );
    // --- END SUB-COMPONENTS ---


    // 3. Handle Loading and Error states in the UI
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
    if (!villageData) {
        return (
            <section className="py-20 flex justify-center items-center h-screen bg-slate-50">
                <div className="text-center text-slate-600">
                    <p className="text-xl font-semibold">Data tidak dapat ditemukan.</p>
                </div>
            </section>
        );
    }


    // 4. Render the main component with the fetched data
    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-emerald-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-teal-200 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-24"></div>
                        <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm">
                            Struktur Organisasi
                        </span>
                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent w-24"></div>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
                        Struktur <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Pemerintahan</span> Desa {villageData.namaDesa}
                    </h2>
                </div>

                {/* --- SECTIONS USING FETCHED DATA --- */}

                {/* Kepala Desa Section */}
                {kepala && (
                    <div className="structure-section mb-20" data-section="kepala">
                        <SectionTitle title="Kepala Desa" subtitle="Pemimpin dan penanggung jawab utama pemerintahan desa" />
                        <div className="flex justify-center">
                            <div className="max-w-sm">
                                <PersonCard person={kepala} index={0} sectionId="kepala" isMain={true} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Sekretaris Desa */}
                {sekretaris && (
                    <div className="structure-section mb-20" data-section="sekretaris">
                        <SectionTitle title="Sekretaris Desa" subtitle="Pelaksana tugas administratif dan koordinasi" />
                        <div className="flex justify-center">
                            <div className="max-w-sm">
                                <PersonCard person={sekretaris} index={1} sectionId="sekretaris" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Kepala Urusan */}
                {kaur.length > 0 && (
                    <div className="structure-section mb-20" data-section="kaur">
                        <SectionTitle title="Kepala Urusan" subtitle="Pengelola urusan administratif dan teknis" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {kaur.map((person, index) => (
                                <PersonCard key={person._id} person={person} index={index + 2} sectionId="kaur" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Kepala Seksi */}
                {kasi.length > 0 && (
                    <div className="structure-section mb-20" data-section="kasi">
                        <SectionTitle title="Kepala Seksi" subtitle="Koordinator bidang-bidang strategis desa" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {kasi.map((person, index) => (
                                <PersonCard key={person._id} person={person} index={index + 5} sectionId="kasi" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Kepala Dusun */}
                {kadus.length > 0 && (
                    <div className="structure-section mb-20" data-section="kadus">
                        <SectionTitle title="Kepala Dusun" subtitle="Pengelola dan koordinator setiap dusun" />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {kadus.map((person, index) => (
                                <PersonCard key={person._id} person={person} index={index + 8} sectionId="kadus" />
                            ))}
                        </div>
                    </div>
                )}

                {/* Contact Info */}
                {/* <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-emerald-100">
                    <h4 className="text-xl font-bold text-slate-800 mb-4">Butuh Informasi Lebih Lanjut?</h4>
                    <p className="text-slate-600 mb-6">Hubungi kantor desa untuk pelayanan dan informasi lebih detail</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            📞 Hubungi Kami
                        </button>
                        <button className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300">
                            📍 Kunjungi Kantor
                        </button>
                    </div>
                </div> */}
            </div>

            {/* Person Detail Modal (no changes needed) */}
            {selectedPerson && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
                        <button
                            onClick={() => setSelectedPerson(null)}
                            className="absolute top-4 right-4 w-8 h-8 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="text-center">
                            <img
                                src={selectedPerson.photo || getPhotoUrl(0)}
                                alt={selectedPerson.nama}
                                className="w-24 h-24 object-cover rounded-full border-4 border-emerald-500 mx-auto mb-4"
                            />
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{selectedPerson.nama}</h3>
                            <p className="text-emerald-600 font-semibold mb-4">{selectedPerson.jabatan}</p>
                            {selectedPerson.period && (
                                <p className="text-sm text-slate-600 bg-slate-100 rounded-full px-4 py-2 inline-block">
                                    Periode: {selectedPerson.period}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}