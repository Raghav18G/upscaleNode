import { Socket } from "dgram";
import { createServer } from "http";
import crypto from "crypto";

const PORT = "3333";
const MAGIC_STRING = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const server = createServer((req, res) => {
  res.writeHead(200);

  res.end("Welcome to my Server");
}).listen(PORT, () => {
  console.log(`Server Listening to Port ${PORT}`);
});

server.on("upgrade", onSocketUpdate);

function onSocketUpdate(req, socket, head) {
  const { "sec-websocket-key": WebClientSocketKey } = req.headers;
  console.log(` ${WebClientSocketKey} Connected!`);
  const headers = prepareHandshakeHeaders(WebClientSocketKey);
  socket.write(headers);
}

function prepareHandshakeHeaders(id) {
  const acceptKey = createSocketAccept(id);

  const headers = [
    `HTTP/1.1 101 Switching Protocols`,
    `Upgrade: websocket`,
    `Connection: Upgrade`,
    `Sec-WebSocket-Accept:${acceptKey}`,
    ``,
  ]
    .map((line) => line.concat("\r\n"))
    .join("");

  return headers;
}

function createSocketAccept(id) {
  const shaum = crypto.createHash("sha1");
  shaum.update(id + MAGIC_STRING);
  return shaum.digest("base64");
}

[
  // Error Handling to keep our Server up Always

  ("uncaughtException", "unhandledRejection"),
].forEach((event) => {
  process.on(event, (err) => {
    console.error(
      `Something Bad Happened!! Event : ${event}, Message:: ${err || err.stack}`
    );
  });
});
