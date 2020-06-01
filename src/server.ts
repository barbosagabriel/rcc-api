import express from "express";

const app = express();

app.get("/users", () => {
  console.log("Opa");
});

app.listen(3333);
