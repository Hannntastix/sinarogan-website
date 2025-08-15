export async function GET() {
    try {
        const villageInfo = [
            {
                namaDesa: "Sinar Ogan",
                motto: "Sinar Ogan Maju, Masyarakat Bersatu",
                deskripsi: "Desa Sinar Ogan adalah sebuah desa yang terletak di Kabupaten Ogan Komering Ulu, Sumatera Selatan. Desa ini memiliki keindahan alam yang memukau dengan hamparan sawah hijau yang membentang luas, sungai jernih yang mengalir tenang, dan udara segar pegunungan yang menyejukkan. Masyarakat desa yang ramah dan gotong royong menjadikan Sinar Ogan sebagai tempat yang nyaman untuk ditinggali dan dikunjungi. Dengan potensi alam yang melimpah dan sumber daya manusia yang berkualitas, Desa Sinar Ogan terus berkomitmen untuk mewujudkan pembangunan yang berkelanjutan dan meningkatkan kesejahteraan seluruh warganya.",
                jumlahPenduduk: "2,847",
                luasWilayah: 15.6,
                jumlahRTRW: {
                    rt: 12,
                    rw: 4
                },
                dusun: 5,
                sejarah: "Desa Sinar Ogan didirikan pada tahun 1987 sebagai hasil pemekaran dari desa induk yang ada di wilayah tersebut. Nama 'Sinar Ogan' diambil dari suku Ogan yang merupakan penduduk asli daerah ini, serta kata 'Sinar' yang melambangkan harapan dan masa depan yang cerah. Awalnya, desa ini merupakan kawasan pertanian dan perkebunan yang dihuni oleh beberapa keluarga petani. Seiring berjalannya waktu, dengan adanya program transmigrasi dan pembangunan infrastruktur, jumlah penduduk semakin bertambah dan desa ini berkembang menjadi pusat aktivitas ekonomi dan sosial masyarakat setempat.",
                visi: "Mewujudkan Desa Sinar Ogan sebagai desa yang mandiri, sejahtera, dan berkelanjutan dengan mengedepankan nilai-nilai gotong royong, kearifan lokal, dan inovasi teknologi untuk kesejahteraan masyarakat yang berkeadilan.",
                misi: [
                    "Mengembangkan infrastruktur desa yang berkualitas untuk mendukung aktivitas ekonomi dan sosial masyarakat",
                    "Meningkatkan kesejahteraan masyarakat melalui pengembangan UMKM dan potensi ekonomi lokal",
                    "Meningkatkan kualitas pendidikan dan sumber daya manusia untuk menciptakan generasi yang unggul",
                    "Melestarikan dan mengembangkan nilai-nilai budaya lokal sebagai identitas desa",
                    "Menjaga kelestarian lingkungan dan menerapkan konsep pembangunan yang ramah lingkungan",
                    "Menyelenggarakan pemerintahan desa yang transparan, akuntabel, dan partisipatif"
                ],
                strukturPemerintahan: [
                    {
                        jabatan: "Kepala Desa",
                        nama: "H. Ahmad Sudarto"
                    },
                    {
                        jabatan: "Sekretaris Desa",
                        nama: "Siti Nurhalimah, S.Sos"
                    },
                    {
                        jabatan: "Bendahara Desa",
                        nama: "Budi Santoso, S.E"
                    },
                    {
                        jabatan: "Kasi Pemerintahan",
                        nama: "Andi Prasetyo"
                    },
                    {
                        jabatan: "Kasi Kesejahteraan",
                        nama: "Dr. Sari Indrawati"
                    },
                    {
                        jabatan: "Kasi Pelayanan",
                        nama: "Joko Widodo"
                    },
                    {
                        jabatan: "Kaur Keuangan",
                        nama: "Lisa Maharani"
                    },
                    {
                        jabatan: "Kaur Umum",
                        nama: "Rahman Hakim"
                    },
                    {
                        jabatan: "Kaur Perencanaan",
                        nama: "Dewi Sartika"
                    },
                    {
                        jabatan: "Ketua BPD",
                        nama: "H. Mahmud Yusuf"
                    },
                    {
                        jabatan: "Wakil Ketua BPD",
                        nama: "Hj. Fatimah"
                    },
                    {
                        jabatan: "Sekretaris BPD",
                        nama: "Usman Ali"
                    }
                ],
                alamatLengkap: "Jl. Desa Sinar Ogan No. 123, Desa Sinar Ogan, Kecamatan Baturaja Timur, Kabupaten Ogan Komering Ulu, Sumatera Selatan 32112",
                fasilitas: [
                    "Kantor Desa",
                    "Balai Desa",
                    "Puskesmas Pembantu",
                    "SD Negeri Sinar Ogan",
                    "SMP Negeri 1 Sinar Ogan",
                    "Masjid Al-Ikhlas",
                    "Musholla At-Taqwa",
                    "Pasar Tradisional",
                    "Lapangan Olahraga",
                    "Posyandu",
                    "Perpustakaan Desa",
                    "Pos Ronda",
                    "Jembatan Penghubung",
                    "Jalan Aspal",
                    "Saluran Irigasi",
                    "PAUD Tunas Bangsa",
                    "Koperasi Desa",
                    "Bank Sampah",
                    "Warung Internet (Warnet)",
                    "Tempat Pemakaman Umum"
                ],
                createdAt: new Date("2024-01-15T08:00:00.000Z"),
                updatedAt: new Date("2024-08-07T12:30:00.000Z")
            }
        ];

        return Response.json({
            success: true,
            message: "Village information retrieved successfully",
            data: villageInfo,
            totalRecords: villageInfo.length
        });
    } catch (error) {
        console.error("Error fetching village info:", error);
        return Response.json({
            success: false,
            error: "Failed to fetch village information",
            message: error.message
        }, {
            status: 500
        });
    }
}