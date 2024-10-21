import http from "http";

export type Route = {
  path: string;
  method: string;
  handler: (req: http.IncomingMessage, res: http.ServerResponse) => void;
};
