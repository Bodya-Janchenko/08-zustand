import css from "./SidebarNotes.module.css";
import { NoteTag } from "@/types/note";
import Link from "next/link";

export const categories: NoteTag[] = [
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
  "Todo",
];

const SidebarNotes = () => {
  return (
    <>
      <Link href="/notes/action/create">Create note +</Link>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/all">
            All notes
          </Link>
        </li>
        {categories.map((category, index) => (
          <li className={css.menuItem} key={index}>
            <Link href={`/notes/filter/${category}`} className={css.menuLink}>
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarNotes;
