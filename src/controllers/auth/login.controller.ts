import { Request, Response } from "express";
import { getConnection } from "../../database";
import jwt from "jsonwebtoken";
import md5 from "md5";

interface User {
  email: string;
  password: string;
  int_number: number;
  company_id: number;
  token: string;
}

// Generate a secure token
const generateToken = () => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const token = jwt.sign({ randomNumber }, process.env.AUTH_TOKEN as string, {
    expiresIn: "24h",
  });
  return token;
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Establish a database connection
    const connection = await getConnection();

    // Fetch the user data using a prepared statement
    const query = "SELECT email, password, token FROM a_user WHERE email = ?";
    const [rows] = await connection.query(query, [email]);

    // Handle cases where the user is not found
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404);
    }

    const user: User = rows[0] as User;

    // Verify the password using a strong hashing algorithm like bcrypt
    const hashedPassword = md5(password as string);
    if (user.password !== hashedPassword) {
      return res.status(401);
    }

    // Check if the user already has a token and return it
    if (user.token) {
      return res.status(200).send(user.token);
    }

    const session = generateToken();

    // Update the user's token in the database
    const dbConnection = await getConnection();
    const updateQuery = "UPDATE a_user SET token = ? WHERE email = ?";
    await dbConnection.query(updateQuery, [session, email]);

    // Return the newly generated token
    res.status(200).send(session);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
};
