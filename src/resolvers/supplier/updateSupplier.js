const Supplier = require("../../models/Supplier");

module.exports = async (_, { id, name, contactPerson, phone, email }) => {
  try {
    if (!id)
      throw new Error("'id' is a required argument that was not provided.");
    if (!name && !contactPerson && !phone && !email) {
      throw new Error("At least one field must be provided.");
    }
    return await Supplier.findByIdAndUpdate(
      id,
      { name, contactPerson, phone, email },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};
