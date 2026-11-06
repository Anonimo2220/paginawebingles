import { useState, useEffect, useRef } from 'react';
import '../Grammar.css';

const BANK = [
    // --- 50 Palabras esenciales de vocabulario y contexto ---
    { word:'run',         ctx:'I __ every morning.',         opts:['correr','comer','dormir','cantar'],           ans:'correr' },
    { word:'beautiful',   ctx:'She is very __.',              opts:['feo','hermosa','rápido','pequeño'],           ans:'hermosa' },
    { word:'yesterday',   ctx:'I saw her __.',                opts:['mañana','ayer','siempre','nunca'],            ans:'ayer' },
    { word:'although',    ctx:'__ it rained, we went out.',   opts:['porque','aunque','sino','cuando'],            ans:'aunque' },
    { word:'achieve',     ctx:'I want to __ my goals.',       opts:['lograr','perder','olvidar','ignorar'],        ans:'lograr' },
    { word:'frequently',  ctx:'She __ visits her family.',    opts:['raramente','con frecuencia','jamás','tal vez'],ans:'con frecuencia' },
    { word:'grateful',    ctx:'I am __ for your help.',       opts:['enojado','agradecido','aburrido','confundido'],ans:'agradecido' },
    { word:'suggest',     ctx:'I __ going to the park.',      opts:['ordenar','sugerir','impedir','olvidar'],      ans:'sugerir' },
    { word:'exhausted',   ctx:'I feel __ after work.',        opts:['descansado','agotado','feliz','hambriento'],  ans:'agotado' },
    { word:'moreover',    ctx:"It's cheap; __, it's fast.",   opts:['sin embargo','además','aunque','pero'],       ans:'además' },
    { word:'abandon',     ctx:"Don't __ your dreams.",        opts:['perseguir','abandonar','crear','mejorar'],    ans:'abandonar' },
    { word:'hesitate',    ctx:"Don't __ to ask me.",          opts:['dudar','apresurarse','insistir','mentir'],    ans:'dudar' },
    { word:'reveal',      ctx:'She will __ the truth.',       opts:['ocultar','revelar','ignorar','negar'],        ans:'revelar' },
    { word:'beneath',     ctx:'The cat hid __ the table.',    opts:['encima','debajo','detrás','delante'],        ans:'debajo' },
    { word:'attempt',     ctx:'Make an __ to improve.',       opts:['excusa','intento','error','promesa'],         ans:'intento' },
    { word:'schedule',    ctx:'Check your __ for today.',     opts:['horario','comida','ropa','zapato'],           ans:'horario' },
    { word:'commute',     ctx:'My __ takes 40 minutes.',      opts:['viaje diario','sueño','almuerzo','cena'],     ans:'viaje diario' },
    { word:'routine',     ctx:'Morning __ is important.',     opts:['rutina','fiesta','problema','duda'],          ans:'rutina' },
    { word:'deadline',    ctx:'The __ is next Friday.',       opts:['plazo límite','premio','inicio','regalo'],    ans:'plazo límite' },
    { word:'errand',      ctx:'I have to run an __.',         opts:['mandado','partido','viaje','concierto'],      ans:'mandado' },
    { word:'chores',      ctx:'Doing __ helps at home.',      opts:['tareas domésticas','ejercicios','compras'],   ans:'tareas domésticas' },
    { word:'appliance',   ctx:'The new __ saves energy.',     opts:['electrodoméstico','libro','auto','zapato'],   ans:'electrodoméstico' },
    { word:'groceries',   ctx:'Buy fresh __ at market.',      opts:['víveres/comestibles','ropa','juguetes'],      ans:'víveres/comestibles' },
    { word:'negotiate',   ctx:'They need to __ the price.',   opts:['negociar','romper','olvidar','pintar'],       ans:'negociar' },
    { word:'pursue',      ctx:'__ your passion.',             opts:['perseguir','abandonar','ignorar','odiar'],    ans:'perseguir' },
    { word:'overcome',    ctx:'__ your fears today.',         opts:['superar','crear','comprar','perder'],         ans:'superar' },
    { word:'delegate',    ctx:'Good leaders __ tasks.',       opts:['delegano/asignan','ocultan','botan'],        ans:'delegar' },
    { word:'anticipate',  ctx:'We __ good results.',          opts:['anticipar/prever','temer','dudar'],           ans:'anticipar/prever' },
    { word:'maintain',    ctx:'__ a healthy lifestyle.',      opts:['mantener','destruir','olvidar','parar'],      ans:'mantener' },
    { word:'convince',    ctx:'Try to __ your boss.',         opts:['convencer','molestar','apagar','perder'],     ans:'convencer' },
    { word:'resilient',   ctx:'She is a __ person.',          opts:['resiliente/fuerte','débil','lenta'],          ans:'resiliente/fuerte' },
    { word:'ambitious',   ctx:'He has __ career goals.',      opts:['ambiciosos','pequeños','nulos','tristes'],    ans:'ambiciosos' },
    { word:'versatile',   ctx:'A __ tool is useful.',         opts:['versátil/adaptable','roto','caro'],           ans:'versátil/adaptable' },
    { word:'thrilling',   ctx:'The movie was __.',            opts:['emocionante','aburrido','lento','malo'],      ans:'emocionante' },
    { word:'meticulous',  ctx:'Be __ with your notes.',       opts:['meticuloso/detallista','descuidado'],         ans:'meticuloso/detallista' },
    { word:'adequate',    ctx:'The room size is __.',         opts:['adecuado/suficiente','malo','pequeño'],       ans:'adecuado/suficiente' },
    { word:'vibrant',     ctx:'The city is very __.',         opts:['vibrante/animado','apagado','triste'],        ans:'vibrante/animado' },
    { word:'confident',   ctx:'Feel __ when speaking.',       opts:['seguro de sí mismo','inseguro','miedoso'],    ans:'seguro de sí mismo' },
    { word:'patient',     ctx:'Please be __ with me.',        opts:['paciente','impaciente','grosero','enojado'],  ans:'paciente' },
    { word:'curious',     ctx:'Kids are naturally __.',       opts:['curiosos','aburridos','callados'],            ans:'curiosos' },
    { word:'reliable',    ctx:'He is a __ worker.',           opts:['confiable','mentiroso','perezoso'],           ans:'confiable' },
    { word:'explore',     ctx:'Let us __ the town.',          opts:['explorar','abandonar','cerrar'],              ans:'explorar' },
    { word:'decide',      ctx:'You must __ now.',             opts:['decidir','olvidar','dudar','esperar'],        ans:'decidir' },
    { word:'protect',     ctx:'__ your personal data.',       opts:['proteger','atacar','ignorar','perder'],       ans:'proteger' },
    { word:'solve',       ctx:'Can you __ this bug?',         opts:['resolver','crear','empeorar'],              ans:'resolver' },
    { word:'create',      ctx:'__ an awesome app.',           opts:['crear','destruir','borrar','copiar'],         ans:'crear' },
    { word:'organize',    ctx:'__ your desktop files.',       opts:['organizar','desordenar','tirar'],             ans:'organizar' },
    { word:'remember',    ctx:'Do you __ my name?',           opts:['recordar','olvidar','perder','ignorar'],      ans:'recordar' },
    { word:'listen',      ctx:'__ to instructions.',          opts:['escuchar','hablar','gritar','correr'],        ans:'escuchar' },
    { word:'practice',    ctx:'__ makes progress.',           opts:['la práctica','el descanso','el ocio'],        ans:'la práctica' }
];

