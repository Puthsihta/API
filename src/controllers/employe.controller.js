const { create, getEmployeePhone } = require("../services/employes.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign, destroy } = require("jsonwebtoken");

const registerEmployes = (req, res) => {
  var body = req.body;
  getEmployeePhone(body.phone, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err,
      });
    }
    if (result) {
      res.status(500).json({
        error: true,
        message: "This Phone is already in token!",
      });
    } else {
      if (req.file) {
        body.image = req.file.filename;
      }
      var salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
      create(body, (err, result) => {
        if (err) {
          return res.status(500).json({
            error: true,
            message: err,
          });
        }
        return res.status(200).json({
          error: false,
          message: "Create a new employee successfully",
        });
      });
    }
  });
};
const loginEmployees = (req, res) => {
  var body = req.body;
  getEmployeePhone(body.phone, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err,
      });
    }
    if (!result) {
      return res.json({
        error: true,
        data: "Invalid phone number or password",
      });
    }
    const data = compareSync(body.password, result.password);
    if (data) {
      result.password = undefined;
      const jwt = sign({ result }, process.env.JWT_SERCRET_KEY);
      return res.status(200).json({
        error: false,
        token: jwt,
        data: result,
      });
    } else {
      return res.json({
        error: true,
        data: "Invalid phone number or password",
      });
    }
  });
};

module.exports = { registerEmployes, loginEmployees };
