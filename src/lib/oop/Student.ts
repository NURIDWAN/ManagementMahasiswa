import { IStudent } from "@/models/Student";

export class Student {
    id: string;
    name: string;
    student_id: string;
    major: string;
    faculty: string;
    jurusanId?: string;
    falkutasId?: string;
    semester: number;
    email: string;

    constructor(data: any) {
        this.id = (data._id || data.id).toString();
        this.name = data.name;
        this.student_id = data.student_id;
        this.major = data.major;
        this.faculty = data.faculty || "";
        this.jurusanId = data.jurusanId;
        this.falkutasId = data.falkutasId;
        this.semester = data.semester;
        this.email = data.email;
    }

    validate(): boolean {
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
        const nameRegex = /^[A-Za-z ]+$/;
        const idRegex = /^[0-9]+$/;

        return (
            emailRegex.test(this.email) &&
            nameRegex.test(this.name) &&
            idRegex.test(this.student_id) &&
            this.semester > 0
        );
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            student_id: this.student_id,
            major: this.major,
            faculty: this.faculty,
            semester: this.semester,
            email: this.email,
        };
    }
}
