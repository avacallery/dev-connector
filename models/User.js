const mongoose = require('mongoose'); 

conser UserSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true
    }, 
    password: {
        type: String, 
        required: true, 
    }, 
    avatar: {
        type: String
    },
    date: {
        type: Date, 
        default: Date.now
    }
});

//we set a variable (User) and set it to mongoose.model which takes in two parameters: 'user' being the model name, and the schema UserSchema
module.exports = User = mongoose.model('user', UserSchema);