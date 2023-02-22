const { authJwt } = require("../middleware");
const controller = require("../controllers/uploadImage");
module.exports = function (app) {
    app.post("/api/uploadImage/:currentImg?", controller.upload.single('profileImg'), [authJwt.verifyToken], controller.uploadImage);
    app.get("/api/findImage/:url", controller.findImage);
};
