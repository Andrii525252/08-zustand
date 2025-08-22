'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

const categories = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

const TagsMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
      >
        Notes ▾
      </button>

      {open && (
        <ul className={css.menuList}>
          {categories.map(cat => (
            <li key={cat} className={css.menuItem}>
              <Link href={`/notes/filter/${cat}`} className={css.menuLink} onClick={() => setOpen(false)}>
                {cat}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
