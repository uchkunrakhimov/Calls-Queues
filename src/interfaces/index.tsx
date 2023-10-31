export interface TabItem {
  key: string;
  label: string;
  children: React.ReactNode;
}

export interface RecordType {
  key: string;
  title: string;
  description: string;
}

export interface QueueColumnsProps {
  key: React.Key;
  status: JSX.Element;
  extNum: number;
  operatorName: number;
  client: number;
  duration: string;
  actions: JSX.Element;
}

export interface CustomersProps {
  queue: {
    callers: Array<{
      position: number;
      callerIdNum: string;
      callerIdName: string;
      wait: string;
    }>;
  };
}

export interface MembersProps {
  queue: {
    queue: string;
    members: Array<{
      name: string;
      status: number;
      inCall: boolean;
      paused: boolean;
      penalty: number;
      location: string;
      membership: string;
      outgoingChannels: Array<any>;
      incomingChannels: Array<any>;
    }>;
  };
}

export interface ActionsProps {
  member: any;
  queue: any;
  index: number;
}

export interface MemberServicesProps {
  member: any;
}

export interface TabsExtraContentProps {
  queue: any;
  activeTabKey: string;
}

export interface Queue {
  queue: any;
  members: Member[];
}

export interface Member {
  location: string;
  paused: boolean;
}