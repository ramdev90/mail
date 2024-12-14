const APIFeatures = require("../utils/apiFeatures")

const Product = require("../../models/product");


// exports.getProducts = async (req, res) => {
//     new APIFeatures(Model.find(), req.query)
//     .then((products) => {
//       res.status(200).send(products);
//     })
//     .catch((err) => {
//       const error = new Error(err);
//       error.httpStatusCode = 500;
//       res.send(error);
//     });
// };


exports.getProducts = async (req, res) => { 
  Product.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      res.send(error);
    });
};
