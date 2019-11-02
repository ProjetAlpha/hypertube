const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email address')
            }
        }
    },
    username : {
        type : String, 
        required: true, 
        unique: true,
        min: 3,
        max: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        maxLength: 30
	},
    firstName : {
        type : String, 
        required: true, 
        min: 3,
        max: 50
    },
    lastName : {
        type : String, 
        required: true,
        min: 3, 
        max: 50
    },
	lang:{
        type : String, 
        default: 'en',
        min:3,
        max: 10
    },
	githubId:{
        type: Number, 
        min: 1, 
        max: 100000000
    },
    avatar: {
        type : String,
        min:10,
        max:256
    },
    confirmed: {
        type: Boolean, 
        required: true, 
        default: false
    },
    register_token: {
        type: String,
        required: false
    },
    fpwd_token: {
        type: String,
        required: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({
		_id: user._id,
		username: user.username
	}, process.env.JWT_KEY, {expiresIn: 3600})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', userSchema)

module.exports = User
