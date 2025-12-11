import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const jurusans = await prisma.jurusan.findMany({
            include: {
                falkutas: true,
            },
        });
        return NextResponse.json(jurusans);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch jurusans" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const jurusan = await prisma.jurusan.create({
            data: {
                nama: body.nama,
                kode: body.kode,
                falkutasId: body.falkutasId,
            },
        });
        return NextResponse.json(jurusan);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create jurusan" }, { status: 500 });
    }
}
