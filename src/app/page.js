'use client'
import styles from './page.module.scss'
import Main from '../components/main/index';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

export default function Home() {

    useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },[])

    return (
        <main>
            <Navbar />
            <div className={styles.main}>
                <Main />
            </div>
            <Footer />
        </main>
    )
}
