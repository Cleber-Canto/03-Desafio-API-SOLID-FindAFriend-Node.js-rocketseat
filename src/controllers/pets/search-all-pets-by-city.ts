import { makeFetchAllPetsInASpecificCityUseCase } from '../../shared/factories/make-fetch-all-pets-in-a-specific-city-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function searchAllPetsByCity(
    request: FastifyRequest,
    response: FastifyReply,
) {
    try {
        // Adiciona logs para depuração
        console.log('Recebida solicitação para searchAllPetsByCity');

        const searchPetsParamsSchema = z.object({
            city: z.string(),
        });

        // Criação da cidade a partir dos parâmetros
        const { city } = searchPetsParamsSchema.parse(request.params);

        // Adiciona logs para depuração
        console.log('Parâmetros recebidos:', { city });

        const searchPetsByCityUseCase = makeFetchAllPetsInASpecificCityUseCase();

        const { pets } = await searchPetsByCityUseCase.execute({
            city,
        });

        // Adiciona logs para depuração
        console.log('Pets encontrados:', { pets });

        return response.status(200).send({
            pets,
        });
    } catch (error) {
        // Adiciona logs para depuração de erros
        console.error('Erro ao processar a solicitação:', error);

        // Trata erros específicos, se necessário
        if (error instanceof z.ZodError) {
            return response.status(400).send({
                error: 'Erro de validação',
                details: error.errors,
            });
        }

        // Retorna um erro genérico
        return response.status(500).send({
            error: 'Erro interno do servidor',
        });
    }
}
