const ProductActivityLog = require("./product_activity_log");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  flag: {
    type: Boolean,
    required: false,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  activityLogId: {
    type: Schema.Types.ObjectId,
    ref: "ProductActivityLog",
    required: false,
  }
});

productSchema.pre("updateOne", async function (next) {
  try {
    const existingProd = await this.model.findOne(this.getQuery());
    const updatedProd = this.getUpdate();

    if (existingProd) {
      this.changeHistory = [];

      for (const key in updatedProd) {
        if (updatedProd[key] != existingProd.get(key)) {
          this.changeHistory.push({
            fieldName: key,
            oldValue: existingProd.get(key),
            newValue: updatedProd[key],
          });
        }
      }
    }

    if (this.changeHistory.length) {
      let productActivityLog_values = await ProductActivityLog.findOne({
        productId: existingProd._id,
      });

      if (productActivityLog_values) {
        // productActivityLog.changeHistory = [...productActivityLog.changeHistory, ...this.changeHistory];
        // await productActivityLog.save();
        await ProductActivityLog.updateOne(
          { productId: existingProd._id },
          { $push: { changeHistory: { $each: this.changeHistory } } }
        );
      } else {
        let productActivityLog = new ProductActivityLog({
          productId: existingProd._id,
          changeHistory: this.changeHistory,
        });
        productActivityLog_values = await productActivityLog.save();
      }

      await this.model.update({ _id: existingProd._id }, { activityLogId: productActivityLog_values._id });
    }

    next();
  } catch (error) {
    console.log(error, "err")
    next(error);
  }
});

module.exports = mongoose.model("Product", productSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then(products => {
//         console.log(products);
//         return products;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static findById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new mongodb.ObjectId(prodId) })
//       .next()
//       .then(product => {
//         console.log(product);
//         return product;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static deleteById(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//       .then(result => {
//         console.log('Deleted');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }

// module.exports = Product;
