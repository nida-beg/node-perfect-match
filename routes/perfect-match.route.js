const verifyToken = require("../helper/auth-helper.js");
const multer = require("multer");

const userController = require("../controller/controller.user.js");
let router = require("express").Router();

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

    router.post("/", userController.register);
    router.post("/logIn", userController.logIn);
    router.post("/eduInfo", verifyToken, userController.saveEduInfo);
    router.get("/", verifyToken, userController.getEduInfo);
    router.post("/personalInfo", verifyToken, userController.savePersonalInfo);
    router.get("/personalInfo", verifyToken, userController.getPersonalInfo);
    router.put("/personalInfo", verifyToken, userController.updatePersonalInfo);
    router.post("/upload/single", verifyToken, uploadStorage.single("file"), userController.editProfilePic);
    router.get("/getProfile", verifyToken, userController.getProfile);
    router.put("/updateProfile", verifyToken, userController.updateProfile),
        router.get("/getUser", verifyToken, userController.getUser)
    app.use('/api/perfect-match', router);
}