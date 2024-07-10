module.exports = {
  Query: {
    inventoryItems: require("./getInventoryItems"),
    inventoryItem: require("./getInventoryItem"),
  },
  Mutation: {
    addInventoryItem: require("./addInventoryItem"),
    updateInventoryItem: require("./updateInventoryItem"),
    deleteInventoryItem: require("./deleteInventoryItem"),
  },
};
