const { User, Thought } = require('../models');
const { ObjectId } = require('mongoose').Types;




module.exports = {
    //Get. find all users
    getUsers(req, res){
        User.find()
        .then((users)=> res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    // Get. find user by Id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .populate({ path: "thoughts", select: '-__v' })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No user with that ID" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    // Post.create user
    createUser(req, res){
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err)  => res.status(500).json(err));
    },
    // Put update user
    updateUser(req,res){
        User
        .findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            {runValidators: true, new: true })
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with the Id!'})
            : res.json(user))
        .catch((err) => res.status(500).json(err));
    },
    // Delete user
    deleteUser(req,res){
        User.findOneAndDelete(
            {_id: req.params.userId})
        .then((user) => 
        !user
          ? res.status(404).json({message: "No such user exists"})
          : Thought.findOneAndUpdate(
            {}
          ))
        .then((thought) =>
        !thought
            ? res.status(404).json({
                message:" User deleted, but no tought found"
            })
            : res.json({ message : " User successsfully deleted"})
            )
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    },
    createFriend( req,res ){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: { friends: req.params.friendId}},
            { runValidators: true, new: true })
        .then((user) => res.json(user))

        .catch((err) => res.status(500).json(err));
    },

    deleteFriend( req,res){
        User.findOneAndDelete(
            {_id: req.params.userId},
            { $pull: {friends: req.params.userId}},
            {runValidators: true, new: true })
        .then((user) => 
        !user
            ? res.status(404).json({message: "No user or friend with that ID"})
            : res.json({message: "Friend successfully deleted"})
            )
        .catch((err) => res.status(500).json(err));
    
    }
    //https://www.tutorialspoint.com/what-is-the-difference-between-deleteone-and-findoneanddelete-operation-in-mongodb
   //https://www.mongodb.com/docs/manual/tutorial/remove-documents/
}