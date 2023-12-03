const employesController = require("../controllers/employe.controller");
const { checkToken } = require("../auth/token");
const { uploadEmployeeImage } = require("../services/employes.service");

const employee = (app) => {
  app.post(
    "/api/employee/register",
    uploadEmployeeImage.single("image"),
    employesController.registerEmployes
  );
  app.post("/api/employee/login", employesController.loginEmployees);
};

module.exports = employee;
