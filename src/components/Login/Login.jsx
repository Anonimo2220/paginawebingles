import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();

    return (
        <div className="login-page-wrapper">
            {/* Círculos de luz ambiental para dar color y modernidad */}
            <div className="bg-glow-shape shape-1"></div>
            <div className="bg-glow-shape shape-2"></div>

            <div className="login-box-container">
                {/* Cabecera con tipografía e identidad institucional */}
                <div className="login-top-header">
                    <span className="login-badge">PLATAFORMA EDUCATIVA INTERACTIVA</span>
                    <h1 className="main-title">
                        ENGLISH <span className="highlight-text">LEARNING</span>
                    </h1>
                    <p className="main-subtitle">
                        Interactive Platform for High School Students
                    </p>
                </div>

                {/* Tarjeta central con efecto Glassmorphism */}
                <div className="login-glass-card">
                    <div className="card-icon-badge">
                        <span>🎓</span>
                    </div>

                    <h2 className="card-heading">Welcome Student!</h2>
                    <p className="card-description">
                        Access your interactive portal to master English through essential grammar lessons and logic programming blocks.
                    </p>

                    {/* Etiquetas de características actualizadas */}
                    <div className="feature-tags-row">
                        <span className="f-tag">📚 Grammar & Lessons</span>
                        <span className="f-tag">💻 Code Logic</span>
                    </div>

                    {/* Botón principal llamativo */}
                    <button 
                        className="btn-action-glow"
                        onClick={() => navigate("/app")}
                    >
                        <span>GET STARTED</span>
                        <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>

                <div className="login-bottom-footer">
                    © 2026 Academic Project · High School Edition
                </div>
            </div>
        </div>
    );
}

export default Login;