import React, { useEffect, useState } from "react";
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
import { loadCafes } from "../../app/thunk/cafeThunk";
import { Cafe } from "../../types/Cafe";
import { Checkboxes } from "../../components/CheckBox/CheckBox";

export const CatalogPage: React.FC = () => {
  const { cafes } = useAppSelector(state => state.cafes);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const query = searchParams.get('query') || '';
  const sortBy = searchParams.get('sortBy') || '';

  const [filteredCafesByDistance, setFilteredCafesByDistance] = useState<Cafe[]>([]);
  const [isCheckedInput, setIsCheckedInput] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadCafes());
    };

    fetchData();
  }, [dispatch, cafes.length]);


  const applyFiltersAndSort = () => {
    const filteredCafes = cafes.filter(cafe => {
      const normalizedQuery = query.toLowerCase().trim();
      const normalizedName = cafe.name.toLowerCase().trim();
  
      return (
        normalizedName.includes(normalizedQuery) &&
        (isCheckedInput ? cafe.hasCoworking === true : true)
      );
    });
  
    const sortedCafes = filteredCafes.sort((a, b) => {
      switch (sortBy) {
        case 'Distance':
          return a.distanceFromCentre - b.distanceFromCentre;
        default:
          return 0;
      }
    });
  
    return sortedCafes;
  };
  

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

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen(prev => !prev);
  };

  const handleHasCoworkingChange = (checked: boolean) => {
    setIsCheckedInput(checked);

    const filteredCafesWithCoworking = applyFiltersAndSort().filter(cafe => {
      return checked ? cafe.hasCoworking === true : true;
    });

    setSearchParams(
      getSearchWith(searchParams, {
        hasCoworking: checked ? 'true' : null,
      })
    );

    setFilteredCafesByDistance(filteredCafesWithCoworking);
  };


  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
    localStorage.removeItem('numCards');
    setIsFilterMenuOpen(false);
    setIsCheckedInput(false)
    setFilteredCafesByDistance(cafes)
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
          {applyFiltersAndSort().map(cafe => (
            <CafeCard id={cafe.id} key={cafe.id} />
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
        </div>

        <div className="filter-menu__coworking">
          <span>Coworking availability:</span>
          <Checkboxes onInputChange={handleHasCoworkingChange} />
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
}