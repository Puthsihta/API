const customerController = require("../controllers/customer.controller");

const customer = (app) => {
  app.get("/api/customer", customerController.getAllCustomer);
  //get customer listing by id
  app.get("/api/customer/:id", customerController.getCustomerById);
  //create customer
  app.post("/api/customer", customerController.createCustomer);
  // update customer
  app.put("/api/customer/:id", customerController.updateCustomer);
  // delete customer
  app.delete("/api/customer/:id", customerController.deleteCustomer);
};
module.exports = customer;