const TOTAL_ROUNDS = 10; // Definimos una partida de 10 preguntas exactas

function shuffle(arr) { return [...arr].sort(() => Math.random() - .5); }
function showXP(msg) {
    const el = document.createElement('div'); el.className = 'xp-pop'; el.textContent = msg;
    document.body.appendChild(el); setTimeout(() => el.remove(), 700);
}

export default function ActivityWords() {
    const [running, setRunning]   = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore]       = useState(0);
    const [streak, setStreak]     = useState(0);
    const [round, setRound]       = useState(0);
    const [timer, setTimer]       = useState(100);
    const [queue, setQueue]       = useState([]);
    const [current, setCurrent]   = useState(null);
    const [answered, setAnswered] = useState(false);
    const [feedback, setFeedback] = useState('');
    const timerRef = useRef(null);

    function startGame() {
        const q = shuffle(BANK);
        setRunning(true);
        setGameOver(false);
        setScore(0);
        setStreak(0);
        setRound(1);
        setQueue(q.slice(1));
        loadWord(q[0]);
    }

    function loadWord(word) {
        setCurrent({ ...word, opts: shuffle(word.opts) });
        setAnswered(false); 
        setFeedback(''); 
        setTimer(100);
        clearInterval(timerRef.current);
        
        let t = 100;
        timerRef.current = setInterval(() => {
            t -= 1.67;
            setTimer(Math.max(0, t));
            if (t <= 0) {
                clearInterval(timerRef.current);
                timeout(word);
            }
        }, 166);
    }

    function timeout(word) {
        setAnswered(true);
        setStreak(0);
        setFeedback(`⏱️ ¡Tiempo! Era: ${word.ans}`);
        setTimeout(() => advance(), 1500);
    }

    function choose(opt) {
        if (answered || !current) return;
        clearInterval(timerRef.current);
        setAnswered(true);
        
        if (opt === current.ans) {
            const bonus = Math.round(timer / 10);
            setScore(s => s + 10 + bonus);
            setStreak(s => s + 1);
            setFeedback('✅ ¡Correcto!');
            showXP(`+${10 + bonus} XP`);
        } else {
            setStreak(0);
            setFeedback(`❌ Era: ${current.ans}`);
        }
        setTimeout(() => advance(), 1200);
    }

    function advance() {
        if (round >= TOTAL_ROUNDS) {
            // Fin de la partida
            clearInterval(timerRef.current);
            setRunning(false);
            setGameOver(true);
            return;
        }

        setRound(r => r + 1);
        setQueue(q => {
            const next = q.length ? q : shuffle(BANK);
            loadWord(next[0]);
            return next.slice(1);
        });
    }

    useEffect(() => () => clearInterval(timerRef.current), []);

    return (
        <div>
            <div className="gr-act-header">
                <div>
                    <h3>Palabras rápidas</h3>
                    <p>Desafío cronometrado de {TOTAL_ROUNDS} preguntas</p>
                </div>
                {!running && (
                    <button className="gat-btn active" onClick={startGame}>
                        {gameOver ? '🔄 Jugar de nuevo' : '▶ Comenzar'}
                    </button>
                )}
            </div>

            <div className="word-stream">
                {!running && !gameOver && (
                    <div style={{textAlign: 'center', padding: '30px 0'}}>
                        <p style={{color: 'var(--muted)', marginBottom: '16px'}}>Pon a prueba tu agilidad mental con 50 palabras clave del idioma.</p>
                        <button className="gat-btn active" style={{padding: '12px 24px', fontSize: '1rem'}} onClick={startGame}>
                            Comenzar desafío
                        </button>
                    </div>
                )}

                {gameOver && (
                    <div style={{textAlign: 'center', padding: '20px 0'}}>
                        <h4 style={{fontFamily: 'Syne', fontSize: '1.4rem', color: '#2ab5a0', marginBottom: '10px'}}>🎉 ¡Desafío Completado!</h4>
                        <p style={{fontSize: '1.1rem', color: '#fff', marginBottom: '8px'}}>Puntaje final: <strong style={{color: '#ff8533'}}>{score} pts</strong></p>
                        <p style={{fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '20px'}}>Completaste las {TOTAL_ROUNDS} preguntas con éxito.</p>
                        <button className="gat-btn active" onClick={startGame}>
                            🔄 Jugar otra vez
                        </button>
                    </div>
                )}

                {running && (
                    <>
                        <div className="ws-score-bar">
                            <div>
                                <div className="ws-score">{score}</div>
                                <div style={{fontSize:11,color:'var(--muted)'}}>Puntos</div>
                            </div>
                            <div style={{fontSize:13,color:'var(--muted2)'}}>Pregunta: <span style={{color:'#fff',fontWeight:700}}>{round}/{TOTAL_ROUNDS}</span></div>
                            <div style={{fontSize:13,color:'var(--muted2)'}}>Racha: <span style={{color:'var(--gold)',fontWeight:700}}>{streak}</span></div>
                            <div style={{fontSize:12,color:'var(--muted)'}}>{Math.ceil(timer/10)}s</div>
                        </div>

                        {/* Timer bar */}
                        <div className="ws-timer"><div className="ws-timer-fill" style={{width:`${timer}%`}} /></div>

                        {/* Pregunta */}
                        <div className="act-box" style={{background: 'transparent', border: 'none', padding: 0, boxShadow: 'none'}}>
                            <div className="act-word">{current?.word || '—'}</div>
                            <div className="act-word-ctx">{current?.ctx.replace('__','____') || ''}</div>
                            <div className="act-options">
                                {(current?.opts || []).map(opt => (
                                    <button
                                        key={opt}
                                        className={`act-opt ${answered ? (opt === current.ans ? 'correct' : '') : ''}`}
                                        disabled={answered}
                                        onClick={() => choose(opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            <div className={`act-feedback ${feedback.startsWith('✅') ? 'ok' : feedback ? 'err' : ''}`} style={{marginTop: '16px', textAlign: 'center'}}>
                                {feedback}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}