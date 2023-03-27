const { User, Thought } = require("../models");

module.exports = {
  //Get. find all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(toughts => res.json(toughts))
      .catch(err => res.status(500).json(err));
  },
  // Get. find user by Id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then(thought =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch(err => res.status(500).json(err));
  },
  // Post.create user
  createThought(req, res) {
    User.findOne({ username: req.body.username })
      .then(user => {
        if (!user)
          res.status(404).json({ message: "No user with that username" });
        else {
          Thought.create(req.body)
            .then(thought => {
              User.findOneAndUpdate(
                { username: req.body.username },
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
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then(thought =>
        !thought
          ? res.status(404).json({
              message: "User deleted, but no courses found",
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

  removeReaction(req, res) {
    Thought.findOneAndRemove(
      { _id: req.params.thoughtId },
      { $pull: { assignment: { assignmentId: req.params.reactionId } } },
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
