import React from "react";
import { Link } from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { Loader } from "../Loader/Loader";
import './NewsCard.scss';

type Props = {
  title: string,
}

export const NewsCard: React.FC<Props> = ({ title }) => {
  const { isLoading, hasError, news } = useAppSelector(state => state.news);

  const foundNews = news.find(foundNews => foundNews.title === title);

  if (hasError) {
    return <div>Error loading news</div>;
  }

  console.log(foundNews)

  return (
    <div className="newsCard">
      {isLoading && <Loader />}

      <Link
        to={`/cafe-guide/news/${foundNews?.title}`}
        className="newsCard__link"
        onClick={() => {
          window.scrollTo({
            top: 0,
          })
        }}
      >
        <div className="newsCard__item">
          <div className="newsCard__wrapper">
            <img
              src={foundNews?.image}
              alt="coffee"
              className="newsCard__image"
            />
          </div>
          <h2 className="newsCard__title">{foundNews?.title}</h2>
        </div>
      </Link>
    </div>
  );
}