const Supplier = require("../../models/Supplier");

module.exports = async (_, { name, contactPerson, phone, email }) => {
  try {
    if (!name)
      throw new Error("'name' is a required argument that was not provided.");
    if (!contactPerson)
      throw new Error(
        "'contactPerson' is a required argument that was not provided."
      );
    if (!phone)
      throw new Error("'phone' is a required argument that was not provided.");
    if (!email)
      throw new Error("'email' is a required argument that was not provided.");

    const supplier = new Supplier({ name, contactPerson, phone, email });
    await supplier.save();
    return supplier;
  } catch (error) {
    throw(error);
  }
};
