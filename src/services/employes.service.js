const db = require("../utils/db");
const multer = require("multer");
const { file_path } = require("./config");

const create = (data, callback) => {
  db.query(
    `INSERT INTO employee (name, phone, password, image) VALUES (?,?,?,?)`,
    [data.name, data.phone, data.password, data.image],
    (error, result, fields) => {
      if (error) {
        callback(error);
      }
      return callback(null, result);
    }
  );
};

const getEmployeePhone = (phone, callback) => {
  db.query(
    `SELECT * FROM employee WHERE phone = ?`,
    [phone],
    (error, result, fields) => {
      if (error) {
        callback(error);
      }
      return callback(null, result[0]);
    }
  );
};

const isExitPhone = (req, res) => {
  var body = req.body;
  getEmployeePhone(body.phone, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        message: err,
      });
    }
    if (result) {
      return true;
    } else {
      return false;
    }
  });
};
const uploadEmployeeImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, file_path);
    },
  }),
  limit: {
    fileSize: 1024 * 1024 * 3, // 3MB
  },
});

// const uploadEmployeeImage = (req, res) => {
//   console.log("req : ", req);
//   if (isExitPhone(req, res)) {
//     return uploadImage.single("image");
//   } else {
//     res.status(500).json({
//       error: true,
//       message: "This Phone is already in token in check uploadEmployeeImage!",
//     });
//   }
// };

module.exports = {
  create,
  getEmployeePhone,
  // uploadImage,
  uploadEmployeeImage,
};
