import { FC } from "react";
import { Button, Space, message } from "antd";
import {
  FaEarListen,
  FaMessage,
  FaComments,
  FaCirclePause,
  FaCircleStop,
  FaPhoneSlash,
} from "react-icons/fa6";
import axios from "axios";

import { ActionsProps } from "../../interfaces";

const MemberActions: FC<ActionsProps> = ({ member, queue, index }) => {
  const [messageApi, contextHolder] = message.useMessage();

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

  const userData: string | null = localStorage.getItem("userData");
  const actionButtons = [];
  const safeLocation = (member: any) => {
    const locationData = member.location.split("/");
    if (locationData.length === 2) {
      return member.location;
    } else if (locationData.length === 3 && locationData[2] === "n") {
      return userData + "/" + locationData[1].split("@")[0];
    }
  };

  // Channel actions
  if (member.inCall) {
    actionButtons.push(
      <Button
        key={`listen-${index}`}
        icon={<FaEarListen />}
        onClick={() => {
          performAction(
            {
              action: "spy",
              memberName: safeLocation(member),
              me: userData,
              mode: "SPY",
            },
            `Подслушать ${safeLocation(member)} : вызов направлен на ${userData}`
          );
        }}
      >
        Подслушать
      </Button>,
      <Button
        key={`message-${index}`}
        icon={<FaMessage />}
        onClick={() => {
          performAction(
            {
              action: "spy",
              memberName: safeLocation(member),
              me: userData,
              mode: "WHISPER",
            },
            `Подсказать ${safeLocation(member)} : вызов направлен на ${userData}`
          );
        }}
      >
        Подсказать оператору
      </Button>,
      <Button
        key={`comments-${index}`}
        icon={<FaComments />}
        onClick={() => {
          performAction(
            {
              action: "spy",
              memberName: safeLocation(member),
              me: userData,
              mode: "BARGE",
            },
            `Вмешаться к ${safeLocation(member)} : вызов направлен на ${userData}`
          );
        }}
      >
        Вмешаться в разговор
      </Button>
    );
  }

  // Pause actions
  if (!member.paused) {
    actionButtons.push(
      <Button
        key={`pause-${index}`}
        icon={<FaCirclePause />}
        onClick={() => {
          performAction(
            {
              action: "pause",
              queueName: queue.queue,
              memberName: member.name,
              pause: true,
            },
            `${member.location} : на паузе`
          );
        }}
      >
        Поставить на паузу
      </Button>
    );
  } else {
    actionButtons.push(
      <Button
        key={`pause-${index}`}
        icon={<FaCircleStop />}
        onClick={() => {
          performAction(
            {
              action: "pause",
              queueName: queue.queue,
              memberName: member.name,
              pause: false,
            },
            `${member.location} : снят с паузы`
          );
        }}
      >
        Снять с паузы
      </Button>
    );
  }

  // Hangup actions
  if (
    member.inCall &&
    member.incomingChannels.length === 0 &&
    member.outgoingChannels.length > 0
  ) {
    actionButtons.push(
      <Button
        key={`phoneSlash-${index}`}
        icon={<FaPhoneSlash />}
        onClick={() => {
          performAction(
            {
              action: "hangup",
              memberName: member.outgoingChannels[0].channel,
              cause: "PBXRT",
            },
            `Вызов ${member.outgoingChannels[0].channel} завершен`
          );
        }}
      >
        Положить трубку
      </Button>
    );
  }

  if (member.inCall && member.incomingChannels.length > 0) {
    actionButtons.push(
      <Button
        key={`phoneSlash-${index}`}
        icon={<FaPhoneSlash />}
        onClick={() => {
          performAction(
            {
              action: "hangup",
              memberName: member.incomingChannels[0].channel,
              cause: "PBXRT",
            },
            `Вызов ${member.incomingChannels[0].channel} завершен`
          );
        }}
      >
        Положить трубку
      </Button>
    );
  }

  // Member actions
  if (member.membership !== "static") {
    actionButtons.push(
      <Button
        key={`stop-${index}`}
        icon={<FaCircleStop />}
        onClick={() => {
          performAction(
            {
              action: "remove",
              queueName: queue.queue,
              memberName: member.name,
            },
            `Вызов ${member.location} : удален из очереди`
          );
        }}
      >
        Удалить
      </Button>
    );

  }
  return (
    <>
      {contextHolder}
      <Space wrap>{actionButtons}</Space>
    </>
  );
};

export { MemberActions };
