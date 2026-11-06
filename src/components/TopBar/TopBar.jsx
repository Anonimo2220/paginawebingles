import './TopBar.css';

export default function Topbar({ title, role, onToggleRole }) {
    const parts = title.split(' ');
    const emoji = parts[0];
    const label = parts.slice(1).join(' ');

    const roleLabel    = role === 'teacher' ? '👩‍🏫 Teacher' : 'ESTUDENT';

    return (
        <div className="topbar">
            <div className="topbar-title">
                {emoji} <span>{label}</span>
            </div>
            <div className="tp-pill tp-lvl">Level Advanced</div>
            <div className="tp-pill tp-role" onClick={onToggleRole}>
                {roleLabel}
            </div>
        </div>
    );
}