import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Student } from './oop/Student';

export const generateStudentPdf = (students: Student[]) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Student Report', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Table
    const tableColumn = ["ID", "Name", "Major", "Faculty", "Semester", "Email"];
    const tableRows: any[] = [];

    students.forEach(student => {
        const studentData = [
            student.student_id,
            student.name,
            student.major,
            student.faculty,
            student.semester,
            student.email,
        ];
        tableRows.push(studentData);
    });

    autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 35,
        theme: 'grid',
        styles: { fontSize: 8 },
        headStyles: { fillColor: [66, 66, 66] }
    });

    doc.save(`student-report-${Date.now()}.pdf`);
};
