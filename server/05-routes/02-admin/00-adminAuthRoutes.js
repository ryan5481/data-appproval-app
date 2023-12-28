const Express = require("express");
const router = Express.Router()

const { 
    InitiatorLogin,
    InitiatorSignUp,
    EditInitiatorProfile,
    ChangeInitiatorPassword,
    GetInitiatorProfile
} = require("../../04-controllers/03-initiator/01-initiatorController")

router.post("/initiator-login", InitiatorLogin)
router.post("/initiator-signup", InitiatorSignUp)
router.patch("/edit-initiator-profile/:id", EditInitiatorProfile)
router.patch("/change-initiator-password/:id", ChangeInitiatorPassword)
router.get("/get-initiator-profile/:id", GetInitiatorProfile)

module.exports = router