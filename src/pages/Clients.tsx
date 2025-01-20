import React, { useEffect, useState } from "react";
import { Button, Table, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { getClients, getClientsByInn, TClient } from "../api/clientsApi";
import { transformData } from "../utils/adapter";

function Clients() {
  const columns: ColumnsType<TClient> = [
    {
      title: "ИНН",
      dataIndex: "inn",
      key: "inn",
      sorter: (a, b) => a.inn.localeCompare(b.inn),
    },
    {
      title: "Владелец",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  const [data, setData] = useState<TClient[]>([]);
  const navigate = useNavigate();
  const { Search } = Input;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getClients();
        setData(transformData(newData));
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (data: TClient) => {
    navigate(`./${data.id}`);
  };

  const onSearch = (value: string) => {
    const fetchData = async () => {
      try {
        const newData = await getClientsByInn(value);
        setData(transformData(newData));
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    fetchData();
  };

  const handleAddOwner = () => {
    navigate("./new");
  };

  return (
    <div className="table-page--wrap">
      <Search
        name="search"
        placeholder="Поиск по ИНН..."
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

      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddOwner}>
        Добавить владельца
      </Button>
    </div>
  );
}

export default React.memo(Clients);
