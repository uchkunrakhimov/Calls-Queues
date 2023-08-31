import React from "react";
import { Table } from "antd";
import { columns, data } from "../constants";

const CallsTable: React.FC = () => (
  <Table
    expandable={{
      expandedRowRender: (record) => <div>{record.actions}</div>,
    }}
    columns={columns}
    dataSource={data}
    bordered={true}
    size="small"
    tableLayout={"fixed"}
  />
);

export default CallsTable;
