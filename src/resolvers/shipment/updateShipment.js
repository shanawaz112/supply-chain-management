const InventoryItem = require("../../models/InventoryItem");
const Shipment = require("../../models/Shipment");

module.exports = async (
  _,
  { id, origin, destination, estimatedDelivery, inventoryItems }
) => {
  try {
    if (!id)
      throw new Error("'id' is a required argument that was not provided.");

    if (!origin && !destination && !estimatedDelivery && !inventoryItems) {
      throw new Error("At least one field must be provided.");
    }

    if (inventoryItems && inventoryItems.length > 0) {
      for (const item of inventoryItems) {
        if (!item.inventoryItem) {
          throw new Error("Inventory item is required.");
        }
        if (!item.quantity || item.quantity <= 0) {
          throw new Error("Inventory item quantity must be greater than 0.");
        }

        if (!mongoose.Types.ObjectId.isValid(item.inventoryItem)) {
          throw new Error("Invalid inventory item ID");
        }

        const inventoryItem = await InventoryItem.findById(item.inventoryItem);
        if (!inventoryItem) {
          throw new Error("Inventory item not found");
        }
        if (item.quantity > inventoryItem.quantity) {
          throw new Error(`Only ${inventoryItem.quantity} items are available`);
        }

        inventoryItem.quantity -= item.quantity;
        await inventoryItem.save();

        item.inventoryItem = inventoryItem;
      }
    }

    return await Shipment.findByIdAndUpdate(
      id,
      { origin, destination, estimatedDelivery, inventoryItems },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};
