import { makeSearchPetsUseCase } from '../../shared/factories/make-search-pets-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { PetNotExistingInDatabaseError } from '../../shared/errors/pet-not-existing-in-database-error';

export async function searchPets(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const searchPetsParamsSchema = z.object({
        city: z.string(),
    });

    const searchPetsQuerySchema = z.object({
        age: z.enum(['FILHOTE', 'ADULTO', 'SENIOR']).optional(),
        energy_level: z.enum(['CALM', 'PEACEFUL', 'FUSSY']).optional(),
        size: z.enum(['SMALL', 'MEDIUM', 'BIG']).optional(),
    });

    const { city } = searchPetsParamsSchema.parse(request.params);
    const { age, energy_level, size } = searchPetsQuerySchema.parse(request.query);

    try {
        const searchPetsUseCase = makeSearchPetsUseCase();

        const { pets } = await searchPetsUseCase.execute({
            city,
            age: age ?? null,
            energy_level: energy_level ?? null,
            size: size ?? null,
        });

        return response.status(200).send({
            pets,
        });
    } catch (err) {
        if (err instanceof PetNotExistingInDatabaseError) {
            return response.status(409).send({
                message: err.message,
            });
        }

        // Retornando um erro genérico
        throw err;
    }
}