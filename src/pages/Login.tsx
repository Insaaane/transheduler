import React, { useEffect } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import BlockLogo from "../Components/BlockLogo";
import { useNavigate } from "react-router-dom";
import { login, LoginRequest } from "../api/authApi";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate("/reservations", { replace: true });
    }
  }, [navigate]);

  const onFinish = (data: LoginRequest) => {
    const fetchData = async () => {
      try {
        await login(data);
        navigate("/reservations", { replace: true });
      } catch (err) {
        console.error("Ошибка авторизации: ", err);
      }
    };

    fetchData();
  };

  return (
    <div className="login--wrap">
      <div className="login">
        <BlockLogo />

        <div className="login__form--wrap">
          <Form name="login" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Пожалуйста, введите почту!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Почта" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите пароль!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Пароль"
              />
            </Form.Item>

            <div className="login__btn--wrap">
              <Button block type="primary" htmlType="submit">
                Войти
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Login);
