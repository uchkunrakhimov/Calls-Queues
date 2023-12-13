import { FC } from "react";
import { Divider, Row, Col, Typography } from "antd";
import { QueuesType, InCallersType } from "../../types";
import { secondsToTime } from "../../utils";

const { Text } = Typography;

const CustomersRow: FC<QueuesType> = ({ queue }) => {
  return (
    <section>
      <Divider orientation="left">
        Клиенты в очереди ({queue.callers.length})
      </Divider>
      <Row gutter={16}>
        {queue.callers.map((caller: InCallersType, index: number) => (
          <Col
            span={12}
            style={{ marginBottom: "1rem", paddingLeft: "1rem" }}
            key={index}
          >
            <Text>
              {caller.position}. <Text strong>{caller.callerIdNum}</Text>
            </Text>{" "}
            <br />
            <Text>
              ({caller.callerIdName}) {secondsToTime(parseInt(caller.wait))}
            </Text>
          </Col>
        ))}
      </Row>
    </section>
  );
};

export { CustomersRow };
