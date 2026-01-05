import React, { useState } from 'react';
import { Bot, Copy, Check } from 'lucide-react';
import '../styles/AIPrompts.css';


interface AIPromptsProps {
    prompts: {
        label: string;
        content: string;
    }[];
}

export const AIPrompts: React.FC<AIPromptsProps> = ({prompts}) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);


    const handleCopy = (text : string , index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className='ai-prompts'>

            {/**Header */}
            <div className='ai-prompts-header'>
                <div className = "ai-prompts-header-icon">
                    <Bot size={24}/>
                </div>
                <div>
                    <h3 className='ai-prompts-title'>Assistant IA</h3>
                    <p className='ai-prompts-subtitle'>
                        Prompts contextuels prêts à l'emploi
                    </p>
                </div>
            </div>

            {/**Liste des prompts */}
            <div className='ai-prompt-list'>
                {prompts.map((prompt,index) => (
                    <div key={index} className='ai-prompt-item'>

                        <span className='ai-prompt-label'>{prompt.label}</span>

                        <button
                            className='ai-prompt-button'
                            onClick={() => handleCopy(prompt.content,index)}
                        >
                            <p className='ai-prompt-content'>
                                "{prompt.content}"
                            </p>
                            
                            <span
                                className={
                                    copiedIndex === index
                                        ? 'ai-prompt-icon copied'
                                        : 'ai-prompt-icon'
                                }
                            >
                                {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                            </span>
                        </button>
                    </div>
                ))}
                
            </div>

            {/**Footer */}
            <div className='ai-prompts-footer'>
                Copie le prompt et utilise-le dans ton outil IA préféré !
            </div>
        </div>
    );
};