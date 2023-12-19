import { FastifyInstance } from 'fastify';
import { register } from '../controllers/organizations/register';
import { authenticate } from '../controllers/organizations/authenticate';

export async function organizationRoutes(app: FastifyInstance) {
    app.post('/register', register);
    app.post('/session', authenticate);
}