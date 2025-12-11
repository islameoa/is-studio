'use client';
import styles from './styles.module.scss';
import Picture1 from '../../../public/images/logo_h_big_nobg.png';
import Picture2 from '../../../public/images/abuelos-is-studio.jpg';
import Picture3 from '../../../public/images/pants-is-studio.jpg';
import Picture4 from '../../../public/images/rug-is-studio.jpg';
import Picture5 from '../../../public/images/fez-hat-is-studio.jpg';
import Picture6 from '../../../public/images/chaqueta-cuero-is-studio.jpeg';
import Picture7 from '../../../public/images/basic-shirt-is-studio.jpg';
import Picture8 from '../../../public/images/women-is-studio.jpg';
import Picture9 from '../../../public/images/basic-tee-is-studio.jpg';
import Picture10 from '../../../public/images/tyson-praying-is-studio.jpg';
import Picture11 from '../../../public/images/diary-is-studio.jpg';
import Picture12 from '../../../public/images/merc-kid-is-studio.jpg';
import Picture13 from '../../../public/images/blgha-is-studio.jpg';
import Image from 'next/image';
import Link from "next/link";
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useBackgroundColor } from '../../contexts/BackgroundColorContext';
import { CSS_COLORS } from '../../constants/css-colors';

const words = ['purpose', 'إحسان', 'love', 'بركة', 'meaning', 'توكل', 'wisdom', 'تقوى'];

