const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            min: 4,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: { // Change curly brace to a colon here
            type: String,
            required: true,
        },
    }
);

// Now you can export the UserSchema if needed
module.exports = mongoose.model('User', UserSchema);
