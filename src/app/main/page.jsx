import styles from './styles.module.scss';
import Picture1 from '../../../public/images/logo_h_big_nobg.png';
import Picture2 from '../../../public/images/2.jpeg';
import Picture3 from '../../../public/images/3.jpg';
import Picture4 from '../../../public/images/4.jpg';
import Picture5 from '../../../public/images/5.jpg';
import Picture6 from '../../../public/images/6.jpg';
import Picture7 from '../../../public/images/7.jpeg';
import value_of_mom from '../../../public/images/value_of_momAI.png';
import zarbiya_bag from '../../../public/images/zarbiya_bag.png';
import jellaba from '../../../public/images/jellaba.jpeg';
import Image from 'next/image';
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
                    <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        <source src="/videos/is-studio.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
                {/* <p className={styles.textVideo1}>“A new language of self-expression”</p> */}
                <p className={styles.textVideo2}>Arab heritage meets modern design.</p>
                <button type="button" className={styles.button}>EXPLORE</button>
            </div>

            {/*PARALLAX SECTION*/}
            <div 
                ref={section2Ref}
                style={{
                    height: '150vh', // Más altura para mejor efecto parallax
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '2rem'
                }}
            >
                <p style={{fontFamily:'canela', fontSize:'4rem'}}>Introducing the RIHLA COLLECTION - رحلة</p>
                <p style={{ fontSize: '2rem', marginBottom: '2rem', fontFamily: 'ModernSerif', fontWeight: 'lighter', color: '#333' }}>
                    A collection inspired by the rich heritage of Morocco, <br></br> blending traditional craftsmanship with modern aesthetics.
                </p>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    style={{
                        position: 'relative',
                        height: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '2rem',
                        padding: '2rem'
                    }}
                >
                    {/* Columna 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '40vh',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                y: useTransform(parallaxScrollProgress, [0, 1], [0, -100])
                            }}
                        >
                            <Image 
                                src={Picture2} 
                                fill 
                                alt="image" 
                                placeholder='blur' 
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                        
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '50vh',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                y: useTransform(parallaxScrollProgress, [0, 1], [0, 150])
                            }}
                        >
                            <Image 
                                src={Picture3} 
                                fill 
                                alt="image" 
                                placeholder='blur' 
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                    </div>

                    {/* Columna 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '4rem' }}>
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '60vh',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                y: useTransform(parallaxScrollProgress, [0, 1], [0, -200])
                            }}
                        >
                            <Image 
                                src={Picture4} 
                                fill 
                                alt="image" 
                                placeholder='blur' 
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                        
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '35vh',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                y: useTransform(parallaxScrollProgress, [0, 1], [0, 100])
                            }}
                        >
                            <Image 
                                src={Picture5} 
                                fill 
                                alt="image" 
                                placeholder='blur' 
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                    </div>

                    {/* Columna 3 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingTop: '2rem' }}>
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '45vh',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                y: useTransform(parallaxScrollProgress, [0, 1], [0, -50])
                            }}
                        >
                            <Image 
                                src={Picture6} 
                                fill 
                                alt="image" 
                                placeholder='blur' 
                                style={{ objectFit: 'cover' }}
                            />
                        </motion.div>
                        
                        <motion.div
                            style={{
                                position: 'relative',
                                width: '100%',
                                height: '55vh',
                                borderRadius: '15px',
                                overflow: 'hidden',
                                y: useTransform(parallaxScrollProgress, [0, 1], [0, 200])
                            }}
                        >
                            <Image 
                                src={Picture7} 
                                fill 
                                alt="image" 
                                placeholder='blur' 
                                style={{ objectFit: 'cover' }}
                            />
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
                            <Image src={Picture2} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale6 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture3} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale5 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture4} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale6 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture5} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale8 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture6} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <motion.div style={{ scale: scale9 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture7} fill alt="image" placeholder='blur' />
                        </div>
                    </motion.div>
                    <div className={styles.el}>
                        <p className={styles.text1}>where self-improvement becomes a lifestyle.</p>
                        <div className={styles.text2} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ whiteSpace: 'nowrap', height: '10vh' }}>Built with</span>
                            <div style={{ position: "relative", display: "inline-block", width: "20vw", height: "10vh", overflow: "hidden" }}>
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