// app/api/upload/route.js
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import connectMongoDB from '../../../lib/mongodb';
import File from '@/models/file';

export async function POST(request) {
    try {
        await connectMongoDB();

        const data = await request.formData();
        const file = data.get('pdf');
        const description = data.get('description') || '';

        if (!file) {
            return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
        }
        if (file.type !== 'application/pdf') {
            return NextResponse.json({ message: 'Only PDF files are allowed' }, { status: 400 });
        }
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ message: 'File size must be less than 10MB' }, { status: 400 });
        }

        // --- BAGIAN YANG DIUBAH ---
        // 1. Buat nama file yang unik untuk disimpan di cloud
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${uniqueSuffix}-${file.name}`;

        // 2. Unggah file ke Vercel Blob, bukan ke folder lokal
        const blob = await put(filename, file, {
            access: 'public',
        });
        // --------------------------

        // 3. Simpan URL dari Vercel Blob ke database
        const fileData = new File({
            filename: filename,
            originalName: file.name,
            path: blob.url, // <-- Simpan URL publik dari Vercel Blob
            size: file.size,
            description: description
        });

        await fileData.save();

        return NextResponse.json({
            message: 'File uploaded successfully',
            file: {
                id: fileData._id,
                url: fileData.path, // Kirim kembali URL-nya
                originalName: fileData.originalName,
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { message: 'Error uploading file: ' + error.message },
            { status: 500 }
        );
    }
}