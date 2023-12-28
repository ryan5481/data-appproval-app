const Initiator = require("../../02-models/03-initiator/01-initiatorSchema")
const bcrypt = require("bcrypt")

const saltRounds = 10

const InitiatorSignUp = async (req, res) => {
    try {
        console.log(req.body)
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = encryptedPassword
        const data = await Initiator.create(req.body)
        if (data) {
            res.status(200).json({
                msg: "Initiator account created successfully."
            })
        } else {
            res.status(403).json({
                msg: "Initiator account registration failed."
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const InitiatorLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const initiator = await Initiator.findOne({ email: email })
        if (!initiator || !(await bcrypt.compare(password, initiator.password))) {
            res.status(401).json({ 
                msg: "Invalid email or password." 
            })
        } else {
            // console.log(adminUser.fullName)
            res.status(200).json({
                msg: "Logged into initiator account.",
                fullName: initiator.fullName,
                email: initiator.email,
                profilePicture: initiator.profilePicture,
                userRole: "initiator",
                id: initiator._id,
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const EditInitiatorProfile = async (req, res) => {
    try {
        const userDbId = req.params.id;
        const { email } = req.body; // Fields to be updated

        const updatedFields = {}
        if (email) {
            updatedFields.email = email
        } else {
            res.status(401).json({
                msg: "Unknown key!",
            })
        }
        const updated = await Initiator.findByIdAndUpdate(
            userDbId,
            { $set: updatedFields },
            { new: true } // Return the updated contact document
        );
        // const updated = await AdminUser.findByIdAndUpdate(req.body._id, req.body)
        if (updated) {
            res.status(200).json({
                msg: "Initiator profile updated!",
                fullName: req.body.fullName,
                email: req.body.email,
                id: updated._id
            })
        } else {
            res.json({ msg: "Error" })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const ChangeInitiatorPassword = async (req, res) => {
    try {
        const _id = req.params.id;
        const { currentPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await Initiator.findById(_id);

        if (!user) {
            return res.status(404).json({ msg: "initiator user not found." });
        }

        // Compare the current password with the stored hash
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Current password is incorrect." });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Create an object with the updated password
        const updatedFields = {
            password: hashedNewPassword,
        };

        // Update the user's password
        const updated = await Initiator.findByIdAndUpdate(
            _id,
            { $set: updatedFields },
            { new: true } // Return the updated user document
        );

        if (updated) {
            res.status(200).json({
                msg: "Password updated successfully.",
            });
        } else {
            res.status(500).json({ msg: "Error updating password." });
        }
    } catch (error) {
        console.error("Password update error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
};



const GetInitiatorProfile = async (req, res) => {
    try {
        const profile = await Initiator.findById(req.body._id)
        if (profile) {
            res.status(200).json({
                fullName: profile.fullName,
                email: profile.email,
            })
        } else {
            res.json({ msg: "Error" })
        }

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

exports.InitiatorLogin = InitiatorLogin
exports.InitiatorSignUp = InitiatorSignUp
exports.EditInitiatorProfile = EditInitiatorProfile
exports.ChangeInitiatorPassword = ChangeInitiatorPassword
exports.GetInitiatorProfile = GetInitiatorProfile

