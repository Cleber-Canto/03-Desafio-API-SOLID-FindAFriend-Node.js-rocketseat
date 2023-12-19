import { FastifyInstance } from 'fastify';
import { registerNewPet } from '../controllers/pets/register-new-pet';
import { getSpecificPet } from '../controllers/pets/get-specific-pet';
import { searchPets } from '../controllers/pets/search-pets';
import { searchAllPetsByCity } from '../controllers/pets/search-all-pets-by-city';
import { verifyJWT } from '../shared/middlewares/verify-jwt';

export async function petRoutes(app: FastifyInstance) {
    app.get('/pet/:id', getSpecificPet);
    app.get('/search/:city', searchPets);
    app.get('/searchByCity/:city', searchAllPetsByCity);

    // Autenticação
    app.post('/register/pet', { onRequest: [verifyJWT] }, registerNewPet);
}