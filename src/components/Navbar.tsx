import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Modal Dialog', href: '/modal-dialog' },
    { label: 'Links VS Buttons', href: '/links-vs-buttons' },
    { label: 'Radio Buttons', href: '/radio-buttons' },
    { label: 'Input Fields', href: '/input-fields' },
];

const Navbar: React.FC = () => (
    <nav className="navbar">
        <ul className="navbar-list">
            {navItems.map((item) => (
                <li key={item.href}>
                    <Link to={item.href} className="navbar-link">
                        {item.label}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);

export default Navbar;