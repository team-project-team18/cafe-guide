import React from "react";
import { Link } from 'react-router-dom';
import './NewsBar.scss';

import coffee from './coffee.jpeg'

export const NewsBar: React.FC = () => {
  return (
    <section className="news">
      <h1 className="news__description">Useful infromation for coffee explorers</h1>
      <ul className="news__list">
        <li className="news__item news__item--first">
          <Link
            to="/"
            className="news__link"
          >
            <div className="news__wrapper">
              <img
                src={coffee}
                alt="coffee"
                className="news__image news__image--first"
              />
            </div>
            <h2 className="news__title">Best matcha in Kyiv</h2>
          </Link>
        </li>
        <li className="news__item">
          <Link
            to="/"
            className="news__link"
          >
            <div className="news__wrapper">
              <img
                src={coffee}
                alt="coffee"
                className="news__image"
              />
            </div>
            <h2 className="news__title">Best matcha in Kyiv</h2>
          </Link>
        </li>
        <li className="news__item">
          <Link
            to="/"
            className="news__link"
          >
            <div className="news__wrapper">
              <img
                src={coffee}
                alt="coffee"
                className="news__image"
              />
            </div>
            <h2 className="news__title">Best matcha in Kyiv</h2>
          </Link>
        </li>
      </ul>
    </section>
  );
};