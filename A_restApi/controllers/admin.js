const Product = require("../../models/product");
const APIAggregation = require("../utils/apiFeatures");
const ExcelJS = require("exceljs");

exports.putProduct = async (req, res) => {
  Product.updateOne({ _id: req.params.productId }, { ...req.body })
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.postProduct = async (req, res) => {
  new Product(req.body)
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

exports.getProducts = async (req, res) => {
  new APIAggregation(Product.aggregate([]), req)
    .apply()
    .then(async (docs) => {
      res.status(200).send(docs);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      res.send(error);
    });
};

exports.getProductById = (req, res, next) => {
  Product.findOne({ _id: req.params.productId })
    .populate({
      path: "userId",
      select: "-password",
    })
    .populate({
      path: "activityLogId",
    })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postExcelDownload = (req, res, next) => {
  Product.find()
    .select("title price")
    .then(async (products) => {
      if (products.length > 0) {
        const xlsBuffer = await generateXLS(products);
        res.set("Content-Disposition", "attachment; filename=data.xls");
        res.type("application/vnd.ms-excel");
        res.send(xlsBuffer);
      }
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postFlagProduct = (req, res, next) => {
  Product.updateOne({ _id: req.params.productId }, { flag: req.body.isFlagged })
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};


function generateXLS(data) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Products Data", {
      pageSetup: { paperSize: 9, orientation: "landscape" },
    });

    
    let rowIndex = 2;

    let row = worksheet.getRow(rowIndex);
    row.values = ["_id", "title", "price"];
    row.font = { bold: true };

    const columnWidths = [20, 20, 20];
    
    row.eachCell((cell, colNumber) => {
        const columnIndex = colNumber - 1;
        const columnWidth = columnWidths[columnIndex];
        worksheet.getColumn(colNumber).width = columnWidth;
      });

      data.forEach((task, index) => {
        const row = worksheet.getRow(rowIndex + index + 1);
        row.getCell("A").value = task.id;
        row.getCell("B").value = task.title;
        row.getCell("C").value = task.price;
       
        row.getCell("B").alignment = { wrapText: true };
      });
      rowIndex += data.length;


    worksheet.getRow(1).height = 40;

    
    const borderStyle = {
      style: "thin",
      color: { argb: "00000000" },
    };

    worksheet.eachRow((row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        cell.border = {
          top: borderStyle,
          bottom: borderStyle,
        };
      });
    });

    return workbook.xlsx.writeBuffer();
  } catch (err) {
    console.log(err);
  }
}