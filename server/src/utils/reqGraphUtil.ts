import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const reqGraph = async (query: string) => {
  const GRAPHQL_LOGIN = process.env.GRAPHQL_LOGIN as string;
  const GRAPHQL_PASSWD = process.env.GRAPHQL_PASSWD as string;
  const GRAPHQL_URL = process.env.GRAPHQL_URL as string;

  const authHeader = `Basic ${Buffer.from(
    `${GRAPHQL_LOGIN}:${GRAPHQL_PASSWD}`
  ).toString("base64")}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: authHeader,
  };

  const response = await axios.post(GRAPHQL_URL, { query }, { headers });
  return response.data;
};

export { reqGraph };
