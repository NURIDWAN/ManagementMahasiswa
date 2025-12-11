import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const falkutas = await prisma.falkutas.update({
            where: { id },
            data: {
                nama: body.nama,
                code_falkutas: body.code_falkutas,
            },
        });
        return NextResponse.json(falkutas);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update falkutas" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await prisma.falkutas.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Falkutas deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete falkutas" }, { status: 500 });
    }
}
