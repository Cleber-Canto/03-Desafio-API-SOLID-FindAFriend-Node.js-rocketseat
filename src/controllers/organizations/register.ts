import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeRegisterUseCase } from '../../shared/factories/make-register-use-case';
import { OrganizationAlreadyExists } from '../../shared/errors/organization-already-exists-error';
import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient(); // Crie uma instância do Prisma Client

export async function register(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const registerBodySchema = z.object({
        name: z.string(),
        responsable_name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        address: z.string(),
        city: z.string(),
        postal_code: z.string(),
    });

    const {
        name,
        responsable_name,
        email,
        password,
        address,
        city,
        postal_code,
    } = registerBodySchema.parse(request.body);

    console.log('Request body:', request.body); // Log do corpo da requisição

    try {
        // Se não houver exceções, o código abaixo será executado
        const registerUseCase = makeRegisterUseCase();

        // chamando o caso de uso e passando os params
        await registerUseCase.execute({
            name,
            responsable_name,
            email,
            password,
            address,
            city,
            postal_code,
        });

        console.log('Registration successful'); // Log de sucesso

        // Resposta de sucesso no Insomnia
        return response.status(201).send({
            success: true,
            message: 'Organization successfully registered.',
        });
    } catch (err) {
        console.error('Error during registration:', err); // Log de erro no console

        if (err instanceof OrganizationAlreadyExists) {
            console.error('OrganizationAlreadyExists:', err.message);
            return response.status(409).send({
                success: false,
                message: 'Organization already exists.',
            });
        }

        // Retornando um erro genérico
        throw err;
    } finally {
        await prisma.$disconnect(); // Desconecte o Prisma Client no final da função
    }
}
