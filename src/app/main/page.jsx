'use client';
import styles from './styles.module.scss';
import Picture1 from '../../../public/images/logo_h_big_nobg.png';
import Picture2 from '../../../public/images/abuelos-is-studio.jpg';
import Picture3 from '../../../public/images/sinuo-desktop.png';
import Picture4 from '../../../public/images/rug-is-studio.jpg';
import Picture6 from '../../../public/images/is-studio-desktop.png';
import Picture7 from '../../../public/images/bydanilarbi.png';
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

// 6 projects — desktop order: 0,1,2 / 3,4,5 (left-to-right, top-to-bottom)
const projects = [
    { image: Picture3, title: 'sinuo',        link: '/projects/sinuo',       desktopHeight: '42vh' },
    { image: Picture4, title: 'zarbiya',      link: '/projects/zarbiya',     desktopHeight: '60vh' },
    { image: Picture6, title: 'is studio',    link: '/projects/is-studio',   desktopHeight: '48vh' },
    { image: Picture2, title: 'abuelos',      link: '/projects/abuelos',     desktopHeight: '50vh' },
    { image: Picture7, title: 'by dani larbi',link: '/projects/bydanilarbi', desktopHeight: '55vh' },
    { image: Picture8, title: 'women',        link: '/projects/women',       desktopHeight: '38vh' },
];

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

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    // Parallax column y-offsets — always called unconditionally (hook rules)
    const yCol1 = useTransform(parallaxScrollProgress, [0, 1], [0, -100]);
    const yCol2 = useTransform(parallaxScrollProgress, [0, 1], [0, -200]);
    const yCol3 = useTransform(parallaxScrollProgress, [0, 1], [0,  -50]);
    const yZero = useTransform(parallaxScrollProgress, [0, 1], [0,    0]);

    const [isMobile, setIsMobile] = useState(false);
    const [index, setIndex] = useState(0);
    const { currentBgColor, setCurrentBgColor } = useBackgroundColor();
    const isDefaultBg = currentBgColor === "#F1ECE4";

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
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

    // Desktop: 3 cols → projects in reading order 0,1,2 / 3,4,5
    // Mobile:  2 cols → projects in reading order 0,1 / 2,3 / 4,5
    const columns = isMobile
        ? [
            { indices: [0, 2, 4], y: yCol1, paddingTop: 0 },
            { indices: [1, 3, 5], y: yCol3, paddingTop: '2rem' },
          ]
        : [
            { indices: [0, 3], y: yCol1, paddingTop: 0 },
            { indices: [1, 4], y: yCol2, paddingTop: '4rem' },
            { indices: [2, 5], y: yCol3, paddingTop: '2rem' },
          ];

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
                <Link href="/projects">
                    <button type="button" className={styles.button}>EXPLORE</button>
                </Link>
            </div>

            {/* PARALLAX SECTION */}
            <div ref={section2Ref} className={styles.parallaxSection}>
                {/* Header is z-indexed above the grid so parallax images never overlap it */}
                <div className={styles.parallaxSectionHeader}>
                    <p className={styles.collectionTitle}>
                        Meaningful websites for creatives and businesses
                    </p>
                    <p className={styles.collectionSubtitle}>
                        I build software at the intersection of culture, design and technology. <br/>
                        From interfaces to architecture, my work focuses on clarity, structure
                        and long-term impact.
                    </p>
                    <div className={styles.infoButtonDiv}>
                        <Link href="/contact">
                            <button type="button" className={styles.infoButton}>GET IN TOUCH</button>
                        </Link>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className={styles.parallaxGrid}
                >
                    {columns.map((col, colIdx) => (
                        <div
                            key={colIdx}
                            className={styles.parallaxColumn}
                            style={{ paddingTop: col.paddingTop }}
                        >
                            {col.indices.map(projIdx => (
                                <motion.div
                                    key={projIdx}
                                    className={`${styles.imgBox} ${styles.hoverContainer}`}
                                    style={{
                                        y: isMobile ? yZero : col.y,
                                        height: isMobile ? '42vw' : projects[projIdx].desktopHeight,
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Image
                                        src={projects[projIdx].image}
                                        fill
                                        alt={projects[projIdx].title}
                                        placeholder="blur"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <a href={projects[projIdx].link} className={styles.hoverOverlay}>
                                        <span className={styles.hoverTitle}>{projects[projIdx].title}</span>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    ))}
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
                    <div className={styles.welcomeDiv}>
                        <p className={styles.welcomeTitle}>Welcome to IS___STUDIO</p>
                        <p className={styles.welcomeSubtitle}>A modern expression of tradition. <br></br> Every piece merges Moroccan craft, Arab elegance, and minimalist clarity.  <br></br> Designed to inspire movement—toward yourself, your goals, your essence.</p>
                    </div>
                </motion.div>
            </div>
            
            <div ref={container} className={styles.container}>
                <div className={styles.sticky}>
                    <motion.div style={{ scale: scale4 }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={Picture1} fill alt="image" placeholder='blur' style={{
                                filter: isDefaultBg ? 'none': 'brightness(0) invert(1)'
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