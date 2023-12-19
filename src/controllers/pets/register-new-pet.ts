import { makeRegisterNewPetUseCase } from '../../shared/factories/make-register-new-pet-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function registerNewPet(
    request: FastifyRequest,
    response: FastifyReply,
) {
    const registerNewPetBodySchema = z.object({
        name: z.string(),
        description: z.string().nullable(),
        age: z.enum(['FILHOTE', 'ADULTO', 'SENIOR']),
        energy_level: z.enum(['CALM', 'PEACEFUL', 'FUSSY']),
        size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    });

    try {
        const organizationId = request.user.sub;
        const { name, description, age, energy_level, size } = request.body;

        console.log('Received values:', { name, description, age, energy_level, size });

        // Converta 'age' para string antes de validar
        const ageAsString = String(age);

        // Certifique-se de converter 'age' para uma string válida
        const ageEnum = ['FILHOTE', 'ADULTO', 'SENIOR'];
        const isValidAge = ageEnum.includes(ageAsString);

        if (!isValidAge) {
            console.error(`Invalid value for 'age'. Expected one of: ${ageEnum.join(', ')}`);
            throw new Error(`Invalid value for 'age'. Expected one of: ${ageEnum.join(', ')}`);
        }

        const registerNewPetUseCase = makeRegisterNewPetUseCase();

        // chamando o caso de uso e passando os params
        const { pet } = await registerNewPetUseCase.execute({
            name,
            description,
            age: ageAsString,
            energy_level,
            size,
            organization_id: organizationId,
        });

        console.log('Pet registration successful:', pet);

        return response.status(201).send({ success: true, pet, message: 'Pet successfully registered.' });
    } catch (error) {
        console.error('Error during pet registration:', error);

        return response.status(400).send({
            success: false,
            message: 'Invalid data provided for pet registration.',
            errors: error.errors,  // Adicione detalhes do erro no corpo da resposta
        });
    }
}
