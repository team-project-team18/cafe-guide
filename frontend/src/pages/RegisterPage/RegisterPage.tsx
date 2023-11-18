import React, { useState } from "react";
import { Form, Input, Button } from 'antd';
import { rules } from "../../utils/rules";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerAsync } from "../../app/thunk/usersThunk";

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(state => state.user);

  const [data, setData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
  });

  const { email, password, name, repeatPassword } = data;

  const handleChange = (fieldName: string, value: string) => {
    setData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const onRegister = async () => {
    await dispatch(registerAsync(data));
  }

  return (
    <div>
        <Form
          onFinish={onRegister}
        >
          {!error && (
            <div>{error}</div>
          )}
          <Form.Item
            label="Email"
            name="Email"
            rules={[rules.required('Please input your email!')]}
          >
            <Input
              value={email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="cafe-guide@gmail.com"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters long' },
              { max: 20, message: 'Password can be at maximum of 20 characters long' },
            ]}
          >
            <Input.Password
              value={password}
              onChange={e => handleChange('password', e.target.value)}
              placeholder="password"
            />
          </Form.Item>

          <Form.Item
            label="Repeat password"
            name="Repeat password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters long' },
              { max: 20, message: 'Password can be at maximum of 20 characters long' },
            ]}
          >
            <Input.Password
              value={repeatPassword}
              onChange={e => handleChange('repeatPassword', e.target.value)}
              placeholder="password"
            />
          </Form.Item>

          <Form.Item
            label="Name"
            name="Name"
            rules={[rules.required('Please input your name!')]}
          >
            <Input
              value={name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Bob"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" htmlType="submit" loading={isLoading} >
              Register
            </Button>
          </Form.Item>
        </Form>
    </div>
  );
}