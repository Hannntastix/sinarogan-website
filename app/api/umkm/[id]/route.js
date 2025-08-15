import connectMongoDB from "@/lib/mongodb";
import UmkmInfo from "@/models/umkmInfo";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;

    const {
        newNamaUmkm: namaUmkm,
        newDeskripsi: deskripsi,
        newTahunBerdiri: tahunBerdiri,
        newMekanisme: mekansime,
        newKontak: kontak,
        newProduk: produk,
        newAlamatLengkap: alamatLengkap
    } = await request.json();

    await connectMongoDB();

    await UmkmInfo.findByIdAndUpdate(
        id,
        {
            namaUmkm,
            deskripsi,
            tahunBerdiri,
            mekansime,
            kontak,
            produk,
            alamatLengkap
        }
    );

    return NextResponse.json({ message: "Umkm Information Updated" }, { status: 200 });
}

export async function GET(request, { params }) {
    await connectMongoDB();
    const umkm = await UmkmInfo.findById(params.id);

    if (!umkm) {
        return NextResponse.json({ error: "UMKM tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(umkm);
}
