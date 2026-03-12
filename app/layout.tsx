import { Inter } from 'next/font/google';
import './globals.css';
import AnalyticsTracker from '@/app/components/analytics/AnalyticsTracker';
import MobileSocialBar from '@/app/components/MobileSocialBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ganderlu Portfolio',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnalyticsTracker />
        {children}
        <MobileSocialBar />
      </body>
    </html>
  );
}
