import React from 'react';
import '../styles/Footer.css';

type FooterLink = {
    label: string;
    url: string;
};

type FooterProps = {
    links: FooterLink[];
};

const Footer: React.FC<FooterProps> = ({ links }) => (
    <footer className='footer'>
        <nav aria-label="Footer">
            <h4 className='footer-title'>Useful Links:</h4>
            <ul className='footer-links'>
                {links.map((link, idx) => (
                    <li key={idx}>
                        <a href={link.url} className='footer-link'>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    </footer>
);

export default Footer;