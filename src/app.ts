import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server} from "socket.io"

import {router} from "./routes";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*"
  }
});


io.on("connection", socket => {
  console.log(`Usuário conectdo no socket ${socket.id}`)
});

app.use(express.json())
app.use(router);

app.get("/", (request, response) => {

  return response.send("ok")
})

app.get("/github", (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)

})

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;

  // response.redirect(`http://localhost:3000?code=${code}`)
  return response.json(code)
})


export { serverHttp, io}