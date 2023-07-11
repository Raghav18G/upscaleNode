// Day 1:

// Create a Nodejs application and start the server running on port 8081
// (without any nodejs framework)

const http = require("http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = process.env.PORT || 8081;

//File System Module

//Reading File

fs.readFile("sample.txt", (err, data) => {
  console.log("Data", data.toString());
  console.log("Error", err);
});

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" }); // http header
    var url = req.url;
    if (url === "/upscale") {
      res.write("Welcome to Upscale Program"); //write a response
      res.end(); //end the response
    } else if (url === "/node") {
      res.write("Welcome to Node js"); //write a response
      res.end(); //end the response
    } else {
      res.write("Invalid Route"); //write a response
      res.end(); //end the response
    }
  })
  .listen(port, () => {
    console.log(`server start at ${hostname}:${port}`); //the server object listens on port 3000
  });
