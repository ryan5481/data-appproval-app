const Express = require("express");
const router = Express.Router()

const { 
    UserLogin,
    UserSignUp,
    EditUserProfile,
    ChangeUserPassword,
    GetUserProfile
} = require("../../04-controllers/04-user/01-userController")

router.post("/user-login", UserLogin)
router.post("/user-signup", UserSignUp)
router.patch("/edit-user-profile/:id", EditUserProfile)
router.patch("/change-user-password/:id", ChangeUserPassword)
router.get("/get-user-profile/:id", GetUserProfile)

module.exports = router