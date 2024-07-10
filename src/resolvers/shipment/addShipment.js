const InventoryItem = require("../../models/InventoryItem");
const Shipment = require("../../models/Shipment");

const addShipment = async (
  _,
  { origin, destination, estimatedDelivery, inventoryItems }
) => {
  try {
    if (!origin) {
      throw new Error("'origin' is a required argument that was not provided.");
    }
    if (!destination) {
      throw new Error(
        "'destination' is a required argument that was not provided."
      );
    }
    if (!estimatedDelivery) {
      throw new Error(
        "'estimatedDelivery' is a required argument that was not provided."
      );
    }
    if (!inventoryItems || inventoryItems.length === 0) {
      throw new Error("Inventory items are required.");
    }

    const updatedInventoryItems = [];

    for (const item of inventoryItems) {
      if (!item.id) {
        throw new Error("Inventory item id is required.");
      }
      if (!item.quantity || item.quantity <= 0) {
        throw new Error("Inventory item quantity must be greater than 0.");
      }

      const inventoryItem = await InventoryItem.findById(item.id);
      if (!inventoryItem) {
        throw new Error(`Inventory item with id ${item.id} not found.`);
      }
      if (inventoryItem.quantity === 0) {
        throw new Error(`Inventory item ${item.id} is out of stock.`);
      }
      if (inventoryItem.quantity < item.quantity) {
        throw new Error(
          `Inventory item ${item.id} only has ${inventoryItem.quantity} available.`
        );
      }

      inventoryItem.quantity -= item.quantity;
      await inventoryItem.save();
      updatedInventoryItems.push({
        inventoryItem: item.id,
        quantity: item.quantity,
      });
    }

    const shipment = new Shipment({
      origin,
      destination,
      status: "in-transit",
      estimatedDelivery,
      inventoryItems: updatedInventoryItems,
    });

    (await shipment.save()).populate("inventoryItem");
    return shipment;
  } catch (error) {
    console.error(error);
    throw new Error(`Error adding shipment: ${error.message}`);
  }
};

module.exports = addShipment;
