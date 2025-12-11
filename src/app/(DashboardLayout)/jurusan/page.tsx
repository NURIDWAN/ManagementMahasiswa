"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function JurusanPage() {
    const [jurusans, setJurusans] = useState<any[]>([]);
    const [falkutas, setFalkutas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ nama: "", kode: "", falkutasId: "" });

    const fetchData = async () => {
        try {
            const [resJur, resFal] = await Promise.all([
                fetch("/api/jurusan"),
                fetch("/api/falkutas")
            ]);
            if (resJur.ok) setJurusans(await resJur.json());
            if (resFal.ok) setFalkutas(await resFal.json());
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("/api/jurusan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setIsOpen(false);
            setFormData({ nama: "", kode: "", falkutasId: "" });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/jurusan/${id}`, { method: "DELETE" });
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Jurusan</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Jurusan
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                        <DialogHeader>
                            <DialogTitle className="text-black dark:text-white">Add New Jurusan</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Nama Jurusan</Label>
                                <Input
                                    value={formData.nama}
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Kode Jurusan</Label>
                                <Input
                                    value={formData.kode}
                                    onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Falkutas</Label>
                                <Select
                                    value={formData.falkutasId}
                                    onValueChange={(value) => setFormData({ ...formData, falkutasId: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Falkutas" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                                        {falkutas.map((f) => (
                                            <SelectItem key={f.id} value={f.id}>
                                                {f.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">Save</Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nama</TableHead>
                            <TableHead>Kode</TableHead>
                            <TableHead>Falkutas</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                            </TableRow>
                        ) : jurusans.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No data found</TableCell>
                            </TableRow>
                        ) : (
                            jurusans.map((j) => (
                                <TableRow key={j.id}>
                                    <TableCell>{j.nama}</TableCell>
                                    <TableCell>{j.kode}</TableCell>
                                    <TableCell>{j.falkutas?.nama}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(j.id)}>
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
