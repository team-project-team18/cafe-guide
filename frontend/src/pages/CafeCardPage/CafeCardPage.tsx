import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader/Loader";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Pages } from "../../types/Pages";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './CafeCardPage.scss';

export const CafeCardPage: React.FC = () => {
  const { cafeId = '' } = useParams<{ cafeId: string }>();

  const [startIndex, setStartIndex] = useState<number>(0);

  const { isLoading, hasError } = useAppSelector(state => state.cafes);
  const selectedCafe = useAppSelector(state => {
    return state.cafes.cafes.find(cafe => cafe.cafeId === cafeId);
  });

  const handleNexClick = () => {
    if (selectedCafe && selectedCafe.images && selectedCafe.images.length) {
      setStartIndex((prevIndex) => (prevIndex + 1) % selectedCafe.images.length);
    }
  };

  const handlePrevClick = () => {
    if (selectedCafe && selectedCafe.images) {
      setStartIndex((prevIndex) => (prevIndex === 0
        ? selectedCafe.images.length - 1
        : prevIndex - 1))
    }
  };

  useEffect(() => {
    const interval = setInterval(handleNexClick, 4000);

    return () => clearInterval(interval);
  }, [handleNexClick]);

  return (
    <div className="cafeCardPage">
      <BreadCrumbs pages={Pages.Catalog} />
      <h2 className="cafeCardPage__title">Cafe Details</h2>
      {!hasError && <h2 className="cafeCardPage__title">Error loading cafe details</h2>}
      {isLoading && <Loader />}
      <div className="cafeCardPage__content">
        <div className="cafeCardPage__slider">
          <button
            onClick={handlePrevClick}
            type="button"
            className="cafeCardPage__button"
          >
            <ArrowLeftIcon />
          </button>
          <div className="cafeCardPage__images">
            {selectedCafe?.images.map((image, index) => (
              <div
                className="cafeCardPage__image"
                key={image}
                style={{
                  opacity: index === startIndex ? 1 : 0,
                }}
              >
                <img
                  src={image}
                  alt="img cafe"
                  className="cafeCardPage__img"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handlePrevClick}
            type="button"
            className="cafeCardPage__button"
          >
            <ArrowRightIcon />
          </button>
        </div>
        <div className="cafeCardPage__wrap">
          <h2 className="cafeCardPage__name">{selectedCafe?.name}</h2>
          <p>{selectedCafe?.description}</p>
          <div className="cafeCardPage__district">
            <span className="cafeCardPage__text">Cafe located at:</span>
            <span className="cafeCardPage__value">{selectedCafe?.district} district</span>
          </div>
          <div className="cafeCardPage__district">
            <span className="cafeCardPage__text">Address:</span>
            <span className="cafeCardPage__value">{selectedCafe?.address}</span>
          </div>
          <div className="cafeCardPage__district">
            <span className="cafeCardPage__text">Distance from center:</span>
            <span className="cafeCardPage__value">{selectedCafe?.distanceFromCentre} km</span>
          </div>
        </div>
      </div>
    </div>
  );
};
