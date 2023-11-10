import React from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader/Loader";

import './NewsPageCard.scss';

export const NewsCardPage: React.FC = () => {
  const { title = '' } = useParams<{ title: string }>();
  const { isLoading, hasError, news } = useAppSelector(state => state.news);

  const foundNews = news.find(foundNews => foundNews.title === title);

  return (
    <div className="newsPageCard">
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <h2>Error loading news</h2>
      ) : (
        <div className="newsPageCard__content">
          <img 
            src={foundNews?.image} 
            alt="news img"
            className="newsPageCard__image"
          />
          <h2 className="newsPageCard__title">{foundNews?.title}</h2>
          <p className="newsPageCard__description">{foundNews?.description}</p>
        </div>
      )}
    </div>
  );
}