import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import File from '@/models/file';

export async function GET() {
    try {
        await connectMongoDB();

        const files = await File.find({}).sort({ uploadDate: -1 });

        return NextResponse.json({ files }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        );
    }
}