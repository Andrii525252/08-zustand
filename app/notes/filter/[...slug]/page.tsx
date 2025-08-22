import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: NotesPageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams.slug?.[0] || undefined;
  const initialNotes = await fetchNotes({
    page: 1,
    perPage: 12,
    ...(tag && tag !== 'All' ? { tag } : {}),
  });

  return <NotesClient initialNotes={initialNotes} tag={tag} />;
}
