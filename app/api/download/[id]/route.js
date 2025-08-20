// app/api/download/[id]/route.js

import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import File from '@/models/file';
import { readFile } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET(request, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();

        const file = await File.findById(id);

        if (!file) {
            return NextResponse.json(
                { message: 'File not found' },
                { status: 404 }
            );
        }

        const filePath = path.join(process.cwd(), 'public/uploads', file.filename);

        // Check if file exists
        if (!existsSync(filePath)) {
            return NextResponse.json(
                { message: 'File not found on disk' },
                { status: 404 }
            );
        }

        try {
            const fileBuffer = await readFile(filePath);

            // Create response with proper headers
            const response = new NextResponse(fileBuffer);

            // Set the correct headers for PDF download
            response.headers.set('Content-Type', 'application/pdf');
            response.headers.set('Content-Disposition', `attachment; filename="${encodeURIComponent(file.originalName)}"`);
            response.headers.set('Content-Length', fileBuffer.length.toString());
            response.headers.set('Cache-Control', 'no-cache');

            return response;

        } catch (fileError) {
            console.error('Error reading file:', fileError);
            return NextResponse.json(
                { message: 'Error reading file from disk' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Download error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}