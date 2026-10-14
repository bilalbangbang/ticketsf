import type { Metadata } from 'next';
import './globals.css';
const title = 'ticketsf. | san francisco parking citations';
const description = 'Explore 1.36 million historical San Francisco citation records from 2025. An independent data science project by Bilal J.';
export const metadata: Metadata = {
 metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
 title, description,
 openGraph: { title, description, type: 'website', siteName: 'ticketSF.' },
 twitter: { card: 'summary_large_image', title, description },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
