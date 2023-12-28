const mongoose = require ("mongoose");

const userSchema = ({
    
    profilePicture: {
        type: String,
    },

    fullName: {
        type: String,
    },
    
    email: {
        type: String,
    },

    password: {
        type: String,
        required: true,
    },

    createdAt: { type: Date, default: Date.now },
    
    updatedAt: { type: Date, default: Date.now },

})

const User = mongoose.model("User", userSchema);

module.exports = User


