import React, { useState } from "react";
import { Transfer } from "antd";
import type { TransferDirection } from "antd/es/transfer";
import { RecordType } from "../interfaces";

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData
  .filter((item) => Number(item.key) > 10)
  .map((item) => item.key);

const Settings: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);

  //@ts-ignore
  const resetTargetKeys = () => {
    setTargetKeys(initialTargetKeys);
  };

  const onChange = (
    nextTargetKeys: string[],
    direction: TransferDirection,
    moveKeys: string[]
  ) => {
    console.log("moveKeys:", moveKeys, direction);
    setTargetKeys(nextTargetKeys);
  };

  return (
    <>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={onChange}
        render={(item) => item.title}
        listStyle={{
          width: 500,
          height: 300,
        }}
      />
    </>
  );
};

export { Settings };
