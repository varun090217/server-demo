const http = require("http");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

const port = 8080;

const server = http.createServer((request, response) => {
  const filePath = path.join(
    __dirname,
    request.url === "/" ? "index.html" : request.url
  );
  console.log(filePath);

  const extName = String(path.extname(filePath)).toLowerCase();

  const mimeType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "text/png",
  };

  const contentType = mimeType[extName] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        response.writeHead(404, { ContentType: "text/html" });
        response.end("404: File Not Found");
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(content, "utf-8");
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
