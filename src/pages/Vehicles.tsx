import React, { useEffect, useState } from "react";
import { Button, Table, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { getVehicles, getVehiclesByCarNumber } from "../api/vehiclesApi";
import { transformVehicles } from "../utils/adapter";

type TTableData = {
  key: string;
  carBrand: string;
  carNumber: string;
  weight: number;
  owner: string;
};

function Vehicles() {
  const columns: ColumnsType<TTableData> = [
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
  ];

  const [data, setData] = useState<TTableData[]>([]);
  const navigate = useNavigate();
  const { Search } = Input;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getVehicles();
        setData(transformVehicles(newData));
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
        const newData = await getVehiclesByCarNumber(value);
        setData(transformVehicles(newData));
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  };

  const handleAddVehicle = () => {
    navigate("./new");
  };

  return (
    <div className="table-page--wrap">
      <Search
        name="search"
        placeholder="Поиск по номеру авто..."
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

      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddVehicle}>
        Добавить транспортное средство
      </Button>
    </div>
  );
}

export default React.memo(Vehicles);
