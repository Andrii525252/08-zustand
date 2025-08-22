import css from '@/app/notes/filter/@sidebar/SidebarNotes.module.css';

import Link from 'next/link';

const SidebarNotes = () => {
  return (
    <ul className={css.menuList}>
      {['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'].map(tag => (
        <li key={tag} className={css.menuItem}>
          <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
