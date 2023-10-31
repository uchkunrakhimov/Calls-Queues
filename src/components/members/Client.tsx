import { FC } from "react";
import { MemberServicesProps } from "../../interfaces";

const MemberClient: FC<MemberServicesProps> = ({ member }) => {
  if (
    member.inCall &&
    member.incomingChannels.length > 0 &&
    member.incomingChannels[0].callerIdNum !== "<unknown>"
  ) {
    return member.incomingChannels[0].callerIdNum;
  } else if (
    member.inCall &&
    member.incomingChannels.length === 0 &&
    member.outgoingChannels.length > 0 &&
    member.outgoingChannels[0].connectedLineNum !== "<unknown>"
  ) {
    return member.outgoingChannels[0].connectedLineNum;
  }
  return "";
};

export { MemberClient };
