const verifyToken = require("../helper/auth-helper.js");


module.exports = app => {
    const eduInfo = require("../controller/controller.user.js");
    const user = require("../controller/controller.user.js");
    const personalInfo = require("../controller/controller.user.js")
    let router = require("express").Router();
    router.post("/", user.register)
    router.post("/logIn", user.logIn)
    router.post("/eduInfo", verifyToken, eduInfo.saveEduInfo)
    router.get("/", verifyToken, eduInfo.getEduInfo),
        router.post("/personalInfo", personalInfo.savePersonalInfo)
    app.use('/api/perfect-match', router);
}