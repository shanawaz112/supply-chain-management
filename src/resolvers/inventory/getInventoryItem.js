const InventoryItem = require("../../models/InventoryItem");

module.exports = async (_, { id }) => {
  try {
    if (!id)
      throw new Error("'id' is a required argument that was not provided.");
    return await InventoryItem.findById(id).populate("supplier");
  } catch (error) {
    throw error;
  }
};
