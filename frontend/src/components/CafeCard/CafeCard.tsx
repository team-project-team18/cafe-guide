import React from "react";
import { Link } from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { Loader } from "../Loader/Loader";
import './CafeCard.scss';

type Props = {
  cafeId: string;
};

export const CafeCard: React.FC<Props> = ({ cafeId }) => {
  const { cafes, isLoading, hasError } = useAppSelector(state => state.cafes);;

  if (isLoading) {
    return <Loader />;
  }

  if (!hasError) {
    return <div>Error loading cafe</div>;
  }

  const cafe = cafes.find(cafe => cafe.cafeId === cafeId);

  console.log(cafe)

  return (
    <div className="CafeCard">
      {isLoading && <Loader />}
      {cafe ? (
        <div className="CafeCard__wrap">
          <Link
            to={`/cafe-guide/cafes/${cafe.cafeId}`}
            className="CafeCard__link"
            onClick={() => {
              window.scrollTo({
                top: 0,
              })
            }}
          >
            <img
              src={cafe.images[0]}
              alt={cafe.name}
              className="CafeCard__img"
            />
          </Link>

          <div className="CafeCard__allInfo">
            <h2 className="CafeCard__title">{cafe.name}</h2>
            <div className="CafeCard__content">
              <div className="CafeCard__container">
                <span className="CafeCard__text">Street:</span>
                <span className="CafeCard__info">{cafe.address}</span>
              </div>
              <div className="CafeCard__container">
                <span className="CafeCard__text">Distance from center:</span>
                <span className="CafeCard__info">{cafe.distanceFromCentre} km</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Cafe not found</div>
      )}
    </div>
  );
};
