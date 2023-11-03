import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { CafeCard } from "../../components/CafeCard/CafeCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import './CatalogPage.scss';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Pages } from "../../types/Pages";
import { DropDown } from "../../components/DropDown/DropDown";
import { getSearchWith } from "../../helpers/getSearch";
import { sortOptions } from "../../helpers/sortOptions";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DiscreteSlider } from "../../components/Slider/Slider";
import { loadCafes } from "../../app/thunk/cafeThunk";

export const CatalogPage: React.FC = () => {
  const { cafes } = useAppSelector(state => state.cafes);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || 'age';
 
  const [numCards, setNumCards] = useState(cafes.length);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadCafes());
    };

    fetchData();

    return () => {
      localStorage.removeItem('numCards');
    };
  }, [dispatch, cafes.length]);

  useEffect(() => {
    const storedValue = localStorage.getItem('numCards');
    setNumCards(parseInt(storedValue || '', 10) || cafes.length);
  }, [cafes.length]);


  const filteredCafes = useMemo(() => {
    return cafes.filter(cafe => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = cafe.name.toLowerCase().trim();

      return normalizedName.includes(normalizedQuery);
    })
  }, [cafes, query]);

  const slicedCafes = useMemo(() => {
    return filteredCafes.slice(0, numCards);
  }, [filteredCafes, numCards]);

  const sortedCafes = useMemo(() => {
    const cafeCopy = [...slicedCafes];

    switch (sortBy) {
      case 'name':
        cafeCopy.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case 'id':
        cafeCopy.sort((a, b) => +(b.id) - +(a.id));
        break;

      default:
        break;
    }

    return cafeCopy;
  }, [sortBy, slicedCafes]);

  const handleSortChange = (newVaue: string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          sortBy: newVaue || null,
        }
      )
    )
  }

  const handleDistanceFromServerChange = (newValue: string) => {
    setSearchParams(
      getSearchWith(
        searchParams,
        {
          numCards: newValue || null,
        }
      )
    )
  }

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(prev => !prev);
  };

  const handleSliderChange = (value: number) => {
    setNumCards(value);
    localStorage.setItem('numCards', String(value));
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
    setNumCards(cafes.length);
    localStorage.removeItem('numCards');
    setIsFilterMenuOpen(false);
  }

  return (
    <div className="catalog">
      <BreadCrumbs pages={Pages.Catalog} />
      <div className={`catalog__container ${isFilterMenuOpen ? 'filter-menu-open' : ''}`}>
        <div className="catalog__top">
          <h1 className="catalog__title">Coffee catalog</h1>
          <div className="catalog__filter">
            <DropDown
              options={sortOptions}
              onChange={handleSortChange}
            />
            <FilterAltIcon
              onClick={toggleFilterMenu}
              style={{ cursor: "pointer", width: 40, height: 40, }}
            />
          </div>
        </div>
        <div className="catalog__content">
          {sortedCafes.map(cafe => (
            <CafeCard cafeId={cafe.id} key={cafe.id} />
          ))}
        </div>
      </div>

      <div className="filter-menu">
        <div className="filter-menu__header">
          <button
            className="filter-menu__button"
            type="button"
            onClick={toggleFilterMenu}
          >
            <div className="filter-menu__icon" />
          </button>
          <h2>Filter options</h2>
        </div>

        <div className="filter-menu__filter">
          <span>Distance from center: {sortedCafes.length} km</span>
          <DiscreteSlider
            onChangeParams={handleDistanceFromServerChange}
            onChange={handleSliderChange}
          />
        </div>
        <button
          className="filter-menu__reset"
          onClick={resetFilters}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};