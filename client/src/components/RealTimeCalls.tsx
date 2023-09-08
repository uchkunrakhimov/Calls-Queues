import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://10.82.0.111:2022/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: `Basic ${btoa(`admin:swi67o2wRonAepM58k2Q`)}`,
  },
});

const GET_QUEUE_DATA = gql`
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
`;

const RealTimeCalls = () => {
  const { loading, error, data } = useQuery(GET_QUEUE_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <p>{data}</p>
    </div>
  );
};

export default () => (
  <ApolloProvider client={client}>
    <RealTimeCalls />
  </ApolloProvider>
);
