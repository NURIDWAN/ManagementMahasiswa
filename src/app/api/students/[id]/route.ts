import { NextResponse } from 'next/server';
import { StudentManager } from '@/lib/oop/StudentManager';
import { z } from 'zod';

const studentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    student_id: z.string().min(1, 'Student ID is required'),
    major: z.string().min(1, 'Major is required'),
    faculty: z.string().min(1, 'Faculty is required'),
    semester: z.number().min(1, 'Semester must be at least 1'),
    email: z.string().email('Invalid email'),
});

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    // Not implemented in Manager yet, returning 501
    return NextResponse.json({ error: 'Not implemented' }, { status: 501 });
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Validate input
        const result = studentSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json(
                { error: "Validation failed", issues: result.error.issues },
                { status: 400 }
            );
        }

        const studentManager = new StudentManager();
        const updatedStudent = await studentManager.updateStudent(id, result.data);

        if (!updatedStudent) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedStudent);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to update student", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const studentManager = new StudentManager();
        const success = await studentManager.deleteStudent(id);

        if (!success) {
            return NextResponse.json(
                { error: "Student not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Student deleted successfully" });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to delete student", details: error.message },
            { status: 500 }
        );
    }
}
