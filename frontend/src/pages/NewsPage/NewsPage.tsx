import React from "react";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { Pages } from "../../types/Pages";
import { NewsBar } from "../../components/NewsBar/NewsBar";

export const NewsPage: React.FC = () => {
  return (
    <div className="newsPage">
      <div className="newsPage__wrap">
        <BreadCrumbs pages={Pages.News} />
        <h1>Cafe guide news</h1>
      </div>

      <div className="newsPage__content">
        <NewsBar />
      </div>
    </div>
  )
}