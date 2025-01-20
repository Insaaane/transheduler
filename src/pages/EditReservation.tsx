import { Button, DatePicker, Form, Radio, Select, TimePicker } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteReservation,
  getReservation,
  getWarehouses,
  postReservation,
  putReservation,
  TReservation,
  TWarehouse,
} from "../api/reservationsApi";
import { getVehicles, TVehicle } from "../api/vehiclesApi";
import {
  transformDateTimeToServer,
  vehiclesToOptions,
  warehousesToOptions,
} from "../utils/adapter";
import {
  RESERVATION_INPUT_STYLE,
  RESERVATION_STATUS_OPTIONS,
} from "../utils/const";

interface TReservationOut {
  id: string;
  status: "in" | "out";
  date: string;
  time: string;
  vehicle: string;
  warehouse: string;
}

function EditReservation() {
  const [form] = Form.useForm();
  const [vehicleData, setVehicleData] = useState<TVehicle[]>([]);
  const [warehousesData, setWarehousesData] = useState<TWarehouse[]>([]);
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isVehicleSelected, setIsVehicleSelected] = useState<boolean>(false);

  const handleValuesChange = (changedValues: []) => {
    if ("vehicle" in changedValues) {
      setIsVehicleSelected(!!changedValues.vehicle);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservation = await getReservation(reservationId!);

        form.setFieldsValue({
          date: dayjs(reservation.dateTime),
          time: dayjs(reservation.dateTime),
          vehicle: String(reservation.vehicle.id),
          status: reservation.status,
          warehouse: reservation.warehouse.name,
        });

        setIsVehicleSelected(form.getFieldValue("vehicle"));
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    if (!location.pathname.endsWith("new")) {
      fetchData();
    }
  }, [reservationId, form, location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicles = await getVehicles();
        const warehouses = await getWarehouses();

        setWarehousesData(warehouses);
        setVehicleData(vehicles);
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  }, []);

  const onFinish = (data: TReservationOut) => {
    const { date, time, ...rest } = data;
    const newData: TReservation = {
      ...rest,
      vehicle: vehicleData.find(
        (vehicleItem) => vehicleItem.id === data.vehicle
      )!,
      dateTime: transformDateTimeToServer(date, time),
      warehouse: warehousesData.find(
        (warehousesItem) =>
          warehousesItem.id === data.warehouse ||
          warehousesItem.name === data.warehouse
      )!,
    };

    const fetchData = async () => {
      try {
        if (location.pathname.endsWith("new")) {
          await postReservation(newData);
        } else {
          await putReservation(reservationId!, newData);
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
        await deleteReservation(reservationId!);
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
        <p className="input__label">Дата</p>
        <Form.Item
          name="date"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <DatePicker style={RESERVATION_INPUT_STYLE} format="DD.MM.YYYY" />
        </Form.Item>
      </div>

      <div className="input--wrap">
        <p className="input__label">Время</p>
        <Form.Item
          name="time"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <TimePicker style={RESERVATION_INPUT_STYLE} format="HH:mm" />
        </Form.Item>
      </div>

      <div className="input--wrap">
        <p className="input__label">Транспортное средство</p>
        <div className="icons--wrap">
          <Form.Item
            name="vehicle"
            rules={[{ required: true, message: "Обязательно для заполнения!" }]}
          >
            <Select
              showSearch
              placeholder="Выберите транспортное средство"
              optionFilterProp="label"
              options={vehiclesToOptions(vehicleData)}
            />
          </Form.Item>
          <Button
            shape="circle"
            type="dashed"
            size="middle"
            icon={<PlusOutlined />}
            onClick={() => navigate("/vehicles/new")}
          />
          <Button
            shape="circle"
            type="dashed"
            size="middle"
            disabled={!isVehicleSelected}
            icon={<EditOutlined />}
            onClick={() => {
              const id = form.getFieldValue("vehicle");
              navigate(`/vehicles/${id}`);
            }}
          />
        </div>
      </div>

      <div className="input--wrap warehouse">
        <p className="input__label">Склад</p>
        <div className="icons--wrap">
          <Form.Item
            name="warehouse"
            rules={[{ required: true, message: "Обязательно для заполнения!" }]}
          >
            <Select
              showSearch
              placeholder="Выберите склад"
              optionFilterProp="label"
              options={warehousesToOptions(warehousesData)}
            />
          </Form.Item>
        </div>
      </div>

      <div className="input--wrap radio">
        <p className="input__label">Статус</p>
        <Form.Item
          name="status"
          rules={[{ required: true, message: "Обязательно для заполнения!" }]}
        >
          <Radio.Group
            block
            options={RESERVATION_STATUS_OPTIONS}
            optionType="button"
            buttonStyle="solid"
          />
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

export default React.memo(EditReservation);
