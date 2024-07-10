module.exports = {
  Query: {
    shipment: require("./getShipment"),
    shipments: require("./getShipments"),
  },
  Mutation: {
    addShipment: require("./addShipment"),
    updateShipmentStatus: require("./updateShipmentStatus"),
    deleteShipment: require("./deleteShipment"),
  },
};
