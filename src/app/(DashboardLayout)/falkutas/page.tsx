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

export default function FalkutasPage() {
    const [falkutas, setFalkutas] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ nama: "", code_falkutas: "" });

    const fetchFalkutas = async () => {
        try {
            const res = await fetch("/api/falkutas");
            const data = await res.json();
            setFalkutas(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFalkutas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("/api/falkutas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setIsOpen(false);
            setFormData({ nama: "", code_falkutas: "" });
            fetchFalkutas();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/falkutas/${id}`, { method: "DELETE" });
            fetchFalkutas();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Falkutas</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Falkutas
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                        <DialogHeader>
                            <DialogTitle className="text-black dark:text-white">Add New Falkutas</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label>Nama Falkutas</Label>
                                <Input
                                    value={formData.nama}
                                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <Label>Code Falkutas</Label>
                                <Input
                                    value={formData.code_falkutas}
                                    onChange={(e) => setFormData({ ...formData, code_falkutas: e.target.value })}
                                    required
                                />
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
                            <TableHead>Code</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">Loading...</TableCell>
                            </TableRow>
                        ) : falkutas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">No data found</TableCell>
                            </TableRow>
                        ) : (
                            falkutas.map((f) => (
                                <TableRow key={f.id}>
                                    <TableCell>{f.nama}</TableCell>
                                    <TableCell>{f.code_falkutas}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleDelete(f.id)}>
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
