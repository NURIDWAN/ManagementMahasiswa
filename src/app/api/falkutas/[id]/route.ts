import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const falkutas = await prisma.falkutas.update({
            where: { id: params.id },
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

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.falkutas.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: "Falkutas deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete falkutas" }, { status: 500 });
    }
}
