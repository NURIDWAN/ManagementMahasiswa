"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Student } from "./StudentColumns"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    student_id: z.string().min(1, "Student ID is required"),
    major: z.string().min(1, "Major is required"),
    faculty: z.string().min(1, "Faculty is required"),
    semester: z.coerce.number().min(1, "Semester must be at least 1"),
    email: z.string().email("Invalid email"),
})

interface StudentFormProps {
    initialData?: Student | null
    onSuccess?: () => void
}

export function StudentForm({ initialData, onSuccess }: StudentFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [faculties, setFaculties] = useState<any[]>([])
    const [majors, setMajors] = useState<any[]>([])

    // Fetch options on mount
    useState(() => {
        const fetchOptions = async () => {
            const [resFac, resMaj] = await Promise.all([
                fetch('/api/falkutas'),
                fetch('/api/jurusan')
            ]);
            if (resFac.ok) setFaculties(await resFac.json());
            if (resMaj.ok) setMajors(await resMaj.json());
        };
        fetchOptions();
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            student_id: initialData.student_id,
            major: initialData.jurusanId || "", // Use ID
            faculty: initialData.falkutasId || "", // Use ID
            semester: initialData.semester,
            email: initialData.email,
        } : {
            name: "",
            student_id: "",
            major: "",
            faculty: "",
            semester: 1,
            email: "",
        },
    })



    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        setError(null)

        try {
            const url = initialData ? `/api/students/${initialData.id}` : "/api/students"
            const method = initialData ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong")
            }

            MySwal.fire({
                title: 'Success!',
                text: initialData ? 'Student updated successfully.' : 'Student created successfully.',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                router.refresh()
                if (onSuccess) onSuccess()
            })

        } catch (err: any) {
            setError(err.message)
            MySwal.fire({
                title: 'Error!',
                text: err.message || 'Something went wrong.',
                icon: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="student_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student ID (NIM)</FormLabel>
                            <FormControl>
                                <Input placeholder="12345678" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="faculty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Faculty</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Faculty" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                                    {faculties.map((f) => (
                                        <SelectItem key={f.id} value={f.id}>
                                            {f.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="major"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Major</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Major" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="bg-white dark:bg-gray-800 text-black dark:text-white">
                                    {majors
                                        .filter(m => !form.getValues("faculty") || m.falkutasId === form.getValues("faculty"))
                                        .map((m) => (
                                            <SelectItem key={m.id} value={m.id}>
                                                {m.nama}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Semester</FormLabel>
                            <FormControl>
                                <Input type="number" min={1} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <div className="text-sm text-red-500">{error}</div>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Student" : "Create Student"}
                </Button>
            </form>
        </Form>
    )
}
