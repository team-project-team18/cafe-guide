import React from "react";
import { NavLink, Link } from 'react-router-dom';
import { Logo } from "../Logo/Logo";
import './Footer.scss';

const gitHubLink = 'https://github.com/team-project-team18/cafe-guide';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <Logo />
      </div>
      <ul className="footer__list">
        <li className="footer__item">
          <NavLink
            to={gitHubLink}
            className="footer__link"
          >
            Github
          </NavLink>
        </li>
        <li className="footer__item">
          <NavLink
            to="/cafe-guide/catalog"
            className="footer__link"
          >
            Catalog
          </NavLink>
        </li>
        <li className="footer__item">
          <NavLink
            to="/cafe-guide/news"
            className="footer__link"
          >
            News
          </NavLink>
        </li>
      </ul>
        <div className="footer__social">
          <Link
            to="https://facebook.com/"
            className="footer__link"
          >
            <div className="footer__icon footer__icon--facebook" />
          </Link>
          <Link
            to="https://www.instagram.com/"
            className="footer__link"
          >
            <div className="footer__icon footer__icon--inst" />
          </Link>
          <Link
            to="https://twitter.com/"
            className="footer__link"
          >
            <div className="footer__icon footer__icon--twitter" />
          </Link>
        </div>
    </footer>
  )
}