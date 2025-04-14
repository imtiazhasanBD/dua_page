import { Inter } from 'next/font/google';
import "./globals.css";
import Layout from "./components/Layout";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Dua & Ruqyah | All Duas Collection',
  description: 'Explore a comprehensive collection of duas and ruqyah categorized for easy navigation. Discover, search, and access Arabic text, transliteration, translation, and audio for each dua in a modern and user-friendly platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
         className={`${inter.variable} bg-gray-100`}
      >
         <Layout children={children}/>
      </body>
    </html>
  );
}
