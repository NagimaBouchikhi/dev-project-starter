// api/list-models.js
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const ai = new GoogleGenAI({ apiKey: API_KEY });

    try {
        console.log("Fetching models...");
        const response = await ai.models.list();
        
        const allModels = [];
        
        // On récupère TOUT sans aucun "if"
        for await (const model of response) {
            allModels.push(model);
        }

        // On renvoie le résultat brut pour analyser
        return res.status(200).json({ 
            message: "Succès",
            totalFound: allModels.length,
            // On liste juste les noms pour voir ce qui est dispo
            modelNames: allModels.map(m => m.name),
            // On affiche tout le détail du premier modèle pour voir la structure
            firstModelDetails: allModels[0] || "Aucun modèle trouvé"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message, stack: error.stack });
    }
}