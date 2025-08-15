import connectMongoDB from "@/lib/mongodb";
import UmkmInfo from "@/models/umkmInfo";
import { NextResponse } from "next/server";

export async function POST(request) {
    const {
        namaUmkm,
        deskripsi,
        tahunBerdiri,
        mekansime,
        kontak,
        produk,
        alamatLengkap
    } = await request.json();

    await connectMongoDB();

    await UmkmInfo.create({
        namaUmkm,
        deskripsi,
        tahunBerdiri,
        mekansime,
        kontak,
        produk,
        alamatLengkap
    });

    return NextResponse.json(
        { message: "Informasi Umkm berhasil dibuat" },
        { status: 201 }
    );
}

export async function GET() {
    await connectMongoDB();
    const dashboards = await UmkmInfo.find();
    return NextResponse.json({ dashboards });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await UmkmInfo.findByIdAndDelete(id);
    return NextResponse.json({ message: "Village Information Deleted" }, { status: 200 });
}
