import './SliderBar.css';
import { useState } from "react";

const NAV_ITEMS = [
    { id: 'dash',    icon: '🏠', label: 'Home'    },
    { id: 'grammar', icon: '📖', label: 'Grammar'  },
    { id: 'code',    icon: '</>', label: 'Code'    },
    { id: 'logout',  icon: '⏻', label: 'Logout'   },
];

export default function Sidebar({ activePanel, onNavigate, userInitials }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <nav className={`sidebar ${expanded ? 'expanded' : ''}`}>

            <div className="sb-header">
                <div className="sb-logo" onClick={() => onNavigate('dash')}>EN</div>
            </div>
            <div
                className="sb-ico sb-ico--toggle"
                onClick={() => setExpanded(e => !e)}
                title={expanded ? 'Collapse menu' : 'Expand menu'}
            >
                <span className="sb-ico-emoji">☰</span>
                {expanded  && <span className="sb-ico-label">Collapse Menu</span>}
                {!expanded && <span className="tt">Expand menu</span>}
            </div>

            {/* Nav items */}
            {NAV_ITEMS.map(item => (
                <div
                    key={item.id}
                    className={`sb-ico ${activePanel === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                >
                    <span className="sb-ico-emoji">{item.icon}</span>
                    {expanded && <span className="sb-ico-label">{item.label}</span>}
                    {!expanded && <span className="tt">{item.label}</span>}
                </div>
            ))}

        </nav>
    );
}