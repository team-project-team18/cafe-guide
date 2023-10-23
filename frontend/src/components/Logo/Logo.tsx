import React from "react";
import { Link } from 'react-router-dom';
import "./Logo.scss";

export const Logo: React.FC = () => (
  <Link
    to="/cafe-guide"
    className="logo"
  >
    <div className="logo__img"/>
  </Link>
);