import { createClient } from "graphql-ws";

const client = createClient({
  url: "ws://192.168.1.2:2022/graphql",
});

(async () => {
  const query = client.iterate({
    query: `
      query GetQueueData {
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
    `,
  });

  try {
    const { value } = await query.next();
    console.log(value);
  } catch (err) {
    console.log(err);
  }
})();
