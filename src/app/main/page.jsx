import styles from './styles.module.scss';
import Picture1 from '../../../public/images/logo_biggest.png';
import Picture2 from '../../../public/images/2.jpeg';
import Picture3 from '../../../public/images/3.jpg';
import Picture4 from '../../../public/images/4.jpg';
import Picture5 from '../../../public/images/5.jpg';
import Picture6 from '../../../public/images/6.jpg';
import Picture7 from '../../../public/images/7.jpeg';
import Image from 'next/image';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const words = ['purpose', 'إحسان', 'love', 'بركة', 'meaning', 'توكل', 'wisdom', 'تقوى'];

export default function Home() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                <motion.div style={{ scale: scale4 }} className={styles.el}>
                    <div className={styles.imageContainer}>
                        <Image src={Picture1} fill alt="image" placeholder='blur' />
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
                    {/* <p className={styles.text2}>a multidisciplinary creative studio</p> */}
                    <p className={styles.text1}>Elevated web design</p>
                </div>
                
            </div>
        </div>
    );
}