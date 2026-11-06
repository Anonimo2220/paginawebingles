import { useState } from 'react';
import ActivityVocab from './Activities/ActivityVocab.jsx';
import ActivityWords from './Activities/ActivityWords.jsx';
import ActivityFill  from './Activities/ActivityFIll.jsx';
import ActivityHangman from "./Activities/ActivityHangMan.jsx";
import './Grammar.css';

const NAV = [
    { id:'present', icon:'🟢', label:'Presente',        group:'Tiempos verbales' },
    { id:'past',    icon:'🔵', label:'Pasado',           group:'Tiempos verbales' },
    { id:'future',  icon:'🟣', label:'Futuro',           group:'Tiempos verbales' },
    { id:'vocab',   icon:'🟡', label:'Vocabulario',      group:'Actividades'      },
    { id:'words',   icon:'🟤', label:'Palabras rápidas', group:'Actividades'      },
    { id:'fill',    icon:'⚫', label:'Completar frase',  group:'Actividades'      },
    { id:'hangman', icon:'🔴', label:'Ahorcado',          group:'Actividades'      },
];

export default function Grammar() {
    const [active, setActive]   = useState('present');
    const [navOpen, setNavOpen] = useState(true);

    const groups = [...new Set(NAV.map(n => n.group))];
    const current = NAV.find(n => n.id === active);

    return (
        <div className="grammar-shell">
            <div className={`gr-nav ${navOpen ? '' : 'gr-nav--closed'}`}>
                <button
                    className="gr-nav-toggle"
                    onClick={() => setNavOpen(o => !o)}
                    title={navOpen ? 'Ocultar menú' : 'Mostrar menú'}
                >
                    {navOpen ? '⫶☰' : '⫶☰'}
                </button>

                {/* Items solo cuando está abierto */}
                {navOpen && groups.map(g => (
                    <div key={g}>
                        <div className="gr-nav-section">{g}</div>
                        {NAV.filter(n => n.group === g).map(item => (
                            <div
                                key={item.id}
                                className={`gr-nav-item ${active === item.id ? 'active' : ''}`}
                                onClick={() => setActive(item.id)}
                            >
                                <span className="gni">{item.icon}</span> {item.label}
                            </div>
                        ))}
                    </div>
                ))}

                {!navOpen && NAV.map(item => (
                    <div
                        key={item.id}
                        className={`gr-nav-icon-only ${active === item.id ? 'active' : ''}`}
                        onClick={() => setActive(item.id)}
                        title={item.label}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>

            <div className="gr-content">
                {active === 'present' && <SectionPresent onNavigate={setActive} />}
                {active === 'past'    && <SectionPast    onNavigate={setActive} />}
                {active === 'future'  && <SectionFuture  onNavigate={setActive} />}
                {active === 'vocab'   && <ActivityVocab  />}
                {active === 'words'   && <ActivityWords  />}
                {active === 'fill'    && <ActivityFill   />}
                {active === 'hangman'    && <ActivityHangman   />}
            </div>

        </div>
    );
}

function SectionPresent({ onNavigate }) {
    return (
        <div>
            <div className="gr-hero">
                <div className="gr-tag present">Simple Present</div>
                <h2>Presente Simple en Inglés</h2>
                <p>El presente simple se usa para hábitos, rutinas, hechos generales y verdades universales. Es el tiempo verbal más usado en inglés cotidiano.</p>
            </div>
            <div className="gr-grid">
                {[
                    { title:'Afirmativo',         body:'Sujeto + verbo base. Con he/she/it se añade -s o -es.',  ex:<>I <span>work</span> every day.<br/>She <span>works</span> at 9 AM.</> },
                    { title:'Negativo',            body:'Sujeto + do/does not + verbo base.',                     ex:<>I <span>don't work</span> on Sunday.<br/>He <span>doesn't like</span> coffee.</> },
                    { title:'Pregunta',            body:'Do/Does + sujeto + verbo base?',                         ex:<><span>Do</span> you speak English?<br/><span>Does</span> she play tennis?</> },
                    { title:'Presente Continuo', body:'Acción en progreso. Sujeto + be + verbo-ing.',            ex:<>I <span>am studying</span> English.<br/>They <span>are watching</span> TV.</> },
                ].map((c,i) => <GrCard key={i} {...c} />)}
            </div>
            <GrTable headers={['Pronombre','Afirmativo','Negativo','Pregunta']} rows={[
                ['I','work','don\'t work','Do I work?'],
                ['You','speak','don\'t speak','Do you speak?'],
                ['He/She/It','works','doesn\'t work','Does he work?'],
                ['We/They','play','don\'t play','Do they play?'],
            ]} negCol={2} />
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:8}}>
                <button className="gat-btn active"   onClick={() => onNavigate('fill')}>Practicar</button>
                <button className="gat-btn active" onClick={() => onNavigate('vocab')}>Vocabulario</button>
            </div>
        </div>
    );
}

function SectionPast({ onNavigate }) {
    return (
        <div>
            <div className="gr-hero">
                <div className="gr-tag past">Simple Past</div>
                <h2>Pasado Simple en Inglés</h2>
                <p>El pasado simple expresa acciones completadas en el pasado. Los verbos pueden ser regulares (ed) o irregulares (forma propia).</p>
            </div>
            <div className="gr-grid">
                {[
                    { title:'Verbos regulares',   body:'Verbo base + ed para todas las personas.',          ex:<>I <span>walked</span> to school.<br/>She <span>studied</span> all night.</> },
                    { title:'Verbos irregulares', body:'Forma única que debes memorizar. ¡No sigue reglas!', ex:<>I <span>went</span> (go → went)<br/>She <span>saw</span> (see → saw)</> },
                    { title:'Negativo',            body:"Sujeto + didn't + verbo base.",                      ex:<>I <span>didn't go</span> to the party.<br/>He <span>didn't eat</span> breakfast.</> },
                    { title:'Pregunta',            body:'Did + sujeto + verbo base?',                         ex:<><span>Did</span> you enjoy the movie?<br/><span>Did</span> she call you?</> },
                ].map((c,i) => <GrCard key={i} {...c} />)}
            </div>
            <GrTable headers={['Infinitivo','Pasado','Participio','Significado']} rows={[
                ['go','went','gone','ir'],['see','saw','seen','ver'],
                ['eat','ate','eaten','comer'],['have','had','had','tener'],
                ['make','made','made','hacer'],['come','came','come','venir'],
                ['take','took','taken','tomar'],['know','knew','known','saber'],
            ]} negCol={-1} />
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:8}}>
                <button className="gat-btn active"   onClick={() => onNavigate('hangman')}>Jugar ahorcado</button>
                <button className="gat-btn active" onClick={() => onNavigate('words')}>Palabras rápidas</button>
            </div>
        </div>
    );
}

