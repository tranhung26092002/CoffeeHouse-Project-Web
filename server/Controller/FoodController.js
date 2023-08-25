const jwt = require('jsonwebtoken');
const foodModel = require('../Models/FoodModel');
const userModel = require('../Models/UserModel');

const getListTask = async (req, res) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const accessToken = bearerHeader.split(' ')[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    const userId = decodeJwt._id;
    const user = await userModel.findById(userId);
    
    const foods = await foodModel.find({ userId: user._id });
    return res.status(200).send(foods);
  } catch (error) {
      // log error
  }
}

const createTask = async (req, res) => {
  try{
      // get infor client
      const bearerHeader = req.headers['authorization'];
      const accessToken = bearerHeader.split(' ')[1];
      const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
      const userId = decodeJwt._id;
      const user = await userModel.findById(userId);
      
      const namefood = req.body.name_food;
      const pricefood = req.body.price_food;

      // creat data to database
      await foodModel.create({
        userId: user._id,
        food:{
          name: namefood,
          price: pricefood,
        },
      });
      return res.status(200).send('register task');
  }
  catch(error){
      console.log('error',error);
  }
}


const deleteTask = async (req, res) => {
  try {
      // delete user
      const taskId = req.params.taskId;
      await taskModel.findByIdAndRemove(taskId);
      return res.status(200).send('delete task success');
  } catch (error) {
      // log error
  } 
}

module.exports = {
    createTask: createTask,
    getListTask: getListTask,
    deleteTask: deleteTask,
};
