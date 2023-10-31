import { FC, useState } from "react";
import { Table } from "antd";
import { MembersProps } from "../interfaces";
import { queueColumns } from "../constants";
import {
  MemberActions,
  MemberStatus,
  MemberClient,
  MemberDuration,
  // MembersTimer,
} from ".";

const Members: FC<MembersProps> = ({ queue }) => {
  // Use object destructuring to simplify state management
  const [expandedRowKey, setExpandedRowKey] = useState<number | null>(null);

  // Extracting the expandedRowKeys logic to a helper function
  const getExpandedRowKeys = () => (expandedRowKey !== null ? [expandedRowKey] : []);

  // Helper function to extract member name
  const extractMemberName = (member: any) => member.location.replace("SIP/", "");

  // Handler for expanding and collapsing rows
  const handleExpand = (recordKey: number) => {
    if (expandedRowKey === recordKey) {
      setExpandedRowKey(null);
    } else {
      setExpandedRowKey(recordKey);
    }
  };

  // Extract the data transformation into a separate function for clarity
  const transformMemberData = (members: any) => {
    return members.map((member: any, index: any) => {
      return {
        key: index + 1,
        status: <MemberStatus member={member} />,
        // timer: <MembersTimer member={member} />,
        extNum: extractMemberName(member),
        operatorName: extractMemberName(member),
        client: <MemberClient member={member} />,
        duration: <MemberDuration member={member} />,
        actions: <MemberActions member={member} queue={queue} index={index} />,
      };
    });
  };

  return (
    <Table
      columns={queueColumns}
      dataSource={transformMemberData(queue.members)}
      bordered={true}
      size="small"
      tableLayout={"fixed"}
      pagination={false}
      expandable={{
        expandedRowKeys: getExpandedRowKeys(),
        onExpand: (_, record: any) => {
          handleExpand(record.key);
        },
        expandRowByClick: true,
        expandedRowRender: (record) => {
          if (record.key === expandedRowKey) {
            return <div>{record.actions}</div>;
          }
          return null;
        },
        expandIcon: () => null,
      }}
    />
  );
};

export { Members };
