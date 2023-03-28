const { User, Thought } = require("../models");

module.exports = {
  //Get. find all thoughts
  getThoughts(req, res) {
    Thought.find()
    .sort({ createdAt: -1 })
    .then((dbThoughtData) => {
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

  //     .then(thoughts => res.json(thoughts))
  //     .catch(err => res.status(500).json(err));
  // },
  // Get. find user by Id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({thought})
      )
      .catch(err => res.status(500).json(err));
  },
  // Post.create user
  createThought(req, res) {
    User.findOne({ _id: req.body.userId })
      .then(user => {
        if (!user)
          res.status(404).json({ message: "No user with that username" });
        else {
          Thought.create(req.body)
            .then(thought => {
              User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
              );
              res.json(thought);
            })
            .catch(err => res.status(500).json(err));
        } // else
      })
      .catch(err => res.status(500).json(err));
  },

  // Put update user
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No thought with the Id!" })
          : res.json(thought)
      )
      .catch(err => res.status(500).json(err));
  },
  // Delete user
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then(thought =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no courses found",
            })
            : User.findOneAndUpdate(
              { user: req.params.userId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought deleted, but no user found",
            })
          : res.json({ message: "thought successfully deleted" })
      )
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction to a user
  addReaction(req, res) {
    console.log("you are adding a reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { reaction: req.body } },
      { runValidators: true, new: true } // 이거 필요한가? 뭐인가요?
    )
      .then(thought =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch(err => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate( // 지우는것이 아니고 한부분만 지우는것이라서 업데이트
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then(thought =>
        !thought
          ? res
              .status(404)
              .json({ message: "No student found with that ID :(" })
          : res.json(thought)
      )
      .catch(err => res.status(500).json(err));
  },
};
