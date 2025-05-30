// src/app/layout.tsx
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registretion Page',
  description: 'Registretion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-base-100 text-base-content">
        <main className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4">
          <div className="col-span-full">{children}</div>
        </main>
      </body>
    </html>
  );
}