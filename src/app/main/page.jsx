import styles from './styles.module.scss';
import Picture1 from '../../../public/images/logo_h_big_nobg.png';
import Picture2 from '../../../public/images/2.jpeg';
import Picture3 from '../../../public/images/3.jpg';
import Picture4 from '../../../public/images/4.jpg';
import Picture5 from '../../../public/images/5.jpg';
import Picture6 from '../../../public/images/6.jpg';
import Picture7 from '../../../public/images/7.jpeg';
import Image from 'next/image';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useBackgroundColor } from '../../contexts/BackgroundColorContext';

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
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            // Check which section is currently in view
            if (scrollY + windowHeight / 2 >= section3Top) {
                setCurrentBgColor('#251a14'); // Dark brown
            } else if (scrollY + windowHeight / 2 >= section2Top) {
                setCurrentBgColor('#023020'); // Dark green
            } else if (scrollY + windowHeight / 2 >= section1Top) {
                setCurrentBgColor('#6D071A'); // Dark red
            } else {
                setCurrentBgColor('#d8d0bb'); // Original beige
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [setCurrentBgColor]);

    useEffect(() => {
        document.body.style.backgroundColor = currentBgColor;
        document.body.style.transition = 'background-color 0.8s ease-in-out';
    }, [currentBgColor]);

    return (
        <>
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
                        {/* <p className={styles.text1}>Elevated web design</p> */}
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
            
            {/* Color changing sections */}
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
                        <source src="/videos/is-studio.mov" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
                <p className={styles.text1}>Inspiring through garments</p>
            </div>

            <div 
                ref={section2Ref}
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
                    Innovation Through Design
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
                    Building Tomorrow's Web
                </motion.div>
            </div>
        </>
    );
}