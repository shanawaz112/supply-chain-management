const mongoose = require("mongoose");

const ShipmentSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, required: true },
  estimatedDelivery: { type: Date, required: true },
  inventoryItems: [
    {
      inventoryItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "inventoryItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Shipment = mongoose.model("shipment", ShipmentSchema);

module.exports = Shipment;
