import connectMongoDB from "@/lib/mongodb";
import VillageInfo from "@/models/villageInfo";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {
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
    } = await request.json();

    await connectMongoDB();

    await VillageInfo.create({
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
    });

    return NextResponse.json(
        { message: "Informasi Desa berhasil dibuat" },
        { status: 201 }
    );
}

export async function GET() {
    await connectMongoDB();
    const dashboards = await VillageInfo.find();
    return NextResponse.json({ dashboards });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await VillageInfo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Village Information Deleted" }, { status: 200 });
}
