import axios from "axios";
import Cookies from "js-cookie";
import io from "socket.io-client";
import { LoadingOutlined } from "@ant-design/icons";
import { TabItem, Queue, Member, RecordType } from "../interfaces";
import { container as containerStyles } from "../styles";
import { Customers, Members } from "../components";
import { FC, useState, useEffect, CSSProperties } from "react";
import { Tabs, Spin, Row, Col, Button, Space, message, Modal, Transfer } from "antd";
import type { TransferDirection } from "antd/es/transfer";

const Home: FC = () => {
  const [numbers, setNumbers] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [queueData, setQueueData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabsData, setTabsData] = useState<TabItem[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string>();

  const [messageApi, contextHolder] = message.useMessage();

  const mockData: RecordType[] = numbers
    ? numbers.map((item: any, index: any) => ({
      key: index.toString(),
      title: item.number + " - " + item.full_name,
      description: `description of ${item.full_name}`,
    }))
    : [];

  const initialTargetKeys = mockData
    .filter((item) => Number(item.key) > 10)
    .map((item) => item.key);

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
    console.log(moveKeys, direction);
    setTargetKeys(nextTargetKeys);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const performAction = (actionPayload: any, successMessage: any) => {
    axios
      .post("/api/actions", actionPayload)
      .then(() => {
        messageApi.info(successMessage);
      })
      .catch((error) => {
        messageApi.error(error.message);
      });
  };

  const loaderIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const fetchUserData = async () => {
    const localUser = localStorage.getItem("userData")
    const userToken = Cookies.get("user_token");
    if (!localUser) {
      await axios
        .post("/api/lookupUser", {
          userToken,
        })
        .then((resp: any) => {
          localStorage.setItem("userData", `SIP/${resp.data.int_number}`)
        })
        .catch((err: any) => {
          console.error(err.message)
        })
    }

    if (numbers == null) {
      await axios
        .post("/api/lookupNumbers", {
          userToken,
        })
        .then((resp: any) => {
          setNumbers(resp.data);
        })
        .catch((err: any) => {
          console.error(err.message);
        })
    }
  };

  useEffect(() => {
    const socket = io(window.location.href, {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      socket.on("data", (res) => {
        const queueRes = res.queues.map((queue: any) => ({
          key: queue.queue,
          label: queue.queue,
          children: (
            <Row style={{ marginBottom: "1rem" }}>
              <Col span={14} style={{ marginRight: "1rem" }}>
                <Members queue={queue} />
              </Col>
              <Col span={9}>
                <Customers queue={queue} />
              </Col>
            </Row>
          ),
        }));

        setTabsData(queueRes);
        setQueueData(res);

        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
    });

    socket.on("disconnect", () => {
      messageApi.error("Socket отключена");
    });
  }, []);

  const logout = () => {
    const loggedCookie = Cookies.get("logged_in");
    if (loggedCookie === "yes") {
      Cookies.set("logged_in", "no", { expires: 7 });
      Cookies.remove("user_token");
      window.location.href = "/"
    }
  };

  const userData: string | null = localStorage.getItem("userData");

  const extraContent = (key: any) => {
    let tabBarExtraContent: JSX.Element | null = null;
    let defaultExtraContent: JSX.Element | null = null;
    const settingsButton = <Button onClick={showModal}>Настройки</Button>;

    queueData?.queues.forEach((queue: Queue) => {
      if (key === queue.queue) {
        const foundMember: any = queue.members.find((member: Member) => member.location === userData);

        defaultExtraContent = (
          <Space wrap>
            {settingsButton}
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={() => {
                performAction(
                  {
                    action: "add",
                    queueName: queue.queue,
                    memberName: userData,
                  },
                  `${userData}: зарегистрирован`
                );
              }}
            >
              Начать работу ({userData})
            </Button>
          </Space>
        );

        if (foundMember) {
          tabBarExtraContent = (
            <Space wrap key={queue.queue}>
              {settingsButton}
              {foundMember.paused ? (
                <Button
                  onClick={() => {
                    performAction(
                      {
                        action: "pause",
                        queueName: queue.queue,
                        memberName: userData,
                        pause: false,
                      },
                      `${userData}: cнят с паузы`
                    );
                  }}
                >
                  Продолжить
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    performAction(
                      {
                        action: "pause",
                        queueName: queue.queue,
                        memberName: userData,
                        pause: true,
                      },
                      `${userData}: на паузе`
                    );
                  }}
                >
                  Пауза
                </Button>
              )}
              <Button
                type="primary"
                onClick={() => {
                  performAction(
                    {
                      action: "remove",
                      queueName: queue.queue,
                      memberName: userData,
                    },
                    `${userData}: снят с регистрации`
                  );
                }}
                danger
              >
                Завершить работу ({userData})
              </Button>
            </Space>
          );
        }
      }
    });

    return tabBarExtraContent || defaultExtraContent;
  };

  useEffect(() => {

    fetchUserData();
    if (tabsData.length > 0) {
      localStorage.setItem("activeTabKey", tabsData[0].key);
      setActiveTabKey(tabsData[0].key);
    }
  }, [tabsData]);

  useEffect(() => {
    if (isLoading) {
      axios
        .get("/api/data")
        .catch((err) => {
          console.error(err.message);
        });
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%" }}>
          <Spin indicator={loaderIcon} size="large" />
        </div>
      ) : (
        <main style={containerStyles as CSSProperties}>
          {contextHolder}
          <Space style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2>Очереди</h2>
            <Button onClick={() => {
              logout()
            }} style={{ marginTop: "1rem", textAlign: "right" }}>Выйти</Button>
          </Space>
          <Tabs
            onTabClick={(key) => setActiveTabKey(key)}
            defaultActiveKey={activeTabKey}
            items={tabsData}
            tabBarExtraContent={extraContent(activeTabKey)}
            type="card"
            style={{ marginTop: ".5rem" }}
          />
          <Modal
            title="Настройки"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Сброс
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Сохранить
              </Button>,
            ]}
          >
            <Transfer
              titles={['Доступные', 'В очереди']}
              dataSource={mockData}
              targetKeys={targetKeys}
              onChange={onChange}
              render={(item) => item.title}
              listStyle={{
                width: 500,
                height: 300,
              }}
            />
          </Modal>
        </main>
      )}
    </>
  );
};

export { Home };
