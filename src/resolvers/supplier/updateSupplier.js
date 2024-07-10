const Supplier = require("../../models/Supplier");

module.exports = async (_, { id, name, contactPerson, phone, email }) => {
  try {
    return await Supplier.findByIdAndUpdate(
      id,
      { name, contactPerson, phone, email },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};
