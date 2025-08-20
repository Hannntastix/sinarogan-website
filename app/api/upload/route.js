// app/api/upload/route.js
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import connectMongoDB from '../../../lib/mongodb';
import File from '@/models/file';

export async function POST(request) {
    try {
        await connectMongoDB();

        const data = await request.formData();
        const file = data.get('pdf');
        const description = data.get('description') || '';

        if (!file) {
            return NextResponse.json(
                { message: 'No file uploaded' },
                { status: 400 }
            );
        }

        // Check if file is PDF
        if (file.type !== 'application/pdf') {
            return NextResponse.json(
                { message: 'Only PDF files are allowed' },
                { status: 400 }
            );
        }

        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json(
                { message: 'File size must be less than 10MB' },
                { status: 400 }
            );
        }

        // Create upload directory
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }

        // Generate unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = uniqueSuffix + '.pdf';
        const filepath = path.join(uploadDir, filename);

        // Convert file to buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filepath, buffer);

        // Save file info to database
        const fileData = new File({
            filename: filename,
            originalName: file.name,
            path: `/uploads/${filename}`, // Save relative path for serving
            size: file.size,
            description: description
        });

        await fileData.save();

        return NextResponse.json({
            message: 'File uploaded successfully',
            file: {
                id: fileData._id,
                originalName: fileData.originalName,
                size: fileData.size,
                uploadDate: fileData.uploadDate
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