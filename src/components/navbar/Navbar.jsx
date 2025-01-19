import React, { useState, useEffect } from 'react';
import './Navbar.scss';
import Image from 'next/image';
import logoSmall from '../../../public/images/lilogo_square.jpeg';
import logo from '../../../public/images/header_logo.png';
import menuIcon from '../../../public/images/menu_icon.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [animateLinks, setAnimateLinks] = useState(false);

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

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="navbar-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <Image
          src={scrolled ? logo : logoSmall}
          alt="Logo"
          className="navbar-logo"
          placeholder='blur'
          height={85}
        />
        <ul className={`nav-links-straight ${animateLinks ? 'animate' : ''} ${!scrolled ? 'show' : ''}`}>
          <li>Inسpiration,</li>
          <li>Clothإng,</li>
          {/* <li>Projectس,</li> */}
          <li>Cوntact,</li>
        </ul>
        <div className={`menu-icon ${scrolled ? 'show' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <Image src={menuIcon} alt="Menu Icon" width={30} height={30} />
        </div>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li>Projectس</li>
          <li>Inسpiration</li>
          <li>Clothإng</li>
          <li>Cوntact</li>
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