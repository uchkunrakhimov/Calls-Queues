import { FC, useState } from "react";
import { Form, Input, Button, Typography, Alert } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const { Title } = Typography;

const Login: FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: any) => {
    const { email, password } = values;
    await axios
      .post("api/auth/login", { email, password })
      .then(async (resp: any) => {
        Cookies.set("user_token", resp.data, { expires: 1 });
        Cookies.set("logged_in", "yes", { expires: 1 });
        window.location.href = "/";
      })
      .catch((err: any) => {
        if (err.response.status == 401) {
          setError("Пароль введен неверно, проверьте и повторите попытку.")
        } else if (err.response.status == 404) {
          setError("Пользователь не найден")
        }
      })
  };

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#d2d6de",
        }}
      >
        <Title level={2} style={{ margin: "1.5rem 0", textAlign: "center" }}>
          <a style={{ color: "#444" }} href={window.location.href}>
            FETG.UZ stat
          </a>
        </Title>
        <Form
          form={form}
          onFinish={handleLogin}
          style={{
            width: "22rem",
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "6px",
          }}
        >
          <Title level={5} style={{ margin: "1rem 0", textAlign: "center" }}>
            Авторизуйтесь
          </Title>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Пожалуйста, введите Ваш э-почта" },
            ]}
          >
            <Input placeholder="Э-почта" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Пожалуйста, введите Ваш пароль" },
            ]}
          >
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          {error && (
            <Alert
              style={{ margin: "1rem 0" }}
              message={error}
              type="error"
              showIcon
            />
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ margin: "1rem 0 0 0" }}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </section>
    </>
  );
};

export { Login };
