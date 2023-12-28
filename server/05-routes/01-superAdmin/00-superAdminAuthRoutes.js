const Express = require("express");
const router = Express.Router()

const { 
    SuperAdminUserLogin,
    SuperAdminUserSignUp,
    EditSuperAdminUserProfile,
    ChangeSuperAdminUserPassword,
    GetSuperAdminUserProfile
} = require("../../04-controllers/01-superAdminController/01-superAdminController")

router.post("/super-admin-login", SuperAdminUserLogin)
router.post("/super-admin-signup", SuperAdminUserSignUp)
router.patch("/edit-super-admin-profile/:id", EditSuperAdminUserProfile)
router.patch("/change-super-admin-password/:id", ChangeSuperAdminUserPassword)
router.get("/get-super-admin-profile/:id", GetSuperAdminUserProfile)

module.exports = router