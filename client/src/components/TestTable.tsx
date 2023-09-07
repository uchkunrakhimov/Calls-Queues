import React, { useState, useEffect } from "react";
import { Tabs, Table, Button, Space } from "antd";
import { layout, flexCenter, iconStyle, ringIconStyle } from "../styles";
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
import { columns } from "../constants";

import io from "socket.io-client";

const TestTable: React.FC = () => {
  const [data, setData] = useState({});
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.on("data", (res) => {
        setData(res);

        const tabsData = res.queues.map((queue: any) => ({
          key: queue.queue,
          label: queue.queue,
          children: (
            <Table
              expandable={{
                expandedRowRender: (record) => <div>{record.actions}</div>,
              }}
              columns={columns}
              dataSource={queue.members.map((member: any, index: any) => ({
                key: index + 1,
                status: member.paused ? (
                  <FaPause style={iconStyle} />
                ) : (
                  <FaCircle style={iconStyle} />
                ),
                extNum: member.location.replace("SIP/", ""),
                operatorName: member.location.replace("SIP/", ""),
                client:
                  member.outgoingChannels.length > 0
                    ? member.outgoingChannels[0].connectedLineNum
                    : "",
                duration:
                  member.outgoingChannels.length > 0
                    ? member.outgoingChannels[0].duration
                    : "",
                actions: (
                  <Space wrap>
                    <Button
                      style={flexCenter as React.CSSProperties}
                      icon={<FaCirclePlay />}
                      onClick={() => {
                        alert(`Key: ${index + 1}\nAction: Unpause`);
                      }}
                    >
                      Снять с паузы
                    </Button>
                  </Space>
                ),
              }))}
              bordered={true}
              size="small"
              tableLayout={"fixed"}
            />
          ),
        }));
        setTabs(tabsData);
      });
    });
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={tabs}
        type="card"
        style={layout as React.CSSProperties}
      />
    </>
  );
};

export default TestTable;