export default function Home() {
    const container = useRef(null);
    const section1Ref = useRef(null);
    const section2Ref = useRef(null);
    const section3Ref = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const { scrollYProgress: parallaxScrollProgress } = useScroll({
        target: section2Ref,
        offset: ['start end', 'end start']
    });

    // Function to determine if the background is dark
    const isDarkBackground = (color) => {
        // Convert hex to RGB
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance < 0.5;
    };

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const [index, setIndex] = useState(0);
    const { currentBgColor, setCurrentBgColor } = useBackgroundColor();

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const section1Top = section1Ref.current?.offsetTop || 0;
            const section2Top = section2Ref.current?.offsetTop || 0;
            const section3Top = section3Ref.current?.offsetTop || 0;
            const containerTop = container.current?.offsetTop || 0;
            
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const scrollCenter = scrollY + windowHeight / 2;
    
            if (scrollCenter >= containerTop) {
                setCurrentBgColor(CSS_COLORS.accent);
            } else if (scrollCenter >= section3Top) {
                setCurrentBgColor(CSS_COLORS.primary);
            } else if (scrollCenter >= section2Top) {
                setCurrentBgColor('#F1ECE4');
            } else if (scrollCenter >= section1Top) {
                setCurrentBgColor('#F1ECE4');
            } else {
                setCurrentBgColor('#F1ECE4');
            }
        };

        handleScroll();
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setCurrentBgColor]);

    useEffect(() => {
        document.body.style.backgroundColor = currentBgColor;
        document.body.style.transition = 'background-color 0.8s ease-in-out';
    }, [currentBgColor]);

    return (
        <>
            <div 
                ref={section1Ref}
                style={{
                    height: '100vh',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    padding: '2rem'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1
                    }}
                >
                    <video autoPlay loop muted webkit-playsinline="true" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        <source src="/videos/is-studio.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
                {/* <p className={styles.textVideo1}>“A new language of self-expression”</p> */}
                <p className={styles.textVideo2}>Arab heritage meets modern design.</p>
                <Link href="/productos">
                    <button type="button" className={styles.button}>EXPLORE</button>
                </Link>
            </div>

            {/* PARALLAX SECTION */}
            <div ref={section2Ref} className={styles.parallaxSection}>
            <p className={styles.collectionTitle}>
                Introducing the RIHLA COLLECTION - رحلة
            </p>
            <p className={styles.collectionSubtitle}>
                A collection inspired by the rich heritage of Morocco, <br />
                blending traditional craftsmanship with modern aesthetics.
            </p>
            
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className={styles.parallaxGrid}
            >
                {/* Columna 1 */}
                <div className={styles.parallaxColumn}>
                <motion.div className={`${styles.imgBoxSmall} ${styles.hoverContainer}`}
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, -100]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture2} 
                    fill 
                    alt="image" 
                    placeholder='blur' 
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>djellaba</span>
                    </a>
                </motion.div>
                
                <motion.div className={`${styles.imgBoxLarge} ${styles.hoverContainer}`} 
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, -100]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture3} 
                    fill 
                    alt="image" 
                    placeholder='blur' 
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>rihla shorts</span>
                    </a>
                </motion.div>
                </div>

                {/* Columna 2 - Se oculta en móvil y se redistribuye */}
                <div className={`${styles.parallaxColumn} ${styles.parallaxColumnMiddle}`}>
                <motion.div className={`${styles.imgBoxExtraLarge} ${styles.hoverContainer}`} 
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, -200]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture4} 
                    fill 
                    alt="image" 
                    placeholder='blur'
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>zarbiya</span>
                    </a>
                </motion.div>
                
                <motion.div className={`${styles.imgBoxExtraSmall} ${styles.hoverContainer}`} 
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, 100]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture5} 
                    fill 
                    alt="image" 
                    placeholder='blur' 
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>tarbush</span>
                    </a>
                </motion.div>
                </div>

                {/* Columna 3 */}
                <div className={`${styles.parallaxColumn} ${styles.parallaxColumnLast}`}>
                <motion.div className={`${styles.imgBoxMedium} ${styles.hoverContainer}`} 
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, -50]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture6} 
                    fill 
                    alt="image" 
                    placeholder='blur' 
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>جَاكِيت</span>
                    </a>
                </motion.div>
                
                <motion.div className={`${styles.imgBoxLargePlus} ${styles.hoverContainer}`} 
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, 0]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture7} 
                    fill 
                    alt="image" 
                    placeholder='blur' 
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>qamisa</span>
                    </a>
                </motion.div>
                </div>

                {/* Columnas adicionales para móvil - Solo visibles en móvil */}
                <div className={styles.mobileOnlyColumn}>
                <motion.div className={`${styles.imgBoxMobile} ${styles.hoverContainer}`} 
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, -100]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture4} 
                    fill 
                    alt="image" 
                    placeholder='blur' 
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>Nombre del producto</span>
                    </a>
                </motion.div>
                </div>

                <div className={styles.mobileOnlyColumn}>
                <motion.div className={`${styles.imgBoxMobile} ${styles.hoverContainer}`} 
                    style={{ y: useTransform(parallaxScrollProgress, [0, 1], [0, 50]) }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Image 
                    src={Picture5} 
                    fill 
                    alt="image" 
                    placeholder='blur' 
                    style={{ objectFit: 'cover' }} 
                    />
                    <a href="/producto/slug-del-producto" className={styles.hoverOverlay}>
                        <span className={styles.hoverTitle}>Nombre del producto</span>
                    </a>
                </motion.div>
                </div>
            </motion.div>
            </div>

            <div 
                ref={section3Ref}
                style={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                    padding: '2rem'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                        <p style={{fontFamily:'canela', fontSize:'4rem', float:'right'}}>Welcome to IS___STUDIO</p>
                        <p style={{fontFamily:'NeueHaas', fontSize:'2rem'}}>A modern expression of tradition. <br></br> Every piece merges Moroccan craft, Arab elegance, and minimalist clarity.  <br></br> Designed to inspire movement—toward yourself, your goals, your essence.</p>
                    </div>
                </motion.div>
            </div>
            
            <div ref={container} className={styles.container}>
                <div className={styles.sticky}>
                    <motion.div style={{ scale: scale4 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture1} fill alt="image" placeholder='blur' style={{
                                filter: isDarkBackground(currentBgColor) ? 'brightness(0) invert(1)' : 'none'
                                }}
                            />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale5 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture8} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale6 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture11} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale5 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture9} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale6 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture10} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale8 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture13} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale9 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture12} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <div className={styles.el}>
                        <p className={styles.text1}>The light we give always finds its way back</p>
                        <div className={styles.text2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ whiteSpace: 'nowrap', height: '10vh' }}>Built with</span>
                            <div style={{ position: "relative", display: "inline-block", width: "32vw", height: "10vh", overflow: "hidden" }}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[index]}
                                        initial={{ y: "100%" }} 
                                        animate={{ y: "0%" }}
                                        exit={{ y: "-100%" }}
                                        transition={{ duration: 2, ease: "easeInOut" }}
                                        style={{
                                            position: "absolute",  
                                            display: "inline-block",
                                            whiteSpace: "nowrap",
                                            fontWeight: "bolder"
                                        }}
                                    > &nbsp;{words[index]} </motion.span>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}