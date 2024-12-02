

module.exports = app => {
    const eduInfo = require("../controller/controller.user.js");
    const user = require("../controller/controller.user.js");
    let router = require("express").Router();
    router.post("/", user.register)
    router.post("/logIn", user.logIn)
    router.post("/eduInfo", eduInfo.saveEduInfo)
    router.get("/", eduInfo.getEduInfo)
    app.use('/api/perfect-match', router);
}