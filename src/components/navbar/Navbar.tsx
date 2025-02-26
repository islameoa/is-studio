import './Navbar.scss';
import React, { useState, useEffect } from 'react';
import logoSmall from '../../../public/images/lilogo_square.jpeg';
import logo from '../../../public/images/header_logo.png';
import Image from 'next/image';
import Link from 'next/link';

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

  const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
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
        <Link href={'/'}>
          <Image
            src={scrolled ? logo : logoSmall}
            alt="Logo"
            className="navbar-logo"
            placeholder='blur'
            height={85}
          />
        </Link>
        <ul className={`nav-links-straight ${animateLinks ? 'animate' : ''} ${!scrolled ? 'show' : ''}`}>
          <li><Link href={'/projects'}>Projectس</Link></li>
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