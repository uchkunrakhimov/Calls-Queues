import React, { useState } from "react";
import { Button, Modal, Space, Col, Row } from "antd";
import Settings from "./modals/Settings";
import { mainText, spaceBetween } from "../styles";

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Row style={spaceBetween as React.CSSProperties}>
      <Col>
        <h1 style={mainText as React.CSSProperties}>Очереди</h1>
      </Col>
      <Col>
        <Space wrap>
          <Button onClick={showModal}>Настройки</Button>
          <Button
            onClick={() => {
              alert(`Action: Pause`);
            }}
          >
            Пауза
          </Button>
          <Button
            onClick={() => {
              alert(`Action: To finish work`);
            }}
            type="primary"
            danger
          >
            Завершить работу (SIP/229)
          </Button>

          <Modal
            title="Basic Modal"
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
            <Settings />
          </Modal>
        </Space>
      </Col>
    </Row>
  );
};

export default Header;
