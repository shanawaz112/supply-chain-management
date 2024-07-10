const { default: mongoose } = require("mongoose");
const InventoryItem = require("../../models/InventoryItem");
const Supplier = require("../../models/Supplier");

module.exports = async (_, { name, sku, quantity, warehouse, supplierId }) => {
  try {
    if (!supplierId)
      throw new Error(
        "'supplierId' is a required argument that was not provided."
      );
    if (!name)
      throw new Error("'name' is a required argument that was not provided.");
    if (!sku)
      throw new Error("'sku' is a required argument that was not provided.");
    if (quantity == null)
      throw new Error(
        "'quantity' is a required argument that was not provided."
      );
    if (!warehouse)
      throw new Error(
        "'warehouse' is a required argument that was not provided."
      );

    if (!mongoose.Types.ObjectId.isValid(supplierId)) {
      throw new Error("Invalid supplier ID");
    }

    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      throw new Error("Supplier not found");
    }

    const existingItem = await InventoryItem.findOne({ sku });
    if (existingItem) {
      throw new Error("SKU already exists");
    }
    const item = new InventoryItem({
      name,
      sku,
      quantity,
      warehouse,
      supplier: supplierId,
    });
    await item.save();
    return item.populate("supplier");
  } catch (error) {
    throw(error);
  }
};
