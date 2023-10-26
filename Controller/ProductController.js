const jwt = require('jsonwebtoken');
const productModel = require('../Models/ProductModel');

const getList = async (req, res) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id;
    
    const products = await productModel.find({ userId: userId });
    return res.status(200).send(products);
  } catch (error) {
      // log error
  }
}

const createProduct = async (req, res) => {
  try {
    // Get user information
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id;

    const nameproduct = req.body.name_product;
    const priceproduct = req.body.price_product;

    // Check if the product already exists in the database
    const existingProduct = await productModel.findOne({ userId: userId, name: nameproduct });

    if (existingProduct) {
      // If the product exists, increase the quantity
      existingProduct.quantity += 1;
      await existingProduct.save();
    } else {
      // If the product doesn't exist, create a new one
      await productModel.create({
        userId: userId,
        name: nameproduct,
        price: priceproduct,
        quantity: 1,
      });
    }
    
    return res.status(200).send('Product added or quantity increased');
  } catch (error) {
    console.log('error', error);
    return res.status(500).send('An error occurred');
  }
}



const deleteProduct = async (req, res) => {
  try {
      // delete food
      const productId = req.params.productId;
      await productModel.findByIdAndRemove(productId);
      return res.status(200).send('delete product success');
  } catch (error) {
      // log error
  } 
}


const deleteAll = async (req, res) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id;

    // Tìm tất cả sản phẩm của người dùng dựa trên userId
    await productModel.deleteMany({ userId: userId });
    return res.status(200).send('delete product success');
  } catch (error) {
      // log error
    return res.status(500).send({ error: 'Lỗi khi xóa sản phẩm.' });
  } 
}

const updateProduct = async (req, res) => {
  try {
      // delete food
      const productId = req.params.productId;
      const newQuantity = req.body.quantity;

      const product = await productModel.findById(productId);

      // Cập nhật số lượng sản phẩm
      product.quantity = newQuantity;

      // Lưu sản phẩm đã cập nhật vào cơ sở dữ liệu
      const updatedProduct = await product.save();
      return res.status(200).send('update product success');
  } catch (error) {
      // log error
  } 
}

module.exports = {
    getList: getList,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
    updateProduct: updateProduct,
    deleteAll: deleteAll,
};
