import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Essência.me - Sistema para Médicos",
  description: "Plataforma integrada de Psiquiatria e Medicina de Família com genograma digital",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
