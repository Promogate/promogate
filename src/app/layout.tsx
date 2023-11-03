import { Poppins } from "next/font/google";
import { ReactNode } from "react";
import '../styles/globals.css';

const poppins = Poppins({ weight: ["300", "400", "600", "800"], subsets: ["latin"], preload: true });

export default function Layout({ children }: { children: ReactNode; }) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}