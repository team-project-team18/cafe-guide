import React, { useState } from "react";
import { useSearchParams } from 'react-router-dom'; 
import { debounce } from "../../helpers/debounce";
import { getSearchWith } from "../../helpers/getSearch";
import './Search.scss';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [appliedQuery, setAppliedQuery] = useState(query);

  const applyQuery = debounce(setSearchParams, 1000);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyQuery(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));

    setAppliedQuery(event.target.value);
  }

  const handleResetQuery = () => {
    setAppliedQuery('');

    setSearchParams(getSearchWith(searchParams, { query: null }));
  };

  return (
    <div className="search">
      <input 
        type="text" 
        className="search__input"
        value={appliedQuery}
        placeholder="Search..."
        onChange={(event) => handleQueryChange(event)}
      />
      <div className="search__buttons">
        {query ? (
          <button
            type="button"
            className="search__reset"
            onClick={handleResetQuery}
          />
        ) : (
          <div className="search__icon" />
        )}
      </div>
    </div>
  )
};