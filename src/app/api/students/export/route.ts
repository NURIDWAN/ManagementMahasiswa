import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { StudentManager } from '@/lib/oop/StudentManager';

const studentManager = new StudentManager();

export async function GET() {
    try {
        await dbConnect();
        const students = await studentManager.getStudents();

        // Convert to JSON-friendly format (already done by Student class toJSON, but let's be explicit)
        const data = students.map(s => s.toJSON());

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
