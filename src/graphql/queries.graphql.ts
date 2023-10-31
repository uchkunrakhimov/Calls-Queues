import { GraphQLClient, gql } from "graphql-request";
import { GRAPHQL_TOKEN, GRAPHQL_URL } from "../config";

export const getQueueData = gql`
  query {
    queues {
      queue
      strategy
      members {
        name
        status
        inCall
        loginTime
        paused
        penalty
        location
        membership
        lastPause
        pausedReason
        outgoingChannels {
          channel
          connectedLineNum
          connectedLineName
          duration
        }
        incomingChannels {
          channel
          callerIdNum
          callerIdName
          duration
        }
      }
      callers {
        position
        callerIdNum
        callerIdName
        wait
      }
    }
  }
`;

export const addQuery = gql`
  mutation ($queue: String!, $member: String!) {
    enqueue(queue: $queue, interface: $member)
  }
`;

export const removeQuery = gql`
  mutation ($queue: String!, $member: String!) {
    dequeue(queue: $queue, interface: $member)
  }
`;

export const pauseQuery = gql`
  mutation (
    $queue: String!
    $member: String!
    $paused: Boolean
    $reason: String
  ) {
    queueMemberPause(
      queue: $queue
      interface: $member
      paused: $paused
      reason: $reason
    )
  }
`;

export const spyQuery = gql`
  mutation ($interface: String!, $me: String!, $mode: ChannelSpyMode!) {
    channelSpy(interface: $interface, connectWithInterface: $me, mode: $mode)
  }
`;

export const hangupQuery = gql`
  mutation ($name: String!, $cause: String!) {
    channelHangup(name: $name, cause: $cause)
  }
`;

export const executeQuery = async (request: any, variables: any) => {
  const client = new GraphQLClient(GRAPHQL_URL, {
    headers: {
      authorization: GRAPHQL_TOKEN,
    },
  });

  client.request(request, variables).catch((error: any) => {
    console.error(`${error.message}`);
  });
};
