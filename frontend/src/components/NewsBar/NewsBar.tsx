import React, { useEffect } from "react";
import './NewsBar.scss';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadNews } from "../../app/thunk/newsThunk";
import { NewsCard } from "../NewsCard/NewsCard";
import { Loader } from "../Loader/Loader";

export const NewsBar: React.FC = () => {
  const { isLoading, hasError, news } = useAppSelector(state => state.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadNews());
  }, [dispatch]);

  return (
    <section className="news">
      <h1 className="news__description">Useful infromation for coffee explorers</h1>
      {isLoading ? (
        <Loader />
      ) : hasError ? (
        <p>Error loading news</p>
      ) : (
        <div className="news__list">
          {news.map(currentNews => (
            <NewsCard title={currentNews.title} key={currentNews.title} />
          ))}
        </div>
      )}
    </section>
  );
};