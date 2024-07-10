const InventoryItem = require("../../models/InventoryItem");

module.exports = async (_, { id }) => {
  try {
    if (!id)
      throw new Error("'id' is a required argument that was not provided.");
    return await InventoryItem.findByIdAndDelete(id);
  } catch (error) {
    throw(error);
  }
};
