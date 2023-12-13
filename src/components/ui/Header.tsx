import { FC } from "react";
import { Space, Typography } from "antd";
import { QuestionCircleFilled } from "@ant-design/icons";

const Header: FC = () => {
  const wikiUrl = "https://wiki.fetg.uz/doku.php?id=faq:pbxrealtime";

  return (
    <header>
      <Space>
        <Typography.Title
          level={3}
          style={{ margin: "1.5rem 0", fontWeight: "500" }}
        >
          Очереди
        </Typography.Title>
        <Typography.Link
          href={wikiUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "15px" }}
        >
          <QuestionCircleFilled />
        </Typography.Link>
      </Space>
    </header>
  );
};

export { Header };
