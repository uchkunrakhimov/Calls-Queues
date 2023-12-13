import { FC } from "react";
import { Tabs, Row, Col } from "antd";
import { useFetchData } from "../hooks";
import { QueueTab } from "../types";
import { Disaster, MembersTable, CustomersRow } from ".";

const QueueTabs: FC = () => {
  const { allQueueData } = useFetchData();

  const handleTabClick = (key: string) => {
    localStorage.setItem("activeTabKey", key);
  };

  const tabsItems: QueueTab[] = allQueueData?.queues.map((queue: any) => ({
    key: queue.queue,
    label: queue.queue,
    children: (
      <section>
        <Disaster />
        <Row>
          <Col span={14}>
            <MembersTable queue={queue} />
          </Col>
          <Col span={9}>
            <CustomersRow queue={queue} />
          </Col>
        </Row>
      </section>
    ),
  }));

  return (
    <section>
      <Tabs
        onTabClick={(key) => handleTabClick(key)}
        items={tabsItems}
        type="card"
        style={{ marginTop: ".5rem" }}
      />
    </section>
  );
};

export { QueueTabs };
