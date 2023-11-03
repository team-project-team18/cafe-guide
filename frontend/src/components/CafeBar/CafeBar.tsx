import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loadCafes } from "../../app/thunk/cafeThunk";
import { CafeCard } from "../CafeCard/CafeCard";
import './CafeBar.scss';

type Props = {
  title: string,
}

export const CafeBar: React.FC<Props> = ({ title }) => {
  const dispatch = useAppDispatch();
  const { cafes, isLoading, hasError } = useAppSelector(state => state.cafes);

  useEffect(() => {
    dispatch(loadCafes())
    console.log('2')
  }, [dispatch]);

  return (
    <div className="cafeBar">
      <h1 className="cafeBar__title">{title}</h1>
      {isLoading ? (
        <p>Loading cafes...</p>
      ) : hasError ? (
        <p>Error loading cafes</p>
      ) : (
        <div className="cafeBar__cards">
          {cafes.slice(0, 3).map(cafe => (
            <CafeCard key={cafe.id} cafeId={cafe.id} />
          ))}
        </div>
      )}
    </div>
  );
}