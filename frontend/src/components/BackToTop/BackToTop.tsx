import React, { useEffect, useState } from "react";
import './BackToTop.scss';

export const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`scrollUp ${isVisible ? 'visible' : ''}`}>

    <button
      className="scrollUp__button"
      type="button"
      aria-label="Back to top"
      onClick={scrollUp}
    >
      <div className="scrollUp__arrow" />
    </button>
  </div>
  );
}