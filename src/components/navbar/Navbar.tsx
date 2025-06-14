import './Navbar.scss';
import React, { useState, useEffect } from 'react';
import logoSmall from '../../../public/images/lilogo_round-nobg.png';
import logo from '../../../public/images/header_logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useBackgroundColor } from '../../contexts/BackgroundColorContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animateLinks, setAnimateLinks] = useState(false);
  const { currentBgColor } = useBackgroundColor();

  useEffect(() => {
    const handleScroll = () => {
      // const isScrolled = window.scrollY > 50;
      const isScrolled = false;
      setScrolled(isScrolled);
      if (!isScrolled) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Trigger animation after a short delay on load
    setTimeout(() => setAnimateLinks(true), 200);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Function to determine if the background is dark
  const isDarkBackground = (color: string) => {
    // Convert hex to RGB
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.5;
  };

  return (
    <div
      className="navbar-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <nav 
        className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
        style={{
          backgroundColor: `${currentBgColor}aa`, // Add transparency
          backdropFilter: 'blur(10px)',
          transition: 'background-color 0.8s ease-in-out',
          color: isDarkBackground(currentBgColor) ? 'white' : 'black'
        }}
      >
        <Link href={'/'}>
          <Image
            src={scrolled ? logo : logoSmall}
            alt="Logo"
            className="navbar-logo"
            placeholder='blur'
            height={85}
            style={{
              filter: isDarkBackground(currentBgColor) ? 'brightness(0) invert(1)' : 'none'
            }}
          />
        </Link>
        <ul 
          className={`nav-links-straight ${animateLinks ? 'animate' : ''} ${!scrolled ? 'show' : ''}`}
          style={{
            color: isDarkBackground(currentBgColor) ? 'white' : 'black'
          }}
        >
          <li><Link href={'/inspiration'}>Inسpiration</Link></li>
          <li><Link href={'/clothing'}>Clothإng</Link></li>
          <li><Link href={'/contact'}>Cوntact</Link></li>
        </ul>
        <div
          className={`white-circle ${isHovering ? 'visible' : ''}`}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        ></div>
      </nav>
    </div>
  );
};

export default Navbar;