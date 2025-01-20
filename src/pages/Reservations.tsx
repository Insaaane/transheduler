import React, { useEffect, useState } from "react";
import { Button, Table, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import InIcon from "../Icons/InIcon";
import OutIcon from "../Icons/OutIcon";
import { useNavigate } from "react-router-dom";
import {
  getReservations,
  getReservationsByOwnername,
} from "../api/reservationsApi";
import { transformReservations } from "../utils/adapter";
import dayjs from "dayjs";

type TTableData = {
  key: string;
  status: "in" | "out";
  dateTime: string;
  carBrand: string;
  carNumber: string;
  weight: number;
  owner: string;
  warehouse: string;
};

function Reservations() {
  const columns: ColumnsType<TTableData> = [
    {
      width: 90,
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (status) => (status === "in" ? <InIcon /> : <OutIcon />),
    },
    {
      title: "Дата и время",
      dataIndex: "dateTime",
      key: "dateTime",
      sorter: (a: TTableData, b: TTableData) => {
        const dateA = new Date(a.dateTime);
        const dateB = new Date(b.dateTime);

        return dateA.getTime() - dateB.getTime();
      },
      render: (dateTime: string) => {
        const date = dayjs(dateTime).format("DD.MM.YYYY");
        const time = dayjs(dateTime).format("HH:mm");
        return `${date} ${time}`;
      },
    },
    {
      title: "Марка авто",
      dataIndex: "carBrand",
      key: "carBrand",
    },
    {
      title: "Номер авто",
      dataIndex: "carNumber",
      key: "carNumber",
    },
    {
      title: "Масса (тонн)",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: "Владелец",
      dataIndex: "owner",
      key: "owner",
      sorter: (a, b) => a.owner.localeCompare(b.owner),
    },
    {
      title: "Склад",
      dataIndex: "warehouse",
      key: "warehouse",
      sorter: (a, b) => a.warehouse.localeCompare(b.warehouse),
    },
  ];

  const [data, setData] = useState<TTableData[]>([]);
  const navigate = useNavigate();
  const { Search } = Input;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getReservations();
        const newnewData = transformReservations(newData);
        setData(newnewData);
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (data: TTableData) => {
    navigate(`./${data.key}`);
  };

  const onSearch = (value: string) => {
    const fetchData = async () => {
      try {
        const newData = await getReservationsByOwnername(value);
        setData(transformReservations(newData));
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  };

  const handleAddReservation = () => {
    navigate("./new");
  };

  return (
    <div className="table-page--wrap">
      <Search
        name="search"
        placeholder="Поиск по владельцу..."
        onSearch={onSearch}
        allowClear
        enterButton="Найти"
      />

      <Table
        className="custom-table"
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 500 }}
        onRow={(data) => ({
          onClick: () => handleRowClick(data),
        })}
      />

      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddReservation}
      >
        Добавить бронь
      </Button>
    </div>
  );
}

export default React.memo(Reservations);
