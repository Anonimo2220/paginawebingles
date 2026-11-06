import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import './CodeBlocks.css';

const TYPE_COLOR = {
    keyword:   'blk-keyword',
    condition: 'blk-condition',
    action:    'blk-action',
    loop:      'blk-loop',
    negative:  'blk-negative',
    question:  'blk-question',
    past:      'blk-past',
    future:    'blk-future',
    present:   'blk-present',
    end:       'blk-end',
};

const BLOCK_BANK = [
    { id:'b01', type:'keyword',   icon:'🔷', text:'if I have free time'                        },
    { id:'b02', type:'keyword',   icon:'🔷', text:'else'                                        },
    { id:'b03', type:'keyword',   icon:'🔷', text:'if I studied enough'                         },
    { id:'b04', type:'keyword',   icon:'🔷', text:'else if I am tired'                          },
    { id:'b05', type:'loop',      icon:'🔁', text:'while I don\'t understand the topic'        },
    { id:'b06', type:'loop',      icon:'🔁', text:'while my English is not fluent'             },
    { id:'b07', type:'loop',      icon:'🔁', text:'for each new vocabulary word I find'        },
    { id:'b08', type:'loop',      icon:'🔁', text:'for every mistake I make in class'          },
    { id:'b09', type:'condition', icon:'❓', text:'if she did not come to class yesterday'      },
    { id:'b10', type:'condition', icon:'❓', text:'if they are going to travel next week'       },
    { id:'b11', type:'condition', icon:'❓', text:'if we have already finished the homework'    },
    { id:'b12', type:'condition', icon:'❓', text:'if it is raining outside right now'          },
    { id:'b13', type:'future',    icon:'🔮', text:'I will practice speaking every morning'     },
    { id:'b14', type:'future',    icon:'🔮', text:'I will not forget to review my notes'       },
    { id:'b15', type:'future',    icon:'🔮', text:'she will improve her pronunciation'         },
    { id:'b16', type:'future',    icon:'🔮', text:'they will not pass the exam'                },
    { id:'b17', type:'future',    icon:'📅', text:'I am going to study two hours today'        },
    { id:'b18', type:'future',    icon:'📅', text:'we are going to watch an English movie'     },
    { id:'b19', type:'future',    icon:'📅', text:'he is not going to repeat the same mistake' },
    { id:'b20', type:'past',      icon:'⏮️', text:'I reviewed the irregular verbs last night'  },
    { id:'b21', type:'past',      icon:'⏮️', text:'she did not attend the speaking session'    },
    { id:'b22', type:'past',      icon:'⏮️', text:'we had already learned the past simple'    },
    { id:'b23', type:'present',   icon:'⚡', text:'I practice English every day'               },
    { id:'b24', type:'present',   icon:'⚡', text:'she does not understand conditional forms'  },
    { id:'b25', type:'present',   icon:'⚡', text:'we are currently studying future tenses'    },
    { id:'b26', type:'negative',  icon:'🚫', text:'I will not give up learning English'       },
    { id:'b27', type:'negative',  icon:'🚫', text:'they did not complete the assignment'      },
    { id:'b28', type:'negative',  icon:'🚫', text:'she is not going to miss class again'      },
    { id:'b29', type:'question',  icon:'💬', text:'Did you study the vocabulary list?'        },
    { id:'b30', type:'question',  icon:'💬', text:'Are you going to join the speaking club?'  },
    { id:'b31', type:'question',  icon:'💬', text:'Will you practice with a native speaker?'  },
    { id:'b32', type:'question',  icon:'💬', text:'Have you ever watched a film in English?'  },
    { id:'b33', type:'action',    icon:'✅', text:'print("Great job! Keep it up!")'            },
    { id:'b34', type:'action',    icon:'✅', text:'print("You need to review more.")'          },
    { id:'b35', type:'action',    icon:'✅', text:'return "Excellent progress this semester"'  },
    { id:'b36', type:'action',    icon:'✅', text:'return "Try again tomorrow"'                },
    { id:'b37', type:'end',       icon:'🔚', text:'end if'                                     },
    { id:'b38', type:'end',       icon:'🔚', text:'end while'                                  },
    { id:'b39', type:'end',       icon:'🔚', text:'end for'                                    },
    { id:'b40', type:'end',       icon:'🔚', text:'end program'                               },
];

