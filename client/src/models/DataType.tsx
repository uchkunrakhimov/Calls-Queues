import React from "react";
import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";

interface DataType {
  key: React.Key;
  status: JSX.Element;
  extNum: number;
  operatorName: number;
  client: number;
  duration: string;
  actions: JSX.Element;
}

const columns: ColumnsType<DataType> = [
  Table.EXPAND_COLUMN,
  { title: "Статус", dataIndex: "status", key: "name" },
  { title: "Вн. номер", dataIndex: "extNum", key: "extNum" },
  { title: "Имя оператора", dataIndex: "operatorName", key: "operatorName" },
  { title: "Клиент", dataIndex: "client", key: "client" },
  { title: "Длительность", dataIndex: "duration", key: "duration" },
];

export { columns };
