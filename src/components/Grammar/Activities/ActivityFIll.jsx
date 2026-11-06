import { useState } from 'react';
import '../Grammar.css';

const SETS = {
    present: [
        { before:'She usually', after:'to school by metro.', answer:'goes',          hint:'He/She/It → verbo + s' },
        { before:'They',        after:'TV on weekdays.',     answer:"don't watch",   hint:'Negativo: do not + verbo base' },
        { before:'',            after:'French?',             answer:'Do you speak',  hint:'Pregunta: Do + sujeto + verbo' },
        { before:'He',          after:'every night for two hours.', answer:'studies', hint:'study → studies (regla -y)' },
        { before:'I',           after:'spicy food very much.', answer:"don't like",  hint:'I/You/We/They → do not' },
    ],
    past: [
        { before:'Yesterday I', after:'to the market.',     answer:'went',          hint:'go → went (irregular)' },
        { before:'She',         after:'me last night.',     answer:"didn't call",   hint:'Negativo: didn\'t + verbo base' },
        { before:'',            after:'that movie last weekend?', answer:'Did you see', hint:'Pregunta: Did + sujeto + base' },
        { before:'They',        after:'pizza for dinner.',  answer:'ate',           hint:'eat → ate (irregular)' },
        { before:'He',          after:'all night for the exam.', answer:'studied',  hint:'study → studied (regular)' },
    ],
    future: [
        { before:'I',           after:'you with your homework tonight.', answer:"will help",  hint:"will → 'll + verbo base" },
        { before:'She',         after:'next summer.',       answer:'is going to travel', hint:'Plan: be + going to + verbo' },
        { before:'By 2030, we', after:'flying cars.',       answer:'will have developed', hint:'Future Perfect: will have + participio' },
        { before:'',            after:'to the party on Friday?', answer:'Will you come', hint:'Pregunta: Will + sujeto + base' },
        { before:'I',           after:'available this afternoon.', answer:"won't be", hint:"Negativo: won't + verbo" },
    ],
};

export default function ActivityFill() {
    const [tense, setTense]     = useState('present');
    const [values, setValues]   = useState({});
    const [results, setResults] = useState({});

    const items = SETS[tense];

    function switchTense(t, btn) {
        setTense(t); setValues({}); setResults({});
    }

    function check(i) {
        const val = (values[i] || '').trim().toLowerCase();
        const ans = items[i].answer.toLowerCase();
        setResults(r => ({ ...r, [i]: val === ans ? 'ok' : 'err' }));
    }

    return (
        <div>
            <div className="gr-act-header">
                <div>
                    <h3>Completa la frase</h3>
                    <p>Escribe la forma correcta del verbo</p>
                </div>
                <div className="gr-act-tabs">
                    {['present','past','future'].map(t => (
                        <button
                            key={t}
                            className={`gat-btn ${tense === t ? 'active' : ''}`}
                            onClick={() => switchTense(t)}
                        >
                            {{ present:'Presente', past:'Pasado', future:'Futuro' }[t]}
                        </button>
                    ))}
                </div>
            </div>

            {items.map((item, i) => {
                const res = results[i];
                return (
                    <div className="act-box" key={`${tense}-${i}`}>
                        <h4>Frase {i + 1} de {items.length}</h4>
                        <div className="act-sentence">
                            {item.before && `${item.before} `}
                            <input
                                className="act-blank"
                                type="text"
                                placeholder="________"
                                autoComplete="off"
                                value={values[i] || ''}
                                style={{
                                    color: res === 'ok' ? 'var(--teal)' : res === 'err' ? 'var(--red)' : 'var(--red)',
                                    borderBottomColor: res === 'ok' ? 'var(--teal)' : 'var(--red)',
                                }}
                                onChange={e => setValues(v => ({ ...v, [i]: e.target.value }))}
                                onKeyDown={e => e.key === 'Enter' && check(i)}
                            />
                            {item.after && ` ${item.after}`}
                        </div>
                        <div className="act-hint">💡 {item.hint}</div>
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:14}}>
                            <div className={`act-feedback ${res === 'ok' ? 'ok' : res === 'err' ? 'err' : ''}`} style={{textAlign:'left'}}>
                                {res === 'ok' ? '✅ ¡Perfecto!' : res === 'err' ? `❌ Era: ${item.answer}` : ''}
                            </div>
                            <button className="gat-btn active" style={{fontSize:12,padding:'8px 16px'}} onClick={() => check(i)}>
                                Verificar →
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}