import { Student } from '@/lib/oop/Student';

describe('Student Class', () => {
    const mockStudentData = {
        _id: '12345',
        name: 'John Doe',
        student_id: '12345678',
        major: 'CS',
        semester: 1,
        email: 'john@example.com',
        created_at: new Date(),
    };

    it('should create a student instance correctly', () => {
        const student = new Student(mockStudentData);
        expect(student.name).toBe('John Doe');
        expect(student.student_id).toBe('12345678');
    });

    it('should validate correct data', () => {
        const student = new Student(mockStudentData);
        expect(student.validate()).toBe(true);
    });

    it('should fail validation for invalid email', () => {
        const student = new Student({ ...mockStudentData, email: 'invalid-email' });
        expect(student.validate()).toBe(false);
    });

    it('should fail validation for invalid name', () => {
        const student = new Student({ ...mockStudentData, name: 'John123' });
        expect(student.validate()).toBe(false);
    });

    it('should fail validation for invalid student_id', () => {
        const student = new Student({ ...mockStudentData, student_id: 'abc' });
        expect(student.validate()).toBe(false);
    });
});
