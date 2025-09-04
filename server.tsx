import express from "express";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "./src/App";
import { StaticRouter } from "react-router-dom";

const server = express();

server.use(express.static("dist"));

server.get("/film/:id", async (req, res) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const html = renderToString(jsx);
  res
    .status(200)
    .send(
      `<!DOCTYPE html><html><head><title>Film Detail</title></head><body><div id="root">${html}</div></body></html>`
    );
});

server.get("/", async (req, res) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const html = renderToString(jsx);
  res
    .status(200)
    .send(
      `<!DOCTYPE html><html><head><title>Home</title></head><body><div id="root">${html}</div></body></html>`
    );
});

server.get("/wishlist", async (req, res) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const html = renderToString(jsx);
  res
    .status(200)
    .send(
      `<!DOCTYPE html><html><head><title>Wish List</title></head><body><div id="root">${html}</div></body></html>`
    );
});

server.get("*", (req, res) => {
  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const html = renderToString(jsx);
  res
    .status(200)
    .send(
      `<!DOCTYPE html><html><head><title>App</title></head><body><div id="root">${html}</div></body></html>`
    );
});

server.listen(3000, () => {
  console.log("SSR server running at http://localhost:3000");
});
