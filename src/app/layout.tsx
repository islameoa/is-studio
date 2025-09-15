'use client';
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import { BackgroundColorProvider } from '../contexts/BackgroundColorContext';
import { AudioProvider } from '../contexts/BackgroundAudioContext';
import '../styles/globals.scss';
import React from 'react';
import AudioButton from '../components/audioButton/AudioButton';

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
                    <AudioProvider audioSrc="/audio/Arabian_oud_relaxing_music_meditation.mp3">
                        <Navbar />
                        <main className={'main'}>{children}</main>
                        <Footer />
                        <AudioButton />
                    </AudioProvider>
                </BackgroundColorProvider>
            </body>
        </html>
    );
}