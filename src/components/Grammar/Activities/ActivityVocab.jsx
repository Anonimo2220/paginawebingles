import { useState } from 'react';
import '../Grammar.css';

// Función para barajar aleatoriamente un arreglo cada vez que se cargue
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

const SETS = {
    daily: shuffleArray([
        { word:'commute',    cat:'Daily Life', def:'Viajar al trabajo o escuela regularmente',     ex:'"She commutes two hours every day."' },
        { word:'schedule',   cat:'Daily Life', def:'Plan o lista de actividades con horarios',     ex:'"What\'s on your schedule today?"' },
        { word:'routine',    cat:'Daily Life', def:'Hábito o secuencia regular diaria',             ex:'"My morning routine takes 30 minutes."' },
        { word:'deadline',   cat:'Work',       def:'Fecha o hora límite para entregar algo',       ex:'"The deadline is tomorrow at noon."' },
        { word:'errand',     cat:'Daily Life', def:'Tarea corta fuera de casa',                    ex:'"I have to run some errands."' },
        { word:'chores',     cat:'Home',       def:'Tareas domésticas del hogar',                  ex:'"We share household chores equally."' },
        { word:'appliance',  cat:'Home',       def:'Electrodoméstico o aparato del hogar',         ex:'"The new appliance uses less energy."' },
        { word:'groceries',  cat:'Shopping',   def:'Alimentos y productos del supermercado',       ex:'"I need to buy groceries after work."' },
        { word:'alarm',      cat:'Daily Life', def:'Reloj despertador o alerta',                   ex:'"My alarm rings at 6:00 AM."' },
        { word:'breakfast',  cat:'Daily Life', def:'Primera comida del día (desayuno)',            ex:'"I eat eggs for breakfast."' },
        { word:'wallet',     cat:'Daily Life', def:'Billetera o cartera de bolsillo',              ex:'"I left my wallet on the table."' },
        { word:'umbrella',   cat:'Daily Life', def:'Paraguas para la lluvia',                      ex:'"Take an umbrella; it might rain."' },
        { word:'key',        cat:'Daily Life', def:'Llave para abrir puertas o candados',          ex:'"I can\'t find my house keys."' },
        { word:'coffee',     cat:'Daily Life', def:'Bebida caliente energizante',                  ex:'"I drink coffee every morning."' },
        { word:'shower',     cat:'Daily Life', def:'Baño rápido con regadera',                   ex:'"I take a cold shower after exercising."' },
        { word:'laundry',    cat:'Daily Life', def:'Ropa sucia que necesita lavado',             ex:'"I need to do my laundry today."' },
        { word:'mirror',     cat:'Daily Life', def:'Superficie reflectante para verse',            ex:'"He looked in the mirror before leaving."' },
        { word:'jacket',     cat:'Daily Life', def:'Prenda de abrigo para la parte superior',      ex:'"Wear a warm jacket outside."' },
        { word:'shoes',      cat:'Daily Life', def:'Calzado para los pies',                        ex:'"Put on your running shoes."' },
        { word:'traffic',    cat:'Daily Life', def:'Congestión de vehículos en la vía',          ex:'"Heavy traffic made me late."' },
        { word:'ticket',     cat:'Daily Life', def:'Boleto o entrada para transporte/evento',      ex:'"I bought a train ticket."' },
        { word:'money',      cat:'Daily Life', def:'Monedas o billetes de curso legal',            ex:'"Do you have enough money?"' },
        { word:'phone',      cat:'Daily Life', def:'Dispositivo móvil para llamadas',            ex:'"My phone battery is low."' },
        { word:'book',       cat:'Daily Life', def:'Conjunto de hojas encuadernadas con lectura',  ex:'"I am reading an interesting book."' },
        { word:'pen',        cat:'Daily Life', def:'Instrumento de escritura con tinta',         ex:'"Can I borrow your pen?"' },
    ]),
    actions: shuffleArray([
        // Verbos cotidianos basados en el documento y ampliados para uso diario
        { word:'run',        cat:'Verbs',      def:'Desplazarse rápidamente con los pies',         ex:'"I run in the park every morning."' },
        { word:'eat',        cat:'Verbs',      def:'Ingerir alimentos sólidos',                    ex:'"We eat lunch together at noon."' },
        { word:'drink',      cat:'Verbs',      def:'Ingerir líquidos',                             ex:'"Children need to drink water."' },
        { word:'sleep',      cat:'Verbs',      def:'Descansar con los ojos cerrados',              ex:'"I sleep eight hours a night."' },
        { word:'play',       cat:'Verbs',      def:'Practicar un juego o deporte',                 ex:'"The kids play soccer outside."' },
        { word:'walk',       cat:'Verbs',      def:'Avanzar tranquilamente a pie',                 ex:'"Let us walk to the store."' },
        { word:'talk',       cat:'Verbs',      def:'Conversar o hablar con alguien',               ex:'"We like to talk after class."' },
        { word:'sit',        cat:'Verbs',      def:'Apoyar el cuerpo en un asiento',               ex:'"Please sit down on the chair."' },
        { word:'stand',      cat:'Verbs',      def:'Estar erguido sobre los pies',                 ex:'"Please stand up when your name is called."' },
        { word:'read',       cat:'Verbs',      def:'Interpretar textos escritos',                  ex:'"I read books before going to bed."' },
        { word:'write',      cat:'Verbs',      def:'Plasmar letras o palabras en papel',           ex:'"Write your name on the test paper."' },
        { word:'draw',       cat:'Verbs',      def:'Hacer trazos o dibujos',                       ex:'"She likes to draw animals."' },
        { word:'paint',      cat:'Verbs',      def:'Dar color con pincel y pintura',               ex:'"He paints beautiful landscapes."' },
        { word:'sing',       cat:'Verbs',      def:'Emitir sonidos musicales con la voz',          ex:'"She sings in the church choir."' },
        { word:'dance',      cat:'Verbs',      def:'Moverse al ritmo de la música',                ex:'"They love to dance salsa."' },
        { word:'cry',        cat:'Verbs',      def:'Derramar lágrimas por tristeza o dolor',       ex:'"The baby started to cry."' },
        { word:'laugh',      cat:'Verbs',      def:'Reírse a carcajadas por alegría',              ex:'"That joke made everyone laugh."' },
        { word:'hug',        cat:'Verbs',      def:'Abrazar a alguien con afecto',                 ex:'"She gave her mother a warm hug."' },
        { word:'crawl',      cat:'Verbs',      def:'Avanzar arrastrándose en manos y rodillas',    ex:'"The baby learns to crawl."' },
        { word:'climb',      cat:'Verbs',      def:'Trepar o subir por una superficie',            ex:'"He likes to climb mountains."' },
        { word:'throw',      cat:'Verbs',      def:'Lanzar algo con la mano',                      ex:'"Throw the ball to me, please."' },
        { word:'catch',      cat:'Verbs',      def:'Atrapar algo en el aire',                      ex:'"He can catch the baseball easily."' },
        { word:'kick',       cat:'Verbs',      def:'Golpear con el pie',                           ex:'"Kick the ball into the net."' },
        { word:'push',       cat:'Verbs',      def:'Empujar un objeto hacia adelante',             ex:'"Push the door to open it."' },
        { word:'pull',       cat:'Verbs',      def:'Tirar de algo hacia uno mismo',                ex:'"Pull the rope firmly."' },
        { word:'open',       cat:'Verbs',      def:'Abrir algo que está cerrado',                  ex:'"Open the window for fresh air."' },
        { word:'buy',        cat:'Verbs',      def:'Adquirir algo a cambio de dinero',             ex:'"I want to buy a new computer."' },
        { word:'sell',       cat:'Verbs',      def:'Ofrecer algo a cambio de dinero',              ex:'"They sell fresh vegetables."' },
        { word:'hit',        cat:'Verbs',      def:'Golpear un objeto o superficie',               ex:'"Hit the red button to start."' },
        { word:'listen',     cat:'Verbs',      def:'Prestar atención a los sonidos',               ex:'"Listen to the teacher carefully."' },
        { word:'drop',       cat:'Verbs',      def:'Dejar caer algo por descuido',                 ex:'"Don\'t drop your phone."' },
        { word:'press',      cat:'Verbs',      def:'Presionar o pulsar un botón',                  ex:'"Press the elevator button."' },
        { word:'smell',      cat:'Verbs',      def:'Percibir olores con la nariz',                 ex:'"Smell these flowers; they are nice."' },
        { word:'taste',      cat:'Verbs',      def:'Probar el sabor de algo',                      ex:'"Taste this soup; it is delicious."' },
        { word:'wash',       cat:'Verbs',      def:'Limpiar algo con agua y jabón',                ex:'"Wash your hands before eating."' },
        { word:'brush',      cat:'Verbs',      def:'Cepillar el pelo o los dientes',               ex:'"Brush your teeth every morning."' },
        { word:'cook',       cat:'Verbs',      def:'Preparar alimentos en la cocina',              ex:'"My father cooks dinner tonight."' },
        { word:'cut',        cat:'Verbs',      def:'Cortar con tijeras o cuchillo',                ex:'"Cut the paper with scissors."' },
        { word:'build',      cat:'Verbs',      def:'Construir o armar algo',                       ex:'"Kids build towers with blocks."' },
        { word:'hide',       cat:'Verbs',      def:'Ocultar o esconderse',                         ex:'"The children like to hide."' },
        { word:'ride',       cat:'Verbs',      def:'Montar en bicicleta o vehículo',               ex:'"She likes to ride her bicycle."' },
        { word:'fly',        cat:'Verbs',      def:'Volar por los aires',                          ex:'"Airplanes fly across the sky."' },
        { word:'swim',       cat:'Verbs',      def:'Nadar en el agua',                             ex:'"We swim in the pool during summer."' },
        { word:'ski',        cat:'Verbs',      def:'Esquiar sobre la nieve',                       ex:'"He loves to ski in the mountains."' },
        { word:'surf',       cat:'Verbs',      def:'Surfar sobre las olas del mar',                ex:'"They surf at the beach."' },
        { word:'clap',       cat:'Verbs',      def:'Aplaudir con las manos',                       ex:'"Clap your hands for the singer."' },
        { word:'sneeze',     cat:'Verbs',      def:'Estornudar por alergia o resfriado',           ex:'"Dust makes me sneeze."' },
        { word:'yawn',       cat:'Verbs',      def:'Bostezar por sueño o cansancio',               ex:'"She started to yawn during class."' },
        { word:'cough',      cat:'Verbs',      def:'Toser por irritación en la garganta',          ex:'"He has a bad cough today."' },
        { word:'jump',       cat:'Verbs',      def:'Saltar despegando del suelo',                  ex:'"The happy boy can jump high."' },
    ]),
    adjectives: shuffleArray([
        { word:'happy',      cat:'Feelings',   def:'Que experimenta alegría y felicidad',          ex:'"I am happy to see you."' },
        { word:'sad',        cat:'Feelings',   def:'Que siente tristeza o melancolía',             ex:'"She was sad after hearing the news."' },
        { word:'angry',      cat:'Feelings',   def:'Que siente enojo o molestia',                  ex:'"He was angry with the delay."' },
        { word:'tired',      cat:'Feelings',   def:'Cansado por actividad física o mental',        ex:'"I feel tired after a long day."' },
        { word:'excited',    cat:'Feelings',   def:'Entusiasmado y lleno de energía',              ex:'"We are excited about the trip."' },
        { word:'nervous',    cat:'Feelings',   def:'Inquieto o tenso ante una situación',          ex:'"I feel nervous before exams."' },
        { word:'calm',       cat:'Feelings',   def:'Sereno y sin alteración',                      ex:'"Try to stay calm during emergencies."' },
        { word:'smart',      cat:'Quality',    def:'De inteligencia rápida y aguda',                ex:'"She is a smart student."' },
        { word:'strong',     cat:'Quality',    def:'Con fuerza física o mental',                   ex:'"He is strong enough to lift that."' },
        { word:'fast',       cat:'Quality',    def:'Que se mueve con rapidez',                     ex:'"Cheetahs are very fast animals."' },
        { word:'safe',       cat:'Quality',    def:'Libre de peligro o riesgo',                    ex:'"This neighborhood is safe."' },
        { word:'friendly',   cat:'Character',  def:'Agradable y afable con los demás',            ex:'"The local people were very friendly."' },
        { word:'honest',     cat:'Character',  def:'Sincero y que dice la verdad',                ex:'"It is important to be honest."' },
        { word:'creative',   cat:'Character',  def:'Con inventiva e imaginación',                 ex:'"She is a creative artist."' },
        { word:'helpful',    cat:'Character',  def:'Dispuesto a ayudar a otros',                  ex:'"Thank you for being so helpful."' },
        { word:'patient',    cat:'Character',  def:'Capaz de esperar sin alterarse',              ex:'"You need to be patient when learning."' },
        { word:'curious',    cat:'Character',  def:'Con deseo de aprender o saber más',           ex:'"Children are naturally curious."' },
        { word:'reliable',   cat:'Character',  def:'Digno de confianza, responsable',             ex:'"He is a reliable friend."' },
        { word:'resilient',  cat:'Character',  def:'Capaz de recuperarse de dificultades',        ex:'"She is resilient despite obstacles."' },
        { word:'ambitious',  cat:'Character',  def:'Con grandes deseos de éxito',                 ex:'"He is ambitious and works hard."' },
        { word:'versatile',  cat:'Skills',     def:'Capaz de adaptarse a distintas tareas',        ex:'"A versatile employee is very valuable."' },
        { word:'exhausted',  cat:'Feelings',   def:'Extremadamente cansado',                       ex:'"I was exhausted after the trip."' },
        { word:'thrilling',  cat:'Feelings',   def:'Emocionante, que produce emoción',             ex:'"The final match was thrilling."' },
        { word:'meticulous', cat:'Character',  def:'Muy detallista y cuidadoso',                  ex:'"She is meticulous in her research."' },
        { word:'adequate',   cat:'Quality',    def:'Suficiente o apropiado para un fin',           ex:'"The salary is adequate for this city."' },
    ]),
    home: shuffleArray([
        { word:'neighborhood', cat:'City',       def:'Zona residencial o vecindario', ex:'"It is a quiet and safe neighborhood."' },
        { word:'sidewalk',     cat:'City',       def:'Acera o banqueta para caminar',     ex:'"Walk on the sidewalk, please."' },
        { word:'traffic',      cat:'City',       def:'Congestión de vehículos en la calle',ex:'"There is too much traffic today."' },
        { word:'apartment',    cat:'Home',       def:'Vivienda o departamento familiar',  ex:'"I live in a small apartment downtown."' },
        { word:'kitchen',      cat:'Home',       def:'Espacio de la casa para cocinar',   ex:'"She is cooking in the kitchen."' },
        { word:'bedroom',      cat:'Home',       def:'Habitación para dormir',          ex:'"My bedroom has a large window."' },
        { word:'bathroom',     cat:'Home',       def:'Estancia con ducha y lavabo',      ex:'"Where is the bathroom, please?"' },
        { word:'window',       cat:'Home',       def:'Apertura con cristal para luz',    ex:'"Open the window for fresh air."' },
        { word:'door',         cat:'Home',       def:'Entrada o cierre de una habitación',ex:'"Please lock the front door."' },
        { word:'roof',         cat:'Home',       def:'Parte superior que cubre una casa',  ex:'"The roof protects us from rain."' },
        { word:'floor',        cat:'Home',       def:'Superficie horizontal interior',    ex:'"Sweep the kitchen floor."' },
        { word:'wall',         cat:'Home',       def:'Estructura vertical divisoria',     ex:'"Hang the picture on the wall."' },
        { word:'garden',       cat:'Home',       def:'Terreno con plantas y flores',      ex:'"We grow flowers in our garden."' },
        { word:'furniture',    cat:'Home',       def:'Enseres móviles de una casa',        ex:'"They bought new living room furniture."' },
        { word:'table',        cat:'Home',       def:'Mueble de superficie plana',        ex:'"Dinner is served on the table."' },
        { word:'chair',        cat:'Home',       def:'Asiento individual con respaldo',   ex:'"Pull up a chair and sit down."' },
        { word:'lamp',         cat:'Home',       def:'Aparato que produce luz artificial',ex:'"Turn on the desk lamp."' },
        { word:'bed',          cat:'Home',       def:'Mueble para acostarse a dormir',    ex:'"I go to bed early on weekdays."' },
        { word:'street',       cat:'City',       def:'Vía pública urbana para tránsito',  ex:'"Our house is on main street."' },
        { word:'corner',       cat:'City',       def:'Intersección o ángulo de calles',   ex:'"Turn left at the next corner."' },
        { word:'park',         cat:'City',       def:'Área verde pública con árboles',     ex:'"We walked around the park."' },
        { word:'store',        cat:'City',       def:'Establecimiento comercial',         ex:'"I am going to the grocery store."' },
        { word:'hospital',     cat:'City',       def:'Centro médico para emergencias',    ex:'"Doctors work at the hospital."' },
        { word:'school',       cat:'City',       def:'Institución educativa',             ex:'"Children go to school every morning."' },
        { word:'library',      cat:'City',       def:'Lugar público con libros para leer',ex:'"I study quietly at the library."' },
    ])
};

