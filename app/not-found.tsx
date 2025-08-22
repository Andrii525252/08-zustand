'use client';
import { Metadata } from 'next';

import css from './not-found.module.css';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
