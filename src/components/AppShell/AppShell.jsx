import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar    from '../SliderBar/SliderBar.jsx';
import Topbar     from '../TopBar/TopBar.jsx';
import Dashboard  from '../Dashboard/Dashboard.jsx';
import Grammar    from "../Grammar/Grammar.jsx";
import CodeBlocks from "../LogicConsole/CodeBlocks.jsx";
import './AppShell.css';

const PANEL_TITLES = {
    dash:      'Home',
    grammar:   'Grammar',
    code:      'Code',
    logout:    'Logout',
};

export default function AppShell({ onToggleRole }) {
    const [activePanel, setActivePanel] = useState('dash');
    const navigate = useNavigate();

    // Manejador para cambiar de panel o salir si es logout
    const handleNavigate = (id) => {
        if (id === 'logout') {
            navigate('/');
        } else {
            setActivePanel(id);
        }
    };

    return (
        <div className="app-shell">
            <Sidebar
                activePanel={activePanel}
                onNavigate={handleNavigate}
            />
            <div className="app-main">
                <Topbar
                    title={PANEL_TITLES[activePanel] || activePanel}
                    onToggleRole={onToggleRole}
                />

                <div className={`panel ${activePanel === 'dash'      ? 'active' : ''}`}><Dashboard onNavigate={setActivePanel} /></div>
                <div className={`panel ${activePanel === 'grammar'   ? 'active' : ''}`}><Grammar /></div>
                <div className={`panel ${activePanel === 'code'     ? 'active' : ''}`}><CodeBlocks /></div>
            </div>
        </div>
    );
}