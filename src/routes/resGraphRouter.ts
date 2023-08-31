import express, { Request, Response, NextFunction } from "express";
import { reqGraph } from "../utils";
import { io } from "../";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const query = `
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

  const response = await reqGraph(query);
  const responseData = response.data;
  io.emit("data", responseData);
  res.json(responseData);
});

export { router as ResGraph };
