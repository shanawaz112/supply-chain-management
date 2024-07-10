const mongoose = require("mongoose");

const InventoryItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String, required: true },
    quantity: { type: Number, required: true },
    warehouse: { type: String, required: true },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const InventoryItem = mongoose.model("inventoryItem", InventoryItemSchema);

module.exports = InventoryItem;
