const verifyToken = require("../helper/auth-helper.js");
const multer = require("multer");

module.exports = app => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            console.log('file des:::', file)
            cb(null, "uploads/")
        },
        filename: (req, file, cb) => {
            console.log('file source:::', file)
            cb(null, Date.now() + "-" + file.originalname)
        },
    })

    const uploadStorage = multer({ storage: storage })
    const user = require("../controller/controller.user.js");
    let router = require("express").Router();
    router.post("/", user.register);
    router.post("/logIn", user.logIn);
    router.post("/eduInfo", verifyToken, user.saveEduInfo);
    router.get("/", verifyToken, user.getEduInfo);
    router.post("/personalInfo", verifyToken, user.savePersonalInfo);
    router.get("/personalInfo", verifyToken, user.getPersonalInfo);
    router.put("/personalInfo", verifyToken, user.updatePersonalInfo);
    router.post("/upload/single", verifyToken, uploadStorage.single("file"), user.editProfilePic);
    router.get("/getProfile", verifyToken, user.getProfile);
    app.use('/api/perfect-match', router);
}