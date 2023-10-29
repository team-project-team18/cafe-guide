import React, { useEffect, useState } from "react";
import { NavLink, Link } from 'react-router-dom'
import cn from 'classnames';
import { Logo } from "../Logo/Logo";
import './Header.scss';
import { Search } from "../Search/Search";

export const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch((prevSearch) => !prevSearch);
  };

  const toggleMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
    setShowSearch(false);
  };

  const handleLinkClick = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (showMenu) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [showMenu]);

  return (
    <header className="header">
      <nav className={cn('header__navbar', { 'header__navbar--hidden': showSearch })}>
        <button
          className="header__burger"
          type="button"
          onClick={toggleMenu}
        >
          <div className="header__burger--icon" />
        </button>
        <div className={cn('header__mobile mobile', {
          show: showMenu,
          'show-menu': showMenu,
        })}>
          <div className="mobile__header">
            <Logo />

            <button
              type="button"
              className="mobile__burger"
              onClick={toggleMenu}
            >
              <div className="mobile__burger--icon" />
            </button>
          </div>

          <ul className="mobile__menu">
            <li className="mobile__item">
              <NavLink
                to="/cafe-guide"
                className="mobile__link"
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
              <NavLink
                to="/cafe-guide/catalog"
                className="mobile__link"
                onClick={handleLinkClick}
              >
                Catalog
              </NavLink>
              <NavLink
                to="/cafe-guide/news"
                className="mobile__link"
                onClick={handleLinkClick}
              >
                News
              </NavLink>
            </li>
            <li className="mobile__follow">Follow us:</li>
            <li className="mobile__socialsList">

              <Link
                to="https://facebook.com/"
                className="mobile__socials"
              >
                <div className="mobile__socials--icon mobile__socials--icon--facebook" />
              </Link>
              <Link
                to="https://www.instagram.com/"
                className="mobile__socials"
              >
                <div className="mobile__socials--icon mobile__socials--icon--instagram" />
              </Link>
              <Link
                to="https://twitter.com/"
                className="mobile__socials"
              >
                <div className="mobile__socials--icon mobile__socials--icon--twitter" />
              </Link>
            </li>
          </ul>
        </div>
        <Logo />

        <ul className="header__desktop">
          <li className="header__container">
            <NavLink
              to="/cafe-guide/"
              className={({ isActive }) => cn(
                'header__ref',
                { 'header__ref--active': isActive },
              )}
            >
              Home
            </NavLink>
          </li>
          <li className="header__container">
            <NavLink
              to="/cafe-guide/catalog"
              className={({ isActive }) => cn(
                'header__ref',
                { 'header__ref--active': isActive },
              )}
            >
              Catalog
            </NavLink>
          </li>
          <li className="header__container">
            <NavLink
              to="/cafe-guide/news"
              className={({ isActive }) => cn(
                'header__ref',
                { 'header__ref--active': isActive },
              )}
            >
              News
            </NavLink>
          </li>
        </ul>

        <button
          className="header__search"
          type="button"
          onClick={toggleSearch}
        >
          <div className="header__search--icon" />
        </button>
        <div className="header__search--desktop"><Search /></div>
      </nav>

      {showSearch && (
        <div
          className={cn('header__search-container', { 'show-search': showSearch })}
        >
          <div className="header__search-container--search">
            <button
              className="header__search-container--button"
              type="button"
              onClick={toggleSearch}
            >
              <div className="header__search-container--icon" />
            </button>
            <Search />
          </div>
        </div>
      )}
    </header>
  );
};