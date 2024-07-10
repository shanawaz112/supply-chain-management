const Shipment = require("../../models/Shipment");

module.exports = async (_, { limit, page }) => {
  try {
    if (!page) page = 1;
    if (!limit) limit = 10;
    if (limit > 100) limit = 100;
    if (limit < 1) limit = 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;
    const shipments = await Shipment.find()
      .populate("inventoryItems.inventoryItem")
      .limit(limit)
      .skip(offset);

    return shipments;
  } catch (error) {
    throw error;
  }
};
