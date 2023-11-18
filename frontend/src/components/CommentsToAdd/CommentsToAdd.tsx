import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { AddComment } from '../../types/AddComment';
import { useAppDispatch } from '../../app/hooks';
import { addCommentThunk } from '../../app/slices/commentsSlice';
import { Link } from 'react-router-dom';
import './CommentToAdd.scss';

interface CommentFormProps {
  cafeId: number;
}

export const CommentToAdd: React.FC<CommentFormProps> = ({ cafeId }) => {
  const dispatch = useAppDispatch();

  const [commentData, setCommentData] = useState<AddComment>({
    cafeId,
    content: '',
  });

  const [message, setMessage] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentData({
      ...commentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (commentData.content.length < 6) {
        setMessage('Comment must be at least 6 characters long');
        return;
      }

      await dispatch(addCommentThunk(commentData));
      setCommentData({
        cafeId,
        content: '',
      })
      setMessage('Your comment added!')
    } catch (error) {
      console.error('Error while dispatching addCommentThunk:', error);
      setMessage('Try again!');
    }
  };

  useEffect(() => {
    setMessage(message);
  }, [message])

  const authToken: string | undefined = localStorage.getItem('authToken') ?? undefined;

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="add__form">
        {message && (
          <div style={{ color: 'red' }}>
            {message}
          </div>
        )}
        <label className="add__label">
          Write a comment about this cafe:
          <textarea
            name="content"
            value={commentData.content}
            onChange={handleInputChange}
            className="add__text"
            minLength={10}
          />
        </label>
        {authToken ? (
          <button type="submit" className="add__button">
            Submit Comment
          </button>
        ) : (
          <Link to="/cafe-guide/register" onClick={scrollUp}>
            <div className="add__register">
              You should register and then log in to write comment
            </div>
          </Link>
        )}
      </form>
    </div>
  );
};