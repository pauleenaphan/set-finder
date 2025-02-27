"use client"

import "./globals.css";
import WindowNav from "../components/windowNav";
import MobileNav from "@/components/mobileNav";
import { Footer } from "@/components/footer";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Scroll to top whenever the path changes
    window.scrollTo(0, 0);
  }, [pathname]);  // Dependency on pathname to track route changes


  // To display mobile or window nav
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 769){
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // cleanup
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/setFinderIcon.png"></link>
      </head>
      <body>
        {isMobile ? <MobileNav/> : <WindowNav/>}
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
