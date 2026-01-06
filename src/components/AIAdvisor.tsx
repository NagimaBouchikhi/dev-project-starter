import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import '../styles/AIAdvisor.css'

export const AIAdvisor: React.FC = () => {
    
    const [description, setDescription] = useState('');
    const [advice, setAdvice] = useState('');
    const [loading,setLoading] = useState(false);

    const handleAskAI = async () => {
        if (!description.trim()) return;

        setLoading(true);
        setAdvice('');

        try {
            const response = await fetch('api/generate',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({promptContext: description})
            });

            const data = await response.json()
            setAdvice(data.output ?? "L'IA n'a pas pu repondre");
        } catch (error) {
            console.error(error);
            setAdvice('Erreur de connexion');
        } finally {
            setLoading(false)
        }
    };


    return (
        <section className='ai-advisor app-card'>

            {/**Header */}
            <header className='ai-advisor-header'>
                <Sparkles className='ai-advisor-icon'/> 
                <h3 className='ai-advisor-title'>
                    Conseiller IA personnalisé
                </h3>
            </header>

            {/**Description */}
            <p className="ai-advisor-description">
                Décris ton projet et recoit des conseils techiniques adaptés 
                (stack, architecture, bonnes pratiques).
            </p>

            {/**Input */}
            <div className="ai-advisor-form">
                <input 
                    type="text" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ex: Une app web pour organiser ma journée "
                    className='ai-advisor-input'
                    onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                />

                <button
                    className='ai-advisor-submit'
                    onClick={handleAskAI}
                    disabled={loading || !description}
                >
                    {loading ? (
                        <Loader2 className='ai-advisor-loading'/>
                    ) : (
                        <Send/>
                    )}
                    <span>Générer</span>
                </button>
            </div>

            {/**Response */}
            {advice && (
                <div className='ai-advisor-response'>
                    <h4 className='ai-advisor-response-title'>
                        Conseil de l'architecte 
                    </h4>
                    <div className='ai-advisor-response-client'>
                        {advice}
                    </div>
                </div>
            )}

        </section>

    )
}