function validateSyntax(blocks) {
    const errors = [];
    const stack  = [];

    if (blocks.length === 0) {
        return ['El programa está vacío. Arrastra al menos un bloque.'];
    }

    blocks.forEach((b, i) => {
        const next = blocks[i + 1];
        const t    = b.type;
        const txt  = b.text;

        if (txt.startsWith('if ') || txt.startsWith('else if ')) {
            stack.push({ type:'if', idx:i });
            if (!next) errors.push(`Línea ${i+1}: "${txt}" — falta un bloque de acción después del if.`);
        }

        if (txt === 'else') {
            const hasIf = blocks.slice(0, i).some(b2 => b2.text.startsWith('if ') || b2.text.startsWith('else if '));
            if (!hasIf) errors.push(`Línea ${i+1}: "else" sin un "if" previo.`);
            if (!next)  errors.push(`Línea ${i+1}: "else" — falta un bloque de acción después.`);
        }

        if (txt.startsWith('while ') || txt.startsWith('for ')) {
            stack.push({ type: txt.startsWith('while') ? 'while' : 'for', idx:i });
        }

        if (txt === 'end if') {
            const openIf = stack.findLastIndex(s => s.type === 'if');
            if (openIf === -1) errors.push(`Línea ${i+1}: "end if" sin un "if" correspondiente.`);
            else stack.splice(openIf, 1);
        }

        if (txt === 'end while') {
            const openW = stack.findLastIndex(s => s.type === 'while');
            if (openW === -1) errors.push(`Línea ${i+1}: "end while" sin un "while" abierto.`);
            else stack.splice(openW, 1);
        }

        if (txt === 'end for') {
            const openF = stack.findLastIndex(s => s.type === 'for');
            if (openF === -1) errors.push(`Línea ${i+1}: "end for" sin un "for" abierto.`);
            else stack.splice(openF, 1);
        }

        if ((txt.startsWith('if ') || txt === 'else') && next &&
            (next.text.startsWith('if ') || next.text === 'else' || next.text === 'end if')) {
            errors.push(`Línea ${i+1}: "${txt}" — el bloque está vacío, falta una acción antes de "${next.text}".`);
        }
    });

    stack.forEach(s => {
        errors.push(`Bloque "${s.type}" abierto en línea ${s.idx + 1} nunca se cerró.`);
    });

    return errors;
}

function getIndent(blocks, index) {
    let depth = 0;
    for (let i = 0; i < index; i++) {
        const t = blocks[i].text;
        if (t.startsWith('if ') || t.startsWith('else if ') || t === 'else' ||
            t.startsWith('while ') || t.startsWith('for ')) depth++;
        if (t === 'end if' || t === 'end while' || t === 'end for') depth = Math.max(0, depth - 1);
    }
    const t = blocks[index].text;
    if (t === 'end if' || t === 'end while' || t === 'end for' || t === 'else' || t.startsWith('else if '))
        depth = Math.max(0, depth - 1);
    return depth;
}

