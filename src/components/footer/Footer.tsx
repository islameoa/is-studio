import './Footer.scss';
import instagramLogo from '../../../public/images/instagram.png';
import tiktokLogo from '../../../public/images/tik-tok.png';
import youtubeLogo from '../../../public/images/youtube.png';
import xLogo from '../../../public/images/gorjeo.png';
import Image from 'next/image';
import React from 'react';
import { useBackgroundColor } from '../../contexts/BackgroundColorContext';

const Footer = () => {
    const { currentBgColor } = useBackgroundColor();
    const isDefaultBg = currentBgColor === "#F1ECE4";

    return (
        <div className="footer"
            style={{
                backgroundColor: `${currentBgColor}aa`, // Add transparency
                backdropFilter: 'blur(10px)',
                transition: 'background-color 0.8s ease-in-out',
                color: isDefaultBg ? 'black' : 'white'
            }}
        >
            <div className="footer-logos"
                style={{
                    filter: isDefaultBg ? 'none': 'brightness(0) invert(1)'
                }}
            >
                <a href="https://www.w3schools.com"><Image src={instagramLogo} alt="Instagram" className="socialLogo" /></a>
                <Image src={tiktokLogo} alt="TikTok" className="socialLogo" />
                <Image src={xLogo} alt="X" className="socialLogo" />
                <Image src={youtubeLogo} alt="YouTube" className="socialLogo" />
            </div>
            <div className="footer-text" 
                style={{
                    color: isDefaultBg ? 'black' : 'white'
                }}
            >
                is___studio © 2026
            </div>
        </div>
    );
};

export default Footer;