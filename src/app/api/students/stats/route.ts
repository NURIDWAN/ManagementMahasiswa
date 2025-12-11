import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const totalStudents = await prisma.student.count();

        // Aggregate by major (jurusan)
        const studentsByMajorId = await prisma.student.groupBy({
            by: ['jurusanId'],
            _count: {
                _all: true
            }
        });

        // Fetch Jurusan names
        const jurusanIds = studentsByMajorId.map(item => item.jurusanId);
        const jurusans = await prisma.jurusan.findMany({
            where: {
                id: { in: jurusanIds }
            }
        });

        const jurusanMap = jurusans.reduce((acc, curr) => {
            acc[curr.id] = curr.nama;
            return acc;
        }, {} as Record<string, string>);

        const studentsByMajor = studentsByMajorId.map(item => ({
            _id: jurusanMap[item.jurusanId] || "Unknown",
            count: item._count._all
        }));

        // Aggregate by semester
        const studentsBySemester = await prisma.student.groupBy({
            by: ['semester'],
            _count: {
                _all: true
            },
            orderBy: {
                semester: 'asc'
            }
        });

        // Format data for charts
        const majorData = {
            categories: studentsByMajor.map(item => item._id),
            series: [{
                name: "Students",
                data: studentsByMajor.map(item => item.count)
            }]
        };

        const semesterData = {
            categories: studentsBySemester.map(item => `Sem ${item.semester}`),
            series: [{
                name: "Students",
                data: studentsBySemester.map(item => item._count._all)
            }]
        };

        return NextResponse.json({
            totalStudents,
            majorData,
            semesterData
        });

    } catch (error) {
        console.error("Error fetching student stats:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
