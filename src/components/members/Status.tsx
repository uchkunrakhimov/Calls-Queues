import { FC } from "react";
import { Tooltip } from "antd";
import { FaCircle, FaPause, FaPhone } from "react-icons/fa6";
import { ConvertTime } from "../../utils";
import { Hamburger } from "../icons/Hamburger";
import { MemberActionsType, InMembersType } from "../../types";

const iconStyle = {
  color: "",
  verticalAlign: "middle",
};

const getStatusLabel = (status: any) => {
  switch (status) {
    case 0:
      return "Неизвестен";
    case 1:
      iconStyle.color = "green";
      return "Свободен";
    case 2:
      iconStyle.color = "orange";
      return "Набор";
    case 3:
      iconStyle.color = "dark";
      return "Занято";
    case 4:
      iconStyle.color = "dark";
      return "Некорректен";
    case 5:
      iconStyle.color = "dark";
      return "Недоступен";
    case 6:
      iconStyle.color = "green";
      return "Звонит";
    case 7:
      iconStyle.color = "orange";
      return "В состоянии звонка";
    case 8:
      iconStyle.color = "orange";
      return "На удержании";
    default:
      iconStyle.color = "dark";
      return "Неизвестен";
  }
};

const getAdditionalStatus = (member: InMembersType) => {
  let status = "";
  if (member.inCall) {
    status += " (разговаривает)";
  }
  if (member.paused) {
    status += " (на паузе)";
  }
  if (member.penalty) {
    status += " (бан)";
  }
  return status;
};

const MemberStatus: FC<MemberActionsType> = ({ member }) => {
  let status;
  let statusField;
  let statusLabel = getStatusLabel(member.status);
  let additionalStatus = getAdditionalStatus(member);

  if (member.outgoingChannels && member.outgoingChannels.length > 0) {
    status = "";
  } else {
    statusField = member.paused ? member.lastPause : member.lastCall;

    if (member.status === 5 && statusField === 0) {
      status = "";
    } else if (statusField > 0) {
      status = ConvertTime(statusField);
    }
  }

  let icon;
  if (member.pausedReason === "smoke") {
    icon = (
      <i style={iconStyle}>
        <i style={{ fontSize: "18px" }}>🚬</i>
      </i>
    );
    statusLabel = "smoke";
  } else if (member.pausedReason === "dinner") {
    icon = (
      <i style={{ verticalAlign: "middle", marginLeft: "-5px" }}>
        <Hamburger />
      </i>
    );
    statusLabel = "dinner";
  } else if (member.paused) {
    icon = <FaPause style={iconStyle} />;
  } else if (member.inCall) {
    icon = <FaPhone style={iconStyle} />;
  } else {
    icon = <FaCircle style={iconStyle} />;
  }

  return (
    <Tooltip title={statusLabel + additionalStatus}>
      <div>{icon}</div>
      <div>{status}</div>
    </Tooltip>
  );
};

export { MemberStatus };
