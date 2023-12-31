import fastify from 'fastify';
import { organizationRoutes } from  '@/routes/organizations.routes';
import { ZodError } from 'zod';
import { env } from './env';
import { petRoutes } from '@/routes/pets.routes.js';
import fastifyJwt from '@fastify/jwt';

export const app = fastify();

// JWT
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.register(organizationRoutes);
app.register(petRoutes);

// Lidando com os erros genéricos
app.setErrorHandler((error, _request, response) => {
    if (error instanceof ZodError) {
        return response.status(400).send({
            message: 'Validation error.',
            issues: error.format(),
        });
    }

    // Mostrando o erro caso não esteja em produção
    if (env.NODE_ENV !== 'production') {
        console.error(error);
    }

    return response.status(500).send({ message: 'Internal Server Error.' });
});