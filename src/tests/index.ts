const { SubscriptionClient } = require("subscriptions-transport-ws");
const WebSocket = require("ws");
const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Define your GraphQL endpoint URL
const GRAPHQL_URL = "http://192.168.1.2:2022/graphql";

// Define your authentication credentials
const GRAPHQL_LOGIN = "admin";
const GRAPHQL_PASSWD = "swi67o2wRonAepM58k2Q";

// Set up the headers with authentication
const headers = {
  Authorization: `Basic ${Buffer.from(
    `${GRAPHQL_LOGIN}:${GRAPHQL_PASSWD}`
  ).toString("base64")}`,
};

// Create a WebSocket connection to the GraphQL server
const wsClient = new SubscriptionClient(
  GRAPHQL_URL.replace("http", "ws"),
  {
    reconnect: true,
    connectionParams: headers,
  },
  WebSocket
);

// Subscribe to a GraphQL subscription event (replace with your actual subscription event)
const subscription = wsClient.request({
  query: `
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
  `,
});

// Handle subscription updates
subscription.subscribe({
  next: (data) => {
    app.get("/update", (req, res) => {
      res.json(data);
    });
  },
  error: (error) => {
    console.error("Subscription error:", error);
  },
});

// Start the HTTP server
server.listen(3000, () => {
  console.log("HTTP server listening on port 3000");
});
