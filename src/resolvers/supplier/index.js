module.exports = {
  Query: {
    suppliers: require("./getSuppliers"),
  },
  Mutation: {
    addSupplier: require("./addSupplier"),
    updateSupplier: require("./updateSupplier"),
    deleteSupplier: require("./deleteSupplier"),
  },
};