function showXP(msg) {
    const el = document.createElement('div'); el.className = 'xp-pop'; el.textContent = msg;
    document.body.appendChild(el); setTimeout(() => el.remove(), 700);
}

export default function ActivityVocab() {
    const [category, setCategory] = useState('daily');
    const [index, setIndex]       = useState(0);
    const [flipped, setFlipped]   = useState(false);
    const [seen, setSeen]         = useState([]);

    const cards = SETS[category];
    const card  = cards[index];

    function switchCategory(cat) {
        // Al cambiar de categoría, volvemos a barajar las palabras para que el orden sea diferente cada vez
        SETS[cat] = shuffleArray(SETS[cat]);
        setCategory(cat); 
        setIndex(0); 
        setFlipped(false); 
        setSeen([]);
    }

    function next() {
        if (!seen.includes(index)) setSeen(s => [...s, index]);
        setIndex(i => (i + 1) % cards.length);
        setFlipped(false);
    }

    function prev() {
        setIndex(i => (i - 1 + cards.length) % cards.length);
        setFlipped(false);
    }

    function flip() {
        setFlipped(f => !f);
        if (!seen.includes(index)) setSeen(s => [...s, index]);
    }

    return (
        <div>
            <div className="gr-act-header">
                <div>
                    <h3>Vocabulario nuevo</h3>
                    <p>Haz clic en la carta para ver la definición ({cards.length} palabras en esta sección)</p>
                </div>
                <div className="gr-act-tabs">
                    {Object.keys(SETS).map(cat => (
                        <button
                            key={cat}
                            className={`gat-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => switchCategory(cat)}
                        >
                            {{ daily:'Diario', actions:'Acciones', adjectives:'Adjetivos', home:'Hogar y Ciudad' }[cat]}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dots de progreso flexibles */}
            <div className="vocab-progress">
                {cards.map((_, i) => (
                    <div key={i} className={`vp-dot ${i === index ? 'current' : seen.includes(i) ? 'seen' : ''}`} />
                ))}
            </div>

            {/* Flashcard con flip */}
            <div className="vocab-card-wrap">
                <div className={`vocab-card ${flipped ? 'flipped' : ''}`} onClick={flip}>
                    <div className="vc-face vc-front">
                        <div className="vc-category">{card.cat}</div>
                        <div className="vc-word">{card.word}</div>
                        <div className="vc-hint">Clic para ver definición</div>
                    </div>
                    <div className="vc-face vc-back">
                        <div className="vc-def">{card.def}</div>
                        <div className="vc-example">{card.ex}</div>
                    </div>
                </div>
            </div>

            {/* Navegación */}
            <div style={{display:'flex',gap:10,justifyContent:'center',alignItems:'center',marginBottom:12}}>
                <button className="gat-btn active" onClick={prev}>← Anterior</button>
                <span className="gat-btn active">{index + 1} / {cards.length}</span>
                <button className="gat-btn active" onClick={next}>Siguiente →</button>
            </div>
        </div>
    );
}