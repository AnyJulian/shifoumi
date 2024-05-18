import { getMatches } from '../services/apiBackend';

export async function setLastMatchIdToLocalStorage() {
    try {
        const apiResponse = await getMatches();

        // Vérifier si l'apiResponse est un tableau et non vide
        if (Array.isArray(apiResponse) && apiResponse.length > 0) {
            // Trier les matchs par ordre décroissant en utilisant l'iat de user1
            apiResponse.sort((a, b) => b.user1.iat - a.user1.iat);

            // Récupérer l'_id du dernier match après le tri
            const lastMatchId = apiResponse[0]._id;

            // Enregistrer l'_id dans le stockage local sous le nom "idMatch"
            localStorage.setItem('idMatch', lastMatchId);
        } else {
            console.error('La réponse API est invalide ou vide.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des matchs:', error);
    }
}
