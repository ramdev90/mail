const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productActivityLogSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  changeHistory: [
    {
      fieldName: String,
      oldValue: Schema.Types.Mixed,
      newValue: Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model("ProductActivityLog", productActivityLogSchema);
