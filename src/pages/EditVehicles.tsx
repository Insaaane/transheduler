import { Button, Form, Input, InputNumber, Select } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteVehicle,
  getVehicle,
  postVehicle,
  putVehicle,
  TVehicle,
} from "../api/vehiclesApi";
import { getClients, TClient } from "../api/clientsApi";
import { clientsToOptions } from "../utils/adapter";
import { VEHICLE_INPUT_STYLE } from "../utils/const";

interface TVehicleOut {
  id: string;
  carBrand: string;
  carNumber: string;
  weight: number;
  owner: string;
}

function EditVehicles() {
  const [form] = Form.useForm();
  const [ownersData, setOwnersData] = useState<TClient[]>([]);
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isOwnerSelected, setIsOwnerSelected] = useState<boolean>(false);

  const handleValuesChange = (changedValues: []) => {
    if ("owner" in changedValues) {
      setIsOwnerSelected(!!changedValues.owner);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicles = await getVehicle(vehicleId!);

        form.setFieldsValue({
          carNumber: vehicles.carNumber,
          carBrand: vehicles.carBrand,
          owner: vehicles.owner.id,
          weight: vehicles.weight,
        });
        setIsOwnerSelected(form.getFieldValue("owner"));
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    if (!location.pathname.endsWith("new")) {
      fetchData();
    }
  }, [vehicleId, form, location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const owners = await getClients();
        setOwnersData(owners);
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  }, []);

  const onFinish = (data: TVehicleOut) => {
    const { ...rest } = data;
    const newData: TVehicle = {
      ...rest,
      owner: ownersData.find((ownersItem) => ownersItem.id === data.owner)!,
    };

    const fetchData = async () => {
      try {
        if (location.pathname.endsWith("new")) {
          await postVehicle(newData);
        } else {
          await putVehicle(vehicleId!, newData);
        }
        navigate(-1);
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  };

  const handleDelete = () => {
    const fetchData = async () => {
      try {
        await deleteVehicle(vehicleId!);
        navigate(-1);
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      onValuesChange={handleValuesChange}
    >
      <div className="input--wrap">
        <p className="input__label">Регистрационный номер</p>
        <Form.Item
          name="carNumber"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <Input style={VEHICLE_INPUT_STYLE} placeholder="Введите номер ТС" />
        </Form.Item>
      </div>

      <div className="input--wrap">
        <p className="input__label">Модель</p>
        <Form.Item
          name="carBrand"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <Input style={VEHICLE_INPUT_STYLE} placeholder="Введите модель ТС" />
        </Form.Item>
      </div>

      <div className="input--wrap">
        <p className="input__label">Масса (тонн)</p>
        <Form.Item
          name="weight"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <InputNumber min={0} step="0.1" placeholder="Масса" changeOnWheel />
        </Form.Item>
      </div>

      <div className="input--wrap owner">
        <p className="input__label">Владелец</p>
        <div className="icons--wrap">
          <Form.Item
            name="owner"
            rules={[{ required: true, message: "Обязательно для заполнения!" }]}
          >
            <Select
              showSearch
              placeholder="Выберите владельца"
              optionFilterProp="label"
              options={clientsToOptions(ownersData)}
            />
          </Form.Item>
          <Button
            shape="circle"
            type="dashed"
            size="middle"
            icon={<PlusOutlined />}
            onClick={() => navigate("/clients/new")}
          />
          <Button
            shape="circle"
            type="dashed"
            size="middle"
            disabled={!isOwnerSelected}
            icon={<EditOutlined />}
            onClick={() => {
              const id = form.getFieldValue("owner");
              navigate(`/clients/${id}`);
            }}
          />
        </div>
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

export default React.memo(EditVehicles);
