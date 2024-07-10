const InventoryItem = require("../../models/InventoryItem");

module.exports = async (_, { id, name, sku, quantity, warehouse }) => {
  try {
    if (!id)
      throw new Error("'id' is a required argument that was not provided.");

    if (!name && !sku && !quantity && !warehouse) {
      throw new Error("At least one field must be provided.");
    }

    if (sku) {
      const existingItem = await InventoryItem.findOne({ sku });
      console.log(existingItem)
      if (existingItem && existingItem.id !== id) {
        throw new Error("SKU already exists");
      }
    }
    return await InventoryItem.findByIdAndUpdate(
      id,
      { name, sku, quantity, warehouse },
      { new: true }
    );
  } catch (error) {
    throw(error);
  }
};
