import "./globals.css";
import Nav from "../components/nav";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav></Nav>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
