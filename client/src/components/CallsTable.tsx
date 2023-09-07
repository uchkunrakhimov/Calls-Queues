import React from "react";
import { Table } from "antd";
import { columns, tableData } from "../constants";

const CallsTable: React.FC = () => (
  <Table
    expandable={{
      expandedRowRender: (record) => <div>{record.actions}</div>,
    }}
    columns={columns}
    dataSource={tableData}
    bordered={true}
    size="small"
    tableLayout={"fixed"}
  />
);

export default CallsTable;
