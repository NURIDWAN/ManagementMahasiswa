import { PrismaClient, Student as PrismaStudent, Falkutas, Jurusan } from "@prisma/client";
import { Student } from "./Student";

const prisma = new PrismaClient();

export class StudentManager {
    // Database operations
    async createStudent(data: any): Promise<Student> {
        const student = await prisma.student.create({
            data: {
                nama: data.name,
                nim: data.student_id,
                email: data.email,
                semester: data.semester,
                jurusanId: data.major, // Assuming major is passed as ID
                falkutasId: data.faculty, // Assuming faculty is passed as ID
            },
            include: {
                jurusan: true,
                falkutas: true
            }
        });
        return this.mapToStudent(student);
    }

    async updateStudent(id: string, data: any): Promise<Student | null> {
        try {
            const student = await prisma.student.update({
                where: { id },
                data: {
                    nama: data.name,
                    nim: data.student_id,
                    email: data.email,
                    semester: data.semester,
                    jurusanId: data.major,
                    falkutasId: data.faculty,
                },
                include: {
                    jurusan: true,
                    falkutas: true
                }
            });
            return this.mapToStudent(student);
        } catch (error) {
            return null;
        }
    }

    async deleteStudent(id: string): Promise<boolean> {
        try {
            await prisma.student.delete({
                where: { id },
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async getStudents(): Promise<Student[]> {
        const students = await prisma.student.findMany({
            orderBy: { createDate: 'desc' },
            include: {
                jurusan: true,
                falkutas: true
            }
        });
        console.log("Fetched students:", JSON.stringify(students, null, 2));
        return students.map(s => this.mapToStudent(s));
    }

    private mapToStudent(data: PrismaStudent & { jurusan?: Jurusan, falkutas?: Falkutas }): Student {
        return new Student({
            _id: data.id,
            name: data.nama,
            student_id: data.nim,
            major: data.jurusan?.nama || data.jurusanId, // Use name if available, else ID
            faculty: data.falkutas?.nama || data.falkutasId,
            jurusanId: data.jurusanId,
            falkutasId: data.falkutasId,
            semester: data.semester,
            email: data.email,
            created_at: data.createDate,
            // Add extra fields if needed by Student class
        } as any);
    }

    // Search Algorithms (In-Memory)
    searchLinear(students: Student[], query: string): Student[] {
        const results: Student[] = [];
        for (const student of students) {
            if (
                student.name.toLowerCase().includes(query.toLowerCase()) ||
                student.student_id.includes(query)
            ) {
                results.push(student);
            }
        }
        return results;
    }

    // Explicit Sequential Search (Alias for Linear Search)
    searchSequential(students: Student[], query: string): Student[] {
        return this.searchLinear(students, query);
    }

    searchBinary(students: Student[], targetId: string): Student | null {
        // Binary search requires sorted array
        const sorted = [...students].sort((a, b) => a.student_id.localeCompare(b.student_id));
        let left = 0;
        let right = sorted.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (sorted[mid].student_id === targetId) {
                return sorted[mid];
            }
            if (sorted[mid].student_id < targetId) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }

    // Sorting Algorithms
    sortInsertion(students: Student[]): Student[] {
        const arr = [...students];
        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;
            while (j >= 0 && arr[j].name > current.name) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = current;
        }
        return arr;
    }

    sortBubble(students: Student[]): Student[] {
        const arr = [...students];
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j].name > arr[j + 1].name) {
                    // Swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }

    sortSelection(students: Student[]): Student[] {
        const arr = [...students];
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                if (arr[j].name < arr[minIdx].name) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            }
        }
        return arr;
    }

    sortShell(students: Student[]): Student[] {
        const arr = [...students];
        let n = arr.length;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i += 1) {
                let temp = arr[i];
                let j;
                for (j = i; j >= gap && arr[j - gap].name > temp.name; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
            }
        }
        return arr;
    }

    sortMerge(students: Student[]): Student[] {
        if (students.length <= 1) return students;

        const mid = Math.floor(students.length / 2);
        const left = this.sortMerge(students.slice(0, mid));
        const right = this.sortMerge(students.slice(mid));

        return this.merge(left, right);
    }

    private merge(left: Student[], right: Student[]): Student[] {
        let resultArray: Student[] = [], leftIndex = 0, rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].name < right[rightIndex].name) {
                resultArray.push(left[leftIndex]);
                leftIndex++;
            } else {
                resultArray.push(right[rightIndex]);
                rightIndex++;
            }
        }

        return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }
}
