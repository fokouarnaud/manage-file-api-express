const express = require("express");
const app = express();
const port = 3000;
const documentsRouter = require("./routes/documents");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/documents", documentsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen( process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
