import dotenv from "dotenv";
dotenv.config();

export const GRAPHQL_TOKEN: string = process.env.GRAPHQL_TOKEN as string;
export const GRAPHQL_URL: string = process.env.GRAPHQL_URL as string;