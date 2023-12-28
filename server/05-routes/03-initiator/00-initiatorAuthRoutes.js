const Express = require("express");
const router = Express.Router()

const { 
    AdminUserLogin,
    AdminUserSignUp,
    EditAdminUserProfile,
    ChangeAdminUserPassword,
    GetAdminUserProfile
} = require("../../04-controllers/02-adminController/01-adminController")

router.post("/admin-login", AdminUserLogin)
router.post("/admin-signup", AdminUserSignUp)
router.patch("/edit-admin-profile/:id", EditAdminUserProfile)
router.patch("/change-admin-password/:id", ChangeAdminUserPassword)
router.get("/get-admin-profile/:id", GetAdminUserProfile)

module.exports = router