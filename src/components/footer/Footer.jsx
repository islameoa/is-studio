import './Footer.scss';
import instagramLogo from '../../../public/images/instagram.png';
import tiktokLogo from '../../../public/images/tik-tok.png';
import youtubeLogo from '../../../public/images/youtube.png';
import xLogo from '../../../public/images/gorjeo.png';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logos">
                <a href="https://www.w3schools.com"><Image src={instagramLogo} alt="Instagram" className="socialLogo" /></a>
                <Image src={tiktokLogo} alt="TikTok" className="socialLogo" />
                <Image src={xLogo} alt="X" className="socialLogo" />
                <Image src={youtubeLogo} alt="YouTube" className="socialLogo" />
            </div>
            <div className="footer-text">
                is___studio © 2025
            </div>
        </div>
    );
};

export default Footer;