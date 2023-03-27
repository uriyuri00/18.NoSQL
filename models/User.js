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
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: 'thought', // model thought
        },
        friends: {
            type : Schema.Types.ObjectId,
            ref: 'user'
        },
    },
        {
            toJSON: {
              getters: true, // 이건 무엇을 마하나? 
            },
            id: false, // 왜 false? 이건 뭐지? 왜 투제인슨이랑 같이 묶여있나?
          }
    );

const User = model('user', userSchema)

module.exports = User;