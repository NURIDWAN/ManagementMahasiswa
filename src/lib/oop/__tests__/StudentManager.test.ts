import { StudentManager } from '@/lib/oop/StudentManager';
import { Student } from '@/lib/oop/Student';

// Mock mongoose model to avoid DB connection
jest.mock('@/models/Student', () => ({
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    find: jest.fn(),
}));

describe('StudentManager Algorithms', () => {
    const manager = new StudentManager();

    const students = [
        new Student({ _id: '1', name: 'Charlie', student_id: '300', major: 'CS', semester: 1, email: 'c@c.com', created_at: new Date() }),
        new Student({ _id: '2', name: 'Alice', student_id: '100', major: 'CS', semester: 1, email: 'a@a.com', created_at: new Date() }),
        new Student({ _id: '3', name: 'Bob', student_id: '200', major: 'CS', semester: 1, email: 'b@b.com', created_at: new Date() }),
    ];

    describe('Linear Search', () => {
        it('should find student by name', () => {
            const results = manager.searchLinear(students, 'Alice');
            expect(results).toHaveLength(1);
            expect(results[0].name).toBe('Alice');
        });

        it('should find student by ID', () => {
            const results = manager.searchLinear(students, '200');
            expect(results).toHaveLength(1);
            expect(results[0].name).toBe('Bob');
        });

        it('should return empty for no match', () => {
            const results = manager.searchLinear(students, 'XYZ');
            expect(results).toHaveLength(0);
        });
    });

    describe('Binary Search', () => {
        it('should find student by ID', () => {
            const result = manager.searchBinary(students, '200');
            expect(result).not.toBeNull();
            expect(result?.name).toBe('Bob');
        });

        it('should return null for no match', () => {
            const result = manager.searchBinary(students, '999');
            expect(result).toBeNull();
        });
    });

    describe('Insertion Sort', () => {
        it('should sort students by name', () => {
            const sorted = manager.sortInsertion(students);
            expect(sorted[0].name).toBe('Alice');
            expect(sorted[1].name).toBe('Bob');
            expect(sorted[2].name).toBe('Charlie');
        });
    });

    describe('Merge Sort', () => {
        it('should sort students by name', () => {
            const sorted = manager.sortMerge(students);
            expect(sorted[0].name).toBe('Alice');
            expect(sorted[1].name).toBe('Bob');
            expect(sorted[2].name).toBe('Charlie');
        });
    });
});
