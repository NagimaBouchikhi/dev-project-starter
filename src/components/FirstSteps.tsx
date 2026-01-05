import React, { useEffect, useState } from 'react';
import { Terminal, Play, Check, Copy} from 'lucide-react';
import '../styles/FirstSteps.css';


interface FirstStepsProps {
    steps: string[];
}

export const FirstSteps: React.FC<FirstStepsProps> = ({steps}) => {

    const [copied,setCopied] = useState(false);
    const [lineIndex,setLineIndex] = useState(0);
    const [charIndex,setCharIndex] = useState(0);

    const currentLine = steps[lineIndex] ?? '';

    /**Typing Animation */
    useEffect(() => {
        if (lineIndex >= steps.length) return;

        if (charIndex < currentLine.length) {
            const timeout = setTimeout(() => {
                setCharIndex(charIndex + 1); 
            },35); //vitesse de frappe
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setLineIndex(lineIndex +1);
                setCharIndex(0);
            },500); //pause entre les lignes 
            return () => clearTimeout(timeout);
        }
    },[charIndex,lineIndex,currentLine,steps.length]);

    /**Copied toute les commandes  */
    const handleCopy = async () => {
        await navigator.clipboard.writeText(steps.join('\n'));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (

        <div className ="first-steps">

            {/**Header type terminal */}
            <div className='first-step-header'>
                <div className='terminal-controls'>
                    <span className='terminal-dot red'/>
                    <span className='terminal-dot yellow'/>
                    <span className='terminal-dot green'/>
                </div>

                <div className='terminal-title'>
                    <Terminal size={14}/>
                    <span>Premier commit Recommandé</span>
                    
                </div>
            </div>


            {/**Commande */}
            <div className='first-steps-content'>
                {steps.slice(0,lineIndex).map((step,index) => (
                    <div key = {index} className='terminal-line'>
                        <span className='terminal-prompt'>$</span>
                        <span 
                            className={
                                step.startsWith('//')
                                ? 'terminal-comment'
                                : 'terminal-command' 
                                }
                        
                        >
                            {step}
                        </span>
                    </div>
                ))}

                {lineIndex < steps.length && (
                    <div className='terminal-line'>
                        <span className='terminal-prompt'>$</span>
                         <span 
                            className={
                                currentLine.startsWith('//')
                                    ? 'terminal-comment'
                                    : 'terminal-command' 
                                }
                        >
                            {currentLine.slice(0,charIndex)}
                            <span className='cursor'>▋</span>
                        </span>

                    </div>
                )}
            </div>

            {/**Footer Play Icon */}
            <div className='first-steps-footer'>
                <div className='footer-left'>
                    <Play size={12}/>
                    <span>Copie ces commandes pour briser la glace.</span>
                </div>

                <button
                    className="copy-button"
                    onClick={handleCopy}
                    title="Copier toutes les commandes"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? 'Copié' : 'Copier'}
                </button>
            </div>
        </div>
    );
};