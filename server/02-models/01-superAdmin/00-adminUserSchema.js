const mongoose = require ("mongoose");

const superAdminUserSchema = ({
    
    fullName: {
        type: String,
    },

    profilePicture: {
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

const SuperAdminUser = mongoose.model("SuperAdminUser", superAdminUserSchema);

module.exports = SuperAdminUser


