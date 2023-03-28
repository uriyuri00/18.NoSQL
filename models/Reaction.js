const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema(
    {
        reactionId: {
            type : Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:{
            type : String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),

        }
    },
    {
        toJSON: {
          getters: true,
          virtual: true
        },
        id: false,
      }
)
// Create a virtual called reactionCount that retrieves the length of the reactions array field on query.

// reactionSchema.virtual('reactionCount').get(function(){
//     return this.reactions.length;
// })

module.exports = reactionSchema; 