import React from "react";

import './CommentsBar.scss';

type Props = {
  userName: string,
  userImage: string,
  content: string,
  dateTime: string,
}

export const CommentsBar: React.FC<Props> = ({
  userName,
  userImage,
  content,
  dateTime,
}) => {

  const formatedData = () => {
    const splitedDate = dateTime.split('T');
    const datePart = splitedDate[0];

    return `${datePart}`;
  };

  return (
    <div className="comment">
      <div className="comment__form">
        <div className="comment__name">
          {userName}
        </div>
        <img
          src={userImage}
          alt="user img"
          className="comment__image"
        />
      </div>
      <div className="comment__content">
        <div className="comment__word">Impression:</div>
        <div className="comment__text">
          {content}
        </div>
      </div>
      <div className="comment__data">
        {formatedData()}
      </div>
    </div>
  );
}