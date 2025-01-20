import React, { useEffect, useState } from "react";
import { getReports, TReport } from "../api/reportsApi";
import { Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

function Reports() {
  const [data, setData] = useState<TReport[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status");

  useEffect(() => {
    const status = searchParams.get("status");

    if (!status) {
      setSearchParams({ status: "out" });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await getReports(status!);

        newData.sort((a: TReport, b: TReport) => {
          const dateA = new Date(a.time);
          const dateB = new Date(b.time);

          return dateA.getTime() - dateB.getTime();
        });

        setData(newData);
      } catch (err) {
        console.error("Ошибка: ", err);
      }
    };

    if (status) {
      fetchData();
    }
  }, [status]);

  const columns: ColumnsType<TReport> = [
    {
      title: "Время",
      dataIndex: "time",
      key: "time",
      render: (dateTime: string) => {
        const time = dayjs(dateTime).format("HH:mm");
        return time;
      },
      align: "center",
      className: "custom-column",
    },
    {
      title: "Менее 3 тонн",
      dataIndex: "weight1",
      key: "weight1",
      align: "center",
    },
    {
      title: "От 3 до 5 тонн",
      dataIndex: "weight2",
      key: "weight2",
      align: "center",
    },
    {
      title: "От 5 до 7 тонн",
      dataIndex: "weight3",
      key: "weight3",
      align: "center",
    },
    {
      title: "От 7 до 10 тонн",
      dataIndex: "weight4",
      key: "weight4",
      align: "center",
    },
    {
      title: "От 10 до 15 тонн",
      dataIndex: "weight5",
      key: "weight5",
      align: "center",
    },
    {
      title: "Более 15 тонн",
      dataIndex: "weight6",
      key: "weight6",
      align: "center",
    },
  ];

  const handleChange = (value: string) => {
    setSearchParams({ status: value });
  };

  return (
    <div className="table-page__reports--wrap">
      <div className="reports-text">
        <p>Количество автотранспорта на</p>
        <Select
          size="middle"
          defaultValue="out"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "in", label: "разгрузку" },
            { value: "out", label: "погрузку" },
          ]}
        />
        <p> по массе и времени на </p>
        <b> сегодня</b>
      </div>

      <Table
        className="custom-table reports"
        columns={columns}
        bordered
        dataSource={data}
        pagination={false}
      />
    </div>
  );
}

export default React.memo(Reports);
