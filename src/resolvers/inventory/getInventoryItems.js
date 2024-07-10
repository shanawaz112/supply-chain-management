const InventoryItem = require("../../models/InventoryItem");

module.exports = async (_, { limit, page }) => {
  try {
    if (!page) page = 1;
    if (!limit) limit = 10;
    if (limit > 100) limit = 100;
    if (limit < 1) limit = 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;
    return await InventoryItem.find().populate("supplier").limit(limit).skip(offset);
  } catch (error) {
    throw(error);
  }
};
