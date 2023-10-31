import { Request, Response } from "express";
import { getConnection } from "../database";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userToken } = req.body;
    const connection = await getConnection();

    // Ensure token is provided
    if (!userToken) {
      return res.status(400).json({ error: "Token is required" });
    }

    // Retrieve user's int_number based on the provided token
    const [rows]: any = await connection.query(
      "SELECT int_number FROM a_user WHERE token = ?",
      [userToken]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const { int_number } = rows[0];

    res.status(200).json({ int_number });
  } catch (error) {
    console.error("Error during get user data:", error);
    res.status(500).send("Internal server error");
  }
};
