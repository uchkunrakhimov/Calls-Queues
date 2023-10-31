import { Request, Response } from "express";
import { GraphQLClient } from "graphql-request";
import { getQueueData } from "../../graphql";
import { GRAPHQL_URL, GRAPHQL_TOKEN } from "../../config";
import { io } from "../..";

let interval: NodeJS.Timeout;

export const allQueueData = (req: Request, res: Response) => {
  try {
    const client = new GraphQLClient(GRAPHQL_URL, {
      headers: {
        Authorization: GRAPHQL_TOKEN,
      },
    });

    const sendResponse = async () => {
      try {
        const response: any = await client.request(getQueueData);
        io.emit("data", response);
      } catch (error: any) {
        console.error(`Error fetching data from GraphQL: ${error.message}`);
      }
    };

    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(sendResponse, 1000);

    res.status(200).send("OK");
  } catch (error: any) {
    console.error(`Error fetching data from GraphQL: ${error.message}`);
    res.status(500).send("Internal server error");
  }
};
