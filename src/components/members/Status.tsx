import React from 'react';
import { Tooltip } from 'antd';
import { FaCircle, FaPause, FaPhone } from 'react-icons/fa6';
import { iconStyle } from '../../styles';
import { MemberServicesProps } from '../../interfaces';

const getStatusLabel = (status: any) => {
  switch (status) {
    case 0:
      return 'Неизвестен';
    case 1:
      iconStyle.color = 'green';
      return 'Свободен';
    case 2:
      iconStyle.color = 'orange';
      return 'Набор';
    case 3:
      iconStyle.color = 'dark';
      return 'Занято';
    case 4:
      iconStyle.color = 'dark';
      return 'Некорректен';
    case 5:
      iconStyle.color = 'dark';
      return 'Недоступен';
    case 6:
      iconStyle.color = 'green';
      return 'Звонит';
    case 7:
      iconStyle.color = 'orange';
      return 'В состоянии звонка';
    case 8:
      iconStyle.color = 'orange';
      return 'На удержании';
    default:
      iconStyle.color = 'dark';
      return 'Неизвестен';
  }
};

const getAdditionalStatus = (member: any) => {
  let status = '';
  if (member.inCall) {
    status += ' (разговаривает)';
  }
  if (member.paused) {
    status += ' (на паузе)';
  }
  if (member.penalty) {
    status += ' (бан)';
  }
  return status;
};

const formatMillisecondsToHHMMSS = (milliseconds: any) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  return formattedTime;
};

const MemberStatus: React.FC<MemberServicesProps> = ({ member }) => {
  let status;
  const statusField = member.lastCall;
  const statusLabel = getStatusLabel(member.status);
  const additionalStatus = getAdditionalStatus(member);


  if (member.status === 5 && statusField
    === 0 || statusField
    === 0) {
    status = ""
  } else if (statusField
    > 0) {
    status = formatMillisecondsToHHMMSS(statusField
    )
  }

  const icon = member.paused ? (
    <FaPause style={iconStyle} />
  ) : member.inCall ? (
    <FaPhone style={iconStyle} />
  ) : (
    <FaCircle style={iconStyle} />
  );

  return (
    <Tooltip title={statusLabel + additionalStatus} ref={(tooltipRef) => tooltipRef}>
      <div>
        {icon}
      </div>
      <div>
        {status}
      </div>
    </Tooltip>
  );
};

export { MemberStatus };
