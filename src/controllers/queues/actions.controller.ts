import { Request, Response } from "express";
import {
  addQuery,
  hangupQuery,
  pauseQuery,
  removeQuery,
  executeQuery,
  spyQuery,
} from "../../graphql";

interface ActionData {
  action: string;
  queueName?: string;
  memberName?: string;
  name?: string;
  pause?: boolean;
  cause?: string;
  me?: string;
  mode?: string;
}

export const actions = async (req: Request, res: Response) => {
  const data: ActionData = req.body;
  try {
    const variables = {
      queue: data.queueName,
      member: data.memberName,
      name: data.memberName,
      paused: data.pause,
      reason: "Member paused or not",
      cause: data.cause,
      interface: data.memberName,
      me: data.me,
      mode: data.mode,
    };

    switch (data.action) {
      case "add":
        await executeQuery(addQuery, variables);
        break;
      case "remove":
        await executeQuery(removeQuery, variables);
        break;
      case "pause":
        await executeQuery(pauseQuery, variables);
        break;
      case "hangup":
        await executeQuery(hangupQuery, variables);
        break;
      case "spy":
        await executeQuery(spyQuery, variables);
        break;
      default: {
        res.status(400).send("Requested action is not supported");
      }
    }

    res.status(200).send("Successfully");
  } catch (error: any) {
    res.status(500).send("International server error");
    console.log(`Action has this error: ${error.message}`);
  }
};
