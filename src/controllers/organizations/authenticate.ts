import { InvalidCredentials } from '@/shared/errors/invalid-credentials-erros';
import { makeAuthenticateUseCase } from '../../shared/factories/make-authenticate-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function authenticate(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        console.log('Authentication request body:', request.body); // Log do corpo da requisição

        const authenticateUseCase = makeAuthenticateUseCase();

        // chamando o caso de uso e passando os params
        const { organization } = await authenticateUseCase.execute({
            email,
            password,
        });

        console.log('Authentication successful'); // Log de sucesso

        // jwt
        const authToken = await response.jwtSign(
            {},
            {
                sign: {
                    sub: organization.id,
                },
            },
        );
        return response.status(200).send({ authToken });
    } catch (err) {
        console.error('Error during authentication:', err); // Log de erro no console

        if (err instanceof InvalidCredentials) {
            console.error('InvalidCredentials:', err.message);
            return response.status(400).send({
                message: err.message,
            });
        }

        // Retornando um erro genérico
        throw err;
    }
}
