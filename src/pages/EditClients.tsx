import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteClient,
  getClient,
  postClient,
  putClient,
  TClient,
} from "../api/clientsApi";
import { CLIENTS_INPUT_STYLE } from "../utils/const";

function EditClietns() {
  const [form] = Form.useForm();
  const { clientId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const client = await getClient(clientId!);

        form.setFieldsValue({
          inn: client.inn,
          name: client.name,
        });
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    if (!location.pathname.endsWith("new")) {
      fetchData();
    }
  }, [clientId, form, location.pathname]);

  const onFinish = (data: TClient) => {
    if (location.pathname.endsWith("new")) {
      postClient(data);
    } else {
      putClient(clientId!, data);
    }
    navigate(-1);
  };

  const handleDelete = () => {
    const fetchData = async () => {
      try {
        await deleteClient(clientId!);
        navigate(-1);
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  };

  return (
    <Form form={form} name="login" onFinish={onFinish}>
      <div className="input--wrap">
        <p className="input__label">Название</p>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <Input style={CLIENTS_INPUT_STYLE} placeholder="Имя/название владельца" />
        </Form.Item>
      </div>

      <div className="input--wrap">
        <p className="input__label">ИНН</p>
        <Form.Item
          name="inn"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <Input style={CLIENTS_INPUT_STYLE} placeholder="ИНН" />
        </Form.Item>
      </div>

      <div className="form--btns">
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>

        <Button color="danger" variant="solid" onClick={() => navigate(-1)}>
          Не сохранять
        </Button>

        {!location.pathname.endsWith("new") && (
          <Button color="danger" variant="solid" onClick={handleDelete}>
            Удалить
          </Button>
        )}
      </div>
    </Form>
  );
}

export default React.memo(EditClietns);
