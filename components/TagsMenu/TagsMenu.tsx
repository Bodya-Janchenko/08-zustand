"use client";

import { categories } from "@/app/notes/filter/@sidebar/default";
import { useState } from "react";
import Link from "next/link";

import css from "./TagsMenu.module.css";

const TagsMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleModal}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              className={css.menuLink}
              onClick={toggleModal}
              href="/notes/filter/all"
            >
              All notes
            </Link>
          </li>
          {categories.map((category, index) => (
            <li key={index} className={css.menuItem}>
              <Link
                href={`/notes/filter/${category}`}
                className={css.menuLink}
                onClick={toggleModal}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
