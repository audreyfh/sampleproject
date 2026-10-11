
import type { Metadata } from "next";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <h1 className="titlename">Folio</h1>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
