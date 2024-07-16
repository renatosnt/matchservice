import dotenv from "dotenv";
/* istanbul ignore next */
dotenv.config();

export function getSecretKey() {
  const SECRET_KEY = process.env.SECRET_KEY;
  if (SECRET_KEY === undefined)
    throw new Error("SECRET_KEY environment variable is not set.");
  return SECRET_KEY;
}

export function getBackendPort() {
  const BACKEND_PORT = process.env.BACKEND_PORT;
  if (BACKEND_PORT === undefined)
    throw new Error("BACKEND_PORT environment variable is not set.");
  return BACKEND_PORT;
}
