import { PrismaOrganizationsRepository } from '../../repositories/prisma/prisma-organizations-repository';
import { AuthenticateUseCase } from '../../use-cases/authenticate';

export function makeAuthenticateUseCase() {
    const organizationRepository = new PrismaOrganizationsRepository();
    const authenticateUseCase = new AuthenticateUseCase(organizationRepository);

    return authenticateUseCase;
}