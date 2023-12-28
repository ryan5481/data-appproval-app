const AdminUser = require("../../02-models/02-admin/00-adminUserSchema")
const bcrypt = require("bcrypt")

const saltRounds = 10

const AdminUserSignUp = async (req, res) => {
    try {
        console.log(req.body)
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds)
        req.body.password = encryptedPassword
        const data = await AdminUser.create(req.body)
        if (data) {
            res.status(200).json({
                msg: "Admin account created successfully."
            })
        } else {
            res.status(403).json({
                msg: "Admin account registration failed."
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const AdminUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await AdminUser.findOne({ email: email })
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            res.status(401).json({ 
                msg: "Invalid email or password." 
            })
        } else {
            // console.log(adminUser.fullName)
            res.status(200).json({
                msg: "Logged into admin account.",
                fullName: admin.fullName,
                email: admin.email,
                profilePicture: admin.profilePicture,
                userRole: "admin",
                id: admin._id,
            })
        }
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ msg: "Internal server error." });
    }
}

const EditAdminUserProfile = async (req, res) => {
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
        const updated = await AdminUser.findByIdAndUpdate(
            userDbId,
            { $set: updatedFields },
            { new: true } // Return the updated contact document
        );
        // const updated = await AdminUser.findByIdAndUpdate(req.body._id, req.body)
        if (updated) {
            res.status(200).json({
                msg: "Admin profile updated!",
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

const ChangeAdminUserPassword = async (req, res) => {
    try {
        const _id = req.params.id;
        const { currentPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await AdminUser.findById(_id);

        if (!user) {
            return res.status(404).json({ msg: "Admin user not found." });
        }

        // Compare the current password with the stored hash
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ msg: "Admin password is incorrect." });
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



const GetAdminUserProfile = async (req, res) => {
    try {
        const profile = await AdminUser.findById(req.body._id)
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

exports.AdminUserLogin = AdminUserLogin
exports.AdminUserSignUp = AdminUserSignUp
exports.EditAdminUserProfile = EditAdminUserProfile
exports.ChangeAdminUserPassword = ChangeAdminUserPassword
exports.GetAdminUserProfile = GetAdminUserProfile

