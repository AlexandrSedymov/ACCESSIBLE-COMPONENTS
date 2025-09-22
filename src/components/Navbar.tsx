import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
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