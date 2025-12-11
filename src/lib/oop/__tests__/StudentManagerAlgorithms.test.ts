import { StudentManager } from '../StudentManager';
import { Student } from '../Student';

describe('StudentManager Algorithms', () => {
    let manager: StudentManager;
    let students: Student[];

    beforeEach(() => {
        manager = new StudentManager();
        students = [
            new Student({ _id: '1', name: 'Charlie', student_id: '103', major: 'CS', semester: 1, email: 'c@test.com' } as any),
            new Student({ _id: '2', name: 'Alice', student_id: '101', major: 'CS', semester: 1, email: 'a@test.com' } as any),
            new Student({ _id: '3', name: 'Bob', student_id: '102', major: 'IT', semester: 2, email: 'b@test.com' } as any),
        ];
    });

    test('Bubble Sort should sort students by name', () => {
        const sorted = manager.sortBubble(students);
        expect(sorted[0].name).toBe('Alice');
        expect(sorted[1].name).toBe('Bob');
        expect(sorted[2].name).toBe('Charlie');
    });

    test('Selection Sort should sort students by name', () => {
        const sorted = manager.sortSelection(students);
        expect(sorted[0].name).toBe('Alice');
        expect(sorted[1].name).toBe('Bob');
        expect(sorted[2].name).toBe('Charlie');
    });

    test('Shell Sort should sort students by name', () => {
        const sorted = manager.sortShell(students);
        expect(sorted[0].name).toBe('Alice');
        expect(sorted[1].name).toBe('Bob');
        expect(sorted[2].name).toBe('Charlie');
    });

    test('Sequential Search should find student by name', () => {
        const results = manager.searchSequential(students, 'Alice');
        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Alice');
    });

    test('Sequential Search should find student by ID', () => {
        const results = manager.searchSequential(students, '103');
        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Charlie');
    });
});
