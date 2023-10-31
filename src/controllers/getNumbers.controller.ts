import { Request, Response } from "express";
import { getConnection } from "../database";

export const getNumbers = async (req: Request, res: Response) => {
  try {
    const { userToken } = req.body;
    if (!userToken) return res.status(400).json({ error: "Token is required" });

    const connection = await getConnection();
    const [[{ company_id }]]: any = await connection.query(
      "SELECT company_id FROM a_user WHERE token = ?",
      [userToken]
    );

    const [numberRows]: any = await connection.query(
      "SELECT full_name, number FROM a_numbers_int WHERE company_id = ?",
      [company_id]
    );

    res.status(200).json(numberRows);
  } catch (error: any) {
    console.log(`get numbers error: ${error.message}`);
  }
};
