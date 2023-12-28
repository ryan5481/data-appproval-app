const mongoose = require ("mongoose");

const initiatorSchema = ({
    
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

const Initiator = mongoose.model("Initiator", initiatorSchema);

module.exports = Initiator


