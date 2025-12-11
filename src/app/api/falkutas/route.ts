import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const falkutas = await prisma.falkutas.findMany();
        return NextResponse.json(falkutas);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch falkutas" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const falkutas = await prisma.falkutas.create({
            data: {
                nama: body.nama,
                code_falkutas: body.code_falkutas,
            },
        });
        return NextResponse.json(falkutas);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create falkutas" }, { status: 500 });
    }
}
