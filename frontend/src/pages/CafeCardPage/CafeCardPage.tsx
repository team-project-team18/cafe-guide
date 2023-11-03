import React from "react";
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../app/hooks";
import { Loader } from "../../components/Loader/Loader";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Pages } from "../../types/Pages";

export const CafeCardPage: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();

  const { isLoading, hasError } = useAppSelector(state => state.cafes);
  const selectedCafe = useAppSelector(state => {
    return state.cafes.cafes.find(cafe => cafe.id === id);
  });

  console.log('Selected Cafe:', selectedCafe);

  return (
    <div className="cafeCardPage">
      <BreadCrumbs pages={Pages.Catalog} />
      <h2 className="cafeCardPage__title">Cafe Details</h2>
      {hasError && <h2 className="cafeCardPage__title">Error loading cafe details</h2>}
      {isLoading && <Loader />}
      <div className="cafeCardPage__content">
        <img 
          src=""
          alt="cafe img" 
          className="cafeCardPage__image"
        />
        <span className="cafeCardPage__name">Name: {selectedCafe?.name}</span>
      </div>
    </div>
  );
};
