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
        <div className="footer"
            style={{
                backgroundColor: `${currentBgColor}aa`, // Add transparency
                backdropFilter: 'blur(10px)',
                transition: 'background-color 0.8s ease-in-out',
                color: isDarkBackground(currentBgColor) ? 'white' : 'black'
            }}
        >
            <div className="footer-logos"
                style={{
                    filter: isDarkBackground(currentBgColor) ? 'brightness(0) invert(1)' : 'none'
                }}
            >
                <a href="https://www.w3schools.com"><Image src={instagramLogo} alt="Instagram" className="socialLogo" /></a>
                <Image src={tiktokLogo} alt="TikTok" className="socialLogo" />
                <Image src={xLogo} alt="X" className="socialLogo" />
                <Image src={youtubeLogo} alt="YouTube" className="socialLogo" />
            </div>
            <div className="footer-text" 
                style={{
                    color: isDarkBackground(currentBgColor) ? 'white' : 'black'
                }}
            >
                is___studio © 2025
            </div>
        </div>
    );
};

export default Footer;