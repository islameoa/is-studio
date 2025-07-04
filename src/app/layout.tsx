'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { BackgroundColorProvider } from '../contexts/BackgroundColorContext';
import '../styles/globals.scss';
import React from 'react';

// export const metadata = {
//     title: 'Iسstudio',
//     description: 'Iسstudio is a design studio based Barcelona. Inspiration, websites, apps, and branding for businesses and individuals.',
// }

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }, []);

    return (
        <html lang="es">
            <body>
                <BackgroundColorProvider>
                    <Navbar />
                    <main className={'main'}>{children}</main>
                    <Footer />
                </BackgroundColorProvider>
            </body>
        </html>
    );
}