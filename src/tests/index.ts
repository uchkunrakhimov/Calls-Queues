import { SubscriptionClient } from "subscriptions-transport-ws";

const GRAPHQL_URL = "http://192.168.1.2:2022/graphql";
const GRAPHQL_LOGIN = "admin";
const GRAPHQL_PASSWD = "swi67o2wRonAepM58k2Q";

const query = `
query {
  queues {
    queue
    strategy
    members {
      name
      status
      inCall
      paused
      penalty
      location
      membership
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

const client = new SubscriptionClient(GRAPHQL_URL, {
  reconnect: true,
  connectionParams: {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${GRAPHQL_LOGIN}:${GRAPHQL_PASSWD}`
      ).toString("base64")}`,
      "Content-Type": "application/json",
    },
  },
});

client.onConnected(() => {
  console.log("Connected to GraphQL WebSocket");
});

client.onDisconnected(() => {
  console.log("Disconnected from GraphQL WebSocket");
});

client.onError((error) => {
  console.error("WebSocket Error:", error.message);
});

const observer = client.request({ query });

observer.subscribe({
  next: (data: any) => {
    console.log("Received data:", data);
  },
  error: (error: any) => {
    console.error("Subscription error:", error.message);
  },
});
