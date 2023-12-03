const userService = require("../services/user.service");

const userController = {
  findAll: async (req, res, next) => {
    try {
      const { page, limit, orderBy, sortBy, keyword } = req.query;

      const data = await userService.findAll({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 10,
        orderBy,
        sortBy,
        keyword,
      });
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  findById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await userService.findById(id);
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  create: async (req, res, next) => {
    try {
      const { fullName, email, phoneNumber, addressList = [] } = req.body;
      const data = await userService.create({
        fullName,
        email,
        phoneNumber,
        addressList,
      });
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  addNewAddress: async (req, res, next) => {
    try {
      const { city, state, street, zipcode } = req.body;
      const { id } = req.params;
      const data = await userService.addNewAddress(id, {
        city,
        state,
        street,
        zipcode,
      });
      return res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
  updateById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullName, phoneNumber } = req.body;
      await userService.updateById(id, {
        fullName,
        phoneNumber,
      });
      return res.json({ success: true, message: "user update succefully!" });
    } catch (error) {
      next(error);
    }
  },
  deleteById: async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.deleteById(id);
      return res.json({ success: true, message: "user delete succefully!" });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
