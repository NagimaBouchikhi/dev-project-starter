import { GoogleGenerativeAI } from "@google/generative-ai";

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
        const {promptContext} = req.body;

        //On config gemini 
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({model : 'gemini-pro'}); //modele rapide et gratuit 

        //On prepare le prompt pour l'ai
        const finalPrompt = `
            Tu es un architecte logiciel expert (Tech Lead).
            L'utilisateur veut créer ce projet : "${promptContext}".

            Donne-lui 3 conseils très spécifiques, courts et techniques pour réussir ce projet précis.
            Ne fais pas de généralités. Parle de librairies spécifiques ou de pièges à éviter pour CE sujet.
            Format de réponse : Texte simple, bullet points.
        `;

        //on genere 
        const result = await model.generateContent(finalPrompt);
        const response = await result.response;
        const text = response.text();
        
        return res.status(200).json({output:text});
    } catch(error) {
        console.error('Error generating content:', error);
        return res.status(500).json({error: 'Error generating content'});
    }
}