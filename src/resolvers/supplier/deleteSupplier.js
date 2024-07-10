const Supplier = require("../../models/Supplier");

module.exports = async (_, { id }) => {
  try {
    if (!id)
      throw new Error("'id' is a required argument that was not provided.");
    return await Supplier.findByIdAndDelete(id);
  } catch (error) {
    throw(error);
  }
};
