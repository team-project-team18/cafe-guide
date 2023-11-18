import React, { useState, useEffect } from "react";
import { Form, Input, Button } from 'antd';
import { rules } from "../../utils/rules";
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginAsync, logoutAsync } from "../../app/thunk/usersThunk";


export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [form] = Form.useForm();

  const authorized = localStorage.getItem('authToken');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (storedEmail) {
      setEmail(storedEmail);
      form.setFieldsValue({ email: storedEmail });
    }

    if (storedPassword) {
      setPassword(storedPassword);
      form.setFieldsValue({ password: storedPassword });
    }
  }, [form]);

  const onFinish = async (values: { email: string; password: string; remember: boolean }) => {
    await dispatch(loginAsync({ email: email, password: password }));

    if (values.remember) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
    }
  };

  const onFinishLogout = async () => {
    await dispatch(logoutAsync());
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }

  return (
    <div>
      {!authorized ? (
        <Form
          form={form}
          onFinish={onFinish}
        >

          {error && (
            <div>
              Write correct info or if you are not registered, do it
            </div>
          )}

          {!authorized && (
            <div style={{ marginBottom: '40px', color: 'red' }}>
              You are logged out!
            </div>
          )}

          <Form.Item
            label="Email"
            name="Email"
            rules={[rules.required('Please input your email!')]}
          >
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[rules.required('Please input your password!')]}
          >
            <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Item>

          <Form.Item
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <div className="login__buttons" style={{ display: 'flex', alignItems: 'center', gap: '30px'}}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                Log in
              </Button>
              <Link to="/cafe-guide/register">
                <div style={{ textDecoration: 'underline'}}>
                  Register
                </div>
              </Link>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <Form
          form={form}
          onFinish={onFinishLogout}
        >
          {authorized && (
            <div style={{ marginBottom: '40px', color: 'green' }}>
              You are logged in!
            </div>
          )}

          <Form.Item
            label="Email"
            name="Email"
          >
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
          >
            <Input.Password value={password} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Log out
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  )
}
