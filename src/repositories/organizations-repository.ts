import { Organization, Prisma } from '@prisma/client';

// Tipando os métodos
export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findByEmailOrName(email: string, name: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
  findById(id: string): Promise<Organization | null>
  findPetsByCity(city: string): Promise<Organization[]>
}