function SectionFuture({ onNavigate }) {
    return (
        <div>
            <div className="gr-hero">
                <div className="gr-tag future">Future Tenses</div>
                <h2>Futuro en Inglés</h2>
                <p>El inglés tiene varias formas de expresar el futuro. Las más comunes son <strong>will</strong> y <strong>be going to</strong>.</p>
            </div>
            <div className="gr-grid">
                {[
                    { title:'Will — decisión instantánea', body:'Decisiones en el momento, predicciones y promesas.',  ex:<>I <span>will help</span> you with that.<br/>It <span>will rain</span> tomorrow.</> },
                    { title:'Be going to — plan previo',   body:'Planes ya decididos e intenciones.',                  ex:<>I <span>am going to study</span> tonight.<br/>She <span>is going to</span> travel.</> },
                    { title:'Present Continuous',           body:'Arreglos ya acordados en el futuro cercano.',         ex:<>I <span>am meeting</span> her at 5.<br/>We <span>are flying</span> on Friday.</> },
                    { title:'Future Perfect',              body:'Acción completada antes de un punto futuro.',         ex:<>By 2030, I <span>will have graduated</span>.<br/>She <span>will have finished</span> by noon.</> },
                ].map((c,i) => <GrCard key={i} {...c} />)}
            </div>
            <GrTable headers={['Situación','Forma','Ejemplo']} rows={[
                ['Decisión espontánea','will','"I\'ll answer the phone."'],
                ['Plan con antelación','going to','"I\'m going to visit Madrid."'],
                ['Predicción + evidencia','going to','"Look at those clouds!"'],
                ['Predicción sin evidencia','will','"I think it will be sunny."'],
                ['Cita / arreglo','present continuous','"I\'m having dinner at 8."'],
            ]} negCol={-1} />
            <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:8}}>
                <button className="gat-btn active"   onClick={() => onNavigate('fill')}>Completar frases</button>
            </div>
        </div>
    );
}

function GrCard({ title, body, ex }) {
    return (
        <div className="gr-card">
            <h4>{title}</h4>
            <p>{body}</p>
            <div className="gr-example">{ex}</div>
        </div>
    );
}

function GrTable({ headers, rows, negCol }) {
    return (
        <table className="gr-table">
            <thead><tr>{headers.map((h,i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
            {rows.map((row, ri) => (
                <tr key={ri}>
                    {row.map((cell, ci) => (
                        <td key={ci} className={ci === 0 ? 'em' : ci === negCol ? 'neg' : ''}>
                            {cell}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}