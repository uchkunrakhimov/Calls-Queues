export type InMembersType = {
  name: string;
  status: number;
  inCall: boolean;
  lastCall: number;
  lastPause: number;
  pausedReason: string;
  wrapuptime: string;
  paused: boolean;
  penalty: number;
  location: string;
  membership: string;
  outgoingChannels: Array<any>;
  incomingChannels: Array<any>;
};

export type InQueuesType = {
  queue: string;
  members: Array<{
    name: string;
    status: number;
    inCall: boolean;
    lastCall: number;
    lastPause: number;
    pausedReason: string;
    paused: boolean;
    penalty: number;
    location: string;
    membership: string;
    outgoingChannels: Array<any>;
    incomingChannels: Array<any>;
  }>;
};

export type ColumnsNameType = {
  key: React.Key;
  status: JSX.Element;
  extNum: number;
  operatorName: number;
  client: number;
  duration: string;
  actions: JSX.Element;
};

export type QueuesType = {
  queue: {
    queue: string;
    members: Array<InMembersType>;
    callers: Array<{
      position: number;
      callerIdNum: string;
      callerIdName: string;
      wait: string;
    }>;
  };
};

export type QueueTab = {
  key: string;
  label: string;
  children: React.ReactNode;
};

export type ActionsType = {
  member: InMembersType;
  queue: InQueuesType;
  index?: number;
};


export type MemberActionsType = {
  member: any;
}

export type InCallersType = {
  position: number;
  callerIdNum: string;
  callerIdName: string;
  wait: string;
}