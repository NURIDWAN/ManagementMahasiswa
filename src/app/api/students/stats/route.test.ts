import { createMocks } from 'node-mocks-http';
import { GET } from '@/app/api/students/stats/route';
import dbConnect from '@/lib/mongoose';
import StudentModel from '@/models/Student';

describe('Student Stats API', () => {
    beforeAll(async () => {
        await dbConnect();
        // Seed some data if necessary, or rely on existing data
        await StudentModel.deleteMany({});
        await StudentModel.create([
            { name: 'Student A', email: 'a@test.com', student_id: '123', major: 'CS', semester: 1 },
            { name: 'Student B', email: 'b@test.com', student_id: '124', major: 'CS', semester: 1 },
            { name: 'Student C', email: 'c@test.com', student_id: '125', major: 'IT', semester: 2 },
        ]);
    });

    afterAll(async () => {
        await StudentModel.deleteMany({});
    });

    it('should return correct stats', async () => {
        const { req } = createMocks({
            method: 'GET',
        });

        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data.totalStudents).toBe(3);

        // Check Major Data
        expect(data.majorData.categories).toContain('CS');
        expect(data.majorData.categories).toContain('IT');

        // Check Semester Data
        expect(data.semesterData.categories).toContain('Sem 1');
        expect(data.semesterData.categories).toContain('Sem 2');
    });
});
