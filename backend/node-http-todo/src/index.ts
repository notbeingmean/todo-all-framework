import http from "http";
import { registerRoute } from "./routes";

const server = http.createServer(async (req, res) => {
  const routes = await registerRoute();
  const foundRoute = routes.find(
    (route) => route.method === req.method && route.path === req.url
  );
  if (foundRoute) {
    foundRoute.handler(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000, () => console.log("Server listening on port 3000"));
