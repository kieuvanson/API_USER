
const userModel = require('../models/User');


const getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await userModel.getAllUsers(name);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getUserByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Query param "name" is required' });
    const users = await userModel.getUserByName(name);
    if (!users || users.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, phone, avatar } = req.body;
    const checkemailduplicate =await userModel.checkemailduplicate(email);
    if(checkemailduplicate){
       return res.status(400).json({message:"email already exists"});
    }
    else{
    const newUser = await userModel.createUser(name, email, phone, avatar);
    res.status(201).json(newUser);
  }} catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, email, phone, avatar } = req.body;
    if (email) {
      const existing = await userModel.checkemailduplicate(email);
      if (existing && existing.id !== Number(req.params.id)) {
        return res.status(400).json({ message: "email already exists" });
      }
    }

    const updated = await userModel.updateUser(req.params.id, name, email, phone, avatar);
    if (!updated) return res.status(404).json({ message: 'User not found' });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const deleteUser = async (req, res) => {
  try {
    const result = await userModel.deleteUser(req.params.id);
    res.json(result);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const checkUser= async(req,res)=>{
  try{
    const {id} =req.params;
      const result =await userModel.checkUser(id)
      if(result){
        res.status(200).json({message:"The user already exists in the database"})
      }
      else{
        res.status(300).json({message:"The user is not already exists in the database"})
      }
  }catch(err){
      res.status(500).json({ error: err.message });
  }
};
module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
  checkUser,
};
