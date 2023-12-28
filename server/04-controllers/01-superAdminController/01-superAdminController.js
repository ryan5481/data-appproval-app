const SuperAdminUser = require("../../02-models/01-superAdmin/00-adminUserSchema")
const bcrypt = require("bcrypt")

const saltRounds = 10

const SuperAdminUserSignUp = async (req, res) => {
    try {
        console.log(req.body)
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = encryptedPassword
        const data = await SuperAdminUser.create(req.body)
        if (data) {
            res.status(200).json({
                msg: "Super admin account created."
            })
        } else {
            res.status(403).json({
                msg: "Super admin account registration failed."
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const SuperAdminUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const superAdmin = await SuperAdminUser.findOne({ email: email })
        if (!superAdmin || !(await bcrypt.compare(password, superAdmin.password))) {
            res.status(401).json({ 
                msg: "Invalid email or password." 
            })
        } else {
            // console.log(SuperAdminUser.fullName)
            res.status(200).json({
                msg: "Logged into super admin account.",
                fullName: superAdmin.fullName,
                email: superAdmin.email,
                profilePicture: superAdmin.profilePicture,
                userRole: "superAdmin",
                id: superAdmin._id,
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const EditSuperAdminUserProfile = async (req, res) => {
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
        const updated = await SuperAdminUser.findByIdAndUpdate(
            userDbId,
            { $set: updatedFields },
            { new: true } // Return the updated contact document
        );
        // const updated = await SuperAdminUser.findByIdAndUpdate(req.body._id, req.body)
        if (updated) {
            res.status(200).json({
                msg: "Super admin profile updated!",
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

const ChangeSuperAdminUserPassword = async (req, res) => {
    try {
        const _id = req.params.id;
        const { currentPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await SuperAdminUser.findById(_id);

        if (!user) {
            return res.status(404).json({ msg: "Super admin user not found." });
        }

        // Compare the current password with the stored hash
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Super admin password is incorrect." });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Create an object with the updated password
        const updatedFields = {
            password: hashedNewPassword,
        };

        // Update the user's password
        const updated = await SuperAdminUser.findByIdAndUpdate(
            _id,
            { $set: updatedFields },
            { new: true } 
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



const GetSuperAdminUserProfile = async (req, res) => {
    try {
        const profile = await SuperAdminUser.findById(req.body._id)
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

exports.SuperAdminUserLogin = SuperAdminUserLogin
exports.SuperAdminUserSignUp = SuperAdminUserSignUp
exports.EditSuperAdminUserProfile = EditSuperAdminUserProfile
exports.ChangeSuperAdminUserPassword = ChangeSuperAdminUserPassword
exports.GetSuperAdminUserProfile = GetSuperAdminUserProfile

