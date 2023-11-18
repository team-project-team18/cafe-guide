import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useParams } from 'react-router-dom';
import { CommentsBar } from "../CommentsBar/CommentsBar";
import './CommentForm.scss';
import { Comments } from "../../types/Comments";

export const CommentForm: React.FC = () => {

  const { id = '' } = useParams<{ id: string }>();
  const selectedCafe = useAppSelector(state => {
    return state.cafes.cafes.find(cafe => cafe.id === +id);
  });

  const [comments, setComments] = useState<Comments[]>([]);

  useEffect(() => {
    setComments(selectedCafe?.comments || []);
  }, [selectedCafe]);

  console.log('comments', comments)

  return (
    <div className="form">
      <h2>Comments from visitors</h2>
      <ul className="form__list">
        {comments.map(comment => (
          <li key={comment.id} className="form__item">
            <CommentsBar
              userName={comment.userName}
              userImage={comment.userImage}
              content={comment.content}
              dateTime={comment.dateTime}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};