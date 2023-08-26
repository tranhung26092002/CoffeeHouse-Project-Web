const jwt = require('jsonwebtoken');
const productModel = require('../Models/ProductModel');
const userModel = require('../Models/UserModel');

const getList = async (req, res) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id;
    const user = await userModel.findById(userId);
    
    const products = await productModel.find({ userId: user._id });
    return res.status(200).send(products);
  } catch (error) {
      // log error
  }
}

const createProduct = async (req, res) => {
  try{
      // get infor client
      const bearerHeader = req.headers['authorization'];
      const accessToken = bearerHeader.split(' ')[1];
      const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
      const userId = decodeJwt._id;
      const user = await userModel.findById(userId);
      
      const nameproduct = req.body.name_product;
      const priceproduct = req.body.price_product;

      // creat data to database
      await productModel.create({
        userId: user._id,
        name: nameproduct,
        price: priceproduct,
      });
      return res.status(200).send('register product');
  }
  catch(error){
      console.log('error',error);
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

module.exports = {
    getList: getList,
    createProduct: createProduct,
    deleteProduct: deleteProduct,
};
