// import { fetchNotes } from '@/lib/api';
// import NotesClient from './Notes.client';

// interface NotesPageProps {
//   params: Promise<{ slug?: string[] }>;
// }

// export default async function NotesPage({ params }: NotesPageProps) {
//   const resolvedParams = await params;
//   const tag = resolvedParams.slug?.[0] || undefined;
//   const initialNotes = await fetchNotes({
//     page: 1,
//     perPage: 12,
//     ...(tag && tag !== 'All' ? { tag } : {}),
//   });

//   return <NotesClient initialNotes={initialNotes} tag={tag} />;
// }

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];
  return {
    title: `Notes: ${tag}`,
    description: `${tag} notes list`,
    openGraph: {
      title: `Notes: ${tag}`,
      description: `${tag} notes list`,
      url: `https://08-zustand-ten-kappa.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub logo',
        },
      ],
      type: 'article',
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0] === 'All' ? undefined : slug[0];

  const initialNotes = await fetchNotes({
    search: '',
    page: 1,
    perPage: 12,
    tag,
  });

  return <NotesClient initialNotes={initialNotes} tag={tag} />;
}
