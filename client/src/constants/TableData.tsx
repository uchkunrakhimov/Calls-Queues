import React from "react";
import {
  FaCircle,
  FaPause,
  FaCircleStop,
  FaCirclePlay,
  FaPhone,
  FaEarListen,
  FaMessage,
  FaComments,
  FaPhoneSlash,
} from "react-icons/fa6";
import type { ColumnsType } from "antd/es/table";
import { Table, Button, Space } from "antd";
import { flexCenter, iconStyle, ringIconStyle } from "../styles";

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

const data: DataType[] = [
  {
    key: 1,
    status: <FaPause style={iconStyle} />,
    extNum: 208,
    operatorName: 208,
    client: 0,
    duration: "",
    actions: (
      <Space wrap>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaCirclePlay />}
          onClick={() => {
            alert(`Key: ${1}\nAction: Unpause`);
          }}
        >
          Снять с паузы
        </Button>
      </Space>
    ),
  },
  {
    key: 2,
    status: <FaCircle style={iconStyle as React.CSSProperties} />,
    extNum: 206,
    operatorName: 206,
    client: 0,
    duration: "",
    actions: (
      <Space wrap>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaPause />}
          onClick={() => {
            alert(`Key: ${2}\nAction: Pause`);
          }}
        >
          Поставить на паузу
        </Button>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaCircleStop />}
          onClick={() => {
            alert(`Key: ${2}\nAction: Delete`);
          }}
        >
          Удалить
        </Button>
      </Space>
    ),
  },
  {
    key: 3,
    status: <FaPhone style={ringIconStyle as React.CSSProperties} />,
    extNum: 205,
    operatorName: 205,
    client: 977451984,
    duration: "00:03:38",
    actions: (
      <Space wrap>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaEarListen />}
          onClick={() => {
            alert(`Key: ${3}\nAction: Eavesdrop`);
          }}
        >
          Подслушать
        </Button>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaMessage />}
          onClick={() => {
            alert(`Key: ${3}\nAction: Prompt the operator`);
          }}
        >
          Подсказать оператору
        </Button>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaComments />}
          onClick={() => {
            alert(`Key: ${3}\nAction: Intervene in a conversation`);
          }}
        >
          Вмешаться в разговор
        </Button>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaPause />}
          onClick={() => {
            alert(`Key: ${3}\nAction: Pause`);
          }}
        >
          Поставить на паузу
        </Button>
        <Button
          style={flexCenter as React.CSSProperties}
          icon={<FaPhoneSlash />}
          onClick={() => {
            alert(`Key: ${3}\nAction: Put the phone down`);
          }}
        >
          Положить трубку
        </Button>
      </Space>
    ),
  },
];

export { columns, data };
