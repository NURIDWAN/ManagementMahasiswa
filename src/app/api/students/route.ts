import { NextResponse } from 'next/server';
import { StudentManager } from '@/lib/oop/StudentManager';
import { z } from 'zod';

const studentManager = new StudentManager();

const studentSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    student_id: z.string().min(1, 'Student ID is required'),
    major: z.string().min(1, 'Major is required'),
    faculty: z.string().min(1, 'Faculty is required'),
    semester: z.number().min(1, 'Semester must be at least 1'),
    email: z.string().email('Invalid email'),
});

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sortAlgo = searchParams.get('sort');
        const searchAlgo = searchParams.get('search');
        const query = searchParams.get('query');

        const studentManager = new StudentManager();
        let students = await studentManager.getStudents();

        // Apply Search
        if (query) {
            if (searchAlgo === 'binary') {
                const result = studentManager.searchBinary(students, query);
                students = result ? [result] : [];
            } else {
                // Default to Linear/Sequential
                students = studentManager.searchLinear(students, query);
            }
        }

        // Apply Sort
        if (sortAlgo) {
            switch (sortAlgo) {
                case 'insertion':
                    students = studentManager.sortInsertion(students);
                    break;
                case 'bubble':
                    students = studentManager.sortBubble(students);
                    break;
                case 'selection':
                    students = studentManager.sortSelection(students);
                    break;
                case 'shell':
                    students = studentManager.sortShell(students);
                    break;
                case 'merge':
                    students = studentManager.sortMerge(students);
                    break;
            }
        }

        return NextResponse.json(students);
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to fetch students", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const validation = studentSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.issues }, { status: 400 });
        }

        const { student_id, email } = validation.data;

        // Check for duplicates using Mongoose directly for efficiency, or could use Manager
        // For OOP demo, let's assume Manager handles it or we check before calling create
        // But Manager.createStudent just creates.
        // Let's keep duplicate check here or move to Manager.
        // Moving to Manager would be better OOP. But for now let's keep it simple.

        // Actually, let's use the Manager for everything if possible.
        // But Manager.createStudent doesn't check duplicates.
        // Let's add duplicate check here.

        // const existingStudent = await Student.findOne({ $or: [{ student_id }, { email }] });
        // We can't use Student model directly if we want to be pure OOP consumer here.
        // But we are in an API route, so it's fine.
        // Let's just use the Manager.createStudent and handle error if unique constraint fails.

        try {
            const newStudent = await studentManager.createStudent(validation.data);
            return NextResponse.json(newStudent, { status: 201 });
        } catch (err: any) {
            if (err.code === 11000) {
                return NextResponse.json({ error: 'Student with this ID or Email already exists' }, { status: 409 });
            }
            throw err;
        }

    } catch (error) {
        console.error('Error creating student:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
