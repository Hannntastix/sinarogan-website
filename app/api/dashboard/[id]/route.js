import connectMongoDB from "@/lib/mongodb";
import VillageInfo from "@/models/villageInfo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;

    const {
        newNamaDesa: namaDesa,
        newMotto: motto,
        newDeskripsi: deskripsi,
        newJumlahPenduduk: jumlahPenduduk,
        newLuasWilayah: luasWilayah,
        newJumlahRTRW: jumlahRTRW,
        newDusun: dusun,
        newSejarah: sejarah,
        newVisi: visi,
        newMisi: misi,
        newStrukturPemerintahan: strukturPemerintahan,
        newAlamatLengkap: alamatLengkap,
        newFasilitas: fasilitas,
    } = await request.json();

    await connectMongoDB();

    await VillageInfo.findByIdAndUpdate(
        id,
        {
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
            fasilitas
        }
    );

    return NextResponse.json({ message: "Village Information Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    const { id } = params;

    await connectMongoDB();
    const villageInfo = await VillageInfo.findOne({ _id: id });

    return NextResponse.json({ villageInfo }, { status: 200 });
}
