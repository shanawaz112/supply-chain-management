const Supplier = require("../../models/Supplier");

module.exports = async () => {
  try {
    return await Supplier.find();
  } catch (error) {
    throw(error);
  }
};
