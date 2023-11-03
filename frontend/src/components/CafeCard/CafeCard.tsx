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

  if (hasError) {
    return <div>Error loading cafe</div>;
  }

  const cafe = cafes.find(cafe => cafe.id === cafeId);

  return (
    <div className="CafeCard">
      {isLoading && <Loader />}
      {cafe ? (
        <Link 
          to={`/cafe-guide/cafes/${cafe.id}`} 
          className="CafeCard__link"
          onClick={() => {
            window.scrollTo({
              top: 0,
            })
          }}
        >
          <img
            src=""
            alt={cafe.name}
            className="CafeCard__img"
          />
          <div className="CafeCard__title">{cafe.name}</div>
        </Link>
      ) : (
        <div>Cafe not found</div>
      )}
    </div>
  );
};
