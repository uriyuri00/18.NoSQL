const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type : Schema.Types.ObjectId,
            default: () => new Schema.Types.ObjectId // 고치기 new Types.ObjectId 여기서 타입은 뭘가
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
        },
        id: false,
      }
)

module.exports = reactionSchema; 