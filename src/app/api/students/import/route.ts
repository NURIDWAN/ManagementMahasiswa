import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import { StudentManager } from '@/lib/oop/StudentManager';
import { z } from 'zod';

const studentManager = new StudentManager();

const importSchema = z.array(z.object({
    name: z.string(),
    student_id: z.string(),
    major: z.string(),
    semester: z.number(),
    email: z.string().email(),
}));

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        const validation = importSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.issues }, { status: 400 });
        }

        const results = {
            success: 0,
            failed: 0,
            errors: [] as string[],
        };

        for (const studentData of validation.data) {
            try {
                await studentManager.createStudent(studentData);
                results.success++;
            } catch (error: any) {
                results.failed++;
                results.errors.push(`Failed to import ${studentData.student_id}: ${error.message}`);
            }
        }

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
