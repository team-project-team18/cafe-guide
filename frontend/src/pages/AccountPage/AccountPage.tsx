import React from "react";
import { LoginForm } from "../../components/LogInFrom/LogInForm";
import './AccountPage.scss';

export const AccountPage: React.FC = () => {
  return (
    <div className="account">
      <LoginForm />
    </div>
  )
}