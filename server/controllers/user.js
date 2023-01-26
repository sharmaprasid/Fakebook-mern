const User = require("../models/User");

//Read
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.msg });
  }
};
const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user =await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({_id, firstname, lastname, occupation, location, picturepath}) => {
        _id, firstname, lastname, occupation, location, picturepath
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ error: error.message});
  }
};

const addRemoveFriend = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      const friend = await User.findById(friendId);
      if(user.friends.includes(friendId)){
        user.friends= user.friends.filter((id)=>id !==friendId);
        friend.friends= friend.friends.filter((id)=>id !==id);
      }else{
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save()
      const formattedFriends = friends.map(
        ({_id, firstname, lastname, occupation, location, picturepath}) => {
          _id, firstname, lastname, occupation, location, picturepath
        }
      );
      res.status(200).json(formattedFriends);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
module.exports={getUser,getUserFriends,addRemoveFriend};