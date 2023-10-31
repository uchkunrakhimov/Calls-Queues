import { FC } from 'react'
import { MemberServicesProps } from "../../interfaces";

const MembersTimer: FC<MemberServicesProps> = ({ member }) => {
  let status;
  const formatMillisecondsToHHMMSS = (milliseconds: any) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
  };

  if (member.status === 5 && member.loginTime
    === 0 || member.loginTime
    === 0) {
    status = ""
  } else if (member.loginTime
    > 0) {
    status = formatMillisecondsToHHMMSS(member.loginTime
    )
  }
  return (
    <>{status}</>
  )
}

export { MembersTimer }