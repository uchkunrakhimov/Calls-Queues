import express, { Request, Response, NextFunction } from "express";
import { reqGraph } from "../utils";
import { io } from "../";

const router = express.Router();

const sendRequestAndEmitData = async () => {
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

  try {
    const response = await reqGraph(query);
    io.emit("data", response.data);
  } catch (error: any) {
    console.error(error.message);
  }
};

setInterval(sendRequestAndEmitData, 1000);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sendRequestAndEmitData();
    res.json({ message: "Initial request sent" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send initial request" });
  }
});

export { router as ResGraph };
