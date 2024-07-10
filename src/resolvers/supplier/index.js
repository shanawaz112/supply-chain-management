module.exports = {
  Query: {
    suppliers: require("./getSuppliers"),
    supplier: require("./getSupplier"),
  },
  Mutation: {
    addSupplier: require("./addSupplier"),
    updateSupplier: require("./updateSupplier"),
    deleteSupplier: require("./deleteSupplier"),
  },
};
