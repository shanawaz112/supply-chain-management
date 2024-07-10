const InventoryItem = require("../../models/InventoryItem");
const Shipment = require("../../models/Shipment");

const updateShipmentStatus = async (_, { id, status }) => {
  try {
    if (!id) {
      throw new Error("'id' is a required argument that was not provided.");
    }
    if (!status) {
      throw new Error("'status' is a required argument that was not provided.");
    }

    const validStatuses = ["in-transit", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid shipment status");
    }

    const existingShipment = await Shipment.findById(id);
    if (!existingShipment) {
      throw new Error("Shipment not found");
    }

    if (existingShipment.status === status) {
      throw new Error(`Shipment status is already ${status}`);
    }

    const invalidStatusTransitions = [
      { from: "delivered", to: "cancelled" },
      { from: "delivered", to: "in-transit" },
      { from: "cancelled", to: "in-transit" },
      { from: "cancelled", to: "delivered" },
    ];

    const isInvalidTransition = invalidStatusTransitions.some(
      (transition) =>
        existingShipment.status === transition.from && status === transition.to
    );

    if (isInvalidTransition) {
      throw new Error(
        `Shipment cannot be updated to ${status} from ${existingShipment.status}`
      );
    }

    if (status === "cancelled") {
      for (const itemId of existingShipment.inventoryItems) {
        const inventoryItemData = await InventoryItem.findById(itemId.inventoryItem);
        if (!inventoryItemData) {
          throw new Error(`Inventory item with id ${itemId.inventoryItem} not found`);
        }
        inventoryItemData.quantity += itemId.quantity;
        await inventoryItemData.save();
      }
    }

    const updatedShipment = await Shipment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    return updatedShipment;
  } catch (error) {
    throw(error);
  }
};

module.exports = updateShipmentStatus;