import mongoose from 'mongoose';

import User from '../models/user.js';

export const getAll = async (req, res) => {
  try{
    const users = await User.find();

    res.status(200).json(users);

  } catch(error) {
    res.status(404).json({message: error.message})
  }
}

export const logUser = async (req, res) => {
  const {username, password} = req.params;  
  try {
    const user = await User.findOne({username: username});
    if(user){
      if(password === user.password){
        res.send(user)
      } else{
        res.status(409).send({message: "Incorrect password."});  
      }
    }
    else{
      res.status(404).send(null);
    }
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}

export const createUser = async (req, res) => {
  const body = req.body;  
  const userExists = User.findOne({username: body.username});

  if(userExists) {    
    return res.status(400).json({message: "Username not available"});
  }

  const newUser = new User(body);
  
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
}

export const updateUser = async (req, res) => {
  const {id: _id} = req.params;  
  const user = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No user with that id');

  const updatedUser = await User.findByIdAndUpdate(_id, user, {new: true} );

  res.json(updatedUser);
}

export const deleteUser = async (req, res) => {
  const {id: _id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No user with that id');

  await User.findByIdAndDelete(_id);

  res.json({message: 'User deleted successfully'});
}

export const likeAnime = async (req, res) => {
  const {userId: _id, animeId } = req.params;
  const anime = Number(animeId);

  if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).send('No user with that id');

  const user = await User.findById(_id);

  let newFavs = [...user.favs];
  if(!newFavs.includes(anime)){
    newFavs.push(anime);
  }
  else{
    newFavs = newFavs.filter(item => item != anime);
  }
  
  const updatedUser = await User.findByIdAndUpdate(_id, {favs: newFavs}, {new: true});
  res.send(updatedUser);
}

const usersController = {
  getAll,
  logUser,
  createUser,
  updateUser,
  deleteUser,
  likeAnime
};

export default usersController;