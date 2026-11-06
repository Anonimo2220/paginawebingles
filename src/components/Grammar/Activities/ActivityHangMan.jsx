import { useState } from 'react';
import '../Grammar.css';

const WORDS = {
    easy: [
        { word:'APPLE',   hint:'Una fruta roja o verde' },
        { word:'SCHOOL',  hint:'Lugar donde se aprende' },
        { word:'HAPPY',   hint:'Sentirse contento' },
        { word:'TRAVEL',  hint:'Ir de un lugar a otro' },
        { word:'WATER',   hint:'Líquido esencial para vivir' },
        { word:'FRIEND',  hint:'Persona cercana y de confianza' },
        { word:'DOG',   hint:'Mascota comun, amigo del hombre' },
        { word:'SUN',  hint:'Estrella que ilumina el dia' },
    ],
    hard: [
        { word:'AMBITIOUS',   hint:'Que tiene grandes metas' },
        { word:'VOCABULARY',  hint:'Conjunto de palabras de un idioma' },
        { word:'FLUENTLY',    hint:'Con fluidez, sin dificultad' },
        { word:'KNOWLEDGE',   hint:'Información y comprensión adquirida' },
        { word:'PERSEVERE',   hint:'Continuar a pesar de los obstáculos' },
        { word:'ACCOMPLISH',  hint:'Lograr o completar con éxito' },
        { word:'FREQUENTLY',  hint:'Con mucha frecuencia' },
        { word:'CHALLENGE',   hint:'Situación difícil que requiere esfuerzo' },
    ],
};

const MAX_ERRORS = 6;
const BODY_PARTS = [
    <line key="head-stem" x1="70" y1="25" x2="70" y2="55" stroke="#ff5533" strokeWidth="3.5" strokeLinecap="round"/>,
    <circle key="head" cx="70" cy="64" r="10" stroke="#ff5533" strokeWidth="3.5" fill="none"/>,
    <line key="body" x1="70" y1="74" x2="70" y2="108" stroke="#ff5533" strokeWidth="3.5" strokeLinecap="round"/>,
    <line key="arm-l" x1="70" y1="84" x2="48" y2="100" stroke="#ff5533" strokeWidth="3.5" strokeLinecap="round"/>,
    <line key="arm-r" x1="70" y1="84" x2="92" y2="100" stroke="#ff5533" strokeWidth="3.5" strokeLinecap="round"/>,
    <line key="leg-l" x1="70" y1="108" x2="48" y2="132" stroke="#ff5533" strokeWidth="3.5" strokeLinecap="round"/>,
    <line key="leg-r" x1="70" y1="108" x2="92" y2="132" stroke="#ff5533" strokeWidth="3.5" strokeLinecap="round"/>,
];

function pickWord(diff) {
    const set = WORDS[diff];
    return set[Math.floor(Math.random() * set.length)];
}
function showXP(msg) {
    const el = document.createElement('div'); el.className = 'xp-pop'; el.textContent = msg;
    document.body.appendChild(el); setTimeout(() => el.remove(), 700);
}

export default function ActivityHangman() {
    const [diff, setDiff]       = useState('easy');
    const [pick, setPick]       = useState(() => pickWord('easy'));
    const [guessed, setGuessed] = useState([]);

    const errors  = guessed.filter(l => !pick.word.includes(l)).length;
    const won     = pick.word.split('').every(l => guessed.includes(l));
    const lost    = errors >= MAX_ERRORS;

    function guess(letter) {
        if (guessed.includes(letter) || won || lost) return;
        const next = [...guessed, letter];
        setGuessed(next);
        const newErrors = next.filter(l => !pick.word.includes(l)).length;
        if (pick.word.split('').every(l => next.includes(l))) showXP('');
        if (newErrors >= MAX_ERRORS) showXP('💀 Inténtalo de nuevo');
    }

    function reset(d = diff) {
        setDiff(d); setPick(pickWord(d)); setGuessed([]);
    }

    return (
        <div>
            <div className="gr-act-header">
                <div>
                    <h3>Ahorcado en inglés</h3>
                    <p>Adivina la palabra en inglés</p>
                </div>
                <div className="gr-act-tabs">
                    {['easy','hard'].map(d => (
                        <button
                            key={d}
                            className={`gat-btn ${diff === d ? 'active' : ''}`}
                            onClick={() => reset(d)}
                        >
                            {d === 'easy' ? 'Fácil' : 'Difícil'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="hangman-wrap">

                <div className="hangman-svg-wrap">
                    <svg width="140" height="150" viewBox="0 0 140 150">
                        {/* Estructura de la horca */}
                        <line x1="10" y1="145" x2="130" y2="145" stroke="#334155" strokeWidth="4" strokeLinecap="round"/>
                        <line x1="30" y1="145" x2="30"  y2="10"  stroke="#334155" strokeWidth="4" strokeLinecap="round"/>
                        <line x1="30" y1="10"  x2="70"  y2="10"  stroke="#334155" strokeWidth="4" strokeLinecap="round"/>
                        <line x1="70" y1="10"  x2="70"  y2="25"  stroke="#334155" strokeWidth="3" strokeLinecap="round"/>
                        {/* Dibujar Cuerpo (Partes del muñeco) */}
                        {BODY_PARTS.slice(0, errors)}
                    </svg>
                </div>

                <div style={{flex:1}}>
                    <div className="hangman-lives">
                        Errores: <span>{errors}/{MAX_ERRORS}</span>
                    </div>
                    <div style={{fontSize:12,color:'var(--muted2)',marginBottom:12}}>
                        💡 {pick.hint}
                    </div>

                    <div className="hangman-word">
                        {pick.word.split('').map((l, i) => (
                            <div className="hw-letter" key={i}>
                                {guessed.includes(l) ? l : ''}
                            </div>
                        ))}
                    </div>

                    <div className="hangman-keys">
                        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(k => {
                            const used = guessed.includes(k);
                            const cls  = used ? (pick.word.includes(k) ? 'used-ok' : 'used-err') : '';
                            return (
                                <button
                                    key={k}
                                    className={`hm-key ${cls}`}
                                    disabled={used || won || lost}
                                    onClick={() => guess(k)}
                                >
                                    {k}
                                </button>
                            );
                        })}
                    </div>

                    {won && (
                        <div style={{marginTop:14,fontWeight:700,color:'var(--teal)',fontSize:16}}>
                            <button className="gat-btn active" style={{marginLeft:10,fontSize:12,padding:'6px 12px'}} onClick={() => reset()}>
                                Otra palabra
                            </button>
                        </div>
                    )}
                    {lost && (
                        <div style={{marginTop:14,fontWeight:700,color:'var(--red)',fontSize:15}}>
                            💀 Era: {pick.word}
                            <button className="btn-ghost" style={{marginLeft:10,fontSize:12,padding:'6px 12px'}} onClick={() => reset()}>
                                Reintentar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
