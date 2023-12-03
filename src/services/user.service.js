const { Op } = require("sequelize");

const { User, Address } = require("../models/index");

const NotFoundException = require("../exception/NotFoundException");
const BadRequestException = require("../exception/BadRequestException");

const userService = {
  findAll: ({ page, limit, orderBy, sortBy, keyword }) =>
    new Promise(async (resolve, reject) => {
      try {
        const query = {};

        if (keyword) {
          query.email = { [Op.substring]: keyword };
        }

        const queries = {
          offset: (page - 1) * limit,
          limit,
        };

        if (orderBy) {
          queries.order = [[orderBy, sortBy]];
        }

        const data = await User.findAndCountAll({
          where: query,
          ...queries,
        });

        const res = {
          pagination: {
            page: page,
            limit: limit,
            totalPages: Math.ceil(data?.count / limit),
            totalItems: data?.count,
          },
          data: data?.rows,
        };

        resolve(res);
      } catch (error) {
        reject(error);
      }
    }),
  findById: (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const data = await User.findByPk(id, {
          include: [{ model: Address, as: "addresses" }],
        });
        if (!data) throw new NotFoundException("Not found user!");

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
  create: ({ fullName, email, phoneNumber, addressList }) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (user)
          throw new BadRequestException(`Email ${email} already exists`);

        const data = await User.create(
          {
            fullName,
            email,
            phoneNumber,
            addresses: addressList,
          },
          {
            include: [{ model: Address, as: "addresses" }],
          }
        );

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
  addNewAddress: (userId, { city, state, street, zipcode }) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByPk(userId);
        if (!user) throw new NotFoundException("Not found user!");

        const data = await Address.create({
          city,
          state,
          street,
          zipcode,
          userId,
        });

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }),
  updateById: (id, { fullName, phoneNumber }) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByPk(id);
        if (!user) throw new NotFoundException("Not found user!");

        const data = await User.update(
          { fullName, phoneNumber },
          {
            where: {
              id,
            },
          }
        );

        resolve(data[0]);
      } catch (error) {
        reject(error);
      }
    }),
  deleteById: (id) =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await User.findByPk(id);
        if (!user) throw new NotFoundException("Not found users!");

        const data = await User.destroy({
          where: {
            id,
          },
        });

        resolve(data[0]);
      } catch (error) {
        reject(error);
      }
    }),
};

module.exports = userService;
