const db = require("../utils/db");

const getAllCustomer = (req, res) => {
  try {
    var { limit, page } = req.query;
    var offset = (page - 1) * limit;
    db.query(
      `SELECT * FROM customer limit ? offset ?`,
      [+limit, +offset],
      (err, result1) => {
        db.query(`SELECT count(*) as count FROM customer`, (err, result) => {
          const totalPage = Math.ceil(result[0]?.count / limit);
          res.json({
            data: result1,
            pagination: {
              page: +page,
              limit: +limit,
              totalPage,
            },
          });
        });
      }
    );
  } catch (err) {
    console.log("error", err);
    res.json({
      error: err,
    });
  }
};
const getCustomerById = (req, res) => {
  db.query(
    "SELECT * FROM customer WHERE id = ? ",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.json({
          error: true,
          message: err,
        });
      } else {
        res.json({
          data: result.length == 0 ? null : result[0],
        });
      }
    }
  );
};
const createCustomer = (req, res) => {
  //get parameters by formdata
  var body = req.body;
  //sql command
  var sqlInsert =
    "INSERT INTO customer (first_name,last_name, gender, phone) VALUES (?,?,?,?)";
  db.query(
    sqlInsert,
    [body.first_name, body.last_name, body.gender, body.phone],
    (err, result) => {
      if (err) {
        res.json({
          error: true,
          message: err,
        });
      } else {
        res.json({
          error: false,
          message: "Create Customer Successfully",
        });
      }
    }
  );
};
const updateCustomer = (req, res) => {
  //get parameters by formdata
  var body = req.body;
  var id = req.params.id;
  //sql command
  var sqlUpdate =
    "UPDATE customer SET first_name = ?, last_name = ?, gender = ?, phone = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [body.first_name, body.last_name, body.gender, body.phone, id],
    (err, result) => {
      if (err) {
        res.json({
          error: true,
          message: err,
        });
      } else {
        res.json({
          error: false,
          message: "Update Customer Successfully",
        });
      }
    }
  );
};
const deleteCustomer = (req, res) => {
  db.query(
    "DELETE FROM customer WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) {
        res.json({
          error: true,
          message: err,
        });
      } else {
        res.json({
          error: false,
          message: "Delete Customer Succerssfully",
        });
      }
    }
  );
};
module.exports = {
  getAllCustomer,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
