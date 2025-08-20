import UmkmEditDashboard from "@/app/umkmEditPage/page";


const getUmkmInfoById = async (id) => {
    try {
        const res = await fetch(`https://sinarogan-website.vercel.app/api/umkm/${id}`, {
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
    const { umkmInfo } = await getUmkmInfoById(id);
    const { 
        namaUmkm,
        deskripsi,
        tahunBerdiri,
        mekanisme,
        kontak,
        produk,
        alamatLengkap} = umkmInfo;

    return <UmkmEditDashboard id={id} namaUmkm={namaUmkm} deskripsi={deskripsi} tahunBerdiri={tahunBerdiri} mekanisme={mekanisme} kontak={kontak} produk={produk} alamatLengkap={alamatLengkap} />;
}