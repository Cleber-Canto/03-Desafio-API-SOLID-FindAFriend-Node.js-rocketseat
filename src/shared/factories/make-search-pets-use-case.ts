import { SearchPetsUseCase } from '../../use-cases/search-pets';
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pet-repository';

export function makeSearchPetsUseCase() {
    const petsRepository = new PrismaPetsRepository();

    const searchPetsUseCase = new SearchPetsUseCase(petsRepository);

    return searchPetsUseCase;
}