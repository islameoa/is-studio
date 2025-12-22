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
  const isDefaultBg = currentBgColor === "#F1ECE4";

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

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
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
          color: isDefaultBg ? "inherit" : "white",
        }}
      >
        <Link href={'/'} onClick={closeMenu}>
          <Image
            src={scrolled ? logo : logoSmall}
            alt="Logo"
            className="navbar-logo"
            placeholder='blur'
            height={85}
            style={{
              filter: isDefaultBg ? 'none': 'brightness(0) invert(1)'
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <ul 
          className={`nav-links-straight ${animateLinks ? 'animate' : ''} ${!scrolled ? 'show' : ''}`}
          style={{
            color: isDefaultBg ? 'black' : 'white'
          }}
        >
          <li><Link href={'/projects'}>Prوjects</Link></li>
          <li><Link href={'/inspiration'}>Inسpiration</Link></li>
          <li><Link href={'/clothing'}>Clothإng</Link></li>
          <li><Link href={'/contact'}>Cوntact</Link></li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div 
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          style={{
            color: isDefaultBg ? 'black' : 'white'
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <ul
            className="mobile-nav-links"
            style={{
              ["--menu-bg" as any]: currentBgColor,
              color: isDefaultBg ? 'black' : 'white'
            }}
          >
            <li>
              <Link href={'/projects'} onClick={closeMenu}>
                Prوjects
              </Link>
            </li>
            <li>
              <Link href={'/inspiration'} onClick={closeMenu}>
                Inسpiration
              </Link>
            </li>
            <li>
              <Link href={'/clothing'} onClick={closeMenu}>
                Clothإng
              </Link>
            </li>
            <li>
              <Link href={'/contact'} onClick={closeMenu}>
                Cوntact
              </Link>
            </li>
          </ul>
        </div>

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