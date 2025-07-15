
import React from 'react';
import { APP_TITLE, DESIGNER_NAME, Logo } from '../constants';

interface LayoutProps {
    children: React.ReactNode;
}

const Header = () => (
    <header className="py-4 px-6 bg-black bg-opacity-30 backdrop-blur-sm w-full">
        <Logo className="justify-center" />
    </header>
);

const Footer = () => (
    <footer className="py-3 px-6 text-center text-gray-400 text-sm bg-black bg-opacity-20 w-full">
        {DESIGNER_NAME}
    </footer>
);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                {children}
            </main>
            <Footer />
        </div>
    );
};