import { GoogleGenAI } from "@google/genai";

export default async function handler(req,res) {

    //securite: on accepte uniquement la req post 
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method Not Allowed'});
    }

    //On recup la clé depuis les variables d'env vercel 
    const API_KEY = process.env.GOOGLE_API_KEY
    if (!API_KEY) {
        return res.status(500).json({error: 'API Key not configured'});
    }

    try {
        //on recup context send by front
        const {promptContext} = req.body || {};
        if (!promptContext) return res.status(400).json({ error: 'Context missing' });

        //On config gemini 
        const ai = new GoogleGenAI({apiKey :API_KEY});
        
        //On prepare le prompt pour l'ai
        const finalPrompt = `
            Tu es un architecte logiciel expert (Tech Lead).
            L'utilisateur veut créer ce projet : "${promptContext}".

            Donne-lui 3 conseils très spécifiques, courts et techniques pour réussir ce projet précis.
            Ne fais pas de généralités. Parle de librairies spécifiques ou de pièges à éviter pour CE sujet.
            Format de réponse : Texte simple, bullet points.
        `;

        //on genere 
        const {response} = await ai.models.generateContent({
            model: "gemini-1.5-flash", 
            contents: [
                {
                    parts: [
                        { text: finalPrompt }
                    ]
                }
            ]
        });
        const text = response.text();
        
        return res.status(200).json({output:text});
    } catch(error) {
        console.error('Error generating content:', error);
        return res.status(500).json({error: 'Error generating content'});
    }
}