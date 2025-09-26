import HomePage from '@/components/pages/HomePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GoTrav Papua - Explore the Beauty of Papua',
  description: 'Discover amazing tour packages, destinations, and adventures in Papua with GoTrav Papua. Your trusted travel partner for unforgettable experiences.',
  keywords: 'Papua travel, tour packages, adventures, destinations, Indonesia tourism, GoTrav Papua',
  openGraph: {
    title: 'GoTrav Papua - Explore the Beauty of Papua',
    description: 'Discover amazing tour packages, destinations, and adventures in Papua with GoTrav Papua.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_HOST || 'https://gotravpapua.com',
  },
};

export default function Home() {
  return <HomePage />;
}
