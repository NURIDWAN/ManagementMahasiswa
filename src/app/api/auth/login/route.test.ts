import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/auth/login/route';
import { POST as POST_USER } from '@/app/api/user/login/route';

describe('Login API Integration Tests', () => {
    it('should return 400 if fields are missing (Auth Route)', async () => {
        const { req } = createMocks({
            method: 'POST',
            body: {
                email: '',
                password: '',
            },
        });
        const response = await POST(req as any);
        expect(response.status).toBe(400);
    });

    it('should return 400 if fields are missing (User Route)', async () => {
        const { req } = createMocks({
            method: 'POST',
            body: {
                email: '',
                password: '',
            },
        });
        const response = await POST_USER(req as any);
        expect(response.status).toBe(400);
    });
});