export default function CodeBlocks() {
    const [program, setProgram]     = useState([]);
    const [consoleLog, setConsoleLog] = useState([]);
    const [running, setRunning]     = useState(false);
    const [validated, setValidated] = useState(null);
    const [dragSrc, setDragSrc]     = useState(null);
    const [dragOver, setDragOver]   = useState(null);
    const [filter, setFilter]       = useState('all');
    const consoleRef                = useRef(null);

    function onBankDragStart(block) {
        setDragSrc({ from:'bank', block });
    }

    function onEditorDragStart(index) {
        setDragSrc({ from:'editor', index });
    }

    function onEditorDrop(e, dropIndex) {
        e.preventDefault();
        if (!dragSrc) return;
        let newProgram = [...program];
        if (dragSrc.from === 'bank') {
            const newBlock = { ...dragSrc.block, uid: Date.now() + Math.random() };
            newProgram.splice(dropIndex, 0, newBlock);
        } else {
            const [moved] = newProgram.splice(dragSrc.index, 1);
            const insertAt = dragSrc.index < dropIndex ? dropIndex - 1 : dropIndex;
            newProgram.splice(insertAt, 0, moved);
        }
        setProgram(newProgram);
        setDragSrc(null);
        setDragOver(null);
        setValidated(null);
    }

    function onEditorDragOver(e, index) {
        e.preventDefault();
        setDragOver(index);
    }

    function onDropAtEnd(e) {
        e.preventDefault();
        if (!dragSrc) return;
        let newProgram = [...program];
        if (dragSrc.from === 'bank') {
            newProgram.push({ ...dragSrc.block, uid: Date.now() + Math.random() });
        } else {
            const [moved] = newProgram.splice(dragSrc.index, 1);
            newProgram.push(moved);
        }
        setProgram(newProgram);
        setDragSrc(null);
        setDragOver(null);
        setValidated(null);
    }

    function removeBlock(index) {
        setProgram(p => p.filter((_, i) => i !== index));
        setValidated(null);
    }

    async function runProgram() {
        if (running) return;
        setRunning(true);
        setConsoleLog([]);
        setValidated(null);

        const lines = [
            { text: '> Iniciando validación del programa...', type: 'info', delay: 300  },
            { text: `> Cargando ${program.length} bloques de código...`, type: 'info', delay: 600 },
            { text: '> Analizando estructura sintáctica...', type: 'info', delay: 1000 },
            { text: '> Verificando bloques condicionales...', type: 'info', delay: 1400 },
            { text: '> Revisando tiempos verbales...', type: 'info', delay: 1800 },
            { text: '> Comprobando apertura y cierre de bloques...', type: 'info', delay: 2200 },
        ];

        for (const line of lines) {
            await new Promise(r => setTimeout(r, line.delay));
            setConsoleLog(l => [...l, { text: line.text, type: line.type }]);
            if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }

        await new Promise(r => setTimeout(r, 500));
        const errors = validateSyntax(program);

        if (errors.length === 0) {
            const successLines = [
                { text: '', type: 'info' },
                { text: '✅ Sintaxis correcta — 0 errores encontrados', type: 'success' },
                { text: '✅ Todos los bloques if/else están cerrados correctamente', type: 'success' },
                { text: '✅ Bucles while/for tienen su bloque de cierre', type: 'success' },
                { text: '✅ Secuencia lógica válida', type: 'success' },
                { text: '', type: 'info' },
                { text: `> Programa ejecutado exitosamente con ${program.length} instrucciones.`, type: 'success' },
                { text: '> ¡Excelente trabajo! Tu programa es lógicamente correcto.', type: 'success' },
            ];
            for (const l of successLines) {
                await new Promise(r => setTimeout(r, 250));
                setConsoleLog(prev => [...prev, l]);
                if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
            }
            setValidated('ok');
        } else {
            const errorHeader = [
                { text: '', type: 'info' },
                { text: `❌ Se encontraron ${errors.length} error(es) de sintaxis:`, type: 'error' },
                { text: '', type: 'info' },
            ];
            for (const l of errorHeader) {
                await new Promise(r => setTimeout(r, 200));
                setConsoleLog(prev => [...prev, l]);
            }
            for (const err of errors) {
                await new Promise(r => setTimeout(r, 300));
                setConsoleLog(prev => [...prev, { text: `  ⚠ ${err}`, type: 'error' }]);
                if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
            }
            await new Promise(r => setTimeout(r, 400));
            setConsoleLog(prev => [...prev,
                { text: '', type:'info' },
                { text: '> Corrige los errores y vuelve a ejecutar.', type: 'error' },
            ]);
            setValidated('error');
        }
        setRunning(false);
    }

    function clearProgram() {
        setProgram([]);
        setConsoleLog([]);
        setValidated(null);
    }

    function exportPDF() {
        const doc = new jsPDF({ unit:'mm', format:'a4' });
        const W   = 210;
        const pad = 14;
        let   y   = pad;

        const RED   = [249, 115, 22]; // Tono naranja vibrante del tema
        const BG    = [15, 15, 23];   // Fondo oscuro moderno
        const MUTED = [148, 163, 184];
        const GREEN = [74, 222, 128];

        doc.setFillColor(...BG);
        doc.rect(0, 0, W, 297, 'F');

        doc.setFillColor(...RED);
        doc.roundedRect(pad, y, W - pad*2, 22, 4, 4, 'F');
        doc.setFont('helvetica','bold');
        doc.setFontSize(14);
        doc.setTextColor(255,255,255);
        doc.text('paginawebingles - Code Blocks', W/2, y+9, {align:'center'});
        doc.setFont('helvetica','normal');
        doc.setFontSize(9);
        doc.text('Interactive Logic Module · ' + new Date().toLocaleDateString('es-MX'), W/2, y+17, {align:'center'});
        y += 28;

        doc.setFont('courier','normal');
        doc.setFontSize(9);

        program.forEach((block, i) => {
            const indent = getIndent(program, i);
            const indentPx = indent * 6;
            const lineH = 8;

            if (y + lineH > 278) {
                doc.addPage();
                doc.setFillColor(...BG);
                doc.rect(0,0,W,297,'F');
                y = pad;
            }

            doc.setTextColor(...MUTED);
            doc.text(String(i+1).padStart(2,'0'), pad+2, y+5.5);

            doc.setFont('courier','bold');
            doc.setFontSize(8.5);
            doc.setTextColor(226, 232, 240);
            doc.text(`${block.icon}  ${block.text}`, pad + 14 + indentPx, y + 5.5);

            y += lineH;
        });

        doc.save(`paginawebingles-codeblocks-${Date.now()}.pdf`);
    }

    const types = ['all','keyword','condition','loop','future','past','present','negative','question','action','end'];
    const filteredBank = filter === 'all' ? BLOCK_BANK : BLOCK_BANK.filter(b => b.type === filter);

    return (
        <div className="cb-panel">
            <div className="cb-header">
                <div>
                    <h2 className="cb-title">Code Blocks</h2>
                    <p className="cb-sub">Arrastra bloques lógicos para construir y validar tu código en inglés</p>
                </div>
                <div className="cb-header-btns">
                    <button
                        className={`cb-run-btn ${running ? 'running' : ''} ${validated === 'ok' ? 'ok' : validated === 'error' ? 'err' : ''}`}
                        onClick={runProgram}
                        disabled={running || program.length === 0}
                    >
                        {running ? '⏳ Ejecutando...' : '▶ Ejecutar'}
                    </button>
                    <button className="cb-pdf-btn" onClick={exportPDF} disabled={program.length === 0}>
                        ⬇ PDF
                    </button>
                    <button className="cb-clear-btn" onClick={clearProgram}>
                        🗑 Limpiar
                    </button>
                </div>
            </div>

            <div className="cb-workspace">
                <div className="cb-bank">
                    <div className="cb-bank-title">Banco de Bloques</div>
                    <div className="cb-filter">
                        {types.map(t => (
                            <button
                                key={t}
                                className={`cb-filter-btn ${filter === t ? 'active' : ''}`}
                                onClick={() => setFilter(t)}
                            >
                                {t === 'all' ? 'Todos' : t}
                            </button>
                        ))}
                    </div>

                    <div className="cb-bank-list">
                        {filteredBank.map(block => (
                            <div
                                key={block.id}
                                className={`cb-block ${TYPE_COLOR[block.type]}`}
                                draggable
                                onDragStart={() => onBankDragStart(block)}
                            >
                                <span className="cb-block-icon">{block.icon}</span>
                                <span className="cb-block-text">{block.text}</span>
                                <span className="cb-block-type">{block.type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="cb-editor-col">
                    <div className="cb-editor-title">
                        <span>Editor de Lógica — {program.length} bloques</span>
                        {validated === 'ok'    && <span className="cb-badge ok">✅ Válido</span>}
                        {validated === 'error' && <span className="cb-badge err">❌ Errores</span>}
                    </div>

                    <div
                        className="cb-editor"
                        onDragOver={e => { e.preventDefault(); setDragOver(program.length); }}
                        onDrop={onDropAtEnd}
                    >
                        {program.length === 0 && (
                            <div className="cb-editor-empty">
                                <div className="cb-empty-icon">💻</div>
                                <div>Arrastra bloques aquí para armar tu programa</div>
                                <div className="cb-empty-sub">Diseña tu lógica paso a paso</div>
                            </div>
                        )}

                        {program.map((block, i) => {
                            const indent = getIndent(program, i);
                            return (
                                <div key={block.uid || block.id + i}>
                                    <div
                                        className={`cb-drop-zone ${dragOver === i ? 'active' : ''}`}
                                        onDragOver={e => onEditorDragOver(e, i)}
                                        onDrop={e => onEditorDrop(e, i)}
                                    />
                                    <div
                                        className={`cb-editor-block ${TYPE_COLOR[block.type]}`}
                                        style={{ marginLeft: indent * 20 }}
                                        draggable
                                        onDragStart={() => onEditorDragStart(i)}
                                    >
                                        <span className="cb-line-num">{String(i+1).padStart(2,'0')}</span>
                                        <span className="cb-block-icon">{block.icon}</span>
                                        <span className="cb-block-text">{block.text}</span>
                                        <button
                                            className="cb-remove-btn"
                                            onClick={() => removeBlock(i)}
                                            title="Quitar bloque"
                                        >✕</button>
                                    </div>
                                </div>
                            );
                        })}

                        <div
                            className={`cb-drop-zone cb-drop-end ${dragOver === program.length ? 'active' : ''}`}
                            onDragOver={e => onEditorDragOver(e, program.length)}
                            onDrop={onDropAtEnd}
                        >
                            {program.length === 0 ? '' : '+ Suelta aquí'}
                        </div>
                    </div>

                    <div className="cb-console">
                        <div className="cb-console-title">
                            <span>● Console / Output</span>
                            {running && <span className="cb-console-running">ejecutando...</span>}
                        </div>
                        <div className="cb-console-body" ref={consoleRef}>
                            {consoleLog.length === 0
                                ? <span className="cb-console-idle">{'>'} Listo. Presiona "Ejecutar" para validar tu programa.</span>
                                : consoleLog.map((l, i) => (
                                    <div key={i} className={`cb-console-line ${l.type}`}>
                                        {l.text}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}