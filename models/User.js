const { Schema, model } = require('mongoose')


//Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true, 
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought', // model thought
        }],
        friends: [{
            type : Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
        {
            toJSON: {
              virtuals: true,
            },
            id: false, // 
          }
    );

    //create a virtual called friendCount  that retrives the length of the user's friends array field on query
    userSchema.virtual('friendCount').get(function(){
        return this.friends.length;
    })

const User = model('User', userSchema)

module.exports = User;