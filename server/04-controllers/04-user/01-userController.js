const User = require("../../02-models/04-user/01-userSchema")
const bcrypt = require("bcrypt")

const saltRounds = 10

const UserSignUp = async (req, res) => {
    try {
        console.log(req.body)
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = encryptedPassword
        const data = await User.create(req.body)
        if (data) {
            res.status(200).json({
                msg: "User account created successfully."
            })
        } else {
            res.status(403).json({
                msg: "User account registration failed."
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            res.status(401).json({ 
                succes: false,
                msg: "Invalid email or password." 
            })
        } else {
            // console.log(adminUser.fullName)
            res.status(200).json({
                success: true,
                msg: "Logged into user account.",
                fullName: user.fullName,
                email: user.email,
                profilePicture: user.profilePicture,
                id: user._id,
                userRole: "user",
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const EditUserProfile = async (req, res) => {
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
        const updated = await User.findByIdAndUpdate(
            userDbId,
            { $set: updatedFields },
            { new: true } // Return the updated contact document
        );
        // const updated = await AdminUser.findByIdAndUpdate(req.body._id, req.body)
        if (updated) {
            res.status(200).json({
                msg: "Profile updated!",
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

const ChangeUserPassword = async (req, res) => {
    try {
        const _id = req.params.id;
        const { currentPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
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
        const updated = await AdminUser.findByIdAndUpdate(
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



const GetUserProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.body._id)
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

exports.UserLogin = UserLogin
exports.UserSignUp = UserSignUp
exports.EditUserProfile = EditUserProfile
exports.ChangeUserPassword = ChangeUserPassword
exports.GetUserProfile = GetUserProfile

