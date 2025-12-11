import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const jurusan = await prisma.jurusan.update({
            where: { id: params.id },
            data: {
                nama: body.nama,
                kode: body.kode,
                falkutasId: body.falkutasId,
            },
        });
        return NextResponse.json(jurusan);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update jurusan" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.jurusan.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: "Jurusan deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete jurusan" }, { status: 500 });
    }
}
