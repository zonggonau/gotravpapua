import { Inter, Poppins } from 'next/font/google';
import { Metadata } from 'next';
import { Header, Footer } from "@/components/layout";
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '@/components/ui/ScrollToTop';
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

// Font configurations
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'GoTrav Papua - Explore the Beauty of Papua',
    template: '%s | GoTrav Papua'
  },
  description: 'Discover amazing tour packages, destinations, and adventures in Papua with GoTrav Papua. Your trusted travel partner for unforgettable experiences.',
  keywords: ['Papua travel', 'tour packages', 'adventures', 'destinations', 'Indonesia tourism'],
  authors: [{ name: 'GoTrav Papua' }],
  creator: 'GoTrav Papua',
  publisher: 'GoTrav Papua',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST || 'https://gotravpapua.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: process.env.NEXT_PUBLIC_HOST || 'https://gotravpapua.com',
    siteName: 'GoTrav Papua',
    title: 'GoTrav Papua - Explore the Beauty of Papua',
    description: 'Discover amazing tour packages, destinations, and adventures in Papua with GoTrav Papua.',
    images: [
      {
        url: '/assets/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'GoTrav Papua',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoTrav Papua - Explore the Beauty of Papua',
    description: 'Discover amazing tour packages, destinations, and adventures in Papua with GoTrav Papua.',
    images: ['/assets/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Favicon */}
        <link
          rel="icon"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/images/fav-gotrav.png`}
          sizes="any"
        />
        <link
          rel="apple-touch-icon"
          href={`${process.env.NEXT_PUBLIC_HOST}assets/images/fav-gotrav.png`}
        />
        
        {/* Fonts will be loaded via next/font in components */}
        
        {/* Critical CSS only - load essential external styles */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          crossOrigin="anonymous"
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://nokenpanel.gotravpapua.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>

      <body className={`font-sans antialiased bg-white text-gray-900 ${inter.className}`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        
        <Header />
        
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        
        <Footer />
        
        {/* Toast notifications */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        {/* Scroll to top button */}
        <ScrollToTop />
      </body>
    </html>
  );
}
