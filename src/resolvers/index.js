const { mergeResolvers } = require("@graphql-tools/merge");

const inventoryResolvers = require("./inventory");
const shipmentResolvers = require("./shipment");
const supplierResolvers = require("./supplier");

const resolvers = mergeResolvers([
  inventoryResolvers,
  shipmentResolvers,
  supplierResolvers,
]);

module.exports = resolvers;