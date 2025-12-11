"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { StudentTable } from "@/components/students/StudentTable"
import { columns } from "@/components/students/StudentColumns"
import { Student } from "@/lib/oop/Student"
import { StudentForm } from "@/components/students/StudentForm"
import { useSearchParams } from "next/navigation"

import { StudentImportExport } from "@/components/students/StudentImportExport"
import { AlgorithmControls } from "@/components/students/AlgorithmControls"
import { StudentManager } from "@/lib/oop/StudentManager"

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

import { Suspense } from "react"

function StudentsContent() {
    const [students, setStudents] = useState<Student[]>([])
    const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const searchParams = useSearchParams()
    const editId = searchParams.get('edit')
    const [editStudent, setEditStudent] = useState<Student | null>(null)
    const [executionTime, setExecutionTime] = useState<number | null>(null)
    const [currentSort, setCurrentSort] = useState("insertion")
    const [currentSearch, setCurrentSearch] = useState("linear")

    // Instantiate StudentManager
    const studentManager = new StudentManager()

    const fetchStudents = async () => {
        try {
            const response = await fetch("/api/students")
            const data = await response.json()
            // Convert raw data to Student instances
            const studentInstances = data.map((d: any) => new Student(d))
            setStudents(studentInstances)
            setFilteredStudents(studentInstances)
        } catch (error) {
            console.error("Failed to fetch students", error)
            MySwal.fire('Error', 'Failed to fetch students', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchStudents()
    }, [])

    useEffect(() => {
        if (editId && students.length > 0) {
            const student = students.find(s => s.id === editId)
            if (student) {
                setEditStudent(student)
                setIsDialogOpen(true)
            }
        } else {
            setEditStudent(null)
        }
    }, [editId, students])

    const handleSuccess = () => {
        setIsDialogOpen(false)
        fetchStudents()
        if (editId) {
            window.history.pushState({}, '', '/students')
        }
    }

    const handleSort = (algorithm: string) => {
        setCurrentSort(algorithm)
        const start = performance.now()
        let sorted: Student[] = []

        switch (algorithm) {
            case "insertion":
                sorted = studentManager.sortInsertion(filteredStudents)
                break
            case "bubble":
                sorted = studentManager.sortBubble(filteredStudents)
                break
            case "selection":
                sorted = studentManager.sortSelection(filteredStudents)
                break
            case "merge":
                sorted = studentManager.sortMerge(filteredStudents)
                break
            case "shell":
                sorted = studentManager.sortShell(filteredStudents)
                break
            default:
                sorted = filteredStudents
        }
        const end = performance.now()
        setExecutionTime(end - start)
        setFilteredStudents(sorted)
    }

    const handleSearch = (algorithm: string, query: string) => {
        setCurrentSearch(algorithm)

        // If query is empty, reset to all students (but keep current sort if needed, or just reset)
        if (!query) {
            setFilteredStudents(students)
            setExecutionTime(null)
            return
        }

        const start = performance.now()
        let results: Student[] = []

        try {
            switch (algorithm) {
                case "linear":
                case "sequential":
                    results = studentManager.searchLinear(students, query)
                    break
                case "binary":
                    // Binary search returns single item or null
                    const result = studentManager.searchBinary(students, query)
                    results = result ? [result] : []
                    break
                default:
                    results = students
            }
        } catch (error) {
            console.error("Search error:", error)
            results = []
        }

        const end = performance.now()
        setExecutionTime(end - start)
        setFilteredStudents(results)
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <h2 className="text-3xl font-bold tracking-tight">Students</h2>
                <div className="flex flex-col md:flex-row w-full md:w-auto gap-2 md:space-x-2">
                    <AlgorithmControls
                        onSort={handleSort}
                        onSearch={handleSearch}
                        executionTime={executionTime}
                    />
                    <StudentImportExport onSuccess={fetchStudents} students={filteredStudents} />
                    <Dialog open={isDialogOpen} onOpenChange={(open) => {
                        setIsDialogOpen(open)
                        if (!open) {
                            setEditStudent(null)
                            if (editId) window.history.pushState({}, '', '/students')
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Student
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 text-black dark:text-white">
                            <DialogHeader>
                                <DialogTitle>{editStudent ? "Edit Student" : "Add Student"}</DialogTitle>
                                <DialogDescription>
                                    {editStudent ? "Update student details." : "Add a new student to the system."}
                                </DialogDescription>
                            </DialogHeader>
                            <StudentForm initialData={editStudent} onSuccess={handleSuccess} />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <StudentTable
                    columns={columns}
                    data={filteredStudents}
                    onSearch={(query) => handleSearch(currentSearch, query)}
                />
            )}
        </div>
    )
}

export default function StudentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StudentsContent />
        </Suspense>
    )
}
