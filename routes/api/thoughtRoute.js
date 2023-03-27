const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

//    /api/thoughts
router.route('/').get(getThoughts).post(createThought);

//    /api/thoughts/thoughtId
router.route('/thoughtId').get(getSingleThought);

//    /api/thoughts/thoughtId/reactions
router.route('/thoughtId/reactions').post(addReaction);

//    /api/thoughts/thoughtId/reactions
router.route('thoughtId/reactions/reactionId').delete(removeReaction);

module.exports = router;