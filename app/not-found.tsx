import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Page',
  description: 'Page you are looking for does not exist',
  openGraph: {
    title: '404 Page',
    description: 'Page you are looking for does not exist',
    url: 'https://08-zustand-ten-kappa.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'notehub',
      },
    ],
    type: 'article',
  },
};

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
