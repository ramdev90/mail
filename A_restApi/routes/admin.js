const express = require("express");
const isAuth = require("../../middleware/is-auth");

const router = express.Router();

const adminController = require("../controllers/admin");

// need to add token middleware required in everywhen

router.post("/product", adminController.postProduct);
// curl --location 'http://localhost:3001/api/admin/product' \
// --header 'authorization: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicmFtZGV2LnJAdGVjaHJvdmVyc29sdXRpb25zLmNvbSIsImlhdCI6MTcxNDM4Nzk0NSwiZXhwIjoxNzE0Mzk2OTQ1fQ.w5ex8y7aZ8frCL5fOyzHvVKw2ZQfI9SB723G2RQv3NQ' \
// --header 'Content-Type: application/json' \
// --data '{
//     "title": "Ramdev",
//     "price": 20,
//     "description": "prod descriptiona",
//     "imageUrl": "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     "userId": "66276425b08421f22bbffd70",
//     "remove": "true"
// }'

router.put("/product/:productId", adminController.putProduct);

router.get("/products", adminController.getProducts);

router.post("/products/excel", adminController.postExcelDownload);

router.get("/products/:productId", adminController.getProductById);
router.post("/products/:productId", adminController.postFlagProduct);

module.exports = router;
