const { gql } = require("graphql-tag");

const typeDefs = gql`
  type InventoryItem {
    id: ID!
    name: String!
    sku: String!
    quantity: Int!
    warehouse: String!
    supplier: Supplier!
  }

  type ShipmentInventoryItem {
    quantity: Int!
    inventoryItem: InventoryItem!
  }

  type Shipment {
    id: ID!
    origin: String!
    destination: String!
    status: String!
    estimatedDelivery: String!
    inventoryItems: [ShipmentInventoryItem!]!
  }

  type Supplier {
    id: ID!
    name: String!
    contactPerson: String!
    phone: String!
    email: String!
  }

  input InventoryItemInput {
    inventoryItem: ID!
    quantity: Int!
  }

  type Query {
    inventoryItems: [InventoryItem]
    inventoryItem(id: ID!): InventoryItem
    shipments: [Shipment]
    shipment(id: ID!): Shipment
    suppliers: [Supplier]
    supplier(id: ID!): Supplier
  }

  type Mutation {
    addInventoryItem(
      name: String!
      sku: String!
      quantity: Int!
      warehouse: String!
      supplierId: ID!
    ): InventoryItem
    updateInventoryItem(
      id: ID!
      name: String
      sku: String
      quantity: Int
      warehouse: String
      supplierId: ID
    ): InventoryItem
    deleteInventoryItem(id: ID!): InventoryItem

    addShipment(
      origin: String!
      destination: String!
      estimatedDelivery: String!
      inventoryItems: [InventoryItemInput!]!
    ): Shipment!

    updateShipment(
      id: ID!
      origin: String
      destination: String
      estimatedDelivery: String
      inventoryItems: [InventoryItemInput]
    ): Shipment

    updateShipmentStatus(id: ID!, status: String!): Shipment

    deleteShipment(id: ID!): Shipment

    addSupplier(
      name: String!
      contactPerson: String!
      phone: String!
      email: String!
    ): Supplier
    updateSupplier(
      id: ID!
      name: String
      contactPerson: String
      phone: String
      email: String
    ): Supplier
    deleteSupplier(id: ID!): Supplier
  }
`;

module.exports = typeDefs;
