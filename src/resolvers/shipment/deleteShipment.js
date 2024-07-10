const Shipment = require("../../models/Shipment");

module.exports = async (_, { id }) => {
  try {
    if (!id)
      throw new Error("'id' is a required argument that was not provided.");
    return await Shipment.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
