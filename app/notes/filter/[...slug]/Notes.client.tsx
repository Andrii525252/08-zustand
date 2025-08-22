'use client';

import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './Notes.module.css';
import Pagination from '@/components/Pagination/Pagination';
import Link from 'next/link';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const handleSearch = useDebouncedCallback((search: string) => {
    setDebouncedSearch(search);
  }, 500);

  const handleSearchChange = (search: string) => {
    setSearch(search);
    setPage(1);
    handleSearch(search);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        ...(tag && tag !== 'All' ? { tag } : {}),
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;
  if (!data) return <p>No notes found.</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.total_pages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPageChange={setPage}
          />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create +
        </Link>
      </header>

      {data?.data?.length > 0 ? (
        <NoteList notes={data.data} />
      ) : (
        <p>You don’t have any notes here</p>
      )}
    </div>
  );
}
