import './Dashboard.css';

export default function Dashboard({ onNavigate }) {
    return (
        <div className="dash-container">
            {/* Elementos de fondo decorativos para efecto neón */}
            <div className="dash-glow-bg glow-1"></div>
            <div className="dash-glow-bg glow-2"></div>

            <div className="dash-content">
                {/* Header Superior / Subtítulo Oficial */}
                <div className="dash-top-badge">
                    <span className="portal-tag">PORTAL ACADÉMICO OFICIAL</span>
                </div>

                {/* Banner de Bienvenida Hero estilo Login */}
                <div className="dash-hero-card">
                    <div className="hero-badge">
                        <span>🎓 OFFICIAL PLATFORM</span>
                    </div>
                    <h1>Welcome Student! 🚀</h1>
                    <p className="hero-subtitle">
                        "The limits of my language mean the limits of my world."
                    </p>
                    <p className="hero-desc">
                        Access your interactive portal to master English through essential grammar lessons and logic programming blocks.
                    </p>
                    
                    <div className="hero-tags">
                        <span className="htag">📚 Grammar & Lessons</span>
                        <span className="htag">💻 Code Logic</span>
                    </div>
                </div>

                {/* Título de Sección */}
                <h2 className="section-title">Explore Learning Modules</h2>

                {/* Cuadrícula de Secciones con Glassmorphism (Solo Grammar y Code) */}
                <div className="dash-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    
                    {/* Tarjeta 1: Grammar & Lessons */}
                    <div 
                        className="dash-card glow-orange"
                        onClick={() => onNavigate?.('grammar')}
                    >
                        <div className="card-header">
                            <div className="icon-box orange-box">📚</div>
                            <span className="card-badge">MODULE 01</span>
                        </div>
                        <h3>Grammar & Lessons</h3>
                        <p>Explore structured rules, verbs, and essential English lessons to build a solid foundation.</p>
                        <div className="card-footer-action">
                            <span>Start Module</span> →
                        </div>
                    </div>

                    {/* Tarjeta 2: Code Analysis (Code Blocks) */}
                    <div 
                        className="dash-card glow-blue"
                        onClick={() => onNavigate?.('code')}
                    >
                        <div className="card-header">
                            <div className="icon-box blue-box">💻</div>
                            <span className="card-badge">LOGIC</span>
                        </div>
                        <h3>Code Analysis</h3>
                        <p>Execute and test structured code utilizing predefined English keywords to enhance analytical logic.</p>
                        <div className="card-footer-action">
                            <span>Analyze Code</span> →
                        </div>
                    </div>

                </div>

                {/* Tarjeta Tip of the Day con borde futurista */}
                <div className="dash-tip-card">
                    <div className="tip-header">
                        <span className="tip-icon">💡</span>
                        <h3>Tip of the Day / Consejo del Día</h3>
                    </div>
                    <p>
                        To master English faster, combine linguistic practice with analytical problem-solving. Practice daily grammar concepts and test your logic using structured keyword blocks!
                    </p>
                </div>
            </div>
        </div>
    );
}