import { FC, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MemberActions, MemberStatus, MemberClient, MemberDuration } from "..";
import { storedCanManage, storedAvailableMembers } from "../../hooks";
import { QueuesType, InMembersType, ColumnsNameType } from "../../types";

const MembersTable: FC<QueuesType> = ({ queue }) => {
  const [expandedRowKey, setExpandedRowKey] = useState<number | null>(null);

  const getExpandedRowKeys = () =>
    expandedRowKey !== null ? [expandedRowKey] : [];

  const extractMemberName = ({ location }: InMembersType) =>
    location.replace("SIP/", "");

  const extractOperatorName = ({ location }: InMembersType) => {
    const replaceName = location.replace("SIP/", "");
    return storedAvailableMembers[replaceName] || replaceName;
  };

  const handleExpand = (recordKey: number) => {
    setExpandedRowKey(recordKey === expandedRowKey ? null : recordKey);
  };

  const transformMemberData = (members: any) =>
    members.map((member: InMembersType, index: number) => ({
      key: index + 1,
      status: <MemberStatus member={member} />,
      extNum: extractMemberName(member),
      operatorName: extractOperatorName(member),
      client: (
        <b>
          <MemberClient member={member} queue={queue} />
        </b>
      ),
      duration: <MemberDuration member={member} queue={queue} />,
      actions: <MemberActions member={member} queue={queue} index={index} />,
    }));

  const columns: ColumnsType<ColumnsNameType> = [
    Table.EXPAND_COLUMN,
    { title: "Статус", dataIndex: "status", key: "name" },
    { title: "Вн. номер", dataIndex: "extNum", key: "extNum" },
    { title: "Имя оператора", dataIndex: "operatorName", key: "operatorName" },
    { title: "Клиент", dataIndex: "client", key: "client" },
    { title: "Длительность", dataIndex: "duration", key: "duration" },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transformMemberData(queue.members)}
      bordered={false}
      size="small"
      tableLayout={"auto"}
      pagination={false}
      expandable={{
        expandedRowKeys: getExpandedRowKeys(),
        onExpand: (_, record: any) => handleExpand(record.key),
        expandRowByClick: storedCanManage === "true",
        expandedRowRender: (record) =>
          record.key === expandedRowKey ? <div>{record.actions}</div> : null,
        expandIcon: () => null,
        columnWidth: 12,
      }}
    />
  );
};

export { MembersTable };
