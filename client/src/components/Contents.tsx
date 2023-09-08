import React, { useState, useEffect } from "react";
import { Tabs, Table, Button, Space, Spin } from "antd";
import { iconStyle } from "../styles";
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
import { columns } from "../models";

import io from "socket.io-client";

const Contents: React.FC = () => {
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.on("data", (res) => {
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
                      style={iconStyle}
                      icon={<FaCirclePlay />}
                      onClick={() => {
                        alert(`Key: ${index + 1}\nAction: Unpause`);
                      }}
                    >
                      Снять с паузы
                    </Button>
                    <Button
                      style={iconStyle}
                      icon={<FaCircleStop />}
                      onClick={() => {
                        alert(`Key: ${index + 1}\nAction: Delete`);
                      }}
                    >
                      Удалить
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

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Tabs defaultActiveKey="1" items={tabs} type="card" />
      )}
    </div>
  );
};

export { Contents };
