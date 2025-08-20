import VillageEditDashboard from "@/app/dashboardPage/page";


const getVillageInfoById = async (id) => {
    try {
        const res = await fetch(`https://sinarogan-website.vercel.app/api/dashboard/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch information");
        }

        return res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function EditDashboard({ params }) {

    const { id } = await params;
    console.log("id :", id);
    const { villageInfo } = await getVillageInfoById(id);
    const { namaDesa,
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
        fasilitas } = villageInfo;

    return <VillageEditDashboard id={id} namaDesa={namaDesa} motto={motto} deskripsi={deskripsi} jumlahPenduduk={jumlahPenduduk} luasWilayah={luasWilayah} jumlahRTRW={jumlahRTRW} dusun={dusun} sejarah={sejarah} visi={visi} misi={misi} strukturPemerintahan={strukturPemerintahan} alamatLengkap={alamatLengkap} fasilitas={fasilitas} />;
}