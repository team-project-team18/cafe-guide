import React, { useEffect } from "react";
import { NewsBar } from "../../components/NewsBar/NewsBar";
import { useAppDispatch } from "../../app/hooks";
import { loadCafes } from "../../app/thunk/cafeThunk";
import { CafeBar } from "../../components/CafeBar/CafeBar";

import './HomePage.scss';

export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCafes())
  }, [dispatch]);


  return (
    <div className="homePage">
      <NewsBar />
      <CafeBar title="You would like to visit it" />
    </div>
  );
};
