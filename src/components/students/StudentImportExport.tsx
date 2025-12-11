"use client"

import { useState } from "react"
import { Download, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function StudentImportExport({ onSuccess }: { onSuccess: () => void }) {
    const [isImporting, setIsImporting] = useState(false)
    const [importResult, setImportResult] = useState<any>(null)

    const handleExport = async () => {
        try {
            const response = await fetch("/api/students/export")
            const data = await response.json()

            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            a.href = url
            a.download = "students.json"
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Export failed", error)
        }
    }

    const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsImporting(true)
        setImportResult(null)

        try {
            const text = await file.text()
            const json = JSON.parse(text)

            const response = await fetch("/api/students/import", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(json),
            })

            const result = await response.json()
            setImportResult(result)
            if (result.success > 0) {
                onSuccess()
            }
        } catch (error) {
            console.error("Import failed", error)
            setImportResult({ error: "Failed to parse or upload file" })
        } finally {
            setIsImporting(false)
            // Reset input
            e.target.value = ""
        }
    }

    return (
        <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export JSON
            </Button>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Import JSON
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Import Students</DialogTitle>
                        <DialogDescription>
                            Upload a JSON file containing student data.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <Input type="file" accept=".json" onChange={handleImport} disabled={isImporting} />

                        {isImporting && (
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Importing...
                            </div>
                        )}

                        {importResult && (
                            <div className="space-y-2">
                                {importResult.error ? (
                                    <Alert variant="destructive">
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>{importResult.error}</AlertDescription>
                                    </Alert>
                                ) : (
                                    <Alert>
                                        <AlertTitle>Import Complete</AlertTitle>
                                        <AlertDescription>
                                            Successfully imported: {importResult.success}
                                            <br />
                                            Failed: {importResult.failed}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {importResult.errors && importResult.errors.length > 0 && (
                                    <div className="max-h-40 overflow-y-auto text-xs text-red-500 border p-2 rounded">
                                        {importResult.errors.map((err: string, i: number) => (
                                            <div key={i}>{err}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
