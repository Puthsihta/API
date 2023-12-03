require("dotenv").config();
const express = require("express");
const customer = require("./src/routes/customer.route");
const employee = require("./src/routes/employe.route");
const userRouter = require("./src/routes/user.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

customer(app);
employee(app);

app.use("/api/v1/users", userRouter);

// handle error
app.use((error, req, res, next) => {
  console.log("error : ", error);
  const status = error?.status || 500;
  return res.status(status).json({
    success: false,
    message: error?.message || "Internal Server Error",
  });
});

app.listen(process.env.APP_PORT, () => {
  console.log("http://localhost:", process.env.APP_PORT);
});
